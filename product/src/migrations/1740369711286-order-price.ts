import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderPrice1740369711286 implements MigrationInterface {
    name = 'OrderPrice1740369711286'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`original_price\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`price\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`original_price\``);
    }

}
