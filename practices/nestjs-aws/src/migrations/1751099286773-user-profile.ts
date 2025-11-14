import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserProfile1751099286773 implements MigrationInterface {
  name = 'UserProfile1751099286773';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user_profile\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`user_id\` int NOT NULL, 
        \`path\` varchar(255) NOT NULL, 
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), 
        INDEX \`userId\` (\`user_id\`), 
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`userId\` ON \`user_profile\``);
    await queryRunner.query(`DROP TABLE \`user_profile\``);
  }
}
