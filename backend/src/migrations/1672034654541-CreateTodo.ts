import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTodo1672034654541 implements MigrationInterface {
    name = 'CreateTodo1672034654541'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "todo" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "status" character varying NOT NULL, "createdAt" character varying NOT NULL, "updatedAt" character varying NOT NULL, CONSTRAINT "PK_d429b7114371f6a35c5cb4776a7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "todo"`);
    }

}
