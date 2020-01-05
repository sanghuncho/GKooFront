import styled from "styled-components";
import {
    AppContainer as BaseAppContainer,
    BaseNavigation,
  } from "../container";
import React, { Component } from 'react';
import { AppNavbar } from '../AppNavbar'
import { InfodeskIntroNavbar } from './InfodeskIntro'

{/* InfodeskInpectRefundService CSS */}
export const BodyContainer = styled(BaseAppContainer)`
  height:auto;
  flex-direction: column;
`;
const InfodeskInpectRefundServiceContainer = styled(BaseAppContainer)`
  height: calc(250vh);
`;

export class InfodeskInspectRefundService extends React.Component{

    render() {
        return (
            <div>
            <AppNavbar/>
            <InfodeskInpectRefundServiceContainer>
                <InfodeskIntroNavbar/>
                <BodyContainer>

                </BodyContainer>
            </InfodeskInpectRefundServiceContainer>
            </div>
        );}           
}