import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class SerumDemo extends Component {
    render() {

        if (this.props.dataSet === undefined) {
          return <h2> press button to show chart </h2>
        } else {
          
        let dataSet = this.props.dataSet
        let limit = dataSet.length
        let dataPoints_male = []
        let dataPoints_female = []
        let avgSerumMale = {}
        let avgSerumFemale = {}

        for(let age = 30; age <= 75; age += 1){
            let sum_male = 0
            let sum_female = 0
            let cnt_male = 0
            let cnt_female = 0
			for(let i = 0; i < limit; i += 1){
				if(dataSet[i].age === age && dataSet[i].sex === 1){
                    sum_male += dataSet[i].serum
                    cnt_male += 1
				}else if(dataSet[i].age === age && dataSet[i].sex === 0){
                    sum_female += dataSet[i].serum
                    cnt_female += 1
				} 
            }
            avgSerumMale[age] = sum_male / cnt_male
            avgSerumFemale[age] = sum_female / cnt_female
        }
        
        for(var key in avgSerumMale){
            dataPoints_male.push({
                x: key/1,
                y: avgSerumMale[key]
            })
            dataPoints_female.push({
                x: key/1,
                y: avgSerumFemale[key]
            })
        }

        

    

        const options = {
            theme: "light2",
            animationEnabled: true,
            zoomEnabled: true,
            title: {
                text: " Aveage of Serum Cholestoral group by Gender and Age"
            },
            axisX: {
                title: "Age"
            },
            axisY: {
                title: "mg/dl",
                // suffix: "%"
            },
            legend: {
                cursor: "pointer",
                itemclick: this.toggleDataSeries
            },

            data: [{
                type: "line",
                name: "Male",
                showInLegend: true,
                toolTipContent: "<span style=\"color:#FFCC00 \">{name}</span><br>Age: {x}<br>aveage serum: {y} ml/dl",
                dataPoints: dataPoints_male
            },
            {
                type: "line",
                name: "Female",
                showInLegend: true,
                toolTipContent: "<span style=\"color:#808000 \">{name}</span><br>Age: {x}<br>aveage serum: {y} ml/dl",
                dataPoints: dataPoints_female
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
