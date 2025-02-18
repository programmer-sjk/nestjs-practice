import { MigrationInterface, QueryRunner } from 'typeorm';

export class CouponUser1739854093701 implements MigrationInterface {
  name = 'CouponUser1739854093701';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`coupon_user\` (
        \`coupon_id\` int NOT NULL, 
        \`user_id\` int NOT NULL, 
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        PRIMARY KEY (\`coupon_id\`, \`user_id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`coupon_user\``);
  }
}
