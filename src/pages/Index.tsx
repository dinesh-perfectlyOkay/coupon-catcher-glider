
import React from 'react';
import { Extensions } from './Extensions';
import { AuthProvider } from '@/contexts/AuthContext';

const Index = () => {
  return (
    <AuthProvider>
      <Extensions />
    </AuthProvider>
  );
};

export default Index;
