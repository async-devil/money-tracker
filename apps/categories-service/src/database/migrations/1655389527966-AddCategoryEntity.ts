import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCategoryEntity1655389527966 implements MigrationInterface {
	name = "AddCategoryEntity1655389527966";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`
      CREATE TYPE category_type_enum AS ENUM (
        'income',
        'expense'
    	)`
		);

		await queryRunner.query(
			`
			CREATE TABLE category (
				"id"                     uuid NOT NULL DEFAULT uuid_generate_v4(),
				"owner"                  uuid NOT NULL,
				"type"                   category_type_enum NOT NULL,
				"name"                   text NOT NULL,
				"sub"                    uuid,
				"archived"               boolean NOT NULL DEFAULT false,
				"mandatory"              boolean NOT NULL DEFAULT false,
				"notes"                  text,
				"icon_name"              text NOT NULL DEFAULT 'MoreHoriz',
				"icon_color"             character(6) NOT NULL DEFAULT 'A6A6A6',

				CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id")
			)`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE category`);
		await queryRunner.query(`DROP TYPE category_type_enum`);
	}
}
