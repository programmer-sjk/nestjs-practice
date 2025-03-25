import { MigrationInterface, QueryRunner } from 'typeorm';

export class CouponOriginalStock1742884198388 implements MigrationInterface {
  name = 'CouponOriginalStock1742884198388';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`coupon\` ADD \`original_stock\` int NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`coupon\` DROP COLUMN \`original_stock\``,
    );
  }
}
