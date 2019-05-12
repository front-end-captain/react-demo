import Home from "./../containers/Home/home.jsx";
import User from "./../containers/User/user.jsx";
import About from "./../containers/About/index.jsx";

import Team from "./../components/Team/index.jsx";
import Invoices from "./../components/Invoices/index.jsx";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "user",
    component: User,
    children: [
      {
        path: "team",
        component: Team,
      },
      {
        path: "invoices",
        component: Invoices,
      },
    ],
  },
  {
    path: "about",
    component: About,
  },
];

export default routes;
