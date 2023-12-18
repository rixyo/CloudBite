"use client";


import SecretkeyModal from "@/components/modal/secretkey-modal";
import { useEffect, useState } from "react";
const SecretKeyModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <SecretkeyModal />
    </>
  );
};
export default SecretKeyModalProvider;
