import React from "react";
import { IconBaseProps } from "react-icons";

import getIcon from "./iconsList";

interface IVariableIconProps extends IconBaseProps {
	name: string;
}

const VariableIcon = (props: IVariableIconProps) => {
	const Icon = getIcon(props.name);

	return <Icon size={props.size} />;
};

export default VariableIcon;
