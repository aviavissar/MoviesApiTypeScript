import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./routers/mainRouter";
import { AppProvider } from "./store/App.store";
import "./styles/styles.scss";


ReactDOM.render(
  <AppProvider>
    <AppRouter />
  </AppProvider>,
  document.getElementById("root")
);
