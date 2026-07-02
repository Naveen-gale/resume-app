const SkeletonLoader = ({ className = '', count = 1 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`
            relative overflow-hidden rounded-2xl bg-slate-100
            ${className}
          `}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" />
        </div>
      ))}
    </div>
  );
};

export const SkeletonCard = () => (
  <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-4">
    <div className="flex items-center gap-3">
      <div className="relative overflow-hidden w-10 h-10 rounded-full bg-slate-100">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" />
      </div>
      <div className="space-y-2 flex-1">
        <div className="relative overflow-hidden h-4 w-32 rounded bg-slate-100">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" />
        </div>
        <div className="relative overflow-hidden h-3 w-24 rounded bg-slate-100">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" />
        </div>
      </div>
    </div>
    <div className="space-y-2">
      <div className="relative overflow-hidden h-3 w-full rounded bg-slate-100">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" />
      </div>
      <div className="relative overflow-hidden h-3 w-4/5 rounded bg-slate-100">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" />
      </div>
    </div>
  </div>
);

export default SkeletonLoader;
