"use client";

import Modal from "./modal";
import AuthForm from "@/components/forms/auth-form";
import { useAuthModal } from "@/context/AuthModalContext";

const AuthModal: React.FC = () => {
  const authModal = useAuthModal();
  return (
    <Modal open={authModal.isOpen} onClose={authModal.onClose}>
     
          <AuthForm />
    </Modal>
  );
};
export default AuthModal;
