import styled from "styled-components";
import React from 'react';
import { AppNavbar } from '../AppNavbar'
import { BodyContainer, ShippingServiceNavbar } from './ShippingService'
import {
    AppContainer as BaseAppContainer,
    BaseNavigation,
  } from "../container";

{/* ShippingServiceAddressPanel CSS */}
const ShippingServiceAddressPanelContainer = styled(BaseAppContainer)`
  height: calc(250vh);
`;

export class ShippingServiceAddressPane extends React.Component{
    constructor(props) {
        super(props);
      }
      
      render() {
        return (
          <div>
              <AppNavbar/>
                <ShippingServiceAddressPanelContainer>
                    
                    <ShippingServiceNavbar/>
                    
                    <BodyContainer>
                    
                    </BodyContainer>
                </ShippingServiceAddressPanelContainer>
          </div>
        );
      }    
}