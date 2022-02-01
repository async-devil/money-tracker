/* eslint-disable no-undef */
const { createProxyMiddleware } = require("http-proxy-middleware");

const SERVER_PORT = process.env.SERVER_PORT || 5000;

module.exports = function (app) {
	app.use(
		"/api",
		createProxyMiddleware({
			target: `http://localhost:${SERVER_PORT}`,
			changeOrigin: true,
		})
	);
};
