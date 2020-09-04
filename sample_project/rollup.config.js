import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";

export default {
  input: "./src/reactApp/index.js",
  output: {
    file: "./force-app/main/default/lwc/embeddedReactSPA/reactApp.js",
    format: "cjs",
  },
  plugins: [
    nodeResolve({
      preferBuiltins: true,
    }),
    commonjs({
      include: /node_modules/,
    }),
    // terser(),
  ],
};
