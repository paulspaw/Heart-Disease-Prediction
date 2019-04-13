import React from 'react';
import 'antd/dist/antd.css';
import './AdvancedSearchForm.css';
import { Form, Row, Col, Button } from 'antd';
import InputBar from './InputBar'

export default class AdvancedSearchForm extends React.Component {

  render() {
    return (
      <Form className="ant-advanced-search-form" onSubmit={this.props.getValue}>
        <Row gutter={24}>
          <Col style={{display: "inline-block"}}>
            <Form.Item label={`Field 1`}>
              <InputBar id="age"/>
            </Form.Item>
          </Col>

          <Col style={{display: "inline-block"}}>
            <Form.Item label={`Field 2`}>
            <InputBar id="gender"/>
            </Form.Item>
          </Col>   

          <Col style={{display: "inline-block"}}>
            <Form.Item label={`Field 3`}>
              <InputBar 
                id="chest" 
                info="1=typical angin, 2=atypical angina, 3=non-anginal pain, 4=asymptomatic"
              />
            </Form.Item>
          </Col>              
          
          <Col style={{display: "inline-block"}}>
            <Form.Item label={`Field 4`}>
              <InputBar 
                id = "pressure"
                info="resting blood pressure"
              />
            </Form.Item>
          </Col>     

          <Col style={{display: "inline-block"}}>
            <Form.Item label={`Field 5`}>
              <InputBar id="blood" info="resting blood pressure"/>
            </Form.Item>
          </Col>   

          <Col style={{display: "inline-block"}}>
            <Form.Item label={`Field 6`}>
              <InputBar id="serum" info="serum cholestoral in mg/dl"/>
            </Form.Item>
          </Col>   
          
          <Col style={{display: "inline-block"}}>
            <Form.Item label={`Field 7`}>
              < InputBar 
                id = "electro"
                info = "resting electrocardiographic results
                ( 0 = normal, 1 = having ST - T wave abnormality(T wave inversions and / or ST elevation or depression of > 0.05 mV), 
                2 = showing probable or definite left ventricular hypertrophy by Estes’ criteria "
              />
            </Form.Item>
          </Col>           

          <Col style={{display: "inline-block"}}>
            <Form.Item label={`Field 8`}>
              <InputBar id="heart" info="maximum heart rate achieved"/>
            </Form.Item>
          </Col>   

          <Col style={{display: "inline-block"}}>
            <Form.Item label={`Field 9`}>
              <InputBar id="exercise" info="exercise induced angina"/>
            </Form.Item>
          </Col>   

          <Col style={{display: "inline-block"}}>
            <Form.Item label={`Field 10`}>
              <InputBar id="oldpeak" info="oldpeak = ST depression induced by exercise relative to rest"/>
            </Form.Item>
          </Col>   

          <Col style={{display: "inline-block"}}>
            <Form.Item label={`Field 11`}>
              <InputBar id="slope" info="the slope of the peak exercise ST segment"/>
            </Form.Item>
          </Col>      

          <Col style={{display: "inline-block"}}>
            <Form.Item label={`Field 12`}>
              <InputBar id="vessels" info="number of major vessels (0-3) colored by flourosopy"/>
            </Form.Item>
          </Col>      

          <Col style={{display: "inline-block"}}>
            <Form.Item label={`Field 13`}>
              <InputBar id="thal" info="3 = normal; 6 = fixed defect; 7 = reversable defect"/>
            </Form.Item>
          </Col>   
        </Row>

        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">Predict</Button>
          </Col>
        </Row> 
      </Form>
    );
  }
}
