import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1742362277703 implements MigrationInterface {
  name = 'User1742362277703';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`email\` varchar(16) NOT NULL, 
        \`password\` varchar(255) NOT NULL, 
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        UNIQUE INDEX \`email\` (\`email\`), 
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`email\` ON \`user\``);
    await queryRunner.query(`DROP TABLE \`user\``);
  }
}
