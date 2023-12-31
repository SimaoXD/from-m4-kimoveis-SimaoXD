import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1688754346337 implements MigrationInterface {
    name = 'CreateTables1688754346337'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "real_estate" DROP COLUMN "createAt"`);
        await queryRunner.query(`ALTER TABLE "real_estate" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "real_estate" ADD "createdAt" date NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "real_estate" ADD "updatedAt" date NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "real_estate" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "real_estate" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "real_estate" ADD "updateAt" date NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "real_estate" ADD "createAt" date NOT NULL DEFAULT now()`);
    }

}
