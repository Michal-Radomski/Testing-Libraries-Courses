import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function RootRoute(): JSX.Element {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default RootRoute;
