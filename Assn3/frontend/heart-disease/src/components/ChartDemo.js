import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class ChartDemo extends Component {

  render() {

    if (this.props.dataSet === undefined) {
      return <h2> press button to show chart </h2>
    } else {
      console.log(this.props.dataSet)
      const options = {
        title: {
          text: "Basic Column Chart in React"
        },      
        data: [{				  
                  type: "column",
                  dataPoints: [
                      { label: "Apple",  y: 10  },
                      { label: "Orange", y: 15  },
                      { label: "Banana", y: 25  },
                      { label: "Mango",  y: 30  },
                      { label: "Grape",  y: 28  }
                  ]
        }]
    }
      
    return (
        <div>
          <CanvasJSChart options = {options}
              /* onRef = {ref => this.chart = ref} */
          />
          {/* <button onClick={this.getData}>click to test</button> */}
        </div>
      );
    }
  }
}
