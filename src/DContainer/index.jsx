import React from "react";
import "./index.css";

const DContainer = (props) => {
  return (
    <>
      {props.header}
      <div className='d-container'>{props.children}</div>
      {props.footer}
    </>
  );
};

export default DContainer;
