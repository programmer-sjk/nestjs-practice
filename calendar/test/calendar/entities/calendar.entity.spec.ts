import { TestCalendarFactory } from '../../fixture/test-calendar-factory';

describe('Calendar', () => {
  describe('update', () => {
    it('캘린더를 업데이트 할 수 있다.', async () => {
      // given
      const calendar = TestCalendarFactory.of('전체 회의');

      // when
      calendar.update(
        '개발팀 회의',
        new Date('2025-01-31 15:00:00'),
        new Date('2025-01-31 16:00:00'),
      );

      // then
      expect(calendar.title).toBe('개발팀 회의');
      expect(calendar.startDate).toEqual(new Date('2025-01-31 15:00:00'));
      expect(calendar.endDate).toEqual(new Date('2025-01-31 16:00:00'));
    });
  });
});
