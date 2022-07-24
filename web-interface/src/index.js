import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

var max_date;
var min_date;
async function init() {
  return await fetch(
    "https://scraper-interface.vercel.app/api/date/range",
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  )
    .then((res) => res.json())
    .catch((err) => {
      console.log("Failed getting table range");
      console.log(err);
    });
}
init().then(data => {
  console.log(data)
root.render(
  <React.StrictMode>
    <App max={data.body[data.body.length - 1]} min={data.body[0]} />
  </React.StrictMode>
)});
