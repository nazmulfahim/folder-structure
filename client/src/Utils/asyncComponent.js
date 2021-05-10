import React, { useState, useEffect } from "react";

const asyncComponent = importComponent => {
  return function(props) {
    const [C, setC] = useState(null);
    useEffect(() => {
      importComponent().then(cmp => {
        setC(cmp);
      });
    });
    return C ? <C.default {...props} /> : null;
  };
};

export default asyncComponent;
