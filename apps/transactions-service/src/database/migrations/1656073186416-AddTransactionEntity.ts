import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTransactionEntity1656073186416 implements MigrationInterface {
	name = "AddTransactionEntity1656073186416";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`
      CREATE TYPE transaction_type_enum AS ENUM (
        'recharge', 
        'withdraw', 
        'transfer'
      )`
		);

		await queryRunner.query(
			`
      CREATE TABLE transaction (
        "id"                     uuid NOT NULL DEFAULT uuid_generate_v4(),
        "owner"                  uuid NOT NULL,
        "type"                   transaction_type_enum NOT NULL,
        "from"                   uuid NOT NULL, "to" uuid NOT NULL,
        "amount_from"            numeric(18,8) NOT NULL,
        "amount_to"              numeric(18,8) NOT NULL,
        "currency_from"          character varying(4) NOT NULL,
        "currency_to"            character varying(4) NOT NULL,
        "location"               character varying(100),
        "notes"                  character varying(200),

        "create_date_time"       TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
				"last_changed_date_time" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        
        CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id")
      )`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE transaction`);
		await queryRunner.query(`DROP TYPE transaction_type_enum`);
	}
}
