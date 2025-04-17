import { MigrationInterface, QueryRunner } from 'typeorm';

export class Comment1744869559168 implements MigrationInterface {
  name = 'Comment1744869559168';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`comment\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`user_id\` int NOT NULL, 
        \`post_id\` int NOT NULL, 
        \`parent_id\` int NULL, 
        \`body\` varchar(255) NOT NULL, 
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        INDEX \`userId\` (\`user_id\`), 
        INDEX \`postId\` (\`post_id\`), 
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`postId\` ON \`comment\``);
    await queryRunner.query(`DROP INDEX \`userId\` ON \`comment\``);
    await queryRunner.query(`DROP TABLE \`comment\``);
  }
}
