import { ReportHandler } from "web-vitals";

const reportWebVitals = (onPerfEntry?: ReportHandler): void => {
	if (onPerfEntry && onPerfEntry instanceof Function) {
		import("web-vitals")
			.then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
				getCLS(onPerfEntry);
				getFID(onPerfEntry);
				getFCP(onPerfEntry);
				getLCP(onPerfEntry);
				return getTTFB(onPerfEntry);
			})
			.catch((err: Error) => {
				throw new Error(`Something went wrong: ${err.message}`);
			});
	}
};

export default reportWebVitals;
