/**
 * @param backgroundColor 6 char hex color with or without #
 */
export const getColorByBackground = (backgroundColor: string) => {
	if (backgroundColor.startsWith("#")) backgroundColor = backgroundColor.replace("#", "");

	const redValue = parseInt(backgroundColor.substring(0, 2), 16);
	const greenValue = parseInt(backgroundColor.substring(2, 4), 16);
	const blueValue = parseInt(backgroundColor.substring(4, 6), 16);

	return redValue * 0.299 + greenValue * 0.587 + blueValue * 0.114 >= 180
		? "rgb(0, 0, 0)"
		: "rgb(255, 255, 255)";
};
