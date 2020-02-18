import styled from "styled-components";
import React from 'react';
import { Table, Card, Form, InputGroup, FormControl, Button, Dropdown, DropdownButton } from "react-bootstrap"
import { getFormatKoreanCurrency } from '../module_base_component/BaseUtil'
import { PaymentArtToInt, PAYMENT_ART_LIST, PaymentArtToString } from './PaymentUtil'

///// keycloak -> /////
import * as Keycloak from 'keycloak-js';
import { keycloakConfigLocal, basePort, openHeaders, headers, setTokenHeader } from "../module_base_component/AuthService"
var keycloak = Keycloak(keycloakConfigLocal);
///// <- keycloak /////

export class PaymentProductBooking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          artPayment: this.props.paymentArt,
          artPaymentList:PAYMENT_ART_LIST,
          paymentOwnername: "",
          keycloakAuth:null,
          accessToken:"",
        }
        this.inputArtPayment = this.inputArtPayment.bind(this);
        this.inputPaymentOwnername = this.inputPaymentOwnername.bind(this);
    }

    inputArtPayment(event, art) {
        this.setState({artPayment:art})
    }
    
    inputPaymentOwnername(event) {
        this.setState({paymentOwnername:event.target.value})
    }

    handleClickPayment() {
        this.updateOwnername(localStorage.getItem("react-token", keycloak.token))
        console.log(this.state.paymentOwnername)
        //console.log(localStorage.getItem("react-token", keycloak.token))
        console.log(PaymentArtToInt(this.state.artPayment))
    }

    updateOwnername(token){
        setTokenHeader(token)
        const contents = [
            {paymentid:this.props.paymentid},
            {paymentOwnername:this.state.paymentOwnername},
            {paymentArt:PaymentArtToInt(this.state.artPayment)},
        ]

        fetch(basePort + '/updatePaymentProductBuyingService', 
                {method:'post', headers, 
                  body:JSON.stringify(contents)})
                .then((result) => { return result;}).then((contents) => {
            console.log(contents)
        }).catch(err => err);
    }
  
    render() {
    let paymentButton
      if (!this.props.readOnly) {
        paymentButton =  <Button variant="secondary" size="sm"
                                onClick={() => this.handleClickPayment()}
                         > 결제하기 </Button>}
      else {
        paymentButton = ""
      }
    
    let formattedPrice = getFormatKoreanCurrency(this.props.buyingPrice)
    return (
        <div>
          <Card border="dark" style={{ height: '27rem', marginTop: '1rem', marginBottom: '1rem' }}>
            <Card.Header>구매대행 결제정보</Card.Header>
            <Card.Body >
              <InputGroup className="mb-3">
                <Card style={{ width: '100%' }}>
                  <Card.Body>
                    <Table bordered condensed responsive size="sm">
                      <thead>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{textAlign:"center", width:'140px'}} >구매대행 견적</td>
                          <td style={{textAlign:"center"}}> {formattedPrice} </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </InputGroup>

              <InputGroup className="mb-3">
                <Card style={{ width: '100%' }}>
                    <Card.Body>
                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon3">
                            결제수단
                        </InputGroup.Text>
                        </InputGroup.Prepend>
                        <DropdownButton
                        as={InputGroup.Prepend}
                        variant="outline-secondary"
                        title={this.state.artPayment}
                        id="input-group-dropdown-1"
                        disabled={this.props.readOnly}
                        >
                        {this.state.artPaymentList.map((paymentArt) => 
                                { return (<div><Dropdown.Item onSelect={e => 
                                    this.inputArtPayment(e, paymentArt)}>{paymentArt}
                                    </Dropdown.Item></div> )})}
                        
                        </DropdownButton>
                    </InputGroup>
                    <InputGroup size="sm" className="mb-3" style={{ width: '80%' }}>
                    <InputGroup.Prepend >
                      <InputGroup.Text id="basic-addon3" >
                        입금자명
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl id="basic-url" aria-describedby="basic-addon3"
                      onChange={this.inputPaymentOwnername}
                      readOnly={this.props.readOnly}
                      defaultValue={this.props.paymentOwnername}
                      style={{ marginRight: '10px' }}
                    />
                    
                    {/*ToDo: 입금자명 Null Check */}
                    {paymentButton}
                    
                    </InputGroup >
                    <Card.Body>
                        입금계좌: 우리은행 1002 044 635 530<br/> 예금주: 조상훈
                    </Card.Body>
                  </Card.Body>
                </Card>
              </InputGroup>
            </Card.Body>
          </Card>
        </div>
      );
    }
  }

  export class PaymentDeliveryBooking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          artPayment: this.props.paymentArt,
          artPaymentList:PAYMENT_ART_LIST,
          paymentOwnername: "",
          keycloakAuth:null,
          accessToken:"",
        }
        this.inputArtPayment = this.inputArtPayment.bind(this);
        this.inputPaymentOwnername = this.inputPaymentOwnername.bind(this);
    }

    inputArtPayment(event, art) {
        this.setState({artPayment:art})
    }
    
    inputPaymentOwnername(event) {
        this.setState({paymentOwnername:event.target.value})
    }

    handleClickPayment() {
        this.updateOwnername(localStorage.getItem("react-token", keycloak.token))
        console.log(this.state.paymentOwnername)
        //console.log(localStorage.getItem("react-token", keycloak.token))
        console.log(PaymentArtToInt(this.state.artPayment))
    }

    updateOwnername(token){
        setTokenHeader(token)
        const contents = [
            {paymentid:this.props.paymentid},
            {paymentOwnername:this.state.paymentOwnername},
            {paymentArt:PaymentArtToInt(this.state.artPayment)},
        ]

        fetch(basePort + '/updatePaymentProductBuyingService', 
                {method:'post', headers, 
                  body:JSON.stringify(contents)})
                .then((result) => { return result;}).then((contents) => {
            console.log(contents)
        }).catch(err => err);
    }
  
    render() {
    let paymentButton
      if (!this.props.readOnly) {
        paymentButton =  <Button variant="secondary" size="sm"
                                onClick={() => this.handleClickPayment()}
                         > 결제하기 </Button>}
      else {
        paymentButton = ""
      }
    
    let formattedPrice = getFormatKoreanCurrency(this.props.shipPrice)
    return (
        <div>
          <Card border="dark" style={{ height: '27rem', marginTop: '1rem', marginBottom: '1rem' }}>
            <Card.Header>구매대행 결제정보</Card.Header>
            <Card.Body >
              <InputGroup className="mb-3">
                <Card style={{ width: '100%' }}>
                  <Card.Body>
                    <Table bordered condensed responsive size="sm">
                      <thead>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{textAlign:"center", width:'140px'}} >배송비 견적</td>
                          <td style={{textAlign:"center"}}> {formattedPrice} </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </InputGroup>

              <InputGroup className="mb-3">
                <Card style={{ width: '100%' }}>
                    <Card.Body>
                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon3">
                            결제수단
                        </InputGroup.Text>
                        </InputGroup.Prepend>
                        <DropdownButton
                        as={InputGroup.Prepend}
                        variant="outline-secondary"
                        title={this.state.artPayment}
                        id="input-group-dropdown-1"
                        disabled={this.props.readOnly}
                        >
                        {this.state.artPaymentList.map((paymentArt) => 
                                { return (<div><Dropdown.Item onSelect={e => 
                                    this.inputArtPayment(e, paymentArt)}>{paymentArt}
                                    </Dropdown.Item></div> )})}
                        
                        </DropdownButton>
                    </InputGroup>
                    <InputGroup size="sm" className="mb-3" style={{ width: '80%' }}>
                    <InputGroup.Prepend >
                      <InputGroup.Text id="basic-addon3" >
                        입금자명
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl id="basic-url" aria-describedby="basic-addon3"
                      onChange={this.inputPaymentOwnername}
                      readOnly={this.props.readOnly}
                      defaultValue={this.props.paymentOwnername}
                      style={{ marginRight: '10px' }}
                    />
                    
                    {/*ToDo: 입금자명 Null Check */}
                    {paymentButton}
                    
                    </InputGroup >
                    <Card.Body>
                        입금계좌: 우리은행 1002 044 635 530<br/> 예금주: 조상훈
                    </Card.Body>
                  </Card.Body>
                </Card>
              </InputGroup>
            </Card.Body>
          </Card>
        </div>
      );
    }
}