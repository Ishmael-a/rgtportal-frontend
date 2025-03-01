

const Header = () => {
  return (
    <header className="flex justify-between items-center bg-white p-4 shadow-md">
      <div>
        <h1 className="text-lg font-semibold">Hello, Adjoa!</h1>
        <p className="text-sm text-gray-500">This is your HR Dashboard so far</p>
      </div>
      <input
        type="text"
        placeholder="Search"
        className="border rounded-lg px-3 py-2 w-64"
      />
    </header>
  );
};

  
  export default Header