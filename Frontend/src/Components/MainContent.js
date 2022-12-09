import { Fragment } from "react";
import Header from "./Layout/HeaderLayout";
import MainLayout from "./Layout/MainLayout";

const MainContent = (props) => {
  return (
    <Fragment>
      <Header />
      <MainLayout props={props} />
    </Fragment>
  );
};

export default MainContent;
