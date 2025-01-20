import { MigrationInterface, QueryRunner } from 'typeorm';

export class CalendarAlarm1737352309570 implements MigrationInterface {
  name = 'CalendarAlarm1737352309570';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`calendar_alarm\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`type\` enum ('SMS', 'MAIL', 'PUSH') NOT NULL, 
        \`ringMinuteBefore\` int NOT NULL, 
        \`calendarId\` int NOT NULL, 
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`calendar_alarm\``);
  }
}
