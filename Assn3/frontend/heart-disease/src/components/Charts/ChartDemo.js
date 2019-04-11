import React, { Component } from 'react';
import CanvasJSReact from '../Canvas/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class ChartDemo extends Component {

    state = {
      dataSet: undefined
    }

  	toggleDataSeries = (e) => {
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else{
			e.dataSeries.visible = true;
		}
		this.chart.render();
    }

    componentDidMount() {
      fetch(`http://localhost:5000/collections/${this.props.id}`, {methond: "GET"})
        .then(res => res.json())
        .then(response => this.setState( { dataSet: response }))
    }

  render() {

    if (this.state.dataSet === undefined) {
      return <div></div>
    }
    let dataSet = this.state.dataSet.sort(this.props.compare('age'))
    // console.log(dataSet)
    let limit = dataSet.length
    let dataPoints1 = []
    let dataPoints2 = []
    
    for (let i = 0; i < limit; i += 1) {
      if (dataSet[i].sex === 1) {
        dataPoints1.push({
          x: dataSet[i].age,
          y: dataSet[i].chest
        })
      } else {
        dataPoints2.push({
          x: dataSet[i].age,
          y: dataSet[i].chest
        })
      }
    }

    const options = {
      theme: "light2",
      animationEnabled: true,
      zoomEnabled: true,
      title: {
        text: "Chest Pain Type group by Gender and Age"
      },
      axisX: {
        title: "Age"
      },
      axisY: {
        title: "Chest Pain Type",
        // suffix: "%"
      },
      legend: {
        cursor: "pointer",
        itemclick: this.toggleDataSeries
      },
      data: [{
        type: "scatter",
        name: "Male",
        markerType: "triangle",
        showInLegend: true,
        toolTipContent: "<span style=\"color:#4F81BC \">{name}</span><br>Age: {x}<br>Chest Pain Type: {y}",
        dataPoints: dataPoints1
      },
      {
        type: "scatter",
        name: "Female",
        showInLegend: true,
        markerType: "cross",
        toolTipContent: "<span style=\"color:#C0504E \">{name}</span><br>Age: {x}<br>Chest Pain Type: {y}",
        dataPoints: dataPoints2
      }]
    }
    
    return (
    <div>
      <CanvasJSChart options = {options} 
        onRef={ref => this.chart = ref}
      />
      {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
    );
  }
}
