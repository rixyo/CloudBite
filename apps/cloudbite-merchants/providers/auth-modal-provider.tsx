"use client";

import AuthModal from "@/components/modal/auth-modal";
import { useEffect, useState } from "react";

const AuthModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
    </>
  );
};

export default AuthModalProvider;
