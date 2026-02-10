import BaseModal from "../BaseModal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  psychologist: {
    name: string;
    avatarUrl: string;
  };
};

const AppointmentModal = ({ isOpen, onClose, psychologist }: Props) => {
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
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-[#fcfcfc] text-sm focus:outline-none focus:ring-2 focus:ring-[#54be96]/20 transition-all"
        />

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="+380"
            className="w-1/2 px-5 py-3.5 rounded-2xl border border-gray-100 bg-[#fcfcfc] text-sm focus:outline-none focus:ring-2 focus:ring-[#54be96]/20 transition-all"
          />
          <input
            type="time"
            className="w-1/2 px-5 py-3.5 rounded-2xl border border-gray-100 bg-[#fcfcfc] text-sm focus:outline-none focus:ring-2 focus:ring-[#54be96]/20 transition-all"
          />
        </div>

        <input
          type="email"
          placeholder="Email"
          className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-[#fcfcfc] text-sm focus:outline-none focus:ring-2 focus:ring-[#54be96]/20 transition-all"
        />

        <textarea
          placeholder="Comment"
          rows={4}
          className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-[#fcfcfc] text-sm focus:outline-none focus:ring-2 focus:ring-[#54be96]/20 transition-all"
        />

        <button
          type="submit"
          className="w-full bg-emerald-500 text-white py-3 rounded-full font-medium hover:bg-emerald-600 transition"
        >
          Send
        </button>
      </form>
    </BaseModal>
  );
};

export default AppointmentModal;
