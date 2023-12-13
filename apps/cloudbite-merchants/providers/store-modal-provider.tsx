"use client";
import React, { useState, useEffect } from "react";

import StoreModal from "@/components/modal/store-modal";
const StoreModalProvider: React.FC = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <StoreModal />
    </>
  );
};
export default StoreModalProvider;
