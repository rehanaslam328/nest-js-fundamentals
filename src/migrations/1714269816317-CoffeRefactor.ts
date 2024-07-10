import { MigrationInterface, QueryRunner } from "typeorm";

export class CoffeRefactor1714269816317 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
         ALTER TABLE "coffee" RENAME COLUMN "name" TO "title"
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
         ALTER TABLE "coffee" RENAME COLUMN "title" TO "name"
        `)
    }

}
