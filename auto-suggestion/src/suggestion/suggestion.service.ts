import { Injectable } from '@nestjs/common';
import { SearchDailySum } from './entities/search-daily-sum.entity';
import { SearchDailySumRepository } from './suggestion.repository';

@Injectable()
export class SuggestionService {
  constructor(
    private readonly searchDailySumRepository: SearchDailySumRepository,
  ) {}

  async createAutoSuggestions() {
    const dailySum = await this.searchDailySumRepository.find();
    const searchPopulation = this.calculatePopulaiton(dailySum);
  }

  private calculatePopulaiton(dailySum: SearchDailySum[]) {
    const populaitonMap = {};
    for (const sum of dailySum) {
      const target = populaitonMap[sum.keyword];
      if (target) {
        target.population += sum.count;
      } else {
        populaitonMap[sum.keyword] = sum.count;
      }
    }

    return Object.keys(populaitonMap).map((key) => ({
      name: key,
      populaiton: populaitonMap[key],
    }));
  }
}
