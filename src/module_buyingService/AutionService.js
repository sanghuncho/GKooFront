import { BuyingServiceNavbar } from './BuyingServiceIntro'
import styled from "styled-components";
import {
    AppContainer as BaseAppContainer,
    BaseNavigation,
  } from "../container";
import React, { Component } from 'react';
import { AppNavbar } from '../AppNavbar'

{/* BuyingServiceEbay CSS */}
export const BodyContainer = styled(BaseAppContainer)`
  height:auto;
  flex-direction: column;
`;
const AutionServiceContainer = styled(BaseAppContainer)`
  height: calc(250vh);
`;

export class AutionService extends React.Component{

    render() {
        return (
            <div>
            <AppNavbar/>
            <AutionServiceContainer>
                <BuyingServiceNavbar/>
                <BodyContainer>

                </BodyContainer>
            </AutionServiceContainer>
            </div>
        );}           
}