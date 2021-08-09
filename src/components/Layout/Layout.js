import { Provider } from "react-redux";
import store from "../../redux/store";
import MainNavigation from "./MainNavigation";

const Layout = (props) => {
  return (
    <Provider store={store}>
      <MainNavigation />
      <main>{props.children}</main>
    </Provider>
  );
};

export default Layout;
