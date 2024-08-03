"use client";
import { createContext, useState, ReactNode } from 'react';

// Create a context for the profile data and setProfile function
export const ProfileContext = createContext<{
  profile: any;
  setProfile: (profile: any) => void;
}>({
  profile: null,
  setProfile: () => {}
});

// ProfileProvider component that wraps the children components
export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  // State to store the profile data
  const [profile, setProfile] = useState();

  return (
    // Provide the profile data and setProfile function to the children components
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};