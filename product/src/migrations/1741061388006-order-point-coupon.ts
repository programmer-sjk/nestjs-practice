import { MigrationInterface, QueryRunner } from 'typeorm';

export class OrderPointCoupon1741061388006 implements MigrationInterface {
  name = 'OrderPointCoupon1741061388006';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD \`used_point\` int NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(`ALTER TABLE \`order\` ADD \`coupon_id\` int NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`coupon_id\``);
    await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`used_point\``);
  }
}
