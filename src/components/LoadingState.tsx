
import React from 'react';

export function LoadingState() {
  return (
    <div className="p-4 space-y-4 animate-pulse">
      {/* Header skeleton */}
      <div className="flex justify-between items-center">
        <div className="h-6 bg-muted/60 rounded w-1/3"></div>
        <div className="h-8 bg-muted/60 rounded w-24"></div>
      </div>
      
      {/* Store info skeleton */}
      <div className="flex items-start p-4 rounded-lg border border-border/50">
        <div className="w-16 h-16 rounded bg-muted/60 mr-4"></div>
        <div className="flex-1">
          <div className="h-6 bg-muted/60 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-muted/60 rounded w-full mb-1"></div>
          <div className="h-4 bg-muted/60 rounded w-2/3"></div>
        </div>
      </div>
      
      {/* Coupons skeleton */}
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-card rounded-lg p-4 border border-border/50">
            <div className="h-5 bg-muted/60 rounded w-1/4 mb-3"></div>
            <div className="h-4 bg-muted/60 rounded w-full mb-2"></div>
            <div className="h-4 bg-muted/60 rounded w-2/3 mb-4"></div>
            <div className="flex items-center">
              <div className="h-8 bg-muted/60 rounded w-3/4 mr-2"></div>
              <div className="h-8 bg-muted/60 rounded w-8"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
