import styled from "styled-components";
import {
    AppContainer as BaseAppContainer,
    BaseNavigation,
  } from "../container";
import React, { Component } from 'react';
import { AppNavbar } from '../AppNavbar'
import { CustomerCenterNavbar } from './CustomerCenterIntro'

{/* QuestionPane CSS */}
export const BodyContainer = styled(BaseAppContainer)`
  height:auto;
  flex-direction: column;
`;
const QuestionPaneContainer = styled(BaseAppContainer)`
  height: calc(250vh);
`;

export class QuestionPane extends React.Component{

    render() {
        return (
            <div>
            {/* 상단 내비 */}
            <AppNavbar/>
            
            <QuestionPaneContainer>
                {/* 좌측 내비 */}
                <CustomerCenterNavbar/>
                <BodyContainer>
                    {/* 이메일 보내기 */}
                </BodyContainer>
            </QuestionPaneContainer>
            </div>
        );}           
}