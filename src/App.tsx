import { AuthRoute, DashboardRoute } from "./routes";

const App = () => {
  const token = false;
  return token ? <DashboardRoute /> : <><div className="crt-flash" /> <AuthRoute /></>
}

export default App