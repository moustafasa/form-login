import { redirect } from "react-router-dom";

export const signOutAction = (logOut) => async () => {
  try {
    await logOut();
  } catch (err) {
    console.log(err);
  }
  return redirect("/");
};
