const Textarea = ({
  label,
  error,
  id,
  maxLength,
  value = '',
  className = '',
  rows = 5,
  ...props
}) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-slate-700"
        >
          {label}
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        value={value}
        maxLength={maxLength}
        className={`
          w-full px-4 py-3 text-sm rounded-xl border bg-white resize-y
          transition-all duration-200
          placeholder:text-slate-400
          focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500
          ${error
            ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500'
            : 'border-slate-200 hover:border-slate-300'
          }
        `}
        {...props}
      />
      <div className="flex justify-between items-center">
        {error && <p className="text-xs text-red-500">{error}</p>}
        {maxLength && (
          <p className="text-xs text-slate-400 ml-auto">
            {value.length}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
};

export default Textarea;
