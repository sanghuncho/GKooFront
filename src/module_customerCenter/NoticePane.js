import styled from "styled-components";
import {
    AppContainer as BaseAppContainer,
    BaseNavigation,
} from "../container";
import React, { Component } from 'react';
import { AppNavbar } from '../AppNavbar'
import { CustomerCenterNavbar } from './CustomerCenterIntro'
import { Table, Image, Button, Card, CardGroup, Container, Row, Col } from "react-bootstrap"
import GKoo_Intro_Banner_Org  from '../assets/Gkoo_Intro_Banner_Org.jpg'

/** NoticePane Style */
export const BodyContainer = styled(BaseAppContainer)`
  height:auto;
  flex-direction: column;
`;
const NoticePaneContainer = styled(BaseAppContainer)`
  height: calc(250vh);
`;

/** 공지사항  */
export class NoticePane extends React.Component {

    render() {
        return (
            <div>
                {/* 상단 내비 */}
                <AppNavbar />

                <NoticePaneContainer>
                     {/* 좌측 내비 */}
                    <CustomerCenterNavbar/>
                    
                    <BodyContainer>
                        {/* 공지사항 목록 */}
                        <NoticePaneWrapper/>
                    </BodyContainer>
                </NoticePaneContainer>
            </div>
        );
    }
}

/** NoticePaneWrapper Style  */
const noticePaneWrapperStyle = {
    width: '80%',
    paddingTop: '20px',
    marginLeft: '20px'
}
export class NoticePaneWrapper extends React.Component {

    render() {
        return (
            <div>
                <Container style={noticePaneWrapperStyle} >
                    <Row>
                        <Col><NoticeUnit_1/></Col>
                        <Col><NoticeUnit_2/></Col>
                        <Col><NoticeUnit_3/></Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export class NoticeUnit_1 extends React.Component {

    render() {
        return (
            <div>
                <Card>
                    <Card.Header>공지사항 2020.01.05</Card.Header>
                    <Card.Body>
                        <Card.Title>지쿠 테스트 배송대행 운영</Card.Title>
                        <Card.Text>
                            지쿠 배송대행을 일정기간동안 테스트 운영을 통해 안정된 웹사이트가 되도록 정한 기간입니다.
                        </Card.Text>
                       {/* <Button variant="primary">Go</Button> */}
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

/** NoticeUnit_2 Style  */
const noticeUnit_2_Style = {
    width: '260px', marginTop:'1px'
}
export class NoticeUnit_2 extends React.Component {

    render() {
        return (<div>
            <Card>
                <Card.Header>공지사항 2020.01.03</Card.Header>
                <Card.Body>
                    <Card.Title>결제안내</Card.Title>
                    <Card.Text>
                        <Image src={GKoo_Intro_Banner_Org} style={noticeUnit_2_Style} />
                    </Card.Text>
                   {/* <Button variant="primary">Go</Button> */}
                </Card.Body>
            </Card>
        </div>
        );
    }
}

export class NoticeUnit_3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          
        };
    
        this.handleMoveToLink    = this.handleMoveToLink.bind(this);
    }

    handleMoveToLink(){
        const url = 'http://cafe.naver.com/ggigguinmuenchen';
        window.open(url, '_blank');
    }
    render() {
        return (<div>
            <Card>
                <Card.Header>공지사항 2019.12.25</Card.Header>
                <Card.Body>
                    <Card.Title>지쿠 배송/구매대행 오픈</Card.Title>
                    <Card.Text>
                        지꾸의 독일구매행 카페에서 드디어 지쿠웹사이트를 런칭하게 되었습니다.
                    </Card.Text>
                    <Button variant="outline-secondary" size="sm" onClick={this.handleMoveToLink}>지쿠 카페 바로가기</Button>
                </Card.Body>
            </Card>
        </div>
        );
    }
}