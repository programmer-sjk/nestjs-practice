import { MigrationInterface, QueryRunner } from 'typeorm';

export class CouponUserIsUsed1740636133828 implements MigrationInterface {
  name = 'CouponUserIsUsed1740636133828';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`coupon_user\` ADD \`is_used\` tinyint NOT NULL DEFAULT 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`coupon_user\` DROP COLUMN \`is_used\``,
    );
  }
}
