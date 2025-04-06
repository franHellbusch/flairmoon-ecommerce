import { Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import RoutesNotFound from "./components/RoutesNotFound/RoutesNotFound";
import Home from "./pages/Home/Home";
import { PublicRoutes } from "./types/routes";
import { DrawerProvider } from "./context/ModalContext/drawerProvider";

function App() {
  return (
    <DrawerProvider>
      <Navbar />
      <RoutesNotFound>
        <Route path={PublicRoutes.HOME} element={<Home />} />
      </RoutesNotFound>
    </DrawerProvider>
  );
}

export default App;
