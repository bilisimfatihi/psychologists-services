import { useState } from "react";
import { register } from "../../firebase/auth";
import AuthModalLayout from "../AuthModalLayout";

type RegisterModalProps = {
  onClose: () => void;
};

const RegisterModal = ({ onClose }: RegisterModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(name, email, password);
      onClose();
    } catch (err: any) {
      setError("Failed to create an account");
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthModalLayout
      title="Registration"
      description="Please provide the following information to create an account."
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-emerald-500"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-emerald-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-emerald-500"
        />

        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-emerald-500 py-2 font-medium text-white hover:bg-emerald-600"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>
    </AuthModalLayout>
  );
};

export default RegisterModal;
