'use strict';

import {
  GraphQLObjectType
} from 'graphql';

import geo from 'schemas/geo';

import landfill from './landfill';
import OIPList from './OIPList';
import culture from './culture';

export default {
  description: '台灣政府開放資料',
  args: {
    geo: geo('taiwan', 'chi')
  },
  resolve: (parent, {geo}) => {
    return geo ? {geo} : {};
  },
  type: new GraphQLObjectType({
    name: 'taiwan',
    description: '台灣政府開放資料',
    fields: () => ({
      landfill,
      OIPList,
      independentMusic: culture(
        'independentMusic',
        'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=5',
        '文化部獨立音樂'
      ),
      election: culture(
        'election',
        'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=14',
        '文化部徵選活動'
      ),
      competition: culture(
        'competition',
        'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=13',
        '文化部競賽活動'
      ),
      varietyShow: culture(
        'varietyShow',
        'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=11',
        '文化部綜藝活動'
      ),
      movie: culture(
        'movie',
        'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=8',
        '文化部電影'
      ),
      lecture: culture(
        'lecture',
        'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=7',
        '文化部講座資訊'
      ),
      exhibition: culture(
        'exhibition',
        'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6',
        '文化部展覽資訊'
      ),
      concert: culture(
        'concert',
        'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=17',
        '文化部演唱會'
      ),
      familyActivities: culture(
        'familyActivities',
        'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=4',
        '文化部親子活動'
      )
    })
  })
};
