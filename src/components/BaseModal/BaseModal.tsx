import { useEffect } from "react";

type BaseModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
};

const BaseModal = ({
  isOpen,
  onClose,
  children,
  maxWidth = "max-w-xl",
}: BaseModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal */}
      <div
        className={`relative bg-white rounded-2xl w-full ${maxWidth} p-6 z-10`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl text-gray-400 hover:text-black"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
};

export default BaseModal;
