import { useEffect, useRef, useState } from "react";
import { Form } from "react-router-dom";
import { FaCircleInfo } from "react-icons/fa6";
import sass from "./register.module.scss";
import classNames from "classnames";

const Register = () => {
  const [userName, setUserName] = useState("");
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

  const NAME_RGX = /^[A-z]{4,23}$/;
  const PASS_RGX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  useEffect(() => {
    setUserValid(NAME_RGX.test(userName));
  }, [userName]);

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

  return (
    <section>
      <div className="container">
        <Form
          className="mt-5  mx-auto bg-info p-4 rounded "
          style={{
            backdropFilter: "blur(30px)",
            "--bs-bg-opacity": "0.7",
            maxWidth: "500px",
          }}
          data-bs-theme="dark"
        >
          <h2 className=" text-center text-capitalize">sign up</h2>
          <div className="mb-3">
            <label className="form-label text-capitalize">User Name</label>
            <input
              type="text"
              className={
                "form-control bg-info-subtle " +
                validClass(userName && userFocus && !userValid, userValid)
              }
              onChange={(e) => setUserName(e.target.value)}
              ref={userRef}
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              required
            />

            <div
              className={
                "form-text text-body-tertiery ps-2 text-capitalize " +
                hideClass(userFocus && !userValid)
              }
            >
              <FaCircleInfo className="text-black-50 me-1 mb-1" /> the user name
              should contain only letters and should be between 4-23 characters
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
            />
            <div
              className={
                "form-text text-body-tertiery ps-2 text-capitalize  " +
                hideClass(passFocus && !passValid)
              }
            >
              <FaCircleInfo className="text-black-50 me-1 mb-1 " /> password
              should contain capital and small letters , numbers , @#$%^&+= and
              should be between 8 to 20 character
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
      </div>
    </section>
  );
};

export default Register;
