'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EngravingOption } from '@/types';

interface EngravingOptionsProps {
  options: EngravingOption[];
  onEngravingSelect: (option: EngravingOption | null, text?: { line1: string; line2?: string }) => void;
  selectedOption?: EngravingOption | null;
}

export default function EngravingOptions({ 
  options, 
  onEngravingSelect, 
  selectedOption 
}: EngravingOptionsProps) {
  const [selectedType, setSelectedType] = useState<EngravingOption | null>(selectedOption || null);
  const [engravingText, setEngravingText] = useState({
    line1: '',
    line2: ''
  });

  const handleOptionSelect = (option: EngravingOption | null) => {
    setSelectedType(option);
    if (option) {
      onEngravingSelect(option, engravingText);
    } else {
      onEngravingSelect(null);
    }
  };

  const handleTextChange = (field: 'line1' | 'line2', value: string) => {
    const newText = { ...engravingText, [field]: value };
    setEngravingText(newText);
    
    if (selectedType) {
      onEngravingSelect(selectedType, newText);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Engraving
        </h2>
        <p className="text-gray-600">
          Personalise your pot for free.
        </p>
      </div>

      {/* Options */}
      <div className="space-y-4">
        {/* Add engraving option */}
        {options.map((option) => (
          <Card
            key={option.type}
            className={`p-6 cursor-pointer transition-all ${
              selectedType?.type === option.type
                ? 'ring-2 ring-blue-500 bg-blue-50'
                : 'hover:bg-gray-50'
            }`}
            onClick={() => handleOptionSelect(option)}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  {option.type === 'sticker' ? 'Add sticker engraving' : 'Add embossed engraving'}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  {option.description}
                </p>
                <p className="text-xs text-gray-500">
                  In seven regional languages and English. Max {option.maxCharacters} characters.
                </p>
              </div>
              <div className="text-right">
                <span className="text-lg font-medium text-gray-900">
                  {option.price === 0 ? 'Free' : `₹${option.price}`}
                </span>
              </div>
            </div>
          </Card>
        ))}

        {/* No engraving option */}
        <Card
          className={`p-6 cursor-pointer transition-all ${
            selectedType === null
              ? 'ring-2 ring-blue-500 bg-blue-50'
              : 'hover:bg-gray-50'
          }`}
          onClick={() => handleOptionSelect(null)}
        >
          <h3 className="text-lg font-medium text-gray-900">
            No engraving
          </h3>
        </Card>
      </div>

      {/* Text input when engraving is selected */}
      {selectedType && (
        <div className="mt-8 p-6 bg-white rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Personalise your pot.
          </h3>
          <p className="text-gray-600 text-sm mb-6">
            Add emoji with a click. Type in names, initials or numbers.
            You can even combine them.
          </p>

          {/* Mock pot preview */}
          <div className="mb-6 flex justify-center">
            <div className="w-48 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-sm font-medium text-gray-700">
                  {engravingText.line1 || 'First line'}
                </div>
                {engravingText.line2 && (
                  <div className="text-sm text-gray-600 mt-1">
                    {engravingText.line2}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Text inputs */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="line1" className="sr-only">
                First line
              </Label>
              <Input
                id="line1"
                placeholder="First line"
                value={engravingText.line1}
                onChange={(e) => handleTextChange('line1', e.target.value)}
                maxLength={selectedType.maxCharacters}
                className="w-full px-4 py-3 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <Label htmlFor="line2" className="sr-only">
                Second line (optional)
              </Label>
              <Input
                id="line2"
                placeholder="Second line (optional)"
                value={engravingText.line2}
                onChange={(e) => handleTextChange('line2', e.target.value)}
                maxLength={selectedType.maxCharacters}
                className="w-full px-4 py-3 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Character count */}
          <div className="mt-2 text-xs text-gray-500 text-center">
            {engravingText.line1.length + engravingText.line2.length} / {selectedType.maxCharacters} characters
          </div>

          {/* Language info */}
          <div className="mt-4 text-xs text-gray-500 text-center">
            Available in: {selectedType.availableLanguages.join(', ')}
          </div>
        </div>
      )}
    </div>
  );
} 