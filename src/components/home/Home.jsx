import { Form, redirect } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h2>Home</h2>
      <Form method="post" action="/signOut" replace>
        <button className="btn btn-primary mt-3">sign out</button>
      </Form>
    </div>
  );
};

export default Home;
