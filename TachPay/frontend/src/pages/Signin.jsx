import { useState } from "react";
import Heading from "../Components/Heading";
import { useNavigate } from "react-router-dom";
import InputBox from "../Components/InputBox";
import axios from "axios";
import BottomWarning from "../Components/BottomWarning";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    ///
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
            Sign In
          </button>
        </form>
        <BottomWarning
          label="Don't have an Accout?"
          to="signup"
          toText="Sign up"
        />
      </div>
    </div>
  );
};

export default Signin;
