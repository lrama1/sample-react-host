import React, { useState } from "react";
import ReactDOM from "react-dom";
import { withMicrofrontend } from "./utils/utils";

const MFE1 = withMicrofrontend({
  url: "http://localhost:9001/remoteEntry.js",
  scope: "microfrontend",
  module: "./Microfrontend",
});

const MFE2 = withMicrofrontend({
  url: "http://localhost:9002/remoteEntry.js",
  scope: "microfrontend",
  module: "./Microfrontend",
});

function App() {
  return (
    <div>
      <h1>Container</h1>
      <MFE1 />
      <MFE2 />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
