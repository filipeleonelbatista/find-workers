import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Workers from "./pages/Workers";

function Routes() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact element={<Home />} />
          <Route path="/entrar" element={<Login />} />
          <Route path="/cadastrar" element={<Login />} />
          <Route path="/painel" element={<Dashboard />} />
          <Route path="/trabalhadores/" element={<Workers />} />
          <Route path="/trabalhadores/:id" element={<Workers />} />
          <Route path="/perfil" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Switch>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default Routes;
