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
  | OIPList (職業傷病防治中心名單) | `/data/taiwan/OIPList.json` | [Download](http://data.gov.tw/iisi/logaccess/77094?dataUrl=http://apiservice.mol.gov.tw/OdService/download/A17000000J-000003-gnl&ndctype=JSON&ndcnid=5957) |
  | independentMusic (文化部獨立音樂) | | [Link](https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=5) |

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
