import { db } from "./firebase";

// User API

export const doCreateUser = (id, username, email, phase) =>
  db.ref(`users/${id}`).set({
    username,
    email,
    phase
  });

export const onceGetUsers = () => db.ref("users").once("value");

// Other Entity APIs ...
