import styled from "styled-components";
import {
    AppContainer as BaseAppContainer,
    BaseNavigation,
  } from "../container";
import React, { Component } from 'react';
import { AppNavbar } from '../AppNavbar'
import { BuyingServiceNavbar } from './BuyingServiceIntro'

{/* BuyingService CSS */}
export const BodyContainer = styled(BaseAppContainer)`
  height:auto;
  flex-direction: column;
`;
const BuyingServiceContainer = styled(BaseAppContainer)`
  height: calc(250vh);
`;

export class BuyingService extends React.Component{

    render() {
        return (
            <div>
            <AppNavbar/>
            <BuyingServiceContainer>
                <BuyingServiceNavbar/>
                <BodyContainer>

                </BodyContainer>
            </BuyingServiceContainer>
            </div>
        );}           
}