'use client'
import Withdrawform from '../forms/withdraw-form';
import Modal from './modal';
import useWalletModal from '@/hooks/useWalletModal';

const WalletModal:React.FC = () => {
    const walletModal = useWalletModal();
    return (
      <Modal open={walletModal.isOpen} onClose={walletModal.onClose}>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-[2rem] font-[700]">With Draw Request</h1>
          <div className="flex gap-3 justify-center mt-3">
          <Withdrawform />
          </div>
        </div>
      </Modal>
    );
}
export default WalletModal;
