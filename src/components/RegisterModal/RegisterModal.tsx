import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { registerSchema } from "../../schemas/auth.schema";
import { register as registerUser } from "../../firebase/auth";
import AuthModalLayout from "../AuthModalLayout";

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
};

type RegisterModalProps = {
  onClose: () => void;
};

const RegisterModal = ({ onClose }: RegisterModalProps) => {
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(registerSchema),
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    setServerError("");

    try {
      await registerUser(data.name, data.email, data.password);
      reset();
      onClose();
    } catch (err: any) {
      switch (err.code) {
        case "auth/email-already-in-use":
          setServerError("This email is already in use");
          break;
        case "auth/weak-password":
          setServerError("Password is too weak");
          break;
        default:
          setServerError("Failed to create an account");
      }
    }
  };

  return (
    <AuthModalLayout
      title="Registration"
      description="Please provide the following information to create an account."
      onClose={onClose}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          {...register("name")}
          className="w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-emerald-500"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-emerald-500"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className="w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-emerald-500"
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}

        {serverError && <p className="text-sm text-red-500">{serverError}</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full bg-emerald-500 py-2 font-medium text-white hover:bg-emerald-600"
        >
          {isSubmitting ? "Creating account..." : "Sign Up"}
        </button>
      </form>
    </AuthModalLayout>
  );
};

export default RegisterModal;
