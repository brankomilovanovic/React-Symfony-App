import { Fragment } from "react";
import Header from "./Layout/HeaderLayout";

const MainContent = (props) => {
  return (
    <Fragment>
      <Header />
      <div className="content-container">
        {props.children}
      </div>
    </Fragment>
  );
};

export default MainContent;
