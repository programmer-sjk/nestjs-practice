import { Injectable } from '@nestjs/common';
import * as createTrie from 'autosuggest-trie';
import { SearchDailySum } from './entities/search-daily-sum.entity';
import { SearchDailySumRepository } from './suggestion.repository';

@Injectable()
export class SuggestionService {
  private trie;

  constructor(
    private readonly searchDailySumRepository: SearchDailySumRepository,
  ) {}

  async createAutoSuggestions() {
    const dailySum = await this.searchDailySumRepository.find();
    const searchPopulation = this.calculatePopulaiton(dailySum);
    this.trie = createTrie(searchPopulation, 'name');
  }

  private calculatePopulaiton(dailySum: SearchDailySum[]) {
    const populaitonMap = {};
    for (const sum of dailySum) {
      if (populaitonMap[sum.keyword]) {
        populaitonMap[sum.keyword] += sum.count;
      } else {
        populaitonMap[sum.keyword] = sum.count;
        console.log(populaitonMap);
      }
    }

    return Object.keys(populaitonMap).map((key) => ({
      name: key,
      populaiton: populaitonMap[key],
    }));
  }
}
