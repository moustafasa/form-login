import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import Register from "./components/register/Register";
import LogIn, { loginAction, loginLoader } from "./components/login/LogIn";
import LinksPage from "./components/linksPage/LinksPage";
import Home from "./components/home/Home";
import Admin from "./components/admin/Admin";
import Edit from "./components/edit/Edit";
import Layout from "./components/layout/Layout";
import UnAutherized from "./components/unAutherized/UnAutherized";
import useRefresh from "./hooks/useRefresh";
import useAuth from "./hooks/useAuth";
import { signOutAction } from "./components/SignOut";
import { jwtDecode } from "jwt-decode";

const protectedLoader =
  (auth, refresh, roles = []) =>
  async ({ request }) => {
    const pathname = new URL(request.url).pathname;
    const authorize = (authObj = auth) => {
      const userRoles = jwtDecode(authObj?.token).roles || [];
      if (userRoles.find((role) => roles.includes(role))) {
        return null;
      } else {
        return redirect(`/unAuthorized?from=${pathname}`);
      }
    };
    if (auth.token) {
      return authorize();
    } else {
      console.log(localStorage.getItem("persist"));
      if (JSON.parse(localStorage.getItem("persist"))) {
        try {
          const authObj = await refresh();
          return authorize(authObj);
        } catch (err) {
          return redirect(`/login?from=${pathname}`);
        }
      } else return redirect(`/login?from=${pathname}`);
    }
  };

function App() {
  const refresh = useRefresh();
  const { logIn, auth, logOut } = useAuth();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,

      children: [
        { index: true, element: <LinksPage /> },
        { path: "register", element: <Register /> },
        {
          path: "/login",
          action: loginAction(logIn),
          element: <LogIn />,
          loader: loginLoader(auth),
        },

        {
          path: "/admin",
          element: <Admin />,
          loader: protectedLoader(auth, refresh, ["ADMIN"]),
        },
        {
          path: "/home",
          element: <Home />,
          loader: protectedLoader(auth, refresh, ["USER", "ADMIN", "EDITOR"]),
          shouldRevalidate: () => false,
        },
        {
          path: "/edit",
          element: <Edit />,
          loader: protectedLoader(auth, refresh, ["EDITOR"]),
        },
        {
          path: "/unAuthorized",
          element: <UnAutherized />,
        },
        {
          path: "/signOut",
          action: signOutAction(logOut),
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
