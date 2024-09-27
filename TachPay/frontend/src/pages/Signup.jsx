import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Heading from "../Components/Heading";
import InputBox from "../Components/InputBox";
import BottomWarning from "../Components/BottomWarning";

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
          <InputBox
            label="Username"
            value={username}
            setValue={setUsername}
            placeholder="john@gmail.com"
          />{" "}
          <InputBox
            label="Firstname"
            value={firstname}
            setValue={setFirstname}
            placeholder="john"
          />{" "}
          <InputBox
            label="Lastname"
            value={lastname}
            placeholder="Doe"
            setValue={setLastname}
          />{" "}
          <InputBox
            label="Password"
            value={password}
            setValue={setPassword}
            placeholder="12345"
          />
          <button
            className="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <BottomWarning
          label="Already  have an Accout?"
          to="signin"
          toText="Sign in"
        />
      </div>
    </div>
  );
};

export default Signup;
