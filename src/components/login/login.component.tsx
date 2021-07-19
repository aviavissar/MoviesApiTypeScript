import { useRef, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import styles from "./login.module.scss";
import { useStore } from "../../store/App.store";
import history from "../../services/history";
import { IMovieCard } from "../movieCard/movieCard.component";
import { getLocalStorage, setLocalStorage } from "../../services/storage";

export interface ILoginProps {
  loginMsg?: string;
}

const Login: React.FC<ILoginProps> = ({
  loginMsg = "please login by filling your name",
}: ILoginProps) => {
  const { setUserProfile, setFavorites } = useStore();
  const usernameRef = useRef<any>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const doLogin = () => {
    if (usernameRef.current.value.length < 2) {
      setErrorMsg("your name must be at least 2 characters");
      return;
    }
    if (usernameRef.current.value !== "") {
      const userLocalStorage = getLocalStorage(
        `moviesApp-${usernameRef.current.value}`
      );
      console.log("userLocalStorage");
      let user = {
        name: usernameRef.current.value,
        isConnected: true,
        favorites: [] as IMovieCard[],
      };
      if (userLocalStorage !== null) {
        user = userLocalStorage;
      }

      setLocalStorage(`moviesApp-${usernameRef.current.value}`, user);
      setLocalStorage(`moviesApp-connectedProfile`, user);
      setUserProfile(user);
      setFavorites(user.favorites);
      history.push("/home");
    } else {
      setErrorMsg("you must put your name");
    }
  };

  const handleEnter = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      doLogin();
    }
  };

  return (
    <div className="login">
      <form className={styles.loginForm} noValidate autoComplete="off">
        <section>
          <div className={styles.loginMsg}>
            <h2>{loginMsg}</h2>
            <h4>{errorMsg}</h4>
          </div>
        </section>
        <section>
          <TextField
            id="outlined-basic"
            label="your name"
            variant="outlined"
            inputRef={usernameRef}
            onKeyDown={handleEnter}
          />
          <Button variant="contained" color="primary" onClick={doLogin}>
            login
          </Button>
        </section>
      </form>
    </div>
  );
};

export default Login;
