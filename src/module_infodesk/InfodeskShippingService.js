import styled from "styled-components";
import {
    AppContainer as BaseAppContainer,
    BaseNavigation,
  } from "../container";
import React, { Component } from 'react';
import { AppNavbar } from '../AppNavbar'
import { InfodeskIntroNavbar } from './InfodeskIntro'

{/* InfodeskShippingService CSS */}
export const BodyContainer = styled(BaseAppContainer)`
  height:auto;
  flex-direction: column;
`;
const InfodeskShippingServiceContainer = styled(BaseAppContainer)`
  height: calc(250vh);
`;

export class InfodeskShippingService extends React.Component{

    render() {
        return (
            <div>
            <AppNavbar/>
            <InfodeskShippingServiceContainer>
                <InfodeskIntroNavbar/>
                <BodyContainer>

                </BodyContainer>
            </InfodeskShippingServiceContainer>
            </div>
        );}           
}