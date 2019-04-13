import React, { Component } from 'react'
import { Typography } from 'antd';
import imga from '../../imga.png'

const { Text } = Typography;


export default class RelationsChart extends Component {

  state = {
    dataSet: undefined
  }

  compare = (pro) => { 
    return function (obj1, obj2) { 
        var val1 = obj1[pro]; 
        var val2 = obj2[pro]; 
        if (val1 < val2 ) { //正序
            return 1; 
        } else if (val1 > val2 ) { 
            return -1; 
        } else { 
            return 0; 
        } 
      }
    } 
  componentDidMount() {
    fetch(`http://localhost:5000/collections/${this.props.id}`, {method: "GET"})
    .then(res => res.json())
    .then(response => this.setState({
      dataSet: response
    }))
  }

  render() {

    if (this.state.dataSet === undefined) {
        return <div></div>
    } 

    const data = []
    for (let key in this.state.dataSet[0]) {
      data.push( {
          id: key, value: this.state.dataSet[0][key]
      })
    }

    data.sort(this.compare("value"));

    const children = []
    for (let i=0; i<data.length; i+=1) {
        console.log(data[i])
        children.push(
            <Text key={i} style={{fontSize:15, margin: "0px", float: "left"}}> 
              <em style={{color: "red"}}>{i+1}</em>.&nbsp;&nbsp;<strong>{data[i]['id']}:&nbsp;&nbsp;{data[i]['value']}</strong>&nbsp;&nbsp; 
              <br />
              <br />
            </Text>
        )
    }

    console.log(data)

    return (
        <div>
            {children}
            <img src={imga} alt="Q2_heatmap" style={{width: "1200px", float: "left", textAlign: "center"}}/>
        </div>
    )
  }
}
