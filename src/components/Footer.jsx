import logoImg from "../assets/logo_white.png";
import styles from "../styles/components/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerLinks}>
        <img src={logoImg} alt="CadastraPet" />
        <p>&copy; {new Date(Date.now()).getFullYear()} - FindWorkers</p>
        <p>Todos os direitos reservados</p>
      </div>
      {/* <div className={styles.socialNetworks}>
        <a href="https://instagram.com/cadastra.pet">
          <FaInstagram />
        </a>
      </div> */}
    </footer>
  );
}
