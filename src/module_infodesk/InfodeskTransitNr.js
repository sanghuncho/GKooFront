import styled from "styled-components";
import {
    AppContainer as BaseAppContainer,
    BaseNavigation,
  } from "../container";
import React, { Component } from 'react';
import { AppNavbar } from '../AppNavbar'
import { InfodeskIntroNavbar } from './InfodeskIntro'
import { Card, Form, InputGroup, Row, Col, Container, Button } from 'react-bootstrap';
import { CompanyIntroductionBottom } from '../module_base_component/BaseCompanyIntroduction'

{/* InfodeskInpectRefundService CSS */}
export const BodyContainer = styled(BaseAppContainer)`
  height:auto;
  flex-direction: column;
  min-height:calc(100vh);
`;
const InfodeskTransitNrContainer = styled(BaseAppContainer)`
  height: auto;
  min-height:calc(100vh);
`;

export class InfodeskTransitNr extends React.Component{

    render() {
        return (
            <div>
            <AppNavbar/>
            <InfodeskTransitNrContainer>
                <InfodeskIntroNavbar/>
                <BodyContainer>

                    <HowToGetTransitNr/>

                    <CompanyIntroductionBottom/>
                </BodyContainer>
            </InfodeskTransitNrContainer>
            </div>
        );}           
}

export class HowToGetTransitNr extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          //value:null,
        }

      this.handleOpenCustomsSite = this.handleOpenCustomsSite.bind(this)
    }

    componentDidMount() {
    }

    handleOpenCustomsSite(){
        const url = 'https://unipass.customs.go.kr/csp/persIndex.do';
        window.open(url, '_blank');
    }
      
    render() {
        return (
          <div>
            <Card border="dark" style={{ width: '70%', marginBottom:'5px', marginTop:'1rem', marginLeft:'1rem'}}>
                <Card.Header>개인통관고유부호 발급 안내</Card.Header>
                <Card.Body >
                    2014년 8월 7일부터 개인의 경우 주민등록번호 대신 통관고유부호 사용이 의무화 되었습니다.<br/>
                    통관고유부호는 관세청사이트에서 온라인으로 발급이 가능하며, 한 번 발급 받으시면 계속 사용하실 수 있습니다.<br/>
                    발급시에는 본인 확인을 위해 공인인증서가 꼭 필요합니다.<br/>
                    등록된 개인휴대폰으로 통관과정에 대해 관세청에서 직접 안내가 진행됩니다.<br/><br/>

                    발급안내<br/>
                    관세청 전자통관 사이트 (https://unipass.customs.go.kr/csp/persIndex.do)에 접속합니다.<br/><br/>

                    이름, 주민등록번호를 입력 한 후 공인인증서 인증을 거치고,<br/>
                    개인정보입력을 하시면 고유부호를 발급받으실 수 있습니다.<br/><br/>
                    <Button variant="secondary" size="sm" 
                        onClick={() => this.handleOpenCustomsSite()} 
                        style={{ marginRight: '10px', marginTop: '10px', float:"left"}}>관세청 사이트가기</Button>     
                </Card.Body>
            </Card>
        </div>
        );
      }    
}