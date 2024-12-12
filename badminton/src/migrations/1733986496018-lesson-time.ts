import { MigrationInterface, QueryRunner } from 'typeorm';

export class LessonTime1733986496018 implements MigrationInterface {
  name = 'LessonTime1733986496018';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`lesson_time\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`day_of_week\` enum ('SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FIRDAY', 'SATURDAY') NULL, 
        \`start_date\` datetime NULL, 
        \`start_time\` varchar(5) NULL, 
        \`lesson_id\` int NOT NULL, 
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`lesson_time\``);
  }
}
