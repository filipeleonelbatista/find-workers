import { useEffect, useState } from "react";
import { FaBars, FaDog, FaSignInAlt, FaUserMd } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoImg from "../assets/logo.png";
import styles from "../styles/components/HomeNavigation.module.css";

export default function HomeNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isShow, setIsShow] = useState(false);

  const handleIsShowMenu = () => {
    setIsShow(!isShow);
  };

  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`${styles.header} ${
        offset > 100 ? styles.headerFloating : ""
      }`}
    >
      <img
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
        className={styles.navImage}
        src={logoImg}
        alt=""
      />
      <div className={styles.container}>
        <div className={styles.navItems}>
          <Link
            to="/"
            className={
              location.pathname === "/" ? styles.navItemActive : styles.navItem
            }
          >
            Inicio
          </Link>
          <Link
            to="/trabalhadores"
            className={
              location.pathname.includes("veterinario")
                ? styles.navItemActive
                : styles.navItem
            }
          >
            Ver Trabalhadores
          </Link>
          <Link to="/entrar" className={styles.navItemDestaque}>
            <FaSignInAlt />
            Entrar
          </Link>
        </div>

        <button className={styles.roundedButton} onClick={handleIsShowMenu}>
          <FaBars size={18} />
        </button>
        {isShow && (
          <div className={styles.menuItems}>
            <Link to="/" className={styles.menuItem}>
              <FaDog /> Inicio
            </Link>
            <Link to="/trabalhadores" className={styles.menuItem}>
              <FaUserMd /> Ver Trabalhadores
            </Link>
            <Link to="/entrar" className={styles.menuItem}>
              <FaSignInAlt />
              Entrar
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
