import { MigrationInterface, QueryRunner } from "typeorm";

export class Billing1733369560233 implements MigrationInterface {
    name = 'Billing1733369560233'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`billing\` (\`id\` int NOT NULL AUTO_INCREMENT, \`order_id\` int NOT NULL, \`billing_key\` varchar(16) NOT NULL, \`status\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`REL_6f7b14365f5a49ae1479ea24d2\` (\`order_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`billing\` ADD CONSTRAINT \`FK_6f7b14365f5a49ae1479ea24d2c\` FOREIGN KEY (\`order_id\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`billing\` DROP FOREIGN KEY \`FK_6f7b14365f5a49ae1479ea24d2c\``);
        await queryRunner.query(`DROP INDEX \`REL_6f7b14365f5a49ae1479ea24d2\` ON \`billing\``);
        await queryRunner.query(`DROP TABLE \`billing\``);
    }

}
