import { MigrationInterface, QueryRunner } from 'typeorm';

export class Order1733369392535 implements MigrationInterface {
  name = 'Order1733369392535';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`order_item\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`status\` varchar(16) NOT NULL, 
        \`type\` varchar(16) NOT NULL, 
        \`category\` varchar(16) NOT NULL, 
        \`sub_category\` varchar(16) NOT NULL, 
        \`count\` int NOT NULL, 
        \`requested_at\` datetime NULL, 
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        \`order_id\` int NULL, 
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`order\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`customer_id\` int NOT NULL, 
        \`price\` int NOT NULL, 
        \`status\` varchar(16) NOT NULL, 
        \`delivery_status\` varchar(16) NOT NULL, 
        \`customer_zip_code\` varchar(5) NOT NULL, 
        \`customer_address\` varchar(32) NOT NULL, 
        \`customer_address_detail\` varchar(16) NOT NULL, 
        \`completed_at\` datetime NULL, 
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), 
        \`deleted_at\` datetime(6) NULL, 
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`order_location\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`store_id\` int NOT NULL, 
        \`order_id\` int NOT NULL, 
        \`section\` varchar(32) NOT NULL, 
        \`row_num\` int NOT NULL, 
        \`col_num\` int NOT NULL, 
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        UNIQUE INDEX \`REL_7ecb4c920ac067c14945264a7d\` (\`order_id\`), 
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_item\` ADD CONSTRAINT \`FK_e9674a6053adbaa1057848cddfa\` FOREIGN KEY (\`order_id\`) REFERENCES \`order\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_cd7812c96209c5bdd48a6b858b0\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_location\` ADD CONSTRAINT \`FK_7ecb4c920ac067c14945264a7d2\` FOREIGN KEY (\`order_id\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_location\` ADD CONSTRAINT \`FK_a80b0d4ebf2388268a8f21e23e9\` FOREIGN KEY (\`store_id\`) REFERENCES \`store\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`order_location\` DROP FOREIGN KEY \`FK_a80b0d4ebf2388268a8f21e23e9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_location\` DROP FOREIGN KEY \`FK_7ecb4c920ac067c14945264a7d2\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_cd7812c96209c5bdd48a6b858b0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_item\` DROP FOREIGN KEY \`FK_e9674a6053adbaa1057848cddfa\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_7ecb4c920ac067c14945264a7d\` ON \`order_location\``,
    );
    await queryRunner.query(`DROP TABLE \`order_location\``);
    await queryRunner.query(`DROP TABLE \`order\``);
    await queryRunner.query(`DROP TABLE \`order_item\``);
  }
}
