import { useState } from "react";
import { login } from "../../firebase/auth";
import AuthModalLayout from "../AuthModalLayout";

type LoginModalProps = {
  onClose: () => void;
};

const LoginModal = ({ onClose }: LoginModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      onClose();
    } catch (err: any) {
      setError("Wrong Email or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthModalLayout
      title="Login"
      description="Welcome back! Please enter your credentials to access your account."
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-emerald-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          className="w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-emerald-500"
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-emerald-500 py-2 font-medium text-white hover:bg-emerald-600"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>
    </AuthModalLayout>
  );
};

export default LoginModal;
