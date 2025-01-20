import { CalendarAlarm } from '../../../src/calendar/entities/calendar-alarm.entity';
import { TestCalendarFactory } from '../../fixture/test-calendar-factory';
import { TestUserFactory } from '../../fixture/test-user-factory';
import { CalendarUser } from './../../../src/calendar/entities/calendar-user.entity';
import { TestCalendarAlarmFactory } from './../../fixture/test-calendar-alarm-factory';

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
        [],
        undefined
      );

      // then
      expect(calendar.title).toBe('개발팀 회의');
      expect(calendar.startDate).toEqual(new Date('2025-01-31 15:00:00'));
      expect(calendar.endDate).toEqual(new Date('2025-01-31 16:00:00'));
    });
  });

  describe('updateCalendarUsers', () => {
    it('캘린더의 참석자를 업데이트 할 수 있다.', async () => {
      // given
      const calendar = TestCalendarFactory.of('전체 회의');
      const user = TestUserFactory.of('반란군')
      const calendarUsers = CalendarUser.of(calendar.id, user.id);

      // when
      calendar.updateCalendarUsers([calendarUsers]);

      // then
      expect(calendar.calendarUsers).toEqual([calendarUsers])
    });
  });

  describe('updateCalendarAlarm', () => {
    it('캘린더의 알림을 업데이트 할 수 있다.', async () => {
      // given
      const calendar = TestCalendarFactory.of('전체 회의');
      const calendarAlarm = TestCalendarAlarmFactory.of(calendar.id);

      // when
      calendar.updateCalendarAlarm(calendarAlarm);

      // then
      expect(calendar.calendarAlarm).toEqual(calendarAlarm)
    });
  });
});
