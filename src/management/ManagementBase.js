import styled from "styled-components";
import React from 'react';
import { Route, Switch, NavLink } from "react-router-dom";
import { SideNavBaseComponent } from "../module_base/SideNavBaseComponent"
import {
  AppContainer as BaseAppContainer,
  ExampleNavigation as BaseNavigation,
} from "../container";

const AppContainer = styled(BaseAppContainer)`
  height: auto;
`;

const BodyContainer = styled(BaseAppContainer)`
  height:auto;
  flex-direction: column;
`;

export class ManagementBase extends React.Component{
    constructor(props) {
        super(props);
      }
      //inhertance https://reactjs.org/docs/composition-vs-inheritance.html
      render() {
        return (
          <div>
            <AppContainer>

            <SideNavBaseComponent category1="module1" category2="module2"/>

            <BodyContainer>
              {this.props.warehouse}  
            </BodyContainer> 

            </AppContainer>
          </div>
        );
      }    
}