import { MigrationInterface, QueryRunner } from 'typeorm';

export class GroupUser1745819452796 implements MigrationInterface {
  name = 'GroupUser1745819452796';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`group_user\` (
        \`groupId\` int NOT NULL, 
        \`userId\` int NOT NULL, 
        \`isAlarm\` tinyint NOT NULL, 
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        INDEX \`userId\` (\`userId\`), 
        PRIMARY KEY (\`groupId\`, \`userId\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`userId\` ON \`group_user\``);
    await queryRunner.query(`DROP TABLE \`group_user\``);
  }
}
