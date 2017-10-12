function makeChart(code, data) {

  var series = [
    {
      values: data.map(function (d, i) {
        return {y: d['FundReturn'], x: Date.parse(d['PerformanceDate'])}
      }),
      key: "Fund",
      color: "#26327a"
    },
    {
      values: data.map(function (d, i) {
        return {y: d['BenchMarkReturn'], x: Date.parse(d['PerformanceDate'])}
      }),
      key: "Benchmark",
      color: "#66c2ad"
    }
  ];
  nv.addGraph(function () {
    var chart = nv.models.lineChart()
      .margin({left: 100, right: 50})  //Adjust chart margins to give the x-axis some breathing room.
      .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
      .showLegend(true)       //Show the legend, allowing users to turn on/off line series.
      .showYAxis(true)        //Show the y-axis
      .showXAxis(true)        //Show the x-axis


    chart.yAxis.tickFormat(function (d) {
      return 'R' + d3.format(',.2f')(d)
    })

    chart.xAxis.tickFormat(function (d) {
      return d3.time.format('%Y-%m')(new Date(d))
    });

    d3.select('#' + code)
      .datum(series)
      .call(chart);

    nv.utils.windowResize(chart.update);

    return chart;
  });
}

function makeOtherChart() {
  var time = parseInt(document.querySelector('[name="time"]').value)
  var risk = parseInt(document.querySelector('[name="risk"]').value)
  var code = risk === 1 ? 'utstrt' : risk === 2 ? 'utbade' : 'tmpbf'
  var series
  if (time === 1) series = 'SinceInception'
  if (time === 2) series = 'TenYears'
  if (time === 3) series = 'FiveYears'
  if (time === 4) series = 'ThreeYears'

  var data = fundData[code].FundPerformanceChartData[series].FundPerformanceSeries
  makeChart("interactive", data)
}

var fundData = {}
var codes = ['tmpbf', 'utbade', 'utcapp', 'utmark', 'utstrt', 'uttop']
codes.forEach(function (c) {
  d3.json('/wp-content/plugins/coronation-charts/assets/data/' + c + '.json', function (data) {

    fundData[c] = data
    var chartData = data.FundPerformanceChartData.SinceInception.FundPerformanceSeries
    makeChart(c, chartData)
  })
});

setTimeout(makeOtherChart, 3000)