import { Link } from "react-router-dom";

const BottomWarning = ({ label, to, toText }) => {
  return (
    <div>
      <p className="mt-4 text-center text-sm">
        {label}
        <Link to={`/${to}`} className="text-black font-semibold">
          {toText}
        </Link>
      </p>
    </div>
  );
};

export default BottomWarning;
