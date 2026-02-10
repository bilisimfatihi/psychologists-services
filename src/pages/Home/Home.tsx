import { useNavigate } from "react-router-dom";
import { ArrowUpRight, Users, MessageCircle, Check } from "lucide-react";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-12 flex flex-col items-center">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-12">
        {/* Text Content */}
        <div className="space-y-8">
          <h1 className="text-6xl md:text-[85px] font-bold leading-[1.05] text-[#111] tracking-tight">
            The road to the{" "}
            <span className="text-[#54be96] italic font-normal">depths</span> of
            the human soul
          </h1>
          <p className="text-xl text-gray-500 max-w-lg leading-relaxed font-medium">
            We help you to reveal your potential, overcome challenges and find a
            guide in your own life with the help of our experienced
            psychologists.
          </p>
          <button
            onClick={() => navigate("/psychologists")}
            className="cursor-pointer group flex items-center space-x-3 bg-[#54be96] text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-[#45a884] transition-all shadow-2xl shadow-[#54be96]/20 active:scale-95"
          >
            <span>Get started</span>
            <ArrowUpRight
              size={24}
              className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </button>
        </div>

        {/* Image / Graphics Section */}
        <div className="relative">
          <div className="relative z-10 rounded-[3.5rem] overflow-hidden shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-700">
            <img
              src="./images/hero-image.png"
              alt="Psychologist session"
              className="w-full h-150 object-cover grayscale-[0.2]"
            />
          </div>

          {/* Floating Elements */}
          <div className="absolute -top-8 -right-8 w-20 h-20 bg-[#f7d060] rounded-4xl flex items-center justify-center text-white shadow-xl z-20 animate-bounce">
            <Users size={32} />
          </div>
          <div className="absolute top-1/2 -left-10 w-16 h-16 bg-[#5e548e] rounded-2xl flex items-center justify-center text-white shadow-xl z-20 -rotate-12">
            <MessageCircle size={28} />
          </div>
          <div className="absolute bottom-16 -left-20 bg-[#54be96] p-7 rounded-[2.5rem] shadow-2xl z-20 flex items-center space-x-5 border-[6px] border-white">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-white">
              <Check size={32} strokeWidth={3} />
            </div>
            <div>
              <p className="text-white/80 text-sm font-semibold mb-0.5">
                Experienced psychologists
              </p>
              <p className="text-white text-3xl font-extrabold tracking-tight leading-none">
                15,000
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
