import React from "react";
import { IconType } from "react-icons";
import { MdMoreHoriz } from "react-icons/md";

export const iconsList: { [key: string]: IconType } = {
	MoreHoriz: MdMoreHoriz,
};

export default (iconName: string) => {
	return iconsList[iconName] || iconsList.MoreHoriz;
};
