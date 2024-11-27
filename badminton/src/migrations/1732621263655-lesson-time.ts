import { MigrationInterface, QueryRunner } from 'typeorm';

export class LessonTime1732621263655 implements MigrationInterface {
  name = 'LessonTime1732621263655';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`lesson_time\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`dayOfWeek\` enum ('SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FIRDAY', 'SATURDAY') NULL, 
        \`startDate\` datetime NULL, 
        \`startTime\` varchar(5) NULL, 
        \`lessonId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`lesson_time\``);
  }
}
