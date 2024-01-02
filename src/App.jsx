import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "./components/register/register";

const router = createBrowserRouter([{ path: "/", element: <Register /> }]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
