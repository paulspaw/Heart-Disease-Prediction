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
    let dataPoints_male_1 = []
		let dataPoints_male_2 = []
		let dataPoints_male_3 = []
		let dataPoints_male_4 = []
		let dataPoints_female_1 = []
		let dataPoints_female_2 = []
		let dataPoints_female_3 = []
		let dataPoints_female_4 = []

		let dataAge_male = {}
		let dataAge_female = {}

		for(let age = 30; age <= 75; age += 1){
			let count_male = [0,0,0,0]
			let count_female = [0,0,0,0]
			for(let i = 0; i < limit; i += 1){
				if(dataSet[i].age === age && dataSet[i].sex === 1){
					switch(dataSet[i].chest){
						case 1: count_male[0] += 1; break;
						case 2: count_male[1] += 1; break;
						case 3: count_male[2] += 1; break;
						case 4: count_male[3] += 1; break;
					}
				}else if(dataSet[i].age === age && dataSet[i].sex === 0){
					switch(dataSet[i].chest){
						case 1: count_female[0] += 1; break;
						case 2: count_female[1] += 1; break;
						case 3: count_female[2] += 1; break;
						case 4: count_female[3] += 1; break;
					}
				} 
			}
			dataAge_male[age] = count_male
			dataAge_female[age] = count_female
		}
		
		
		for(var key in dataAge_male){
			console.log('key :', key);
			dataPoints_male_1.push({
				x: key/1,
				y: dataAge_male[key][0]
			})
			dataPoints_male_2.push({
				x: key/1,
				y: dataAge_male[key][1]
			})
			dataPoints_male_3.push({
				x: key/1,
				y: dataAge_male[key][2]
			})
			dataPoints_male_4.push({
				x: key/1,
				y: dataAge_male[key][3]
			})
		}
		
		for(var key in dataAge_female){
			console.log('key :', key);
			dataPoints_female_1.push({
				x: key/1,
				y: dataAge_female[key][0]
			})
			dataPoints_female_2.push({
				x: key/1,
				y: dataAge_female[key][1]
			})
			dataPoints_female_3.push({
				x: key/1,
				y: dataAge_female[key][2]
			})
			dataPoints_female_4.push({
				x: key/1,
				y: dataAge_female[key][3]
			})
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
				title: "Quantity",
				// suffix: "%"
			},
			legend: {
				cursor: "pointer",
				itemclick: this.toggleDataSeries
			},

			data: [{
				type: "line",
				name: "Male_type_1",
				showInLegend: true,
				toolTipContent: "<span style=\"color:#FFCC00 \">{name}</span><br>Age: {x}<br>quantity: {y}",
				dataPoints: dataPoints_male_1
			},
			{
				type: "line",
				name: "Male_type_2",
				showInLegend: true,
				toolTipContent: "<span style=\"color:#808000 \">{name}</span><br>Age: {x}<br>quantity: {y}",
				dataPoints: dataPoints_male_2
			},
			{
				type: "line",
				name: "Male_type_3",
				showInLegend: true,
				toolTipContent: "<span style=\"color:#008080 \">{name}</span><br>Age: {x}<br>quantity: {y}",
				dataPoints: dataPoints_male_3
			},
			{
				type: "line",
				name: "Male_type_4",
				showInLegend: true,
				toolTipContent: "<span style=\"color:#4B0080\">{name}</span><br>Age: {x}<br>quantity: {y}",
				dataPoints: dataPoints_male_4
			},
			{
				type: "line",
				name: "Female_type_1",
				showInLegend: true,
				markerType: "cross",
				toolTipContent: "<span style=\"color:#FF8C69 \">{name}</span><br>Age: {x}<br>quantity: {y}",
				dataPoints: dataPoints_female_1
			},
			{
				type: "line",
				name: "Female_type_2",
				showInLegend: true,
				markerType: "cross",
				toolTipContent: "<span style=\"color:#FFE5B4 \">{name}</span><br>Age: {x}<br>quantity: {y}",
				dataPoints: dataPoints_female_2
			},
			{
				type: "line",
				name: "Female_type_3",
				showInLegend: true,
				markerType: "cross",
				toolTipContent: "<span style=\"color:#E6E6FA\">{name}</span><br>Age: {x}<br>quantity: {y}",
				dataPoints: dataPoints_female_3
			},
			{
				type: "line",
				name: "Female_type_4",
				showInLegend: true,
				markerType: "cross",
				toolTipContent: "<span style=\"color:#FF7F50 \">{name}</span><br>Age: {x}<br>quantity: {y}",
				dataPoints: dataPoints_female_4
			}
		]
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
