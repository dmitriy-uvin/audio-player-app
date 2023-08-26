import { useState } from 'react';

interface ResponseProps {
  isLoading: boolean;
  loading: () => void;
  notloading: () => void;
}

export const useLoading = (defaultState = false): ResponseProps => {
  const [isLoading, setIsLoading] = useState<boolean>(defaultState);
  
  const loading = () => setIsLoading(true);
  const notloading = () => setIsLoading(false);
  
  return {
    isLoading,
    loading,
    notloading,
  };
}