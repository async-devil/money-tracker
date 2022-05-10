import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSessionEntity1648394274350 implements MigrationInterface {
	name = "AddSessionEntity1648394274350";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`
			CREATE TABLE "session" (
				"id"                     uuid NOT NULL DEFAULT uuid_generate_v4(), 
				"refresh_token"          character varying NOT NULL,
				"client_id"              character varying NOT NULL,
				"valid_until"            TIMESTAMP WITH TIME ZONE NOT NULL, 
				"ip"                     inet NOT NULL,
				"device"                 character varying NOT NULL,

				"create_date_time"       TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
				"last_changed_date_time" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),

				CONSTRAINT "UQ_14f5d9fd42ee29c579807b5f7e5" UNIQUE ("refresh_token"),
				CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id")
			)`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "session"`);
	}
}
