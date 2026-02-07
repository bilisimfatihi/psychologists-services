import AuthModalLayout from "../AuthModalLayout";

type LoginModalProps = {
  onClose: () => void;
};

const LoginModal = ({ onClose }: LoginModalProps) => {
  return (
    <AuthModalLayout
      title="Login"
      description="Welcome back! Please enter your credentials to access your account."
      onClose={onClose}
    >
      <form className="space-y-4">
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
          Log In
        </button>
      </form>
    </AuthModalLayout>
  );
};

export default LoginModal;
