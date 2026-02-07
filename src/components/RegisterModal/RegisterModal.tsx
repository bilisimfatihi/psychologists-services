import AuthModalLayout from "../AuthModalLayout";

type RegisterModalProps = {
  onClose: () => void;
};

const RegisterModal = ({ onClose }: RegisterModalProps) => {
  return (
    <AuthModalLayout
      title="Registration"
      description="Please provide the following information to create an account."
      onClose={onClose}
    >
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-emerald-500"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-emerald-500"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-emerald-500"
        />

        <button className="w-full rounded-full bg-emerald-500 py-2 font-medium text-white hover:bg-emerald-600">
          Sign Up
        </button>
      </form>
    </AuthModalLayout>
  );
};

export default RegisterModal;
