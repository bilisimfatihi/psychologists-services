import { useEffect, useState } from "react";
import { getPsychologists } from "../../firebase/psychologists";
import type { Psychologist } from "../../types/types";
import PsychologistList from "../../components/PsychologistList/PsychologistList";

const Psychologists = () => {
  const [psychologists, setPsychologists] = useState<Psychologist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPsychologists = async () => {
      try {
        const data = await getPsychologists();
        setPsychologists(data);
      } catch (err) {
        setError(
          "Psikologlar yüklenemedi" +
            (err instanceof Error ? `: ${err.message}` : ""),
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPsychologists();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Yükleniyor...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PsychologistList psychologists={psychologists} />
    </div>
  );
};

export default Psychologists;
