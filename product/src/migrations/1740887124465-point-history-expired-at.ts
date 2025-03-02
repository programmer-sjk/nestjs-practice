import { MigrationInterface, QueryRunner } from 'typeorm';

export class PointHistoryExpiredAt1740887124465 implements MigrationInterface {
  name = 'PointHistoryExpiredAt1740887124465';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`point_history\` ADD \`expired_at\` datetime NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX \`userId\` ON \`point_history\` (\`user_id\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`userId\` ON \`point_history\``);
    await queryRunner.query(
      `ALTER TABLE \`point_history\` DROP COLUMN \`expired_at\``,
    );
  }
}
