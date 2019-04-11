import React, { Component } from 'react';
import CanvasJSReact from '../Canvas/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class ChartDemo extends Component {
  
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

      let dataPoints_male_1 = [
        {label: "<45",   y: 0},
        {label: "45-55", y: 0},
        {label: "55-65", y: 0},
        {label: "65-75", y: 0},
        {label: ">75",   y: 0}
      ]

      let dataPoints_male_2 = [
        {label: "<45",   y: 0},
        {label: "45-55", y: 0},
        {label: "55-65", y: 0},
        {label: "65-75", y: 0},
        {label: ">75",   y: 0}
      ]

      let dataPoints_male_3 = [
        {label: "<45",   y: 0},
        {label: "45-55", y: 0},
        {label: "55-65", y: 0},
        {label: "65-75", y: 0},
        {label: ">75",   y: 0}
      ]
      let dataPoints_male_4 = [
        {label: "<45",   y: 0},
        {label: "45-55", y: 0},
        {label: "55-65", y: 0},
        {label: "65-75", y: 0},
        {label: ">75",   y: 0}
      ]

      let dataPoints_female_1 = [
        {label: "<45",   y: 0},
        {label: "45-55", y: 0},
        {label: "55-65", y: 0},
        {label: "65-75", y: 0},
        {label: ">75",   y: 0}
      ]

      let dataPoints_female_2 = [
        {label: "<45",   y: 0},
        {label: "45-55", y: 0},
        {label: "55-65", y: 0},
        {label: "65-75", y: 0},
        {label: ">75",   y: 0}
      ]

      let dataPoints_female_3 = [
        {label: "<45",   y: 0},
        {label: "45-55", y: 0},
        {label: "55-65", y: 0},
        {label: "65-75", y: 0},
        {label: ">75",   y: 0}
      ]
      let dataPoints_female_4 = [
        {label: "<45",   y: 0},
        {label: "45-55", y: 0},
        {label: "55-65", y: 0},
        {label: "65-75", y: 0},
        {label: ">75",   y: 0}
      ]

      let dataAge_male = {}
      let dataAge_female = {}

      for(let age = 30; age <= 85; age += 1){
        let count_male = [0,0,0,0]
        let count_female = [0,0,0,0]
        for(let i = 0; i < dataSet.length; i += 1){
          if(dataSet[i].age === age && dataSet[i].sex === 1){
            switch(dataSet[i].chest){
              case 1: count_male[0] += 1; break;
              case 2: count_male[1] += 1; break;
              case 3: count_male[2] += 1; break;
              case 4: count_male[3] += 1; break;
              default: return;
            }
          }else if(dataSet[i].age === age && dataSet[i].sex === 0){
            switch(dataSet[i].chest){
              case 1: count_female[0] += 1; break;
              case 2: count_female[1] += 1; break;
              case 3: count_female[2] += 1; break;
              case 4: count_female[3] += 1; break;
              default: return;
            }
          } 
        }
        dataAge_male[age] = count_male
        dataAge_female[age] = count_female
      }
      
      for (let key in dataAge_male) {
        if (key < 45) {
          dataPoints_male_1[0].y += dataAge_male[key][0]
          dataPoints_male_2[0].y += dataAge_male[key][1]
          dataPoints_male_3[0].y += dataAge_male[key][2]
          dataPoints_male_4[0].y += dataAge_male[key][3]
        } else if (key < 55) {
          dataPoints_male_1[1].y += dataAge_male[key][0]
          dataPoints_male_2[1].y += dataAge_male[key][1]
          dataPoints_male_3[1].y += dataAge_male[key][2]
          dataPoints_male_4[1].y += dataAge_male[key][3]
        } else if (key < 65) {
          dataPoints_male_1[2].y += dataAge_male[key][0]
          dataPoints_male_2[2].y += dataAge_male[key][1]
          dataPoints_male_3[2].y += dataAge_male[key][2]
          dataPoints_male_4[2].y += dataAge_male[key][3]
        } else if (key < 75) {
          dataPoints_male_1[3].y += dataAge_male[key][0]
          dataPoints_male_2[3].y += dataAge_male[key][1]
          dataPoints_male_3[3].y += dataAge_male[key][2]
          dataPoints_male_4[3].y += dataAge_male[key][3]
        } else {
          dataPoints_male_1[4].y += dataAge_male[key][0]
          dataPoints_male_2[4].y += dataAge_male[key][1]
          dataPoints_male_3[4].y += dataAge_male[key][2]
          dataPoints_male_4[4].y += dataAge_male[key][3]
        }
      }

      for (let key in dataAge_female) {
        if (key < 45) {
          dataPoints_female_1[0].y += dataAge_female[key][0]
          dataPoints_female_2[0].y += dataAge_female[key][1]
          dataPoints_female_3[0].y += dataAge_female[key][2]
          dataPoints_female_4[0].y += dataAge_female[key][3]
        } else if (key < 55) {
          dataPoints_female_1[1].y += dataAge_female[key][0]
          dataPoints_female_2[1].y += dataAge_female[key][1]
          dataPoints_female_3[1].y += dataAge_female[key][2]
          dataPoints_female_4[1].y += dataAge_female[key][3]
        } else if (key < 65) {
          dataPoints_female_1[2].y += dataAge_female[key][0]
          dataPoints_female_2[2].y += dataAge_female[key][1]
          dataPoints_female_3[2].y += dataAge_female[key][2]
          dataPoints_female_4[2].y += dataAge_female[key][3]
        } else if (key < 75) {
          dataPoints_female_1[3].y += dataAge_female[key][0]
          dataPoints_female_2[3].y += dataAge_female[key][1]
          dataPoints_female_3[3].y += dataAge_female[key][2]
          dataPoints_female_4[3].y += dataAge_female[key][3]
        } else {
          dataPoints_female_1[4].y += dataAge_female[key][0]
          dataPoints_female_2[4].y += dataAge_female[key][1]
          dataPoints_female_3[4].y += dataAge_female[key][2]
          dataPoints_female_4[4].y += dataAge_female[key][3]
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
          title: "Quantity",
        },
        toolTip: {
          shared: true,
          reversed: true
        },
        legend: {
				  verticalAlign: "center",
				  horizontalAlign: "right",
				  reversed: true,
				  cursor: "pointer",
				  itemclick: this.toggleDataSeries
        },

        data: [{
          type: "column",
          name: "Male_type_1",
          showInLegend: true,
          yValueFormatString: "#,###",
          dataPoints: dataPoints_male_1
        },
        {
          type: "column",
          name: "Male_type_2",
          showInLegend: true,          
          yValueFormatString: "#,###",
          dataPoints: dataPoints_male_2
        },
        {
          type: "column",
          name: "Male_type_3",
          showInLegend: true,
          yValueFormatString: "#,###",
          dataPoints: dataPoints_male_3
        },
        {
          type: "column",
          name: "Male_type_4",
          showInLegend: true,
          yValueFormatString: "#,###",
          dataPoints: dataPoints_male_4
        },
        {
          type: "column",
          name: "Female_type_1",
          showInLegend: true,
          markerType: "cross",
          yValueFormatString: "#,###",
          dataPoints: dataPoints_female_1
        },
        {
          type: "column",
          name: "Female_type_2",
          showInLegend: true,
          markerType: "cross",
          yValueFormatString: "#,###",
          dataPoints: dataPoints_female_2
        },
        {
          type: "column",
          name: "Female_type_3",
          showInLegend: true,
          markerType: "cross",
          yValueFormatString: "#,###",
          dataPoints: dataPoints_female_3
        },
        {
          type: "column",
          name: "Female_type_4",
          showInLegend: true,
          markerType: "cross",
          yValueFormatString: "#,###",
          dataPoints: dataPoints_female_4
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
      );
      }
    }
}
