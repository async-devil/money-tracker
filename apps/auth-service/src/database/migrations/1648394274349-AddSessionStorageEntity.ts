import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSessionStorageEntity1648394274350 implements MigrationInterface {
	name = "AddSessionStorageEntity1648394274350";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`
			CREATE TABLE "session_storage" (
				"client_id"              character varying NOT NULL,

				"create_date_time"       TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
				"last_changed_date_time" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),

				CONSTRAINT "PK_3b7f3c5e21d6f726be8fca5013e" PRIMARY KEY ("client_id")
			)`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "session_storage"`);
	}
}
