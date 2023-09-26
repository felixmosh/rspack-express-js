const { RunScriptWebpackPlugin } = require("run-script-webpack-plugin");
const nodeExternals = require('webpack-node-externals');

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
		server: ["webpack/hot/poll?100", "./src/index.ts"]
	},
	output: {
		path: './dist'
	},
	optimization: {
		minimize: false
	},
	externalsType: "commonjs",
	externals: [nodeExternals()],
	plugins: [
		!process.env.BUILD &&
		new RunScriptWebpackPlugin({
			name: "server.js",
			autoRestart: false
		})
	].filter(Boolean),
	devServer: {
		devMiddleware: {
			writeToDisk: true
		}
	}
};
