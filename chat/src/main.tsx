import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { router } from "./router.tsx";

import "./index.css";

// TODO: impvote that it works with StrictMode
createRoot(document.getElementById("root")!).render(
    <RouterProvider router={router} />,
);
