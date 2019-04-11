import React, { Component } from 'react'
import CanvasJSReact from '../Canvas/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class HeartRateChart extends Component {

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

  computeMean = (objArray) => {
    let result = [];//去重后返回的结果数组
    let temp = {};//临时对象
    //将对象数组中每一项的name值作为属性，若temp不拥有此属性时则为temp添加此属性且将其值赋为true，并将这一项push到结果数组中
    for(let i=0;i<objArray.length;i++){  
        let myX = objArray[i].x;
        if(temp[myX]){//如果temp中已经存在此属性名，则说明遇到重复项
            result[result.length - 1].y = (result[result.length - 1].y + objArray[i].y) / 2
            continue;//不继续执行接下来的代码，跳转至循环开头
        }  
        temp[myX] = true;//为temp添加此属性（myname）且将其值赋为true
        result.push(objArray[i]);//将这一项复制到结果数组result中去
    }  
    return result;  
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
      let dataSet = this.state.dataSet.sort(this.props.compare('age'))
      let limit = dataSet.length; 
      let data = [];
      let dataSeries1 = {
        type: "spline",
        name: 'male',
        showInLegend: true,
        toolTipContent: "<span style=\"color:#4F81BC \">{name}</span><br>Age: {x}<br>Max heart rate: {y}"
      };
      let dataSeries2 = {
        type: "spline",
        name: 'female',
        showInLegend: true,
        toolTipContent: "<span style=\"color:#4F81BC \">{name}</span><br>Age: {x}<br>Max heart rate: {y}"
      };
      let dataPoints1 = [];
      let dataPoints2 = [];
      
      for (var i = 0; i < limit; i += 1) {
        if (dataSet[i].sex === 1){
          dataPoints1.push({
            x: dataSet[i].age,
            y: dataSet[i][this.props.id]
          });
        } else {
          dataPoints2.push({
            x: dataSet[i].age,
            y: dataSet[i][this.props.id]          
          })
        }
      }

      dataSeries1.dataPoints = this.computeMean(dataPoints1);
      dataSeries2.dataPoints = this.computeMean(dataPoints2);
      data.push(dataSeries1);
      data.push(dataSeries2);
      
      const options = {
        zoomEnabled: true,
        animationEnabled: true,
        title: {
          text: "Maximum Heart Rate achieved"
        },
        axisX: {
          tile: "age"
        },
        axisY: {
          title: "maximum heart rate",
          includeZero: false
        },
        legend: {
          cursor: "pointer",
          itemclick: this.toggleDataSeries
        },
        data: data  // random data
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
