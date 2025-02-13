import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1739424090304 implements MigrationInterface {
  name = 'User1739424090304';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`email\` varchar(16) NOT NULL, 
        \`password\` varchar(255) NOT NULL, 
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        \`deleted_at\` datetime(6) NULL, 
        UNIQUE INDEX \`email\` (\`email\`), 
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`email\` ON \`user\``);
    await queryRunner.query(`DROP TABLE \`user\``);
  }
}
