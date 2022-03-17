import { MigrationInterface, QueryRunner } from "typeorm";

export class AddClientEntity1646602439167 implements MigrationInterface {
	name = "AddClientEntity1646602439167";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "client" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
                "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
                "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
                "email" character varying NOT NULL, 
                "password" character varying NOT NULL, 
                
                CONSTRAINT "UQ_6436cc6b79593760b9ef921ef12" UNIQUE ("email"), 
                CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id")
              )`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "client"`);
	}
}
