import { seedPsychologists } from "../../scripts/seedPsychologists";

const Home = () => {
  return (
    <div className="p-4">
      <button
        onClick={seedPsychologists}
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        Seed Psychologists (DEV)
      </button>
    </div>
  );
};

export default Home;
