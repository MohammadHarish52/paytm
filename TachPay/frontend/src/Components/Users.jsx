import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/user/bulk?filter=" + filter)
      .then((res) => {
        console.log(res.data.user); // Log the response
        setUsers(res.data.user); // Set the users state
      });
  }, [filter]);

  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          type="text"
          placeholder="Search Users.."
          className="w-full px-2 py-1 rounded border-slate-200"
        />
      </div>
      <div>
        {users.map((user) => (
          <User key={user._id} user={user} />
        ))}
      </div>
    </>
  );
};

function User({ user }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-full">
          <div>
            {user.firstName}
            {user.lastName}
          </div>
        </div>
      </div>
      <div className="flexflex-col justify-center h-full">
        <button
          className="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
          onClick={() => {
            navigate(`/send/?id=${user._id}&name=${user.firstName}`);
          }}
        >
          Send Money
        </button>
      </div>
    </div>
  );
}

export default Users;
