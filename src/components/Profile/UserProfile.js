import ProfileForm from "./ProfileForm";
import classes from "./UserProfile.module.css";
import React from "react";
const UserProfile = () => {
  return (
    <section className={classes.profile}>
      <ProfileForm />
    </section>
  );
};

export default UserProfile;
