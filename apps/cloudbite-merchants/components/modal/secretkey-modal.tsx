"use client";
import useSecretKeyModal from "@/hooks/useSecretKeyModal";
import Withdrawform from "../forms/withdraw-form";
import Modal from "./modal";
import Secretkeyform from "../forms/secretkey-form";


const SecretkeyModal: React.FC = () => {
  const secretkeyModal = useSecretKeyModal();
  return (
    <Modal open={secretkeyModal.isOpen} onClose={secretkeyModal.onClose}>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-[2rem] font-[700]">Secret Key Request</h1>
        <div className="flex gap-3 justify-center mt-3">
          <Secretkeyform />
        </div>
      </div>
    </Modal>
  );
};
export default SecretkeyModal;
