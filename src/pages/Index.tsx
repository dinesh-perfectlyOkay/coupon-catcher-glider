
import React from 'react';
import { Extensions } from './Extensions';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from 'sonner';

const Index = () => {
  return (
    <AuthProvider>
      <Toaster position="top-right" closeButton />
      <Extensions />
    </AuthProvider>
  );
};

export default Index;
