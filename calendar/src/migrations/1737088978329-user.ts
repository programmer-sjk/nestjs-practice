import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1737088978329 implements MigrationInterface {
  name = 'User1737088978329';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`name\` varchar(16) NOT NULL, 
        \`mail\` varchar(16) NOT NULL,
        \`phoneNumber\` varchar(11) NOT NULL,
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        \`deletedAt\` datetime(6) NULL, 
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`user\``);
  }
}
