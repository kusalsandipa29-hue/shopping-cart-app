'use client';
import { Button } from './button';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export function QuantitySelector({ quantity, onIncrease, onDecrease }: QuantitySelectorProps) {
  return (
    <div className="flex items-center space-x-2">
      <Button variant="outline" size="icon" onClick={onDecrease}>
        <Minus className="h-4 w-4" />
      </Button>
      <span className="w-8 text-center font-medium">{quantity}</span>
      <Button variant="outline" size="icon" onClick={onIncrease}>
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
