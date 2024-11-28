import { DayUtil } from '../../../src/common/day-util';
import { TestLessonCreator } from './../../fixture/entity/test-lesson-creator';
import { TestLessonTimeCreator } from './../../fixture/entity/test-lesson-time-creator';

describe('Lesson', () => {
  it('일회성 레슨인지 확인할 수 있다.', () => {
    // given
    const lesson = TestLessonCreator.createOneTimeLesson();

    // when
    const result = lesson.isOneTimeLesson();

    // then
    expect(result).toBe(true);
  });

  it('정규 레슨인지 확인할 수 있다.', () => {
    // given
    const lesson = TestLessonCreator.createRegularLesson();

    // when
    const result = lesson.isRegularLesson();

    // then
    expect(result).toBe(true);
  });

  it('레슨 시간 목록을 업데이트 할 수 있다.', () => {
    // given
    const lesson = TestLessonCreator.createOneTimeLesson();
    const lessonTimes = [
      TestLessonTimeCreator.createOneTimeLessonTimes(
        lesson,
        DayUtil.now().toDate(),
      ),
    ];

    // when
    lesson.updateLessonTimes(lessonTimes);

    // then
    expect(lesson.lessonTimes).toEqual(lessonTimes);
  });

  it('패스워드를 업데이트 할 수 있다.', () => {
    // given
    const lesson = TestLessonCreator.createRegularLesson();

    // when
    lesson.updatePassword('password');

    // then
    expect(lesson.password).toBe('password');
  });

  it('레슨 시간 목록에 대한 유효성 검증을 할 수 있다.', () => {
    // given
    const lesson = TestLessonCreator.createOneTimeLesson();
    lesson.lessonTimes = [
      TestLessonTimeCreator.createOneTimeLessonTimes(
        lesson,
        DayUtil.addFromNow(1, 10).toDate(),
      ),
    ];

    // when & then
    lesson.validateLessonTimes();
  });

  it('1회성 레슨의 시간이 한개가 아니라면 예외가 발생한다.', () => {
    // given
    const lesson = TestLessonCreator.createOneTimeLesson();
    lesson.lessonTimes = [
      TestLessonTimeCreator.createOneTimeLessonTimes(
        lesson,
        DayUtil.now().toDate(),
      ),
      TestLessonTimeCreator.createOneTimeLessonTimes(
        lesson,
        DayUtil.now().toDate(),
      ),
    ];

    // when & then
    expect(() => lesson.validateLessonTimes()).toThrow(
      new Error('1회성 레슨의 예약 횟수가 잘못되었습니다.'),
    );
  });

  it('정규 레슨은 일주일에 최대 3개의 예약을 할 수 있다.', () => {
    // given
    const lesson = TestLessonCreator.createRegularLesson();
    lesson.lessonTimes = [
      TestLessonTimeCreator.createRegularLessonTimes(lesson),
      TestLessonTimeCreator.createRegularLessonTimes(lesson),
      TestLessonTimeCreator.createRegularLessonTimes(lesson),
      TestLessonTimeCreator.createRegularLessonTimes(lesson),
    ];

    // when & then
    expect(() => lesson.validateLessonTimes()).toThrow(
      new Error('정규 레슨의 예약 횟수가 잘못되었습니다.'),
    );
  });
});
