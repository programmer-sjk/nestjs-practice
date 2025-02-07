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

  describe('isInvalidLessonDate', () => {
    it.each([7, 8, 9, 12, 15, 21, 22])(
      '레슨 시간이 올바르면 true를 반환한다.',
      (lessonHour) => {
        // given
        const lesson = TestLessonCreator.of(lessonHour);

        // when
        const result = lesson.isInvalidLessonHour();

        // then
        expect(result).toBe(true);
      },
    );

    it.each([23, 0, 1, 2, 3, 4, 5, 6])(
      '레슨 시간이 올바르지 않으면 false를 반환한다.',
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
});
