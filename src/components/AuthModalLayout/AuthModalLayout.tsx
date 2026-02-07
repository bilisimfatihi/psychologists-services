import { useEffect } from "react";

type AuthModalLayoutProps = {
  title: string;
  description: string;
  onClose: () => void;
  children: React.ReactNode;
};

const AuthModalLayout = ({
  title,
  description,
  onClose,
  children,
}: AuthModalLayoutProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <h2 className="mb-2 text-2xl font-semibold text-gray-800">{title}</h2>
        <p className="mb-6 text-sm text-gray-500">{description}</p>

        {children}
      </div>
    </div>
  );
};

export default AuthModalLayout;
