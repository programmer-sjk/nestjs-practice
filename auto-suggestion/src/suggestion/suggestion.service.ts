import { Injectable } from '@nestjs/common';
import * as createTrie from 'autosuggest-trie';
import { AutoCompleteKeywords } from './dto/auto-complete-keywords.request';
import { SearchDailySum } from './entities/search-daily-sum.entity';
import { SearchDailySumRepository } from './suggestion.repository';

@Injectable()
export class SuggestionService {
  private readonly SUGGESTION_COUNT = 5;
  private trie;

  constructor(
    private readonly searchDailySumRepository: SearchDailySumRepository,
  ) {}

  async getAutoSuggestions(request: AutoCompleteKeywords) {
    return this.trie
      .getMatches(request.keyword)
      .slice(0, this.SUGGESTION_COUNT)
      .map((suggestion) => suggestion.name);
  }

  async createAutoSuggestions() {
    const dailySum = await this.searchDailySumRepository.find();
    const searchPopulation = this.calculatePopulaiton(dailySum);
    this.trie = createTrie(searchPopulation, 'name', {
      comparator: (item1, item2) =>
        item1.populaiton > item2.populaiton ? -1 : 1,
    });
  }

  private calculatePopulaiton(dailySum: SearchDailySum[]) {
    const populaitonMap = dailySum.reduce((acc, value) => {
      if (acc[value.keyword]) {
        acc[value.keyword] += value.count;
      } else {
        acc[value.keyword] = value.count;
      }

      return acc;
    }, {});

    return Object.keys(populaitonMap).map((key) => ({
      name: key,
      populaiton: populaitonMap[key],
    }));
  }
}
