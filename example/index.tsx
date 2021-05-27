import "react-app-polyfill/ie11";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { useState } from "react";
import { useIMask } from "../src";
import IMask from "imask";
type AnyMaskedOptions = IMask.AnyMaskedOptions;

const maskOptions = {
  "Regular expression": {
    mask: /\d/,
  },
  "Number mask": {
    mask: Number,
  },
  "Date mask": {
    mask: Date,
  },
};

function Example({ maskOptions, label }: { maskOptions: AnyMaskedOptions; label: string }) {
  const [value, setValue] = useState("");

  const { ref } = useIMask(maskOptions, {
    onAccept: e => {
      setValue(e.target.value);
    },
  });

  return (
    <div style={{ padding: "10px" }}>
      <label>{label}</label>
      <input ref={ref} onChange={() => null} value={value} />
    </div>
  );
}

export const App = () => {
  return (
    <div>
      {Object.keys(maskOptions).map(key => (
        <Example maskOptions={maskOptions[key]} key={key} label={key} />
      ))}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
