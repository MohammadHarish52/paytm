const Balance = ({ value }) => {
  return (
    <div className="flex">
      <div className="font-bold">Your Balance</div>
      <div className="ml-2 font-bold">Rs {value}</div>
    </div>
  );
};

export default Balance;
