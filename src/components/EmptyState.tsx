
import React from 'react';
import { Search, ShoppingBag } from 'lucide-react';

interface EmptyStateProps {
  type: 'coupons' | 'stores' | 'search';
  message?: string;
}

export function EmptyState({ type, message }: EmptyStateProps) {
  const getIcon = () => {
    switch (type) {
      case 'coupons':
        return <ShoppingBag className="h-12 w-12 text-muted-foreground/60" />;
      case 'stores':
        return <ShoppingBag className="h-12 w-12 text-muted-foreground/60" />;
      case 'search':
      default:
        return <Search className="h-12 w-12 text-muted-foreground/60" />;
    }
  };
  
  const getDefaultMessage = () => {
    switch (type) {
      case 'coupons':
        return "No coupons available for this store";
      case 'stores':
        return "No store information available";
      case 'search':
      default:
        return "No results found";
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center animate-fadeIn">
      {getIcon()}
      <h3 className="mt-4 text-lg font-medium">
        {message || getDefaultMessage()}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-xs">
        Try visiting an online store or refreshing the page.
      </p>
    </div>
  );
}
