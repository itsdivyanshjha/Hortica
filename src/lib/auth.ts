import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import { UserWithoutPassword } from '@/types';

// Only require JWT_SECRET in runtime, not during build
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Hash password
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Compare password
export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

// Generate JWT token
export const generateToken = (user: UserWithoutPassword): string => {
  return jwt.sign(
    { 
      userId: user._id, 
      email: user.email,
      name: user.name 
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// Verify JWT token
export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid token');
  }
};

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
  try {
    const token = getTokenFromRequest(request);
    
    if (!token) {
      return null;
    }
    
    const decoded = verifyToken(token);
    return decoded;
  } catch (error) {
    return null;
  }
} 