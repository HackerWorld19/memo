import classes from "./StartingPageContent.module.css";
import React from "react";

const StartingPageContent = () => {
  return (
    <section className={classes.starting}>
      <h1>Welcome to MemoRizer</h1>
      <h3>Store your Memo here</h3>
    </section>
  );
};

export default StartingPageContent;
