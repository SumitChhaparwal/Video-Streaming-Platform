import { Outlet } from "react-router-dom";
import "../view/App.css";
import Header from "./components/Header";
import MainBody from "./components/MainBody";
import appStore from "./utilities/appStore";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={appStore}>
      <Header />
      <Outlet />
    </Provider>
  );
}

export default App;
