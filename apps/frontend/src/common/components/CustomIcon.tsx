import { Avatar, AvatarProps } from "antd";
import React from "react";
import styled from "styled-components";

const CustomAvatar = styled(Avatar)<{ color?: string; background?: string }>`
	display: flex;
	align-items: center;

	background: ${(props) => props.background || "rgba(255, 255, 255, 0.3)"};

	span {
		display: flex;
	}

	svg {
		path {
			stroke: ${(props) => props.color || "rgb(0, 0, 0)"};
		}
	}
`;

interface CustomIconProps extends AvatarProps {
	color?: string;
	background?: string;
}

const CustomIcon = (props: CustomIconProps) => {
	return (
		<CustomAvatar
			color={props.color}
			background={props.background}
			size={props.size}
			shape={props.shape}
		>
			{props.children}
		</CustomAvatar>
	);
};

export default CustomIcon;
