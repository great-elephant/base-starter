'use client';
import { PropsWithChildren, useEffect, useState } from 'react';
import { useQuery } from '@sdks/api-react-query';
import { SessionContext } from './session-context';
import { isLoggedIn, clearAuthSession } from './heper.client';

export const SessionProvider = ({ children }: PropsWithChildren) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const myInfo = useQuery(client.user.myInfo, {
    enable: loggedIn,
  });

  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, []);

  function logout() {
    clearAuthSession();
    myInfo.setData(undefined);
    setLoggedIn(false);
  }

  function fetchUser() {
    setLoggedIn(true);
  }

  return (
    <SessionContext.Provider value={{
      user: myInfo.data,
      loading: myInfo.loading,
      logout,
      fetchUser,
      setUser: myInfo.setData,
    }} >
      {children}
    </SessionContext.Provider>
  );
};