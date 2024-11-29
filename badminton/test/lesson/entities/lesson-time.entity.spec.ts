import { DayUtil } from '../../../src/common/day-util';
import { TestLessonCreator } from '../../fixture/entity/test-lesson-creator';
import { LessonTime } from './../../../src/lesson/entities/lesson-time.entity';

describe('LessonTime', () => {
  it('레슨 시간에 대한 유효성 검증을 할 수 있다.', () => {
    // given
    // when
    // then
  });

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
