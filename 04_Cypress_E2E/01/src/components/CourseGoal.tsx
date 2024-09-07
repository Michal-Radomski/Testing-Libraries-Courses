import React from "react";

import classes from "./CourseGoal.module.scss";

function CourseGoal({ icon, text }: { icon: React.ReactNode; text: string }): JSX.Element {
  return (
    <React.Fragment>
      <li className={classes.goal}>
        <span className={classes.icon}>{icon}</span>
        <span>{text}</span>
      </li>
    </React.Fragment>
  );
}

export default CourseGoal;
