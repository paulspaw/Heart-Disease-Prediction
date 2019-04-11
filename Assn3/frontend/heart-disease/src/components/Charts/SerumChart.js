import React, {
    Component
} from 'react'
import CanvasJSReact from '../Canvas/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class SerumChart extends Component {

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
  render() {
    
    console.log(this.state.dataSet)
    return (
      <div>
        Hello
      </div>
    )
  }
}
