import { Subscription, UserDetails } from '@/types';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useSessionContext, useUser as useSupabaseUser, User } from '@supabase/auth-helpers-react';

interface UserContextProps {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
}

const UserContext = createContext<UserContextProps>({
  accessToken: null,
  user: null,
  userDetails: null,
  isLoading: false,
  subscription: null
});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient,
    error
  } = useSessionContext();
  const user = useSupabaseUser();
  const accessToken = session?.access_token ?? null;
  
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [sub, setSub] = useState<Subscription | null>(null);
  
  const getUserDetails = () => supabaseClient.from('users').select('*').single();
  const getSubscription = () => supabaseClient
    .from('subscriptions')
    .select('*, prices(*, products(*)')
    .in('status', ['trailing', 'active'])
    .single();
  
  useEffect(() => {
    if (!user && !isLoadingData && !userDetails && !sub) {
      setIsLoadingData(true);
      // TODO: what is it
      Promise.allSettled([getUserDetails(), getSubscription()])
        .then((results) => {
          const userDetailsPromise = results[0] as any;
          const userSubPromise = results[1] as any;

          if (userDetailsPromise.status === 'fulfilled') {
            setUserDetails(userDetailsPromise.value.data as UserDetails);
          }
          if (userSubPromise.status === 'fulfilled') {
            setSub(userSubPromise.value.data);
          }
          
          setIsLoadingData(false);
        })
        .catch(() => setIsLoadingData(false));
    } else if (!user && !isLoadingData && !isLoadingUser) {
      setUserDetails(null);
      setSub(null);
    }
  }, [user, isLoadingUser]);
  
  const value = {
    subscription: sub,
    userDetails: userDetails,
    isLoading: isLoadingData || isLoadingUser,
    accessToken: accessToken,
    user: user,
  }
  
  return <UserContext.Provider value={value}>
    {children}
  </UserContext.Provider>;
}

export const useUser = () => {
  const ctx = useContext(UserContext);
  
  return ctx;
}

