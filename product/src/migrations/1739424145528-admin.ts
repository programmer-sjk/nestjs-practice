import { MigrationInterface, QueryRunner } from 'typeorm';

export class Admin1739424145528 implements MigrationInterface {
  name = 'Admin1739424145528';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`admin\` (
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
    await queryRunner.query(`DROP INDEX \`email\` ON \`admin\``);
    await queryRunner.query(`DROP TABLE \`admin\``);
  }
}
