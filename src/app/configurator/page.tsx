'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Leaf, ArrowLeft, ArrowRight, ShoppingCart, Check } from 'lucide-react';
import EngravingOptions from '@/components/Engraving/EngravingOptions';
import useAuthStore from '@/stores/authStore';
import { Plant, Soil, Pot, EngravingOption } from '@/types';
import Image from 'next/image';

type ConfigurationStep = 'plant' | 'soil' | 'pot' | 'size' | 'color' | 'engraving' | 'review';

interface Configuration {
  plant?: Plant;
  soil?: Soil;
  pot?: Pot;
  potSize?: 'small' | 'medium' | 'large';
  potColor?: string;
  engraving?: {
    option: EngravingOption;
    text: {
      line1: string;
      line2?: string;
    };
  };
  totalPrice: number;
}

export default function ConfiguratorPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  
  const [currentStep, setCurrentStep] = useState<ConfigurationStep>('plant');
  const [configuration, setConfiguration] = useState<Configuration>({ totalPrice: 0 });
  
  // Data states
  const [plants, setPlants] = useState<Plant[]>([]);
  const [soils, setSoils] = useState<Soil[]>([]);
  const [pots, setPots] = useState<Pot[]>([]);
  const [loading, setLoading] = useState(true);

  const steps: { key: ConfigurationStep; title: string; description: string }[] = [
    { key: 'plant', title: 'Choose Your Plant', description: 'Select your perfect indoor companion' },
    { key: 'soil', title: 'Select Soil Type', description: 'Pick the best growing medium' },
    { key: 'pot', title: 'Choose Your Pot', description: 'Find the perfect home for your plant' },
    { key: 'size', title: 'Select Size', description: 'Choose the right size for your space' },
    { key: 'color', title: 'Pick Color', description: 'Customize your pot color' },
    { key: 'engraving', title: 'Add Engraving', description: 'Personalize your pot (optional)' },
    { key: 'review', title: 'Review & Order', description: 'Confirm your perfect plant setup' }
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth');
      return;
    }
    
    fetchData();
  }, [isAuthenticated, router]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [plantsRes, soilsRes, potsRes] = await Promise.all([
        fetch('/api/plants?active=true'),
        fetch('/api/soils?active=true'),
        fetch('/api/pots?active=true')
      ]);

      const [plantsData, soilsData, potsData] = await Promise.all([
        plantsRes.json(),
        soilsRes.json(),
        potsRes.json()
      ]);

      if (plantsData.success) setPlants(plantsData.data);
      if (soilsData.success) setSoils(soilsData.data);
      if (potsData.success) setPots(potsData.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalPrice = (config: Configuration): number => {
    let total = 0;
    
    if (config.plant) total += config.plant.basePrice;
    if (config.soil) total += config.soil.price;
    if (config.pot && config.potSize) {
      total += config.pot.sizes[config.potSize].price;
      
      // Add color premium
      if (config.potColor && config.pot.colors) {
        const color = config.pot.colors.find(c => c.name === config.potColor);
        if (color) total += color.price;
      }
    }
    if (config.engraving) total += config.engraving.option.price;
    
    return total;
  };

  const updateConfiguration = (updates: Partial<Configuration>) => {
    const newConfig = { ...configuration, ...updates };
    newConfig.totalPrice = calculateTotalPrice(newConfig);
    setConfiguration(newConfig);
  };

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 'plant': return !!configuration.plant;
      case 'soil': return !!configuration.soil;
      case 'pot': return !!configuration.pot;
      case 'size': return !!configuration.potSize;
      case 'color': return !configuration.pot?.colors || !!configuration.potColor;
      case 'engraving': return true; // Optional step
      case 'review': return true;
      default: return false;
    }
  };

  const nextStep = () => {
    const currentIndex = steps.findIndex(s => s.key === currentStep);
    if (currentIndex < steps.length - 1) {
      let nextStepKey = steps[currentIndex + 1].key;
      
      // Skip color step if pot has no color options
      if (nextStepKey === 'color' && (!configuration.pot?.colors || configuration.pot.colors.length === 0)) {
        nextStepKey = 'engraving';
      }
      
      // Skip engraving step if pot has no engraving options
      if (nextStepKey === 'engraving' && (!configuration.pot?.engravingOptions || configuration.pot.engravingOptions.length === 0)) {
        nextStepKey = 'review';
      }
      
      setCurrentStep(nextStepKey);
    }
  };

  const previousStep = () => {
    const currentIndex = steps.findIndex(s => s.key === currentStep);
    if (currentIndex > 0) {
      let prevStepKey = steps[currentIndex - 1].key;
      
      // Skip color step if coming back and pot has no color options
      if (prevStepKey === 'color' && (!configuration.pot?.colors || configuration.pot.colors.length === 0)) {
        prevStepKey = 'size';
      }
      
      setCurrentStep(prevStepKey);
    }
  };

  const getCurrentStepIndex = (): number => {
    return steps.findIndex(s => s.key === currentStep);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Leaf className="w-12 h-12 text-green-600 mx-auto mb-4 animate-spin" />
          <p>Loading configurator...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/dashboard')}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Dashboard</span>
              </Button>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Leaf className="w-6 h-6 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">PlantBuilder</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-lg font-bold text-green-600">₹{configuration.totalPrice.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-gray-900">
              {steps.find(s => s.key === currentStep)?.title}
            </h2>
            <span className="text-sm text-gray-500">
              Step {getCurrentStepIndex() + 1} of {steps.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((getCurrentStepIndex() + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {steps.find(s => s.key === currentStep)?.description}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Configuration Panel */}
          <div className="lg:col-span-2">
            {currentStep === 'plant' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Choose Your Plant</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {plants.map((plant) => (
                    <Card 
                      key={plant._id}
                      className={`cursor-pointer transition-all ${
                        configuration.plant?._id === plant._id 
                          ? 'ring-2 ring-green-500 bg-green-50' 
                          : 'hover:shadow-lg'
                      }`}
                      onClick={() => updateConfiguration({ plant })}
                    >
                      <CardContent className="p-6">
                        <div className="aspect-square relative mb-4 rounded-lg overflow-hidden">
                          <Image
                            src={plant.image}
                            alt={plant.name}
                            fill
                            className="object-cover"
                          />
                          {configuration.plant?._id === plant._id && (
                            <div className="absolute top-2 right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                              <Check className="w-5 h-5 text-white" />
                            </div>
                          )}
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">{plant.name}</h4>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{plant.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-green-600">₹{plant.basePrice.toLocaleString()}</span>
                          <Badge variant="outline">{plant.category}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 'soil' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Select Soil Type</h3>
                <div className="space-y-4">
                  {soils.map((soil) => (
                    <Card 
                      key={soil._id}
                      className={`cursor-pointer transition-all ${
                        configuration.soil?._id === soil._id 
                          ? 'ring-2 ring-green-500 bg-green-50' 
                          : 'hover:shadow-lg'
                      }`}
                      onClick={() => updateConfiguration({ soil })}
                    >
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-gray-900">{soil.name}</h4>
                              {configuration.soil?._id === soil._id && (
                                <Check className="w-5 h-5 text-green-500" />
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{soil.description}</p>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {soil.benefits.slice(0, 3).map((benefit, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {benefit}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <span className="text-lg font-bold text-green-600 ml-4">₹{soil.price}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 'pot' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Choose Your Pot</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pots.map((pot) => (
                    <Card 
                      key={pot._id}
                      className={`cursor-pointer transition-all ${
                        configuration.pot?._id === pot._id 
                          ? 'ring-2 ring-green-500 bg-green-50' 
                          : 'hover:shadow-lg'
                      }`}
                      onClick={() => updateConfiguration({ pot, potSize: undefined, potColor: undefined })}
                    >
                      <CardContent className="p-6">
                        <div className="aspect-square relative mb-4 rounded-lg overflow-hidden">
                          <Image
                            src={pot.image}
                            alt={pot.name}
                            fill
                            className="object-cover"
                          />
                          {configuration.pot?._id === pot._id && (
                            <div className="absolute top-2 right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                              <Check className="w-5 h-5 text-white" />
                            </div>
                          )}
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">{pot.name}</h4>
                        <p className="text-xs text-gray-600 mb-2">{pot.material}</p>
                        <div className="text-sm text-gray-600 mb-3">
                          From ₹{Math.min(pot.sizes.small.price, pot.sizes.medium.price, pot.sizes.large.price)}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {pot.features.slice(0, 2).map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 'size' && configuration.pot && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Select Size</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {Object.entries(configuration.pot.sizes).map(([size, details]) => (
                    <Card 
                      key={size}
                      className={`cursor-pointer transition-all ${
                        configuration.potSize === size 
                          ? 'ring-2 ring-green-500 bg-green-50' 
                          : 'hover:shadow-lg'
                      }`}
                      onClick={() => updateConfiguration({ potSize: size as 'small' | 'medium' | 'large' })}
                    >
                      <CardContent className="p-6 text-center">
                        <h4 className="font-semibold text-gray-900 mb-2 capitalize">{size}</h4>
                        <p className="text-sm text-gray-600 mb-2">{details.diameter} × {details.height}</p>
                        <p className="text-lg font-bold text-green-600">₹{details.price}</p>
                        {details.stock < 10 && (
                          <Badge variant="secondary" className="mt-2">
                            Only {details.stock} left
                          </Badge>
                        )}
                        {configuration.potSize === size && (
                          <Check className="w-6 h-6 text-green-500 mx-auto mt-3" />
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 'color' && configuration.pot?.colors && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Pick Color</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {configuration.pot.colors.map((color) => (
                    <Card 
                      key={color.name}
                      className={`cursor-pointer transition-all ${
                        configuration.potColor === color.name 
                          ? 'ring-2 ring-green-500 bg-green-50' 
                          : 'hover:shadow-lg'
                      }`}
                      onClick={() => updateConfiguration({ potColor: color.name })}
                    >
                      <CardContent className="p-4 text-center">
                        <div 
                          className="w-16 h-16 rounded-full mx-auto mb-3 border-2 border-gray-200"
                          style={{ backgroundColor: color.hex }}
                        ></div>
                        <h4 className="font-medium text-gray-900 mb-1">{color.name}</h4>
                        <p className="text-sm text-gray-600">
                          {color.price > 0 ? `+₹${color.price}` : 'Free'}
                        </p>
                        {configuration.potColor === color.name && (
                          <Check className="w-5 h-5 text-green-500 mx-auto mt-2" />
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 'engraving' && configuration.pot?.engravingOptions && (
              <EngravingOptions
                options={configuration.pot.engravingOptions}
                onEngravingSelect={(option, text) => {
                  if (option && text) {
                    updateConfiguration({ engraving: { option, text } });
                  } else {
                    updateConfiguration({ engraving: undefined });
                  }
                }}
                selectedOption={configuration.engraving?.option}
              />
            )}

            {currentStep === 'review' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Review Your Configuration</h3>
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {/* Plant */}
                      {configuration.plant && (
                        <div className="flex items-center space-x-4 border-b pb-4">
                          <div className="w-20 h-20 relative rounded-lg overflow-hidden">
                            <Image
                              src={configuration.plant.image}
                              alt={configuration.plant.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{configuration.plant.name}</h4>
                            <p className="text-sm text-gray-600">Indoor Plant</p>
                          </div>
                          <span className="font-semibold text-gray-900">₹{configuration.plant.basePrice.toLocaleString()}</span>
                        </div>
                      )}

                      {/* Soil */}
                      {configuration.soil && (
                        <div className="flex items-center justify-between border-b pb-4">
                          <div>
                            <h4 className="font-semibold text-gray-900">{configuration.soil.name}</h4>
                            <p className="text-sm text-gray-600">Growing Medium</p>
                          </div>
                          <span className="font-semibold text-gray-900">₹{configuration.soil.price}</span>
                        </div>
                      )}

                      {/* Pot */}
                      {configuration.pot && configuration.potSize && (
                        <div className="border-b pb-4">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-gray-900">{configuration.pot.name}</h4>
                              <p className="text-sm text-gray-600">
                                {configuration.potSize} size
                                {configuration.potColor && ` • ${configuration.potColor}`}
                              </p>
                            </div>
                            <span className="font-semibold text-gray-900">
                              ₹{configuration.pot.sizes[configuration.potSize].price}
                            </span>
                          </div>
                          
                          {/* Color premium */}
                          {configuration.potColor && configuration.pot.colors && (
                            (() => {
                              const color = configuration.pot.colors.find(c => c.name === configuration.potColor);
                              return color && color.price > 0 ? (
                                <div className="flex justify-between text-sm text-gray-600">
                                  <span>Color premium ({color.name})</span>
                                  <span>+₹{color.price}</span>
                                </div>
                              ) : null;
                            })()
                          )}
                        </div>
                      )}

                      {/* Engraving */}
                      {configuration.engraving && (
                        <div className="flex items-center justify-between border-b pb-4">
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {configuration.engraving.option.type === 'sticker' ? 'Sticker Engraving' : 'Embossed Engraving'}
                            </h4>
                            <p className="text-sm text-gray-600">
                              "{configuration.engraving.text.line1}"
                              {configuration.engraving.text.line2 && ` "${configuration.engraving.text.line2}"`}
                            </p>
                          </div>
                          <span className="font-semibold text-gray-900">₹{configuration.engraving.option.price}</span>
                        </div>
                      )}

                      {/* Total */}
                      <div className="flex items-center justify-between text-xl font-bold text-gray-900 pt-4">
                        <span>Total</span>
                        <span className="text-green-600">₹{configuration.totalPrice.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Button size="lg" className="w-full bg-green-600 hover:bg-green-700">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart - ₹{configuration.totalPrice.toLocaleString()}
                </Button>
              </div>
            )}
          </div>

          {/* Configuration Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Your Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {configuration.plant && (
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 relative rounded-lg overflow-hidden">
                      <Image
                        src={configuration.plant.image}
                        alt={configuration.plant.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{configuration.plant.name}</p>
                      <p className="text-xs text-gray-600">₹{configuration.plant.basePrice.toLocaleString()}</p>
                    </div>
                  </div>
                )}

                {configuration.soil && (
                  <div className="text-sm">
                    <p className="font-medium">{configuration.soil.name}</p>
                    <p className="text-gray-600">₹{configuration.soil.price}</p>
                  </div>
                )}

                {configuration.pot && (
                  <div className="text-sm">
                    <p className="font-medium">{configuration.pot.name}</p>
                    {configuration.potSize && (
                      <p className="text-gray-600">
                        {configuration.potSize} - ₹{configuration.pot.sizes[configuration.potSize].price}
                        {configuration.potColor && ` • ${configuration.potColor}`}
                      </p>
                    )}
                  </div>
                )}

                {configuration.engraving && (
                  <div className="text-sm">
                    <p className="font-medium">
                      {configuration.engraving.option.type === 'sticker' ? 'Sticker' : 'Embossed'} Engraving
                    </p>
                    <p className="text-gray-600">₹{configuration.engraving.option.price}</p>
                  </div>
                )}

                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span className="text-green-600">₹{configuration.totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={previousStep}
            disabled={currentStep === 'plant'}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>

          <Button
            onClick={nextStep}
            disabled={!canProceed()}
            className="flex items-center space-x-2"
          >
            <span>{currentStep === 'review' ? 'Complete' : 'Next'}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </main>
    </div>
  );
} 