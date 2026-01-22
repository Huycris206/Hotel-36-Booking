const Input = ({ label, type = "text", value = "", onChange, ...props }) => {
  return (
    <div className="space-y-1">
      {label && <label className="text-sm font-medium">{label}</label>}
      <input
        type={type}
        value={value ?? ""}
        onChange={onChange}
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
        {...props}
      />
    </div>
  );
};

export default Input;