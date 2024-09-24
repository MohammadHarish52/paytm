import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Heading from "./Heading";
import InputBox from "./InputBox";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log("submit");
  };
  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <Heading label="Sign up" />
        <form onSubmit={handleSubmit}>
          <InputBox label="Username" value={username} setValue={setUsername} />{" "}
          <InputBox
            label="Firstname"
            value={firstname}
            setValue={setFirstname}
          />{" "}
          <InputBox label="Lastname" value={lastname} setValue={setLastname} />{" "}
          <InputBox label="Password" value={password} setValue={setPassword} />
          <button
            className="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <a href="/signin" className="text-black font-semibold">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
