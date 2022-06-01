import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAccountEntity1654081246384 implements MigrationInterface {
	name = "AddAccountEntity1654081246384";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TYPE "account_type_enum" AS ENUM (
				'regular', 
				'savings', 
				'debt'
			)`
		);
		await queryRunner.query(
			`
			CREATE TABLE "account" (
				"id"                     uuid NOT NULL DEFAULT uuid_generate_v4(), 
				"owner"                  character varying NOT NULL, 
				"type"                   "account_type_enum" NOT NULL, 
				"name"                   character varying NOT NULL, 
				"currency"               character varying NOT NULL, 
				"balance"                numeric(12, 2) NOT NULL, 
				"notes"                  character varying, 
				"icon_name"              character varying NOT NULL DEFAULT 'MoreHoriz', 
				"icon_color"             character varying NOT NULL DEFAULT 'A6A6A6', 

				"create_date_time"       TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
				"last_changed_date_time" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 

				CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id")
			)`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "account"`);
		await queryRunner.query(`DROP TYPE "account_type_enum"`);
	}
}
