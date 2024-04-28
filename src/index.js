import React, { useState } from "react";
import ReactDOM from "react-dom";
import { loadRemoteModule } from "oleng-mfe-utils";
const ErrorMessage = () => (
  <div>
    <h2>Failed to load remote module</h2>
  </div>
);

const App = () => {
  const [RemoteModule1, setRemoteModule1] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [RemoteModule2, setRemoteModule2] = useState(null);
  const [hasError2, setHasError2] = useState(false);

  async function init1() {
    try {
      const remoteModule1 = await loadRemoteModule({
        url: "http://localhost:9001/remoteEntry.js",
        scope: "microfrontend",
        module: "./Microfrontend",
      });
      setRemoteModule1(() => remoteModule1);
    } catch (error) {
      console.error("Failed to load remote module ", error);
      setHasError1(true);
    }
  }

  async function init2() {
    try {
      const remoteModule2 = await loadRemoteModule({
        url: "http://localhost:9002/remoteEntry.js",
        scope: "microfrontend",
        module: "./Microfrontend",
      });
      setRemoteModule2(() => remoteModule2);
    } catch (error) {
      console.error("Failed to load remote module 2", error);
      setHasError2(true);
    }
  }

  React.useEffect(() => {
    init1();
    init2();
  }, []);

  const MFE1 = RemoteModule1 ? RemoteModule1.default : null;
  const MFE2 = RemoteModule2 ? RemoteModule2.default : null;

  return (
    <div>
      <h1>Container</h1>
      <div>
        {hasError ? (
          <ErrorMessage />
        ) : MFE1 ? (
          <MFE1 />
        ) : (
          "Loading remote module..."
        )}
      </div>

      <div>
        {hasError2 ? (
          <ErrorMessage />
        ) : MFE2 ? (
          <MFE2 />
        ) : (
          "Loading remote module..."
        )}
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
