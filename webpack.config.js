module.exports = {
  context: __dirname + "/src",
  entry: "./src/index.jsx"
  ,

  output: {
    path: __dirname + "/static",
    filename: "bundle.js",
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "css-loader" },
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader", query: { presets: ["es2015", "react","stage-1"] }},
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
