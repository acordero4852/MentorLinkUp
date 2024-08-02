"use client";
import { createContext, useState, ReactNode } from 'react';

export const ProfileContext = createContext<{
  profile: any;
  setProfile: (profile: any) => void;
}>({
  profile: null,
  setProfile: () => {}
});

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState();

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};