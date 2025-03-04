import { MigrationInterface, QueryRunner } from 'typeorm';

export class CouponExpiredAt1741067381194 implements MigrationInterface {
  name = 'CouponExpiredAt1741067381194';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`coupon_user\` ADD \`expired_at\` datetime NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`coupon_user\` DROP COLUMN \`expired_at\``,
    );
  }
}
