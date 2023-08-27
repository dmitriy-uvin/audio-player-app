'use client'

import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { useDebounce } from '@/hooks';
import qs from "query-string";
import { Input } from '@/components/input';

export const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>('');
  const debouncedValue = useDebounce<string>(value, 500);
  
  useEffect(() => {
    const query = {
      title: debouncedValue,
    };
    
    const url = qs.stringifyUrl({
      url: '/search',
      query
    });
    
    router.push(url);
  }, [debouncedValue, router]);
  
  return (
    <Input
      placeholder="What do you want to listen to?"
      value={value}
      onChange={(e: FormEvent<HTMLInputElement>) => setValue(e.currentTarget.value)}
    />
  );
}