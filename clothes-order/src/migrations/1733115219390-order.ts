import { MigrationInterface, QueryRunner } from 'typeorm';

export class Order1733115219390 implements MigrationInterface {
  name = 'Order1733115219390';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`order\` (\`id\` int NOT NULL AUTO_INCREMENT, \`price\` int NOT NULL, \`status\` varchar(255) NOT NULL, \`deliveryStatus\` varchar(255) NOT NULL, \`customerZipCode\` varchar(16) NOT NULL, \`customerAddress\` varchar(32) NOT NULL, \`customerAddressDetail\` varchar(16) NOT NULL, \`returnRequestAt\` datetime NULL, \`completedAt\` datetime NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`customerId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`order_item\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, \`category\` varchar(255) NOT NULL, \`subCategory\` varchar(255) NOT NULL, \`count\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`orderId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`order_location\` (\`id\` int NOT NULL AUTO_INCREMENT, \`storeId\` int NOT NULL, \`orderId\` int NOT NULL, \`section\` varchar(255) NOT NULL, \`rowNum\` int NOT NULL, \`colNum\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`order_id\` int NULL, UNIQUE INDEX \`REL_7ecb4c920ac067c14945264a7d\` (\`order_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_124456e637cca7a415897dce659\` FOREIGN KEY (\`customerId\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_item\` ADD CONSTRAINT \`FK_646bf9ece6f45dbe41c203e06e0\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_location\` ADD CONSTRAINT \`FK_7ecb4c920ac067c14945264a7d2\` FOREIGN KEY (\`order_id\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`order_location\` DROP FOREIGN KEY \`FK_7ecb4c920ac067c14945264a7d2\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_item\` DROP FOREIGN KEY \`FK_646bf9ece6f45dbe41c203e06e0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_124456e637cca7a415897dce659\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_7ecb4c920ac067c14945264a7d\` ON \`order_location\``,
    );
    await queryRunner.query(`DROP TABLE \`order_location\``);
    await queryRunner.query(`DROP TABLE \`order_item\``);
    await queryRunner.query(`DROP TABLE \`order\``);
  }
}
