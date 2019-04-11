import React, { Component } from 'react'
import { Card, Icon, Avatar } from 'antd';

const { Meta } = Card;

export default class team extends Component {

  render() {
    return (
      <div>
        <Card 
          style={{ width: 350, margin: 30, display: "inline-block"}}
          cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
          actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
        >
          <Meta
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title="Peng Liu"
            description="This is a xxx guy"
          />
        </Card>
        <Card
          style={{ width: 350, margin: 30, display: "inline-block"}}
          cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
          actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
        >
          <Meta
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title="Zhihao Li"
            description="This is a cool guy"
          />
        </Card>
      </div>
    )
  }
}
