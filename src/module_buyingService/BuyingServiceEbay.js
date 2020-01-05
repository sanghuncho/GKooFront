import styled from "styled-components";
import {
    AppContainer as BaseAppContainer,
    BaseNavigation,
} from "../container";
import React, { Component } from 'react';
import { BuyingServiceNavbar } from './BuyingServiceIntro'
import { AppNavbar } from '../AppNavbar'

{/* BuyingServiceEbay CSS */}
export const BodyContainer = styled(BaseAppContainer)`
  height:auto;
  flex-direction: column;
`;
const BuyingServiceEbayContainer = styled(BaseAppContainer)`
  height: calc(250vh);
`;

export class BuyingServiceEbay extends React.Component{

    render() {
        return (
            <div>
            <AppNavbar/>
            <BuyingServiceEbayContainer>
                <BuyingServiceNavbar/>
                <BodyContainer>

                </BodyContainer>
            </BuyingServiceEbayContainer>
            </div>
        );}           
}