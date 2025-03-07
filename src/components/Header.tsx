import { NavLink } from "react-router-dom";

function Header() {
  return (
    <nav className="text-3xl">
      <ul className="flex flex-row justify-center space-x-[2rem] mt-[1rem] mb-[2rem]">
        <li className="hover:underline">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="hover:underline">
          <NavLink to="/chat">Chat</NavLink>
        </li>
        <li className="hover:underline">
          <NavLink to="/tumor">Tumor</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Header;