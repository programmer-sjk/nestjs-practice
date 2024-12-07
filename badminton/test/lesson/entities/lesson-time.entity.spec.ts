import { DayUtil } from '../../../src/common/day-util';
import { TestLessonCreator } from '../../fixture/entity/test-lesson-creator';
import { LessonTime } from './../../../src/lesson/entities/lesson-time.entity';

describe('LessonTime', () => {
  it('레슨 시간에 대한 유효성 검증을 할 수 있다.', () => {
    // given
    const lesson = TestLessonCreator.createOneTimeLesson();
    const lessonTime = new LessonTime();
    lesson.updateLessonTimes([lessonTime]);

    const addedDay = 1;
    const hour = 10;
    lessonTime.startDate = DayUtil.addFromNow(addedDay, hour).toDate();

    // when & then
    expect(() => lessonTime.validate()).not.toThrowError();
  });

  it('레슨이 당일 예약일 경우 유효성 검증에 실패한다.', () => {
    // given
    const lesson = TestLessonCreator.createOneTimeLesson();
    const lessonTime = new LessonTime();
    lesson.updateLessonTimes([lessonTime]);
    lessonTime.startDate = DayUtil.now().toDate();

    // when & then
    expect(() => lessonTime.validate()).toThrow(
      new Error('당일 레슨 예약은 불가능합니다.'),
    );
  });

  it.each([5, 6, 23, 0])(
    '레슨 시간이 아침 7시부터 저녁 11시를 벗어나면 유효성 검증에 실패한다.',
    (hour) => {
      // given
      const lesson = TestLessonCreator.createOneTimeLesson();
      const lessonTime = new LessonTime();
      lesson.updateLessonTimes([lessonTime]);

      const addedDay = 1;
      lessonTime.startDate = DayUtil.addFromNow(addedDay, hour).toDate();

      // when & then
      expect(() => lessonTime.validate()).toThrow(
        new Error('레슨 시간은 아침 7시부터 저녁 11시까지 입니다.'),
      );
    },
  );

  it('레슨 시작 시간을 알 수 있다.', () => {
    // given
    const lesson = TestLessonCreator.createOneTimeLesson();
    const lessonTime = new LessonTime();
    lessonTime.lesson = lesson;
    lessonTime.startDate = DayUtil.of(new Date(), 10).toDate();

    // when
    const result = lessonTime.getStartDate();

    // then
    expect(result).toEqual(lessonTime.startDate);
  });

  it('레슨 종료 시간을 알 수 있다.', () => {
    // given
    const lesson = TestLessonCreator.createOneTimeLesson();
    const lessonTime = new LessonTime();
    lessonTime.lesson = lesson;
    lessonTime.startDate = DayUtil.of(new Date(), 10).toDate();
    const endDate = DayUtil.addMinute(lessonTime.startDate, 60).toDate();

    // when
    const result = lessonTime.getEndDate();

    // then
    expect(result).toEqual(endDate);
  });

  it('레슨을 업데이트 할 수 있다.', () => {
    // given
    const lessonTime = new LessonTime();
    const lesson = TestLessonCreator.createOneTimeLesson();

    // when
    lessonTime.updateLesson(lesson);

    // then
    expect(lessonTime.lesson).toEqual(lesson);
  });
});
