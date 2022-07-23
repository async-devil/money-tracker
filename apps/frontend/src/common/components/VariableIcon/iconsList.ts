import React from "react";
import { IconType } from "react-icons";
import {
	MdAccountBalance,
	MdAccountBalanceWallet,
	MdAttachMoney,
	MdMoreHoriz,
	MdOutlineShoppingBasket,
	MdRestaurant,
} from "react-icons/md";

export const iconsList: { [key: string]: IconType } = {
	MoreHoriz: MdMoreHoriz,
	OutlineShoppingBasket: MdOutlineShoppingBasket,
	AttachMoney: MdAttachMoney,
	Restaurant: MdRestaurant,
	AccountBalanceWallet: MdAccountBalanceWallet,
	AccountBalance: MdAccountBalance
};

export default (iconName: string) => {
	return iconsList[iconName] || iconsList.MoreHoriz;
};
