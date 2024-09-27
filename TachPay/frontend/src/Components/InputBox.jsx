const InputBox = ({ label, value, setValue, placeholder }) => {
  return (
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        type="text"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
        placeholder={placeholder}
      />{" "}
    </div>
  );
};

export default InputBox;
