import { Link } from "react-router-dom";

const LinksPage = () => {
  return (
    <div>
      <h2 className="text-capitalize">public routes</h2>
      <ul className="row ms-2 gap-3">
        <li className="ps-0">
          <Link
            to={"/login"}
            className="link-offset-3 link-body-emphasis text-capitalize fs-4"
          >
            login
          </Link>
        </li>
        <li className="ps-0">
          <Link
            to={"/register"}
            className="link-offset-3 link-body-emphasis text-capitalize fs-4"
          >
            register
          </Link>
        </li>
      </ul>
      <h2 className="text-capitalize">protected routes</h2>
      <ul className="row ms-2 gap-3">
        <li className="ps-0">
          <Link
            to={"/home"}
            className="link-offset-3 link-body-emphasis text-capitalize fs-4"
          >
            home
          </Link>
        </li>
        <li className="ps-0">
          <Link
            to={"/edit"}
            className="link-offset-3 link-body-emphasis text-capitalize fs-4"
          >
            edit
          </Link>
        </li>
        <li className="ps-0">
          <Link
            to={"/admin"}
            className="link-offset-3 link-body-emphasis text-capitalize fs-4"
          >
            admin
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default LinksPage;
