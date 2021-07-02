import { useRef, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import styles from "./login.module.scss";
import { useStore } from "../../store/App.store";
import history from "../../services/history";

export interface ILoginProps {
  loginMsg?: string;
}

const Login: React.FC<ILoginProps> = ({
  loginMsg = "please login by filling your name",
}: ILoginProps) => {
  const { setUserProfile } = useStore();
  const usernameRef = useRef<any>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const doLogin = () => {
    if (usernameRef.current.value !== "") {
      setUserProfile({ name: usernameRef.current.value, isConnected: true });
      history.push("/home");
    }
    if (usernameRef.current.value.length < 2) {
      setErrorMsg("your name must be at least 2 characters");
    } else {
      setErrorMsg("you must put your name");
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
