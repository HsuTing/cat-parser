# Open-data
Use `graphql` to get open data of government.

## Getting Started
Install packages using [yarn](https://yarnpkg.com/) (we assume you have pre-installed [npm](https://www.npmjs.com/) and [node.js](https://nodejs.org/)).

```sh
yarn install && yarn build
```

Then, you just need to run server.
```sh
yarn test-server
```

## How to use

All data can get from [here](https://open-data-server.herokuapp.com/graphql) or [local](http://localhost:8000/graphql).
For exmaple, if you need to get a data, named `data` in `taiwan`, and `data` has a field named `test_field`.
You can get data with this query.
```javascript
query test {
  taiwan {
    data {
      test_field
    }
  }
}
```
you will get data like this.
```json
{
  "data": {
    "taiwan": {
      "data": {
        "test_field": "value"
      }
    }
  }
}
```
The details of all fields are in `docs` of `graphql`.

## List

- Taiwan

  | name | json | source |
  |------|------|--------|
  | landfill (垃圾掩埋場資料) | `/data/taiwan/landfill.json` | Parse from [website](http://erdb.epa.gov.tw/DataRepository/Facilities/Landfill.aspx?topic1=%E5%9C%B0&topic2=%E6%B1%A1%E6%9F%93%E9%98%B2%E6%B2%BB&subject=%E5%BB%A2%E6%A3%84%E7%89%A9%E8%99%95%E7%90%86) |
  | OIPList (職業傷病防治中心名單) | `/data/taiwan/OIPList.json` | [Link](http://data.gov.tw/node/5957) |
  | independentMusic (文化部獨立音樂) | | [Link](http://data.gov.tw/node/6006) |
  | election (文化部徵選活動) | | [Link](http://data.gov.tw/node/6007) |
  | competition (文化部競賽活動) | | [Link](http://data.gov.tw/node/6008) |
  | varietyShow (文化部綜藝活動) | | [Link](http://data.gov.tw/node/6009) |
  | movie (文化部電影) | | [Link](http://data.gov.tw/node/6010) |
  | lecture (文化部講座資訊) | | [Link](http://data.gov.tw/node/6011) |
  | exhibition (文化部展覽資訊) | | [Link](http://data.gov.tw/node/6012) |
  | concert (文化部演唱會) | | [Link](http://data.gov.tw/node/6013) |
  | familyActivities (文化部親子活動) | | [Link](http://data.gov.tw/node/6014) |

## Relay
If you need `schema` to use `relay`, you can install this project.
```sh
yarn add git+https://github.com/HsuTing/open-data.git
```

Then you can use `open-data` in `babel-relay-plugin`.
```javascript
{
  "plugins": [
    "open-data"
  ]
}
```

## License
MIT © [hsuting](http://hsuting.com)
