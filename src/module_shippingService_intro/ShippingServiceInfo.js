import styled from "styled-components";
import React from 'react';
import { Route, Switch, NavLink } from "react-router-dom";
import { AppNavbar } from '../AppNavbar'
import { BodyContainer, ShippingServiceNavbar } from './ShippingService'
import {
    AppContainer as BaseAppContainer,
    BaseNavigation,
  } from "../container";
import { Card, Form, InputGroup, Row, Col, Container, Button, Breadcrumb } from 'react-bootstrap';

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
                      <Breadcrumb style={{ width: '100%'}}>
                        <Breadcrumb.Item active>배송대행 / 국제배송요금</Breadcrumb.Item>
                      </Breadcrumb>
                    </BodyContainer>
                </ShippingServiceInfoContainer>
          </div>
        );
      }    
}