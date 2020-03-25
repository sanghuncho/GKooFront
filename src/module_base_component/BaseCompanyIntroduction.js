import * as React from "react";
import { Card, Form, InputGroup, FormControl, Button, OverlayTrigger } from 'react-bootstrap';

export class CompanyIntroductionBottom  extends React.Component{
    render() {
        return (
            <div>
            <Card className="text-center" style={{ width: '80%', height:'12rem', marginTop:'1rem', marginLeft:'1rem', marginBottom:'2rem',}}>
                <Card.Header>상호명: 지쿠(GKoo) | 대표: 조상훈 | 개인정보책임자: 조상훈 | 호스팅 제공자: 카페24</Card.Header>
                <Card.Body>
                    {/* <Card.Title>Special title treatment</Card.Title> */}
                    <Card.Text>
                     사업자등록번호: 311-34-00638 | 통신판매신고: 제 000  <br/>
                     전화번호: 070-000-0000 | 카카오톡 아이디: gkoo <br/>
                     주소: 대구광역시 남구 양지로 16 조영호 내과 3층(대명동) <br/>
                     이용약관 | 개인정보처리방침 <br/>
                     COPYRIGHT (C) 2020 GKoo ALL RIGHT RESERVED
                    </Card.Text>
                </Card.Body>
                {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
            </Card>
            </div>
        );}           
}