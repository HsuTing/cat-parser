# 政府資料開放平臺  [![Build Status][travis-image]][travis-url]
使用[政府資料開放平臺](http://data.gov.tw/)所做[graphql](https://open-data-tw.herokuapp.com/)版本，同時因為政府的各項資料格式都盡不相同，所以在此順便統一輸出格式，讓資料存取上更為方便。

## 資料列表
- [空氣品質監測站基本資料](http://data.gov.tw/node/6075): airQualityMonitoringStation
- [河川水質監測資料](https://data.gov.tw/dataset/6078): riverWaterQualityMonitoring
- [紫外線即時監測資料](http://data.gov.tw/dataset/6076): ultraVioletMonitoring
- [紫外線測站基本資料](http://data.gov.tw/node/6077): ultraVioletStation
- [102年度原住民族歲時祭儀放假日期](https://data.gov.tw/dataset/6081): getAboriginalRitualsHolidayDates
- [原住民十大特色美食](https://data.gov.tw/dataset/6083): getAboriginalTenCharacteristicsFoods

## 使用方法
此為`graphql`本身原始 UI ，使用方法為左側輸入想要的`query`，中間則為輸出結果，右側為`schemas`的`documentation`，可從此去了解可使用的`data`以及`args`

![img](https://hsuting.github.io/open-data/imgs/init.png)

## License
MIT © [HsuTing](http://hsuting.com)

[travis-image]: https://travis-ci.org/HsuTing/open-data.svg?branch=master
[travis-url]: https://travis-ci.org/HsuTing/open-data
