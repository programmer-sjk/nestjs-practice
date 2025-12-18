import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductOptionDeletedAt1766033800926 implements MigrationInterface {
  name = 'ProductOptionDeletedAt1766033800926';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product_option_value\` ADD \`deleted_at\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_option_group\` ADD \`deleted_at\` datetime(6) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product_option_group\` DROP COLUMN \`deleted_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_option_value\` DROP COLUMN \`deleted_at\``,
    );
  }
}
