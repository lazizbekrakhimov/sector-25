import { useContext } from "react";
import { AuthRoute, DashboardRoute } from "./routes";
import { Context } from "./context/Context";

const App = () => {
  const { token } = useContext(Context)
  return token ? <><div className="crt-flash" /><DashboardRoute /></> : <><div className="crt-flash" /> <AuthRoute /></>
}

export default App