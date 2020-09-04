const path = require("path");

module.exports = {
  entry: "./src/reactApp/index.js",
  output: {
    filename: "reactApp.js",
    path: path.resolve(
      __dirname,
      "force-app",
      "main",
      "default",
      "lwc",
      "embeddedReactSPA"
    ),
  },
  optimization: {
    minimize: false,
  },
};
