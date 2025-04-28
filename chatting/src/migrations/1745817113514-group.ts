import { MigrationInterface, QueryRunner } from 'typeorm';

export class Group1745817113514 implements MigrationInterface {
  name = 'Group1745817113514';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`group\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`name\` varchar(32) NOT NULL, 
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`group\``);
  }
}
