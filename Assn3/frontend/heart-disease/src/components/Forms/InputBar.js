import React, { Component } from 'react'
import { Input, Tooltip, Icon } from 'antd';

export default class InputBar extends Component {

//   onChange = (e) => {
//       console.log(e)
//   }

  render() {
    return (
      <div>
        <Input
            type="text"
            name={this.props.id}
            placeholder={this.props.id}
            // allowClear 
            // onChange={this.onChange} 
            style = {{width: 200}}
            suffix= {
              <Tooltip title={this.props.info}>
                <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)'}} />
              </Tooltip>
            }
        />        
      </div>
    )
  }
}