
import React from 'react';
import { Store } from '@/types';
import { ExternalLink } from 'lucide-react';

interface StoreInfoProps {
  store: Store;
}

export function StoreInfo({ store }: StoreInfoProps) {
  return (
    <div className="flex items-start p-4 rounded-lg border border-border mb-4 animate-fadeIn glass">
      {store.logo ? (
        <img 
          src={store.logo} 
          alt={`${store.name} logo`} 
          className="w-16 h-16 rounded object-contain bg-white p-1 mr-4"
        />
      ) : (
        <div className="w-16 h-16 rounded bg-primary/10 flex items-center justify-center text-primary font-bold mr-4">
          {store.name.substring(0, 2).toUpperCase()}
        </div>
      )}
      
      <div className="flex-1">
        <h2 className="text-lg font-medium">{store.name}</h2>
        {store.description && (
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{store.description}</p>
        )}
        
        <a 
          href={store.website.startsWith('http') ? store.website : `https://${store.website}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-primary text-sm mt-2 hover:underline"
        >
          Visit Website
          <ExternalLink className="ml-1 h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}
