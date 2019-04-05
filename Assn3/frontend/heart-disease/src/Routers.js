import React, { Component } from 'react'
import Home from "./components/Home"
import Analysis from "./components/Analysis"
import Detection from "./components/Detection"
import Team from "./components/Team"
import SiderLayout from "./SiderLayout"
import { BrowserRouter as Router, Route } from "react-router-dom"


export default class Routers extends Component {
  render() {
    return (
        <Router>
            <Route path="/" component={SiderLayout}>
              <Route path="home" component={Home} />
              <Route path="analysis" component={Analysis} />
              <Route path="detection" component={Detection} />
              <Route path="team" component={Team} />
            </Route>
        </Router>
    )
  }
}
