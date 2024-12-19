import { MigrationInterface, QueryRunner } from 'typeorm';

export class ShortUrl1734592261253 implements MigrationInterface {
  name = 'ShortUrl1734592261253';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`short_url\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`original\` varchar(255) NOT NULL, 
        \`url\` varchar(255) NOT NULL, 
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`short_url\``);
  }
}
