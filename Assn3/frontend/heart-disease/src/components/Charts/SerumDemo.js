import React, { Component } from 'react'
import CanvasJSReact from '../Canvas/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class PressureChart extends Component {

    state = {
        dataSet: undefined
    }

    componentDidMount() {
        fetch(`http://localhost:5000/collections/${this.props.id}`, {method: "GET"})
        .then(res => res.json())
        .then(response => this.setState({
            dataSet: response
        }))
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

        if (this.state.dataSet === undefined) {
          return <div></div>
        } else {
          
        let dataSet = this.state.dataSet
        let dataPoints_male = []
        let dataPoints_female = []
        let avgSerumMale = {}
        let avgSerumFemale = {}

        for(let age = 30; age <= 75; age += 1){
            let sum_male = 0
            let sum_female = 0
            let cnt_male = 0
            let cnt_female = 0
			for(let i = 0; i < dataSet.length; i += 1){
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
                text: " Average of Serum Cholestoral group by Gender and Age"
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
                toolTipContent: "<span style=\"color:#FFCC00 \">{name}</span><br>Age: {x}<br>average serum: {y} ml/dl",
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
        <CanvasJSChart options = {options} 
          onRef={ref => this.chart = ref}
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
      )
    }
  }
}

