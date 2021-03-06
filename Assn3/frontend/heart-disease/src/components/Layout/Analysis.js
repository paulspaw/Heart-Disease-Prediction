import React, { Component } from 'react'
import { Tabs, Radio } from 'antd';
import ChartDemo from '../Charts/ChartDemo'
import PressureChart from '../Charts/PressureChart'
import SerumDemo from '../Charts/SerumDemo'
import BloodSugarDemo from '../Charts/BloodSugarDemo'
import HeartRateChart from '../Charts/HeartRateChart'
import ExerciseChart from '../Charts/ExerciseChart'
import OldPeakChart from '../Charts/OldPeak'
import SlopeChart from '../Charts/SlopeChart'
import ElectroDemo from '../Charts/ElectroDemo'
import ThalDemo from '../Charts/ThalDemo'
import VesselsDemo from '../Charts/VesselsDemo'

const TabPane = Tabs.TabPane;

export default class Analysis extends Component {
  state = {
    mode: 'top',
  }

  handleModeChange = (e) => {
    const mode = e.target.value;
    this.setState({
      mode
    });
  }

  compare = (pro) => { 
    return (obj1, obj2) => { 
      let val1 = obj1[pro]; 
      let val2 = obj2[pro]; 
      if (val1 > val2 ) { //正序
          return 1; 
      } else if (val1 < val2 ) { 
          return -1; 
      } else { 
          return 0; 
      } 
    } 
  } 

  render() {
    const { mode } = this.state;
    return (
      <div>
        <Radio.Group onChange={this.handleModeChange} value={mode} style={{ marginBottom: 8 }}>
          <Radio.Button value="top">Horizontal</Radio.Button>
          <Radio.Button value="left">Vertical</Radio.Button>
        </Radio.Group>
        <Tabs
          defaultActiveKey="1"
          tabPosition={mode}
          style={{ height: 800 }}
        >

          <TabPane tab="Tab 1" key="1">
            <h1>chest pain type</h1>
            <p>1=typical angin,2=atypical angina,3=non-anginal pain,4=asymptomatic</p>
            <ChartDemo id="chest" compare={this.compare}/>
          </TabPane>

          <TabPane tab="Tab 2" key="2">
            <h1>resting blood pressure</h1>
            <PressureChart id="pressure" compare={this.compare}/>
          </TabPane>

          <TabPane tab="Tab 3" key="3">
            <h1>serum cholestoral in mg/dl</h1>
            <SerumDemo id="serum" compare={this.compare}/>
          </TabPane>

          <TabPane tab="Tab 4" key="4">
            <h1>fasting blood sugar > 120 mg/dl</h1>
            <BloodSugarDemo id="sugar" compare={this.compare}/>
          </TabPane>

          <TabPane tab="Tab 5" key="5">
            <h1>resting electrocardiographic results </h1>
            <p>(0=normal,1=having ST-T wave abnormality 
              (T wave inversions and/or ST elevation or depression of > 0.05 mV),
              2=showing probable or definite left
              ventricular hypertrophy by Estes’ criteria
            </p>
            <ElectroDemo id="electro" compare={this.compare}/>
          </TabPane>

          <TabPane tab="Tab 6" key="6">
            <h1>maximum heart rate achieved</h1>
            <HeartRateChart id="heart" compare={this.compare} />
          </TabPane>

          <TabPane tab="Tab 7" key="7">
            <h1>exercise induced angina</h1>
            <ExerciseChart id="exercise" compare={this.compare} />
          </TabPane>

          <TabPane tab="Tab 8" key="8">
            <h1>oldpeak = ST depression induced by exercise relative to rest</h1>
            <OldPeakChart id="oldpeak" compare={this.compare} />
          </TabPane>

          <TabPane tab="Tab 9" key="9">
            <h1>the slope of the peak exercise ST segment</h1>
            <SlopeChart id="slope" compare={this.compare} />
          </TabPane>

          <TabPane tab="Tab 10" key="10">
            <h1>number of major vessels (0-3) colored by flourosopy</h1>
            <VesselsDemo id="vessels" compare={this.compare} />
          </TabPane>

          <TabPane tab="Tab 11" key="11">
            <h1>thal(Thalassemia)</h1>
            <p>3 = normal; 6 = fixed defect; 7 = reversable defect</p>
            <ThalDemo id="thal" compare={this.compare} />
          </TabPane>

        </Tabs>
      </div>
    );
  }
}
