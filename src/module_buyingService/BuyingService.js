import styled from "styled-components";
import {
    AppContainer as BaseAppContainer,
    BaseNavigation,
} from "../container";
import React, { Component } from 'react';
import { AppNavbar } from '../AppNavbar'
import { BuyingServiceNavbar } from './BuyingServiceIntro'
import { Card, Form, InputGroup, Row, Col, Container, Button, Breadcrumb } from 'react-bootstrap';
import { Icon as BaseIcon } from "react-icons-kit";
import { times, exchange } from 'react-icons-kit/fa/'
import { getKoreanCurrencyWithInfoBadge } from '../module_base_component/BaseUtil'
import { CompanyIntroductionBottom } from '../module_base_component/BaseCompanyIntroduction'

///// keycloak -> /////
import * as Keycloak from 'keycloak-js';
import { keycloakConfigLocal, openBasePort, openHeaders, headers, setTokenHeader } from "../module_base_component/AuthService"
var keycloak = Keycloak(keycloakConfigLocal);
///// <- keycloak /////

{/* BuyingService Style */}
export const BodyContainer = styled(BaseAppContainer)`
    min-height:calc(100vh);
    height: auto;
    flex-direction: column;
    flex: 1;
    justifyContent: 'flex-end';
    
`;
const BuyingServiceContainer = styled(BaseAppContainer)`
    height:auto;
    min-height:calc(100vh);
`;

const CompanyIntroductionStyle = styled.section`
    height: 100%;
    width: 90%;
    vertical-align: bottom;
`;

export class BuyingService extends React.Component{

    render() {
        return (
            <div>
            <AppNavbar/>
            <BuyingServiceContainer>
                <BuyingServiceNavbar/>
                <BodyContainer>
                    <Breadcrumb>
                        <Breadcrumb.Item active>구매대행</Breadcrumb.Item>
                        <Breadcrumb.Item active>구매대행 견적보기</Breadcrumb.Item>
                    </Breadcrumb>
                    <BuyingServiceWrapper/>
                   
                    <CompanyIntroductionStyle>
                        <CompanyIntroductionBottom/>
                    </CompanyIntroductionStyle>
                </BodyContainer>
            </BuyingServiceContainer>
            </div>
        );}           
}

const Icon = props => <BaseIcon size={16} icon={props.icon} />;
const IconCnt = styled.div`
`;

