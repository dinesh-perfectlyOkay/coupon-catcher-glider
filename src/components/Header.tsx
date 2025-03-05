
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { RefreshCw, LogIn, LogOut, Tag } from 'lucide-react';

export function Header() {
  const { isAuthenticated, user, login, logout, refreshUserData, isLoading } = useAuth();
  
  return (
    <header className="bg-background border-b border-border px-6 py-4 sticky top-0 z-10 flex items-center justify-between glass">
      <div className="flex items-center gap-2">
        <Tag className="h-5 w-5 text-primary" />
        <h1 className="text-lg font-medium">Coupon Catcher</h1>
      </div>
      
      <div className="flex items-center gap-3">
        {isAuthenticated && user ? (
          <>
            <div className="text-sm text-muted-foreground max-w-[120px] truncate">
              {user.name || user.email}
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={logout}
              className="h-8 w-8 rounded-full"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={login}
            className="h-8 gap-1.5 neo-shadow"
            disabled={isLoading}
          >
            <LogIn className="h-4 w-4" />
            <span>Sign In</span>
          </Button>
        )}
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => refreshUserData()}
          className="h-8 w-8 rounded-full"
          disabled={isLoading}
          title="Refresh"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
      </div>
    </header>
  );
}
