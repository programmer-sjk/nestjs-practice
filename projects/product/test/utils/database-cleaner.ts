import { DataSource } from 'typeorm';

export class DatabaseCleaner {
  static async cleanDatabase(dataSource: DataSource): Promise<void> {
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      const entityMetadatas = dataSource.entityMetadatas;
      if (entityMetadatas.length === 0) {
        return;
      }

      // Note. 외래키 제약 off
      await queryRunner.query('SET FOREIGN_KEY_CHECKS = 0');

      // MySQL은 TRUNCATE에서 여러 테이블을 한 번에 지정할 수 없음
      for (const entityMetadata of entityMetadatas) {
        await queryRunner.query(
          `TRUNCATE TABLE \`${entityMetadata.tableName}\``,
        );
      }
    } finally {
      // Note. 외래키 제약 on
      await queryRunner.query('SET FOREIGN_KEY_CHECKS = 1');
      await queryRunner.release();
    }
  }
}
