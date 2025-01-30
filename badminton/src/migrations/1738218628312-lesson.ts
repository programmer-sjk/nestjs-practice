import { MigrationInterface, QueryRunner } from 'typeorm';

export class Lesson1738218628312 implements MigrationInterface {
  name = 'Lesson1738218628312';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`lesson\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`coach_id\` int NOT NULL, 
        \`user_id\` int NOT NULL, 
        \`type\` enum ('regular', 'one_time') NOT NULL, 
        \`day_of_week\` enum ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday') NOT NULL, 
        \`start_hour\` int NULL, 
        \`start_date\` datetime NULL, 
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        \`deleted_at\` datetime(6) NULL, 
        INDEX \`coachId\` (\`coach_id\`), 
        INDEX \`userId\` (\`user_id\`), 
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`userId\` ON \`lesson\``);
    await queryRunner.query(`DROP INDEX \`coachId\` ON \`lesson\``);
    await queryRunner.query(`DROP TABLE \`lesson\``);
  }
}
