import * as Plot from "@observablehq/plot";
import { createElement as h, useEffect, useRef } from "react";

export function ChartHost({ options }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      // Clear any existing charts before rendering a new one
      ref.current.innerHTML = "";
      const plot = Plot.plot({ ...options, document: window.document });
      ref.current.appendChild(plot);
    }
  }, [options]);

  return h("div", { ref });
}
