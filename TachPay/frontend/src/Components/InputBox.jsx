const InputBox = ({ label, value, onChange, setValue, placeholder }) => {
  // If caller passed `setValue` instead of `onChange`, create a handler.
  const handleChange = (e) => {
    if (typeof onChange === "function") return onChange(e);
    if (typeof setValue === "function") return setValue(e.target.value);
  };

  // Provide an empty string as value when a controlled value is expected but undefined
  const inputValue = value === undefined ? undefined : value;

  return (
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700 mb-1 text-left"
      >
        {label}
      </label>
      <input
        type="text"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        value={inputValue}
        onChange={handleChange}
        required
        placeholder={placeholder}
      />{" "}
    </div>
  );
};

export default InputBox;
