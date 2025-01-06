import { MigrationInterface, QueryRunner } from 'typeorm';

export class ShortUrl1736135158258 implements MigrationInterface {
  name = 'ShortUrl1736135158258';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`short_url\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`original\` varchar(255) NOT NULL, 
        \`url\` varchar(255) NOT NULL, 
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        UNIQUE INDEX \`IDX_26662a9481f4a8b5d020a6d12c\` (\`url\`), 
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_26662a9481f4a8b5d020a6d12c\` ON \`short_url\``,
    );
    await queryRunner.query(`DROP TABLE \`short_url\``);
  }
}
