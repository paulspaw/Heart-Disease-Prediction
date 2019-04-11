import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class ChartDemo extends Component {

    compare = (pro) => { 
      return (obj1, obj2) => { 
        let val1 = obj1[pro]; 
        let val2 = obj2[pro]; 
        if (val1 < val2 ) { //正序
            return 1; 
        } else if (val1 > val2 ) { 
            return -1; 
        } else { 
            return 0; 
        } 
      } 
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

  render() {

  if (this.props.dataSet === undefined) {
    return <h2> press button to show chart </h2>
  } else {
    
    let dataSet = this.props.dataSet
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

    dataPoints1.sort(this.compare('age'))
    dataPoints2.sort(this.compare('age'))

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
			<h1>React Scatter Chart with Custom Markers</h1>
			<CanvasJSChart options = {options} 
				onRef={ref => this.chart = ref}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
    }
  }
}
