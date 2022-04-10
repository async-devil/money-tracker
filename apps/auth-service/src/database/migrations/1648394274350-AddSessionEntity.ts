import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSessionEntity1648394274350 implements MigrationInterface {
	name = "AddSessionEntity1648394274350";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`
			CREATE TABLE "session" (
				"refresh_token"          character varying NOT NULL,
				"client_id"              character varying NOT NULL,
				"valid_until"            TIMESTAMP WITH TIME ZONE NOT NULL, 
				"ip"                     inet NOT NULL,
				"device"                 character varying NOT NULL,

				"create_date_time"       TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
				"last_changed_date_time" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),

				CONSTRAINT "PK_14f5d9fd42ee29c579807b5f7e5" PRIMARY KEY ("refresh_token")
			)`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "session"`);
	}
}
