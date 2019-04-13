import React, { Component } from 'react'
import AdvancedSearchForm from '../Forms/AdvancedSearchForm'
import { Form } from 'antd';

export default class Detection extends Component {

  state = {
    age: undefined,
    sex: undefined,
    chest: undefined,
    pressure: undefined,
    blood: undefined,
    serum: undefined,
    electro: undefined,
    heart: undefined,
    exercise: undefined,
    oldpeak: undefined,
    slope: undefined,
    vessels: undefined,
    thal: undefined
  }

  getValue = (e) => {
    e.preventDefault();
    if (e.target.elements.age !== undefined) {
      this.setState({age: e.target.elements.age.value})
    }
    if (e.target.elements.gender.value !== undefined) {
      this.setState({sex: e.target.elements.gender.value})
    }

    if (e.target.elements.chest !== undefined) {
      this.setState({chest: e.target.elements.chest.value})
    }

    if (e.target.elements.pressure !== undefined) {
      this.setState({pressure: e.target.elements.pressure.value})
    }

    if (e.target.elements.blood !== undefined) {
      this.setState({blood: e.target.elements.blood.value})
    }

    if (e.target.elements.serum !== undefined) {
      this.setState({serum: e.target.elements.serum.value})
    }

    if (e.target.elements.electro !== undefined) {
      this.setState({electro: e.target.elements.electro.value})
    }

    if (e.target.elements.heart !== undefined) {
      this.setState({heart: e.target.elements.heart.value})
    }

    if (e.target.elements.exercise !== undefined) {
      this.setState({exercise: e.target.elements.exercise.value})
    }

    if (e.target.elements.oldpeak !== undefined) {
      this.setState({oldpeak: e.target.elements.oldpeak.value})
    }

    if (e.target.elements.slope !== undefined) {
      this.setState({slope: e.target.elements.slope.value})
    }

    if (e.target.elements.vessels !== undefined) {
      this.setState({vessels: e.target.elements.vessels.value})
    }

    if (e.target.elements.thal !== undefined) {
      this.setState({thal: e.target.elements.thal.value})
    }
  }

    info = () => {
      if (
        this.state.age && this.state.sex &&
        this.state.chest && this.state.pressure &&
        this.state.blood && this.state.serum &&
        this.state.electro && this.state.heart &&
        this.state.exercise && this.state.oldpeak &&
        this.state.slope && this.state.vessels &&
        this.state.thal
      ) {
        return <div className = "search-result-list"> Hello </div>
      } else {
        return <div className = "search-result-list"> Search Result List </div>
      }
    }

  WrappedAdvancedSearchForm = Form.create({ name: 'advanced_search' })(AdvancedSearchForm);

  render() {

    return (
      <div>
        <this.WrappedAdvancedSearchForm getValue={this.getValue}/>
        {this.info()}
      </div>
    )
  }
}
