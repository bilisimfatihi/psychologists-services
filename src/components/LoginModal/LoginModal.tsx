import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { loginSchema } from "../../schemas/auth.schema";
import { login } from "../../firebase/auth";
import AuthModalLayout from "../AuthModalLayout";

type LoginFormValues = {
  email: string;
  password: string;
};

type LoginModalProps = {
  onClose: () => void;
};

const LoginModal = ({ onClose }: LoginModalProps) => {
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    setServerError("");
    try {
      await login(data.email, data.password);
      onClose();
    } catch (err: any) {
      setServerError("Wrong Email or Password");
    }
  };

  return (
    <AuthModalLayout
      title="Login"
      description="Welcome back! Please enter your credentials to access your account."
      onClose={onClose}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="email"
          {...register("email")}
          placeholder="Email"
          required
          autoComplete="email"
          className="w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-emerald-500"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          autoComplete="current-password"
          className="w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-emerald-500"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
        {serverError && (
          <p className="text-center text-sm text-red-500">{serverError}</p>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full bg-emerald-500 py-2 font-medium text-white hover:bg-emerald-600"
        >
          {isSubmitting ? "Logging in..." : "Log In"}
        </button>
      </form>
    </AuthModalLayout>
  );
};

export default LoginModal;
