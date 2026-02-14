import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { appointmentSchema } from "../../schemas/appointment.schema";
import BaseModal from "../BaseModal";

type AppointmentFormValues = {
  name: string;
  phone: string;
  email: string;
  time: string;
  comment?: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  psychologist: {
    name: string;
    avatarUrl: string;
  };
};

const AppointmentModal = ({ isOpen, onClose, psychologist }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentFormValues>({
    resolver: yupResolver(appointmentSchema),
    mode: "onTouched",
  });

  const onSubmit = async (_data: AppointmentFormValues) => {
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} maxWidth="max-w-2xl">
      {/* Header */}
      <h2 className="text-2xl font-semibold mb-2">
        Make an appointment with a psychologist
      </h2>

      <p className="text-gray-500 mb-6">
        You are on the verge of changing your life for the better. Fill out the
        short form below to book your personal appointment.
      </p>

      {/* Psychologist info */}
      <div className="flex items-center gap-3 mb-6">
        <img
          src={psychologist.avatarUrl}
          alt={psychologist.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className="font-medium">{psychologist.name}</span>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          {...register("name")}
          className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-[#fcfcfc] text-sm focus:outline-none focus:ring-2 focus:ring-[#54be96]/20 transition-all"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="+380"
            {...register("phone")}
            className="w-1/2 px-5 py-3.5 rounded-2xl border border-gray-100 bg-[#fcfcfc] text-sm focus:outline-none focus:ring-2 focus:ring-[#54be96]/20 transition-all"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
          <input
            type="time"
            {...register("time")}
            className="w-1/2 px-5 py-3.5 rounded-2xl border border-gray-100 bg-[#fcfcfc] text-sm focus:outline-none focus:ring-2 focus:ring-[#54be96]/20 transition-all"
          />
          {errors.time && (
            <p className="text-red-500 text-sm">{errors.time.message}</p>
          )}
        </div>

        <input
          type="email"
          {...register("email")}
          placeholder="Email"
          className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-[#fcfcfc] text-sm focus:outline-none focus:ring-2 focus:ring-[#54be96]/20 transition-all"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
        <textarea
          placeholder="Comment"
          {...register("comment")}
          rows={4}
          className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-[#fcfcfc] text-sm focus:outline-none focus:ring-2 focus:ring-[#54be96]/20 transition-all"
        />
        {errors.comment && (
          <p className="text-red-500 text-sm">{errors.comment.message}</p>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-emerald-500 text-white py-3 rounded-full font-medium hover:bg-emerald-600 transition"
        >
          {isSubmitting ? "Sending..." : "Send"}
        </button>
      </form>
    </BaseModal>
  );
};

export default AppointmentModal;
