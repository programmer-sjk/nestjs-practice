import { MigrationInterface, QueryRunner } from 'typeorm';

export class PointHistoryExpiredAt1740886633630 implements MigrationInterface {
  name = 'PointHistoryExpiredAt1740886633630';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`point_history\` ADD \`expired_at\` datetime NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`point_history\` DROP COLUMN \`expired_at\``,
    );
  }
}
