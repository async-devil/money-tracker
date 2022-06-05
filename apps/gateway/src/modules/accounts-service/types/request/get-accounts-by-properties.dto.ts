import { OmitType, PartialType } from "@nestjs/swagger";

import { Account } from "../response/account.entity";

export class GetAccountsByPropertiesDto extends PartialType(
	OmitType(Account, ["last_changed_date_time", "create_date_time"])
) {}

/** Version of get account by properties dto for controller where owner id comes from cookie */
export class GetAccountsByPropertiesControllerDto extends OmitType(GetAccountsByPropertiesDto, [
	"owner",
]) {}
