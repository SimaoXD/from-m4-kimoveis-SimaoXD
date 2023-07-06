import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1688669826714 implements MigrationInterface {
    name = 'InitialMigration1688669826714'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "CreateAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleteAt"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "createdAt" date NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updatedAt" date NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "deletedAt" date`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying(120) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "deleteAt" date`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updateAt" date NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "CreateAt" date NOT NULL DEFAULT now()`);
    }

}
