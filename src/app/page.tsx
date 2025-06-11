'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Leaf, Home, Sun, Droplets, Heart } from 'lucide-react';
import useAuthStore from '@/stores/authStore';

export default function HomePage() {
  const { user, isAuthenticated, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              <Leaf className="w-4 h-4 mr-2" />
              Build Your Perfect Plant
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6">
              PlantBuilder
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Create your perfect plant companion with our step-by-step configurator. 
              Choose your plant, soil, pot, and personalization — just like building your dream Mac.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {isAuthenticated && user ? (
                <>
                  <Link href="/dashboard">
                    <Button size="lg" className="text-lg px-8 py-6 rounded-full">
                      Go to Dashboard
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" className="text-lg px-8 py-6 rounded-full">
                    Browse Plants
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth">
                    <Button size="lg" className="text-lg px-8 py-6 rounded-full">
                      Start Building
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" className="text-lg px-8 py-6 rounded-full">
                    Browse Plants
                  </Button>
                </>
              )}
            </div>
            
            {/* User greeting */}
            {isAuthenticated && user && (
              <p className="mt-4 text-lg text-green-600">
                Welcome back, {user.name}! 🌱
              </p>
            )}
          </div>
        </div>
        
        {/* Hero Image Placeholder */}
        <div className="relative h-96 bg-gradient-to-r from-green-100 to-blue-100 mx-4 rounded-3xl mb-20">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <Leaf className="w-24 h-24 mx-auto mb-4 text-green-500" />
              <p className="text-lg">Beautiful plant showcase coming soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Style
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Whether you&apos;re looking to brighten your indoor space or create an outdoor oasis, 
              we have the perfect plants for you.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Indoor Plants Card */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white rounded-3xl overflow-hidden">
              <CardContent className="p-0">
                <div className="h-64 bg-gradient-to-br from-green-400 to-green-600 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Home className="w-20 h-20 text-white" />
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Indoor Plants</h3>
                  <p className="text-gray-600 mb-6">
                    Perfect for apartments, offices, and any indoor space. Low maintenance, 
                    high impact plants that purify your air and brighten your mood.
                  </p>
                  <Button className="w-full rounded-full">
                    Explore Indoor Plants
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Outdoor Plants Card */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white rounded-3xl overflow-hidden">
              <CardContent className="p-0">
                <div className="h-64 bg-gradient-to-br from-blue-400 to-blue-600 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sun className="w-20 h-20 text-white" />
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Outdoor Plants</h3>
                  <p className="text-gray-600 mb-6">
                    Transform your garden, balcony, or patio with beautiful outdoor plants. 
                    From flowering bushes to hardy perennials.
                  </p>
                  <Button className="w-full rounded-full">
                    Explore Outdoor Plants
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose PlantBuilder?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make plant ownership simple, personalized, and delightful.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Expert Curation</h3>
              <p className="text-gray-600">
                Every plant is carefully selected and comes with detailed care instructions 
                tailored to your environment.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Droplets className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Perfect Soil Match</h3>
              <p className="text-gray-600">
                Our soil blends are scientifically formulated to give your plants 
                the best possible start in their new home.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Touch</h3>
              <p className="text-gray-600">
                Add custom engravings to your pots and create a truly unique 
                plant that reflects your personality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Build Your Perfect Plant?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of happy plant parents who&apos;ve created their dream green spaces with PlantBuilder.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated && user ? (
              <Link href="/dashboard">
                <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-6 rounded-full">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/auth">
                <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-6 rounded-full">
                  Start Your Journey
                </Button>
              </Link>
            )}
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900 text-lg px-8 py-6 rounded-full">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