export class BuyingServiceWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCalculationResult:false,
            fasrEstimationResult:'',
            productsValue:'',
            productsValueValid:false,
            deliveryValue:'',
            deliveryValueValid:false,
        }

      this.handleProductsValue = this.handleProductsValue.bind(this)
      this.handleDeliveryValue = this.handleDeliveryValue.bind(this)
    }

    handleProductsValue(event){
        let productsValue = event.target.value
        let productsValueValid = productsValue > 0
        this.setState({productsValue:productsValue, productsValueValid:productsValueValid})
    }

    handleDeliveryValue(event){
        let deliveryValue = event.target.value
        let deliveryValueValid = deliveryValue >= 0
        this.setState({deliveryValue:deliveryValue, deliveryValueValid:deliveryValueValid})
    }

    handleGetFastEstimation(contents){
        console.log(contents)
        fetch(openBasePort + '/fastEstimationBuyingService', 
                {method:'post', headers, 
                  body:JSON.stringify(contents)})
                .then((result) => { return result.json();})
                .then((data) => {
                    this.setState( { fasrEstimationResult: data} )
                }).catch(err => err);
    }

    handleCalculation(){
        let productsValue = this.state.productsValue 
        let deliveryValue = this.state.deliveryValue 
        
        const fastEstimationObject = [
            {productsValue:productsValue},
            {deliveryValue:deliveryValue},
        ]
        if (this.state.deliveryValueValid && this.state.productsValueValid){
            console.log("valid values")
            this.handleGetFastEstimation(fastEstimationObject)  
        } else {
            this.setState({fasrEstimationResult:''})
        }
    }
      
    render() {
        let fasrEstimationResult = getKoreanCurrencyWithInfoBadge(this.state.fasrEstimationResult.resultPrice)
        return (
          <div>
            <Card border="dark" style={{ width:'70%', height:'20rem', marginTop:'1rem', marginLeft:'1rem' }}>
                <Card.Header>구매대행 물품목록 작성
                </Card.Header>
                    <Card.Body>

                        <Card border="dark" style={{ width: '90%', marginBottom:'5px'}}>
                            <Card.Header>상품</Card.Header>
                            <Card.Body >
                            <InputGroup size="sm" style={{ width:'80%'}} className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon3" style={{ width: '110px'}}>
                                        상품 가격
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                
                                <Form.Control id="basic-url" aria-describedby="basic-addon3" 
                                    placeholder="배송되는 박스기준 물품 전체가격을 유로로 기입해주세요"
                                    onChange={this.handleProductsValue}
                                    //type="text"
                                    //isInvalid={warningInvalidItemName}
                                />
                            </InputGroup>

                            <InputGroup size="sm" style={{ width:'80%'}} className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon3" style={{ width: '110px'}}>
                                        독일내 배송비
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control id="basic-url" aria-describedby="basic-addon3" 
                                    placeholder="결제하실때 판매자가 책정한 배송비를 유로로 기입해주세요"
                                    onChange={this.handleDeliveryValue}
                                    //type="text"
                                    //isInvalid={warningInvalidItemName}
                                />
                            </InputGroup>
                                
                            </Card.Body>
                        </Card>
                      
                </Card.Body>
            </Card>

            <Card border="dark" style={{ width:'70%', marginTop:'1rem', marginBottom:'5rem', marginLeft:'1rem' }}>
                <Card.Header>구매대행 견적보기
                </Card.Header>
                    <Card.Body>
                    <Container>
                        <Row>
                            <Col xs={8}>{fasrEstimationResult}</Col>
                            {/* <Col></Col> */}
                            <Col>
                                <Button size="sm" 
                                    variant='secondary' 
                                    style={{  marginRight: '10%', fontSize:'14px', float:"right"}}
                                    onClick={(e) => this.handleCalculation(e)}
                                >견적 계산
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                        </Row>    
                    </Container>
                    </Card.Body>
            </Card> 
          </div>
        );
      }    
}

export class BuyingBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          productsValue:null,
          deliveryValue:null,
        }

      this.handleProductsValue = this.handleProductsValue.bind(this)
      this.handleDeliveryValue = this.handleDeliveryValue.bind(this)
    }

    componentDidMount() {
        var buyingBox = {
            productsValue: "",
            deliveryValue: "",
        };
    }

    handleProductsValue(event){
        this.setState({productsValue:event.target.value})
    }

    handleDeliveryValue(event){
        this.setState({deliveryValue:event.target.value})
    }
      
    render() {
        return (
          <div>
            <Card border="dark" style={{ width: '90%', marginBottom:'5px'}}>
                <Card.Header>상품</Card.Header>
                <Card.Body >
                <InputGroup size="sm" style={{ width:'80%'}} className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon3" style={{ width: '110px'}}>
                            상품 가격
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    
                    <Form.Control id="basic-url" aria-describedby="basic-addon3" 
                        placeholder="배송되는 박스기준 물품 전체가격을 유로로 기입해주세요"
                        onChange={this.handleProductsValue}
                        //type="text"
                        //isInvalid={warningInvalidItemName}
                    />
                </InputGroup>

                <InputGroup size="sm" style={{ width:'80%'}} className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon3" style={{ width: '110px'}}>
                            독일내 배송비
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control id="basic-url" aria-describedby="basic-addon3" 
                        placeholder="결제하실때 판매자가 책정한 배송비를 유로로 기입해주세요"
                        onChange={this.handleDeliveryValue}
                        //type="text"
                        //isInvalid={warningInvalidItemName}
                    />
                </InputGroup>
                    <Button variant="secondary" size="sm" 
                        onClick={() => this.props.handleRemoveBuyingBoxOnList(this.props.index)} 
                        style={{ marginRight: '10px', marginTop: '10px', float:"right"}}>삭제</Button>     
                </Card.Body>
            </Card>
        </div>
        );
      }    
}