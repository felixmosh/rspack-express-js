const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

/**
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = {
  context: __dirname,
  target: 'node18',
  builtins: {
    react: {
      refresh: false,
      useBuiltins: false
    }
  },
  entry: {
    server: ['webpack/hot/poll?100', './src/index.ts']
  },
  output: {
    clean: true,
    hotUpdateChunkFilename: 'hot/[name].[hash].hot-update.js',
    hotUpdateMainFilename: 'hot/[fullhash].hot-update.json',
  },
  devtool: !process.env.BUILD ? 'inline-cheap-module-source-map' : false,
  optimization: {
    minimize: false
  },
  externalsType: 'commonjs',
  externals: [nodeExternals({
    allowlist: [/webpack/]
  })],
  plugins: [
    !process.env.BUILD &&
    new RunScriptWebpackPlugin({
      name: 'server.js',
      autoRestart: false,
      keyboard: true,
      restartable: true
    }, new ForkTsCheckerWebpackPlugin({ async: !process.env.BUILD }))
  ].filter(Boolean),
  devServer: {
    hot: true,
    devMiddleware: {
      writeToDisk: true
    }
  }
};
