import { Customer } from '../../src/customer/entities/customer.entity';
import { DayUtil } from './../../src/common/day-util';

describe('Customer', () => {
  it('가입한지 3개월 미만인 유저들은 신규 고객이다.', () => {
    // given
    const customer = new Customer();
    customer.createdAt = DayUtil.add(-89).toDate();

    // when
    const result = customer.isNewMember();

    // then
    expect(result).toBe(true);
  });

  it('가입한지 3개월이 넘는 유저들은 신규 고객이 아니다.', () => {
    // given
    const customer = new Customer();
    customer.createdAt = DayUtil.add(-100).toDate();

    // when
    const result = customer.isNewMember();

    // then
    expect(result).toBe(false);
  });
});
