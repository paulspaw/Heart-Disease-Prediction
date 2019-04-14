import React, { Component } from 'react'
import AdvancedSearchForm from '../Forms/AdvancedSearchForm'
import { Form } from 'antd';
// import axios from 'axios'
import {stringify} from 'qs'

export default class Detection extends Component {

  state = {
    predictData: undefined
  }

  getValue = (e) => {
    e.preventDefault();
      const age = e.target.elements.age.value
      const sex = e.target.elements.gender.value
      const chest = e.target.elements.chest.value
      const pressure = e.target.elements.pressure.value
      const blood = e.target.elements.blood.value
      const serum = e.target.elements.serum.value
      const electro = e.target.elements.electro.value
      const heart = e.target.elements.heart.value
      const exercise = e.target.elements.exercise.value
      const oldpeak = e.target.elements.oldpeak.value
      const slope = e.target.elements.slope.value
      const vessels = e.target.elements.vessels.value
      const thal = e.target.elements.thal.value

      fetch('http://127.0.0.1:5000/prediction', {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: stringify({
          "age": parseFloat(age),
          "sex": parseFloat(sex),
          "chest": parseFloat(chest),
          "pressure": parseFloat(pressure),
          "blood": parseFloat(blood),
          "serum": parseFloat(serum),
          "electro": parseFloat(electro),
          "heart": parseFloat(heart),
          "exercise": parseFloat(exercise),
          "oldpeak": parseFloat(oldpeak),
          "slope": parseFloat(slope),
          "vessels": parseFloat(vessels),
          "thal": parseFloat(thal)
        })
      })
      .then(res => res.json())
      .then(response => this.setState({predictData: response}))
  }

  WrappedAdvancedSearchForm = Form.create({ name: 'advanced_search' })(AdvancedSearchForm);

  render() {

    if (this.state.predictData !== undefined) {
      console.log(this.state.predictData)
      return (
        <div>
          <this.WrappedAdvancedSearchForm getValue={this.getValue} />
          <div className="search-result-list">
            <span style={{ fontSize: "30px" }}>Has heart diseases? {this.state.predictData["result"]["disease"]}</span>
            <br />
            <br />
            <span style={{ fontSize: "30px" }}>Probability of no heart diseases: {this.state.predictData["result"]["probability_0"]}</span>
            <br />
            <br />
            <span style={{ fontSize: "30px" }}>Probability of having heart diseases: {this.state.predictData["result"]["probability_1"]}</span>
            <br />
            <br />
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <this.WrappedAdvancedSearchForm getValue={this.getValue} />
          <div className="search-result-list"> Search Result List </div>
        </div>
      )
    }
  }
}