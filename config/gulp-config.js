/* global module */

module.exports = {
	app: {
		entry: "./js/app.js",
		bundleName: "bundle.js",
		bundle: "build"
	},
	js: {
		src: "./js/**/*.js"
	},
	less: {
		src: "./less/app.less",
		dest: "./build"
	}
};
