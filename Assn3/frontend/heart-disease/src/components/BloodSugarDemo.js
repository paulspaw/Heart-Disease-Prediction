import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class BloodSugarDemo extends Component {

    render() {
        if (this.props.dataSet === undefined) {
            return <h2> press button to show chart </h2>
          } else {
            
            let dataSet = this.props.dataSet
            let limit = dataSet.length
            let male = {}
            let female = {}

            for(var key in dataSet){
                console.log(dataSet[0])
            }



            const options = {
                title: {
                    text: "Fasting Blood Sugar"
                },
                animationEnabled: true,
                data: [
                {
                    // Change type to "doughnut", "line", "splineArea", etc.
                    type: "column",
                    dataPoints: [
                        { label: "male over 120",  y: 10  },
                        { label: "female over 120", y: 15  },
                        { label: "male less 120", y: 25  },
                        { label: "female less 120",  y: 30  },
                    ]
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

