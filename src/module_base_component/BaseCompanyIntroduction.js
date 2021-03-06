import * as React from "react";
import { Card, Col, Container, Row, Button, OverlayTrigger } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import ShippingServiceSA from '../assets/ShippingServiceSA.jpg'
import GKoo_logo from '../assets/GKoo_logo_green.jpg'

export class CompanyIntroductionBottom  extends React.Component{
    render() {
        return (
            <div>
            <Card className="text-center" style={{ width: '80%', height:'13rem', marginTop:'1rem', marginLeft:'1rem', marginBottom:'2rem', fontSize:'14px'}}>
                <Card.Header>상호명: 지쿠(GKoo) | 대표: 조상훈 | 개인정보책임자: 조상훈 | 호스팅 제공자: 카페24</Card.Header>
                <Card.Body>
                    <Container>
                    <Row>
                        <Col  xs={2}>
                            <Image src={GKoo_logo} style={{ width: '120px', marginLeft:'5%', marginTop:'10%'}}/>
                        </Col>
                        {/* <Col xs={7}> */}
                        <Col xs={7}>
                            <Card.Text>
                            사업자등록번호: 311-34-00638 | 통신판매신고: 2020-대구남구-0282  <br/>
                            카카오톡 아이디: GKoo | 이메일: gkoosoft@gmail.com <br/>
                            주소: 대구광역시 남구 양지로 16 영호빌딩 3층(대명동) <br/>
                            이용약관 | 개인정보처리방침 <br/>
                            COPYRIGHT (C) 2020 GKoo ALL RIGHT RESERVED
                            </Card.Text>
                        </Col>
                        {/* <Col>
                            <Image src={ShippingServiceSA} style={{ width: '200px', marginLeft:'10%', marginTop:'25px'}}/>
                        </Col> */}
                    </Row>
                    </Container>
                </Card.Body>
                {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
            </Card>
            </div>
        );}           
}