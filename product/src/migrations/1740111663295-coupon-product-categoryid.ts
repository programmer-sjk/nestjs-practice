import { MigrationInterface, QueryRunner } from "typeorm";

export class CouponProductCategoryid1740111663295 implements MigrationInterface {
    name = 'CouponProductCategoryid1740111663295'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`category_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`coupon\` ADD \`category_id\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`coupon\` DROP COLUMN \`category_id\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`category_id\``);
    }

}
