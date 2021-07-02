import { useStore } from "../../store/App.store";
import { Link } from "react-router-dom";
import styles from "./header.module.scss";
import history from "../../services/history";

const Header: React.FC = () => {
  const { userProfile, setUserProfile } = useStore();

  const doLogout = () => {
    setUserProfile({ name: "", isConnected: false });
    history.push("/");
  };

  return (
    <header className={styles.header}>
      <div className={styles.username}>
        <h4>{`hi ${userProfile.name}`}</h4>
        <button className={styles.logout} onClick={doLogout}>
          logout
        </button>
      </div>
      <menu className={styles.menu}>
        <Link className={styles.menuItem} to={"/home"}>
          <h4>Home</h4>
        </Link>
        <Link className={styles.menuItem} to={"/favorites"}>
          <h4>Favorites</h4>
        </Link>
      </menu>
    </header>
  );
};

export default Header;
