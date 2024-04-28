import React, { useState, useEffect } from "react";
import ErrorMessage from "../ErrorMessage";
import { loadRemoteModule } from "oleng-mfe-utils";

const withMicrofrontend = ({ url, scope, module }) => {
  return function WrappedComponent() {
    const [RemoteModule, setRemoteModule] = useState(null);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
      loadRemoteModule({ url, scope, module })
        .then((remoteModule) => {
          setRemoteModule(() => remoteModule);
        })
        .catch((error) => {
          console.error("Failed to load remote module", error);
          setHasError(true);
        });
    }, [url, scope, module]);

    const MFE = RemoteModule ? RemoteModule.default : null;

    if (hasError) {
      return <ErrorMessage />;
    }

    if (MFE) {
      return <MFE />;
    }

    return <div>Loading remote module...</div>;
  };
};

export { withMicrofrontend };
