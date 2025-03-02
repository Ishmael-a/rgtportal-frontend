import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  label?: string;
  size?: number;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  label,
  size = 24,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <Loader2 size={size} className="animate-spin text-blue-500" />
      {label && (
        <p className="mt-2 text-sm text-muted-foreground">{label}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;