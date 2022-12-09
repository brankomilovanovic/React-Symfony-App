import MainContent from "./Components/MainContent";
import { getRoutes } from "./route";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <MainContent>{getRoutes()}</MainContent>
    </Router>
  );
};

export default App;
