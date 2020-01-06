import styled from "styled-components";
import React from 'react';
import { Route, Switch, NavLink } from "react-router-dom";

export class BaseComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          state_name:null,
        }

      this.handleMethod = this.handleMethod.bind(this)
    }
      
    render() {
        return (
          <div></div>
        );
      }    
}