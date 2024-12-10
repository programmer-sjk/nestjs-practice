import { MigrationInterface, QueryRunner } from 'typeorm';

export class Lesson1732602044742 implements MigrationInterface {
  name = 'Lesson1732602044742';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`lesson\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`coachId\` int NOT NULL, 
        \`type\` enum ('ONE_TIME', 'REGULAR') NOT NULL, 
        \`lessonMinute\` int NOT NULL, 
        \`customerName\` varchar(18) NOT NULL, 
        \`customerPhone\` varchar(11) NOT NULL, 
        \`password\` varchar(255) NOT NULL, 
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        \`deletedAt\` datetime(6) NULL, 
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`lesson\``);
  }
}
