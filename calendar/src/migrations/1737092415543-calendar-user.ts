import { MigrationInterface, QueryRunner } from 'typeorm';

export class CalendarUser1737092415543 implements MigrationInterface {
  name = 'CalendarUser1737092415543';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`calendar_user\` (
        \`calendarId\` int NOT NULL, 
        \`userId\` int NOT NULL, 
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        PRIMARY KEY (\`calendarId\`, \`userId\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`calendar_user\``);
  }
}
