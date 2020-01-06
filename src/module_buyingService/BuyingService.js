import styled from "styled-components";
import {
    AppContainer as BaseAppContainer,
    BaseNavigation,
} from "../container";
import React, { Component } from 'react';
import { AppNavbar } from '../AppNavbar'
import { BuyingServiceNavbar } from './BuyingServiceIntro'
import { Card, Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { Icon as BaseIcon } from "react-icons-kit";
import { times, exchange } from 'react-icons-kit/fa/'

{/* BuyingService Style */}
export const BodyContainer = styled(BaseAppContainer)`
  height:auto;
  flex-direction: column;
`;
const BuyingServiceContainer = styled(BaseAppContainer)`
  height: calc(250vh);
`;

export class BuyingService extends React.Component{

    render() {
        return (
            <div>
            <AppNavbar/>
            <BuyingServiceContainer>
                <BuyingServiceNavbar/>
                <BodyContainer>
                    <BuyingServiceWrapper/>
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
            buyingBoxList:[],
            showCalculationResult:false,
            calculationResult:null,
            productsValue:null
        }

      this.handleRemoveBuyingBoxOnList = this.handleRemoveBuyingBoxOnList.bind(this)
    }

    componentDidMount() {
        this.setState({
            buyingBoxList:[...this.state.buyingBoxList, ""],
          })
    }

    handleAddBuyingBoxOnList(event){
        this.setState({
            buyingBoxList:[...this.state.buyingBoxList, ""],
        })
    }

    handleRemoveBuyingBoxOnList(index){
        this.state.buyingBoxList.splice(index, 1)
        this.setState({ buyingBoxList:this.state.buyingBoxList })
    }

    handleCalculation(){
        var box = this.state.buyingBoxList[0]
        this.setState({ productsValue:box.productsValue })
        console.log(box.productsValue)
    }
      
    render() {
        const sizeOnList = this.state.buyingBoxList.length
        let heightBuyingServiceWrapper
        heightBuyingServiceWrapper = 20*sizeOnList + 'rem'

        let calculationResult = this.state.calculationResult
        return (
          <div>
            <Card border="dark" style={{ width:'70%', height:{heightBuyingServiceWrapper}, marginTop:'1rem', marginLeft:'1rem' }}>
                <Card.Header>구매대행 물품목록 작성
                </Card.Header>
                    <Card.Body>

                        {this.state.buyingBoxList.map((itemName, index) => { return (
                            <div key={index}>
                            <BuyingBox
                                index={index}
                                handleRemoveBuyingBoxOnList={this.handleRemoveBuyingBoxOnList}
                                buyingBoxList = {this.state.buyingBoxList}
                            />
                            </div>
                  )})}

                    <Button size="sm" 
                        variant='secondary' 
                        style={{  marginTop:'10px', marginLeft:'45%', fontSize:'14px'}}
                        onClick={(e) => this.handleAddBuyingBoxOnList(e)}
                    >상품 추가
                    </Button>

                    {/* <Button size="sm" 
                        variant='secondary' 
                        style={{  marginLeft:'45%', fontSize:'14px'}}
                        onClick={(e) => this.handleSendEmnail(e)}
                    >문의하기
                    </Button> */}
                </Card.Body>
            </Card>

            <Card border="dark" style={{ width:'70%', height:{heightBuyingServiceWrapper}, marginTop:'1rem', marginLeft:'1rem' }}>
                <Card.Header>구매대행 견적보기
                </Card.Header>
                    <Card.Body>
                        <Button size="sm" 
                            variant='secondary' 
                            style={{  marginTop:'10px', marginLeft:'45%', fontSize:'14px'}}
                            onClick={(e) => this.handleCalculation(e)}
                        >견적 계산
                        </Button>

                        {calculationResult}

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
        this.props.buyingBoxList[this.props.index] = buyingBox
    }

    handleProductsValue(event){
        this.setState({productsValue:event.target.value})
        this.props.buyingBoxList[this.props.index].productsValue = event.target.value
    }

    handleDeliveryValue(event){
        this.setState({deliveryValue:event.target.value})
        this.props.buyingBoxList[this.props.index].deliveryValue = event.target.value
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