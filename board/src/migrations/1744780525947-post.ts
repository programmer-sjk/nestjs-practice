import { MigrationInterface, QueryRunner } from 'typeorm';

export class Post1744780525947 implements MigrationInterface {
  name = 'Post1744780525947';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`post\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`user_id\` int NOT NULL, 
        \`title\` varchar(64) NOT NULL, 
        \`body\` varchar(1024) NOT NULL, 
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        INDEX \`userId\` (\`user_id\`), 
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`userId\` ON \`post\``);
    await queryRunner.query(`DROP TABLE \`post\``);
  }
}
