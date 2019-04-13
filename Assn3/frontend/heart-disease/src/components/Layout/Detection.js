import React, { Component } from 'react'
import AdvancedSearchForm from '../Forms/AdvancedSearchForm'
import { Form } from 'antd';

export default class Detection extends Component {

  WrappedAdvancedSearchForm = Form.create({ name: 'advanced_search' })(AdvancedSearchForm);

  render() {
    return (
      <div>
        <this.WrappedAdvancedSearchForm />
        <div className="search-result-list">Search Result List</div>
      </div>
    )
  }
}
