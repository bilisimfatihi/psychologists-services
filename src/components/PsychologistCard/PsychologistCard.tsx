import { useState } from "react";
import { Heart, Star } from "lucide-react";
import type { Psychologist } from "../../types/types";

type Props = {
  psychologist: Psychologist;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
};

const PsychologistCard = ({
  psychologist,
  isFavorite,
  onToggleFavorite,
}: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6 transition-all hover:shadow-md">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Avatar Section */}
        <div className="relative shrink-0">
          <div className="w-32 h-32 rounded-3xl border-2 border-[#54be96]/20 p-1">
            <img
              src={psychologist.avatarUrl}
              alt={psychologist.name}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <div className="absolute top-2 right-2 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
        </div>

        {/* Info Section */}
        <div className="flex-1">
          <div className="flex flex-wrap justify-between items-start mb-2">
            <div>
              <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">
                {psychologist.license}
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {psychologist.name}
              </h3>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-1">
                <Star fill="#FFC531" size={16} color="#FFC531" />
                <span className="font-semibold">
                  Rating: {psychologist.rating}
                </span>
              </div>
              <div className="h-4 w-px bg-gray-200 hidden sm:block"></div>
              <div className="flex items-center">
                <span className="text-gray-400">Price / 1 hour: </span>
                <span className="ml-1 text-[#54be96] font-bold">
                  {psychologist.pricePerHour}$
                </span>
              </div>
              <button
                onClick={() => onToggleFavorite?.(psychologist.id)}
                className="text-green-500"
              >
                <Heart fill={isFavorite ? "currentColor" : "none"} />
              </button>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 my-4">
            <span className="px-4 py-1.5 bg-gray-50 rounded-full text-xs font-medium text-gray-500">
              Experience:{" "}
              <span className="text-gray-900">
                {psychologist.experience} years
              </span>
            </span>
            <span className="px-4 py-1.5 bg-gray-50 rounded-full text-xs font-medium text-gray-500">
              License:{" "}
              <span className="text-gray-900">{psychologist.license}</span>
            </span>
            <span className="px-4 py-1.5 bg-gray-50 rounded-full text-xs font-medium text-gray-500">
              Specialization:{" "}
              <span className="text-gray-900">
                {psychologist.specialization}
              </span>
            </span>
            <span className="px-4 py-1.5 bg-gray-50 rounded-full text-xs font-medium text-gray-500">
              Initial_consultation:{" "}
              <span className="text-gray-900">
                {psychologist.initialConsultation}
              </span>
            </span>
          </div>

          <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4">
            {psychologist.about}
          </p>

          {!isExpanded && (
            <button
              onClick={() => setIsExpanded(true)}
              className="text-gray-900 font-semibold text-sm underline underline-offset-4 hover:text-[#54be96] transition-colors"
            >
              Read more
            </button>
          )}

          {isExpanded && (
            <div className="mt-8 pt-8 border-t border-gray-100 space-y-8 animate-in fade-in slide-in-from-top-4 duration-300">
              {/* Reviews Section */}
              <div className="space-y-6">
                {psychologist.reviews.map((review) => (
                  <div className="space-y-2">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-[#54be96] font-bold">
                        {review.reviewer.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-sm">{review.reviewer}</h4>
                        <div className="flex items-center text-xs space-x-1">
                          <Star fill="#FFC531" size={16} color="#FFC531" />
                          <span className="font-semibold">{review.rating}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm">{review.comment}</p>
                  </div>
                ))}
                {psychologist.reviews.length === 0 && (
                  <p className="text-gray-400 text-sm italic">
                    No reviews yet.
                  </p>
                )}
              </div>

              {/* Action Button */}
              <div className="flex justify-start">
                <button className="bg-[#54be96] text-white px-8 py-3.5 rounded-full font-semibold hover:bg-[#45a884] transition-colors shadow-lg shadow-[#54be96]/20">
                  Make an appointment
                </button>
              </div>

              <button
                onClick={() => setIsExpanded(false)}
                className="text-gray-900 font-semibold text-sm underline underline-offset-4 hover:text-[#54be96] transition-colors"
              >
                Show less
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PsychologistCard;
