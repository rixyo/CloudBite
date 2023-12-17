// this is a modal for previewing the product
"use client";

import PreviewModal from "@/components/modal/preview-modal";
import { useEffect, useState } from "react";

const PreviewModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <PreviewModal />
    </>
  );
};

export default PreviewModalProvider;
