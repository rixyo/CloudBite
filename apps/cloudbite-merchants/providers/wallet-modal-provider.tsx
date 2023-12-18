'use client'

import WalletModal from "@/components/modal/wallet-modal"
import { useEffect, useState } from "react";
const WalletModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <WalletModal />
        </>
    );
}
export default WalletModalProvider;