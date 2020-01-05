import styled from "styled-components";
import React from 'react';
import { Route, Switch, NavLink } from "react-router-dom";
import { AppNavbar } from '../AppNavbar'
import { BodyContainer, ShippingServiceNavbar } from './ShippingService'
import {
    AppContainer as BaseAppContainer,
    BaseNavigation,
  } from "../container";

{/* ShippingServiceInfo CSS */}
const ShippingServiceInfoContainer = styled(BaseAppContainer)`
  height: calc(250vh);
`;

export class ShippingServiceInfo extends React.Component{
    constructor(props) {
        super(props);
      }
      
      render() {
        return (
          <div>
              <AppNavbar/>
                <ShippingServiceInfoContainer>
                    
                    <ShippingServiceNavbar/>
                    
                    <BodyContainer>
                    
                    </BodyContainer>
                </ShippingServiceInfoContainer>
          </div>
        );
      }    
}