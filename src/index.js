import React, { useState } from "react";
import ReactDOM from "react-dom";
import { loadRemoteModule } from "oleng-mfe-utils";
const ErrorMessage = () => (
  <div>
    <h2>Failed to load remote module</h2>
  </div>
);

const App = () => {
  const [RemoteModule, setRemoteModule] = useState(null);
  const [hasError, setHasError] = useState(false);

  async function init() {
    try {
      const remoteModule = await loadRemoteModule({
        url: "http://localhost:8081/remoteEntry.js",
        scope: "microfrontend",
        module: "./Microfrontend",
      });
      setRemoteModule(() => remoteModule);
    } catch (error) {
      console.error("Failed to load remote module", error);
      setHasError(true);
    }
  }

  // Load the remote module when the component mounts
  React.useEffect(() => {
    init();
  }, []);

  const MFE1 = RemoteModule ? RemoteModule.default : null;

  return (
    <div>
      <h1>Container</h1>
      {hasError ? (
        <ErrorMessage />
      ) : MFE1 ? (
        <MFE1 />
      ) : (
        "Loading remote module..."
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
