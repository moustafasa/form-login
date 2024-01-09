import { useEffect, useRef, useState } from "react";
import {
  Form,
  Navigate,
  redirect,
  useActionData,
  useFetcher,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { BiSolidError } from "react-icons/bi";
import useAuth from "../../hooks/useAuth";

export const loginAction =
  (logIn) =>
  async ({ request }) => {
    let formData = await request.formData();
    let username = formData.get("username");
    let password = formData.get("password");
    try {
      await logIn(username, password);
      return { isSuccess: true };
    } catch (error) {
      return { error };
    }
  };

export const loginLoader =
  (auth) =>
  async ({ request }) => {
    if (auth.token) {
      return redirect("/");
    }
    return null;
  };

const LogIn = () => {
  const [username, setUsername] = useState("");
  const userRef = useRef();

  const [password, setPassword] = useState("");

  const [serverErr, setServerErr] = useState(null);

  const [params] = useSearchParams();
  const from = params.get("from") || "/";
  const navigator = useNavigate();
  const actionRes = useActionData();
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem("persist")) || false
  );
  // const fetcher = useFetcher();

  const { auth } = useAuth();
  console.log(auth);

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  useEffect(() => {
    if (actionRes?.isSuccess) {
      navigator(from, { replace: true });
    } else {
      if (actionRes?.error) {
        if (!actionRes.error?.response) {
          setServerErr("no server response");
        } else if (actionRes.error?.response?.status === 404) {
          setServerErr("the username isn't registered");
        } else if (actionRes.error?.response?.status === 401) {
          setServerErr("wrong password");
        } else {
          setServerErr("login failed");
        }
      }
    }
  }, [actionRes, from, navigator]);
  console.log(persist);

  return (
    <section>
      <div className="container">
        <Form
          // onSubmit={submitHandler}
          method="post"
          replace
        >
          {serverErr && (
            <div className="alert alert-danger text-capitalize d-flex gap-2 align-items-center">
              <BiSolidError /> {serverErr}
            </div>
          )}
          <h2 className=" text-center text-capitalize">log in</h2>
          <div className="mb-3">
            <input type="hidden" name="dest" value={from} />
            <label className="form-label text-capitalize">User Name</label>
            <input
              type="text"
              name="username"
              className={"form-control bg-info-subtle "}
              onChange={(e) => setUsername(e.target.value)}
              ref={userRef}
              required
              autoComplete="off"
            />
          </div>
          <div className="mb-4">
            <label className="form-label text-capitalize">Password</label>
            <input
              type="password"
              name="password"
              className={"form-control bg-info-subtle "}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              autoComplete="off"
            />
          </div>

          <button
            className="btn btn-primary text-capitalize d-block mx-auto  "
            // disabled={!username || !password}
          >
            log in
          </button>

          <div className="mt-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="persist"
              onChange={() => setPersist((prev) => !prev)}
              checked={persist}
            />{" "}
            <label
              htmlFor="persist"
              className="form-check-label text-capitalize"
            >
              remember this device
            </label>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default LogIn;
