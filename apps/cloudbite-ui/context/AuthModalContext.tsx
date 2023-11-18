"use client";
import React, { createContext, useContext, ReactNode, useState } from "react";

interface AuthModalContextProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const AuthModalContext = createContext<AuthModalContextProps | undefined>(
  undefined
);
export const AuthModalContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const contextValue: AuthModalContextProps = {
    isOpen,
    onOpen,
    onClose,
  };

  return (
    <AuthModalContext.Provider value={contextValue}>
      {children}
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = () => {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error("useAuthModal must be used within an AuthModalProvider");
  }
  return context;
};
