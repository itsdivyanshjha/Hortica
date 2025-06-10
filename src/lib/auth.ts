import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

// Only require JWT_SECRET in runtime, not during build
const JWT_SECRET = process.env.JWT_SECRET || '';

// Hash password
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

// Compare password
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// Generate JWT token
export function generateToken(userId: string): string {
  if (!JWT_SECRET) {
    throw new Error('Please define the JWT_SECRET environment variable');
  }
  
  return jwt.sign(
    { userId },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

// Verify JWT token
export function verifyToken(token: string): { userId: string } | null {
  if (!JWT_SECRET) {
    throw new Error('Please define the JWT_SECRET environment variable');
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    return decoded;
  } catch {
    return null;
  }
}

// Extract token from request
export function getTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  
  // Also check for token in cookies (for client-side requests)
  const token = request.cookies.get('token')?.value;
  return token || null;
}

// Middleware to protect routes
export async function authenticateToken(request: NextRequest): Promise<{ userId: string } | null> {
  const token = getTokenFromRequest(request);
  
  if (!token) {
    return null;
  }
  
  const decoded = verifyToken(token);
  return decoded;
} 