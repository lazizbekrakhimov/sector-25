import { useContext } from "react";
import { AuthRoute, DashboardRoute } from "./routes";
import { Context } from "./context/Context";

const App = () => {
  const { token } = useContext(Context)
  return token ? <DashboardRoute /> : <><div className="crt-flash" /> <AuthRoute /></>
}

export default App