import { Lesson } from './../../../src/lesson/entities/lesson.entity';
import { TestLessonCreator } from './../../fixture/entity/test-lesson-creator';

describe('lesson', () => {
  it('정규 레슨인지 확인할 수 있다.', () => {
    // given
    const lesson = TestLessonCreator.regular();

    // when
    const result = lesson.isRegular();

    // then
    expect(result).toBe(true);
  });

  it('일회성 레슨인지 확인할 수 있다.', () => {
    // given
    const lesson = TestLessonCreator.oneTime();

    // when
    const result = lesson.isOneTime();

    // then
    expect(result).toBe(true);
  });

  describe('isInvalidLessonHour', () => {
    it.each([7, 8, 9, 12, 15, 21, 22])(
      '레슨 시간이 올바르면 false를 반환한다.',
      (lessonHour) => {
        // given
        const lesson = TestLessonCreator.of(lessonHour);

        // when
        const result = lesson.isInvalidLessonHour();

        // then
        expect(result).toBe(false);
      },
    );

    it.each([23, 0, 1, 2, 3, 4, 5, 6])(
      '레슨 시간이 올바르지 않으면 true를 반환한다.',
      (lessonHour) => {
        // given
        const lesson = TestLessonCreator.of(lessonHour);

        // when
        const result = lesson.isInvalidLessonHour();

        // then
        expect(result).toBe(true);
      },
    );
  });

  describe('isInvalidLessonDate', () => {
    it.each(['2025-02-08', '2025-02-09', '2025-02-10', '2025-02-11'])(
      '레슨 날짜가 올바르면 false를 반환한다.',
      (startDate) => {
        // given
        jest.useFakeTimers().setSystemTime(new Date('2025-02-07'));

        const lesson = new Lesson();
        lesson.startDate = new Date(startDate);

        // when
        const result = lesson.isInvalidLessonDate();

        // then
        expect(result).toBe(false);
      },
    );

    it.each(['2025-01-08', '2025-01-09', '2025-01-10', '2025-01-11'])(
      '레슨 시간이 올바르지 않으면 false를 반환한다.',
      (startDate) => {
        // given
        const lesson = new Lesson();
        lesson.startDate = new Date(startDate);

        // when
        const result = lesson.isInvalidLessonDate();

        // then
        expect(result).toBe(true);
      },
    );
  });
});
