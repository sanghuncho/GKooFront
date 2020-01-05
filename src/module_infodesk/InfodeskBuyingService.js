import styled from "styled-components";
import {
    AppContainer as BaseAppContainer,
    BaseNavigation,
  } from "../container";
import React, { Component } from 'react';
import { AppNavbar } from '../AppNavbar'
import { InfodeskIntroNavbar } from './InfodeskIntro'

{/* InfodeskBuyingService CSS */}
export const BodyContainer = styled(BaseAppContainer)`
  height:auto;
  flex-direction: column;
`;
const InfodeskBuyingServiceContainer = styled(BaseAppContainer)`
  height: calc(250vh);
`;

export class InfodeskBuyingService extends React.Component{

    render() {
        return (
            <div>
            <AppNavbar/>
            <InfodeskBuyingServiceContainer>
                <InfodeskIntroNavbar/>
                <BodyContainer>

                </BodyContainer>
            </InfodeskBuyingServiceContainer>
            </div>
        );}           
}