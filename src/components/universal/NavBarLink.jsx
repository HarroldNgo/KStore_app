import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import generateRandomAlphanumeric from "../../CartCode";
import { BASE_URL } from '../../api'


const NavBarLink = ({ setNumCartItems }) => {
  const { isAuthenticated, setIsAuthenticated, username, superuser } = useContext(AuthContext);


  function logout() {
    localStorage.removeItem("access")
    setIsAuthenticated(false)
    localStorage.setItem("cart_code", generateRandomAlphanumeric())
    setNumCartItems(0)

  }

  return (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      {isAuthenticated ? (
        <>
          <li className="nav-item">
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? "nav-link active fw-semibold"
                  : "nav-link fw-semibold"
              }
              end
            >
              {`Hi ${username}`}
            </NavLink>
          </li>

          <li className="nav-item" onClick={logout}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "nav-link active fw-semibold"
                  : "nav-link fw-semibold"
              }
              end
            >
              Logout
            </NavLink>
          </li>
          {superuser &&
            <li className="nav-item" onClick={logout}>
              <a
              className="nav-link fw-semibold"
              href={`${BASE_URL}/admin`}
              >
                Admin
              </a>
            </li>}
        </>
      ) : (
        <>
          <li className="nav-item">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "nav-link active fw-semibold"
                  : "nav-link fw-semibold"
              }
              end
            >
              Login
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive
                  ? "nav-link active fw-semibold"
                  : "nav-link fw-semibold"
              }
              end
            >
              Register
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );
};

export default NavBarLink;
