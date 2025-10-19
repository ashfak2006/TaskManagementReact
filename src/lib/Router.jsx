import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import App from "../App";
import Tasks from "../pages/tasks";
import TaskDetaile from "../pages/taskDetaile";
import Signup from "../pages/signup";
import Message from "../pages/message";

const Router = createBrowserRouter([
  {
  path: "",
  element:<Home/>
  },
  {
    path:"app",
    element:<App/>
  },
  {
    path:"tasks",
    element:<Tasks/>
  },
  {
    path:"signup",
    element:<Signup/>
  },
  {
    path:"tasks/:id",
    element:<TaskDetaile/>
  },
  {
    path:"tasks/user/message",
    element:<Message/>
  }
])
export default Router