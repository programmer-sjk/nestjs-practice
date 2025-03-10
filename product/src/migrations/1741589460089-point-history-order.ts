import { MigrationInterface, QueryRunner } from "typeorm";

export class PointHistoryOrder1741589460089 implements MigrationInterface {
    name = 'PointHistoryOrder1741589460089'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`point_history\` ADD \`order_id\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`point_history\` DROP COLUMN \`order_id\``);
    }

}
