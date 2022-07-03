import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";

import { CreateCategoryDto } from "./create-category.dto";

export class UpdateCategoryProperties extends PartialType(
	OmitType(CreateCategoryDto, ["owner", "type"])
) {}

export class UpdateCategoryByIdDto {
	/** @example "123e4567-e89b-12d3-a456-426655440000" */
	@ApiProperty({ example: "123e4567-e89b-12d3-a456-426675440000" })
	readonly id: string;

	@ApiProperty({ type: UpdateCategoryProperties })
	readonly data: UpdateCategoryProperties;
}
