import React, { Component } from 'react';
import CanvasJSReact from '../Canvas/canvasjs.react';
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

    computeAmount = (Obj) =>{
        let result_male = {}
        let result_female = {}
        let result = {}
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
        result.male = result_male
        result.female = result_female
        return result 
    }

    render() {
        if (this.state.dataSet === undefined) {
            return <div></div>
          } else {
            
            let dataSet = this.state.dataSet
            console.log(dataSet.sort(this.props.compare('age')))
            // let male = {}
            // let female = {}
            
            let result = this.computeAmount(dataSet)
            console.log(result)
            

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

