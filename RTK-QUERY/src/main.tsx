import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

import router from "./routes/index.tsx";
import { RouterProvider } from "react-router";
import { ThemeProvider } from "./prviders/theme-provider.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    </ThemeProvider>
  </StrictMode>
);
