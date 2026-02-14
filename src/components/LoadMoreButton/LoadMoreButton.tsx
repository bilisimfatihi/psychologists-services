interface Props {
  loading: boolean;
  hasMore: boolean;
  onClick: () => void;
}

const LoadMoreButton = ({ loading, hasMore, onClick }: Props) => {
  if (!hasMore) return null;

  return (
    <div className="flex justify-center mt-10">
      <button
        onClick={onClick}
        disabled={loading}
        className="px-6 py-3 bg-[#54be96] text-white rounded-xl font-bold disabled:opacity-50"
      >
        {loading ? "Loading..." : "Load more"}
      </button>
    </div>
  );
};

export default LoadMoreButton;
