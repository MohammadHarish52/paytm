const InputBox = ({ label, value, onChange, placeholder }) => {
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
        value={value}
        onChange={onChange}
        required
        placeholder={placeholder}
      />{" "}
    </div>
  );
};

export default InputBox;
