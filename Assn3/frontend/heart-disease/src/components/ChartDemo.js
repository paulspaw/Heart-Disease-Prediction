import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class ChartDemo extends Component {

  getData = async () => {
    const res = await fetch('http://localhost:5000/collections')
    const data = await res.json()
    console.log(data[0])
    console.log(data[0].age)
  } 

  render() {
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
        <button onClick={this.getData}>click to test</button>
      </div>
    );
  }
}
