import React, { Component } from 'react';
import CanvasJSReact from '../Canvas/canvasjs.react';
import { object } from 'prop-types';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class BloodSugarDemo extends Component {

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


    computeAmount = (Obj) =>{
        let result_male = {}
        let result_female = {}

        for(let age = 30; age < 75; age += 1){
            let cnt_male = [0,0]
            let cnt_female = [0,0]
            for(var key in Obj){
                if(Obj[key].age === age && Obj[key].sex === 1){
                    switch(Obj[key].sugar){
                        case 1: cnt_male[0] += 1;break;
                        default: cnt_male[1] += 1;break;
                    }
                }
                if(Obj[key].age === age && Obj[key].sex === 0){
                    switch(Obj[key].sugar){
                        case 1: cnt_female[0] += 1;break;
                        default: cnt_female[1] += 1;break;
                    }
                }

            }
            result_male[age] = cnt_male
            result_female[age] = cnt_female
        }
        
        return {male:result_male,female:result_female} 
    }

    render() {
        if (this.state.dataSet === undefined) {
            return <div></div>
          } else {
            
            let dataSet = this.state.dataSet
            let obj = this.computeAmount(dataSet)
            let male = obj.male
            let female = obj.female
            let dataPoints_male_high = []
            let dataPoints_male_low = []
            let dataPoints_female_high = []
            let dataPoints_female_low = []

            //console.log('male[50] :', male[50]);

            for(let key in male){
                dataPoints_male_high.push({
                    x: key/1,
                    y: male[key][0]
                })
                dataPoints_male_low.push({
                    x: key/1,
                    y: male[key][1]
                })
            }

            for(let key in female){
                dataPoints_female_high.push({
                    x: key/1,
                    y: female[key][0]
                })
                dataPoints_female_low.push({
                    x: key/1,
                    y: female[key][1]
                })
            }

            const options = {
                theme: "light2",
                animationEnabled: true,
                zoomEnabled: true,
                title: {
                    text: " fasting blood sugar"
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
                    name: "Male more than 120",
                    showInLegend: true,
                    toolTipContent: "<span style=\"color:#FFCC00 \">{name}</span><br>Age: {x}<br>Quantity: {y}",
                    dataPoints: dataPoints_male_high
                },
                {
                    type: "line",
                    name: "Male less than 120",
                    showInLegend: true,
                    toolTipContent: "<span style=\"color:#808000 \">{name}</span><br>Age: {x}<br>Quantity: {y}",
                    dataPoints: dataPoints_male_low
                },
                {
                    type: "line",
                    name: "Female more than 120",
                    showInLegend: true,
                    toolTipContent: "<span style=\"color:#FFCC00 \">{name}</span><br>Age: {x}<br>Quantity: {y}",
                    dataPoints: dataPoints_female_high
                },
                {
                    type: "line",
                    name: "Female less than 120",
                    showInLegend: true,
                    toolTipContent: "<span style=\"color:#808000 \">{name}</span><br>Age: {x}<br>Quantity: {y}",
                    dataPoints: dataPoints_female_low
                }
            ]
            }
            
            return (
            <div>
                <h1>React Column Chart</h1>
                <CanvasJSChart options = {options} 
                    /* onRef={ref => this.chart = ref} */
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
            );
        }
    }
}

