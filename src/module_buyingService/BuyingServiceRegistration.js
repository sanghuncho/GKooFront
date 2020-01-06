import styled from "styled-components";
import {
    AppContainer as BaseAppContainer,
    BaseNavigation,
  } from "../container";
import React, { Component } from 'react';
import { AppNavbar } from '../AppNavbar'
import { BuyingServiceNavbar } from './BuyingServiceIntro'

{/* BuyingServiceRegistration Style */}
export const BodyContainer = styled(BaseAppContainer)`
  height:auto;
  flex-direction: column;
`;
const BuyingServiceRegistrationContainer = styled(BaseAppContainer)`
  height: calc(250vh);
`;

export class BuyingServiceRegistration extends React.Component{

    render() {
        return (
            <div>
            {/* 상단 내비*/}
            <AppNavbar/>
            <BuyingServiceRegistrationContainer>
                {/* 좌측 내비 */}
                <BuyingServiceNavbar/>
                
                <BodyContainer>

                </BodyContainer>
            </BuyingServiceRegistrationContainer>
            </div>
        );}           
}