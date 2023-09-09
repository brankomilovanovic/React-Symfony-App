import MainContent from "./Base/MainContent";
import { getRoutes } from "./route";
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";
import store from "./store";
import AuthWrapper from "./Base/AuthWrapper";
import LoaderWrapper from "./Base/Layout/LoaderWrapper";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <LoaderWrapper>
          <AuthWrapper>
            <MainContent>
              {getRoutes()}
            </MainContent>
          </AuthWrapper>
        </LoaderWrapper>
      </Router>
    </Provider>
  );
};

export default App;
