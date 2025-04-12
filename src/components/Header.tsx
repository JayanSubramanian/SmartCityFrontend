import { NavLink } from "react-router-dom"

function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md rounded-full mb-[2rem]">
      <div className="container mx-auto px-4">
        <nav className="py-4">
          <ul className="flex flex-row justify-center space-x-2 md:space-x-8">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md transition-all duration-200 inline-block ${
                    isActive ? "bg-white/20 font-medium shadow-sm" : "hover:bg-white/10"
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/chat"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md transition-all duration-200 inline-block ${
                    isActive ? "bg-white/20 font-medium shadow-sm" : "hover:bg-white/10"
                  }`
                }
              >
                Waste Classification
              </NavLink>
            </li>
            {<li>
              <NavLink
                to="/tumor"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md transition-all duration-200 inline-block ${
                    isActive ? "bg-white/20 font-medium shadow-sm" : "hover:bg-white/10"
                  }`
                }
              >
                Biomedical Imaging
              </NavLink>
            </li>}
            {<li>
              <NavLink
                to="/pipeline"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md transition-all duration-200 inline-block ${
                    isActive ? "bg-white/20 font-medium shadow-sm" : "hover:bg-white/10"
                  }`
                }
              >
                Pipeline Crack Detection
              </NavLink>
            </li>}
            {<li>
              <NavLink
                to="/nutribot"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md transition-all duration-200 inline-block ${
                    isActive ? "bg-white/20 font-medium shadow-sm" : "hover:bg-white/10"
                  }`
                }
              >
                NutriBot
              </NavLink>
            </li>}
            {<li>
              <NavLink
                to="/foodcorrection"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md transition-all duration-200 inline-block ${
                    isActive ? "bg-white/20 font-medium shadow-sm" : "hover:bg-white/10"
                  }`
                }
              >
                Food Name Correction
              </NavLink>
            </li>}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header

