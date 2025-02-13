import { MigrationInterface, QueryRunner } from 'typeorm';

export class Admin1739419158712 implements MigrationInterface {
  name = 'Admin1739419158712';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`admin\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`email\` varchar(16) NOT NULL, 
        \`password\` varchar(255) NOT NULL, 
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        \`deleted_at\` datetime(6) NULL, 
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`admin\``);
  }
}
