import MainContent from "./Components/MainContent";
import { getRoutes } from "./route";
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <MainContent>{getRoutes()}</MainContent>
      </Router>
    </Provider>
  );
};

export default App;
