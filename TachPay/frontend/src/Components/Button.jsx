const Button = ({ label, onClick }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
        type="submit"
      >
        {label}
      </button>
    </div>
  );
};

export default Button;
