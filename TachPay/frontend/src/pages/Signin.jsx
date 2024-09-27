import { useState } from "react";
import { useNavigate } from "react-router-dom";

import BottomWarning from "../Components/BottomWarning";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import axios from "axios";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:8000/api/v1/signin",
      {
        username,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    localStorage.setItem("token", response.data.token);
    navigate("/dashboard");
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
          label={"Already have an account?"}
          buttonText={"Sign up"}
          to={"/signup"}
        />
      </div>
    </div>
  );
};

export default Signin;
