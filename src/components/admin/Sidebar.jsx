import { FaBell, FaTachometerAlt } from "react-icons/fa";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/icon.png";
import { useAuth } from "../../hooks/useAuth";
import styles from "../../styles/components/admin/Sidebar.module.css";
import Avatar from "./Avatar";

function Sidebar() {
  const location = useLocation();
  const { user, isLoggedIn } = useAuth();

  if (!user || !isLoggedIn)
    return (
      <aside className={styles.container}>
        <p>...</p>
      </aside>
    );

  return (
    <aside className={styles.container}>
      <Link to="/painel">
        <img
          src={logo}
          alt="Find Workers painel"
          className={styles.sidebarLogo}
        />
      </Link>
      <div className={styles.menu}>
        <NavLink
          to="/painel"
          className={
            location.pathname === "/painel"
              ? styles.activedDiv
              : styles.link
          }
        >
          <FaTachometerAlt size={22} />
        </NavLink>        
      </div>
      <div className={styles.menu}>
        <Link to="/perfil" title={user.name}>
          <Avatar uri={user.avatar} alt={user.name} avatarName={user.name}/>
        </Link>
      </div>
    </aside>
  );
}

export default Sidebar;
