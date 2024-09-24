import { useState } from "react";
import Heading from "./Heading";
import { useNavigate } from "react-router-dom";
import InputBox from "./InputBox";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log("submit");
  };

  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <Heading label="Sign in" />
        <form onSubmit={handleSubmit}>
          {" "}
          <InputBox
            label="Username"
            value={username}
            setValue={setUsername}
          />{" "}
          <InputBox label="Password" value={password} setValue={setPassword} />
          <button
            className="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Dont have an account?{" "}
          <a href="/signup" className="text-black font-semibold">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signin;
