import { MigrationInterface, QueryRunner } from 'typeorm';

export class Lesson1733986425232 implements MigrationInterface {
  name = 'Lesson1733986425232';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`lesson\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`coach_id\` int NOT NULL, 
        \`type\` enum ('ONE_TIME', 'REGULAR') NOT NULL, 
        \`lesson_minute\` int NOT NULL, 
        \`customer_name\` varchar(18) NOT NULL, 
        \`customer_phone\` varchar(11) NOT NULL, 
        \`password\` varchar(255) NOT NULL, 
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        \`deleted_at\` datetime(6) NULL, 
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`lesson\``);
  }
}
