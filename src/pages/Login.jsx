import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo_white.png";
import Button from "../components/Button";
import Input from "../components/Input";
import { userObject } from "../context/AuthContext";
import { useAuth } from "../hooks/useAuth";
import styles from "../styles/pages/Login.module.css";
import validateField from "../utils/validateField";
import { phone as maskPhone } from "../utils/masks";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { signInUser, registerUser, isLoggedIn, handleForgotUser } = useAuth();

  const [isLogin, setIsLogin] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  function handleNavigate() {
    navigate(isLogin ? "/cadastrar" : "/entrar");
    setIsLogin(!isLogin);
  }

  function validate() {
    if (validateField(email, "email")) return true;
    if (validateField(password, "senha")) return true;
    if (validateField(passwordConfirmation, "confirmação de senha"))
      return true;
    if (password !== passwordConfirmation) {
      setError(
        "Senhas digitadas não coincidem. Verifique os campos e tente novamente."
      );
      return true;
    }
    if (validateField(phone, "celular")) return true;
  }

  async function handleOnSubmit() {
    if (isLogin) {
      const isLogged = await signInUser(email, password);
      if (isLogged.status) {
        navigate("/painel");
      } else {
        setError(isLogged.message);
      }
    } else {
      if (validate()) return;

      const data = {
        email,
        password,
        user: {
          ...userObject,
          name,
          email,
          phone,
        },
      };
      if (await registerUser(data)) navigate("/painel");
    }
  }

  useEffect(() => {
    setIsLogin(location.pathname.includes("entrar"));
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/painel");
    } else {
      navigate("/entrar");
    }
    // eslint-disable-next-line
  }, [isLoggedIn]);

  return (
    <div className={styles.container}>
      <div className={styles.loginFormContainer}>
        <a href="/">
          <img src={logo} alt="" width="270" />
        </a>
        <h1>Bem vindo novamente</h1>
        <p>Entre para continuar usando o sistema</p>
        <form className={styles.loginForm}>
          {isLogin ? (
            <>
              {error !== "" && <div className={styles.error}>{error}</div>}
              <Input
                id="email"
                type="text"
                label="Email"
                placeholder=""
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <Input
                id="password"
                type="password"
                label="Senha"
                placeholder=""
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              <Button
                type="button"
                transparent
                onClick={() => handleForgotUser(email)}
              >
                Esqueceu sua senha?
              </Button>

              <Button type="button" onClick={handleOnSubmit}>
                Entrar
              </Button>

              <Button type="button" transparent onClick={handleNavigate}>
                Não é cadastrado? Faça seu cadastro agora!
              </Button>
            </>
          ) : (
            <>
              {error !== "" && <div className={styles.error}>{error}</div>}
              <Input
                id="name"
                type="text"
                label="Nome Completo"
                placeholder=""
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <Input
                id="email"
                type="text"
                label="Email"
                placeholder=""
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <Input
                id="password"
                type="password"
                label="Senha"
                placeholder=""
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              <Input
                id="password-confirmation"
                type="password"
                label="Confirme sua senha"
                placeholder=""
                value={passwordConfirmation}
                onChange={(e) => {
                  setPasswordConfirmation(e.target.value);
                }}
              />
              <Input
                id="phone"
                type="text"
                label="Celular"
                placeholder=""
                value={phone}
                onChange={(e) => {
                  setPhone(maskPhone(e.target.value));
                }}
              />

              <Button type="button" onClick={handleOnSubmit}>
                Entrar
              </Button>

              <Button type="button" transparent onClick={handleNavigate}>
                Ja é cadastrado? Então entre no sistema!
              </Button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
