import { useEffect, useRef, useState } from "react";
import { Form, Link } from "react-router-dom";
import { FaCircleInfo } from "react-icons/fa6";
import sass from "./register.module.scss";
import classNames from "classnames";
import axios from "../../api/axios";
import { BiSolidError } from "react-icons/bi";

const NAME_RGX = /^[A-z]{4,23}$/;
const PASS_RGX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const [username, setUsername] = useState("");
  const [userFocus, setUserFocus] = useState(false);
  const [userValid, setUserValid] = useState(false);
  const userRef = useRef();

  const [password, setPassword] = useState("");
  const [passFocus, setPassFocus] = useState(false);
  const [passValid, setPassValid] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [passConfirmFocus, setPassConfirmFocus] = useState(false);
  const [passConfirmValid, setPassConfirmValid] = useState(false);

  const [serverErr, setServerErr] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setUserValid(NAME_RGX.test(username));
  }, [username]);

  useEffect(() => {
    console.log(password.match(PASS_RGX));
    setPassValid(PASS_RGX.test(password));
    setPassConfirmValid(confirmPassword === password);
  }, [password, confirmPassword]);

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  const hideClass = (isInValid) => classNames({ [sass.hide]: !isInValid });
  const validClass = (isInValid, isValid) =>
    classNames({ "is-valid": isValid, "is-invalid": isInValid });

  const submitHandler = async () => {
    // if button enabled with JS hack
    const v1 = NAME_RGX.test(username);
    const v2 = PASS_RGX.test(password);
    if (!v1 || !v2) {
      setServerErr("Invalid Entry");
      return;
    }

    try {
      await axios.post(
        "/register",
        JSON.stringify({ username, password, roles: ["USER"] }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setSuccess(true);
    } catch (axiosError) {
      axiosError.response
        ? axiosError.response.status === 409
          ? setServerErr("the username is already taken")
          : setServerErr("registeration failed")
        : setServerErr("server not respond");
    }
  };

  return (
    <section>
      <div className="container">
        {success ? (
          <div>
            <h3 className="text-capitalize text-center mt-5">
              register success
            </h3>
            <p className="text-capitalize text-center mt-5">
              go to{" "}
              <Link
                to={"/login"}
                className="text-decoration-none btn btn-primary"
              >
                login
              </Link>
            </p>
          </div>
        ) : (
          <Form onSubmit={submitHandler}>
            {serverErr && (
              <div className="alert alert-danger text-capitalize d-flex gap-2 align-items-center">
                <BiSolidError /> {serverErr}
              </div>
            )}
            <h2 className=" text-center text-capitalize">sign up</h2>
            <div className="mb-3">
              <label className="form-label text-capitalize">User Name</label>
              <input
                type="text"
                className={
                  "form-control bg-info-subtle " +
                  validClass(username && userFocus && !userValid, userValid)
                }
                onChange={(e) => setUsername(e.target.value)}
                ref={userRef}
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
                required
                autoComplete="off"
              />

              <div
                className={
                  "form-text text-body-tertiery ps-2 text-capitalize " +
                  hideClass(userFocus && !userValid)
                }
              >
                <FaCircleInfo className="text-black-50 me-1 mb-1" /> the user
                name should contain only letters and should be between 4-23
                characters
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label text-capitalize">Password</label>
              <input
                type="password"
                className={
                  "form-control bg-info-subtle " +
                  validClass(password && passFocus && !passValid, passValid)
                }
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onFocus={() => setPassFocus(true)}
                onBlur={() => setPassFocus(false)}
                required
                autoComplete="off"
              />
              <div
                className={
                  "form-text text-body-tertiery ps-2 text-capitalize  " +
                  hideClass(passFocus && !passValid)
                }
              >
                <FaCircleInfo className="text-black-50 me-1 mb-1 " /> password
                should contain capital and small letters , numbers , @#$%^&+=
                and should be between 8 to 20 character
              </div>
            </div>
            <div className="mb-4">
              <label className="form-label text-capitalize">
                confirm password
              </label>
              <input
                type="password"
                className={
                  "form-control bg-info-subtle " +
                  validClass(
                    confirmPassword && passConfirmFocus && !passConfirmValid,
                    password && passConfirmValid
                  )
                }
                onChange={(e) => setConfirmPassword(e.target.value)}
                onFocus={() => setPassConfirmFocus(true)}
                onBlur={() => setPassConfirmFocus(false)}
                required
                autoComplete="off"
              />

              <div
                className={
                  "form-text text-body-tertiery ps-2 text-capitalize " +
                  hideClass(password && passConfirmFocus && !passConfirmValid)
                }
              >
                <FaCircleInfo className="text-black-50 me-1 mb-1" /> confirm
                password should match the first password
              </div>
            </div>
            <button
              className="btn btn-primary text-capitalize d-block mx-auto "
              disabled={!userValid || !passValid || !passConfirmValid}
            >
              sign up
            </button>
          </Form>
        )}
      </div>
    </section>
  );
};

export default Register;
