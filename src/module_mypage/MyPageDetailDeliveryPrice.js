import styled from "styled-components";
import React from 'react';
import { Table, Card, Form, InputGroup, FormControl, Button, Dropdown, DropdownButton } from "react-bootstrap"
import { Icon as BaseIcon } from "react-icons-kit";
import { check } from 'react-icons-kit/fa/'

const Icon = props => <BaseIcon size={16} icon={props.icon} />;
const IconCnt = styled.div`
`;

export class MyPageDetailDeliveryPrice extends React.Component{
    constructor(props) {
        super(props);
        this.state = { 
            requestPayment: true,
        }
        this.setPaymentCompletion = this.setPaymentCompletion.bind(this);    
      }
      
      setPaymentCompletion(event){
        this.setState({requestPayment:false})
      }
     

      render() {
        const isRequestPayment = this.state.requestPayment;
        let paymentContent;

        if (isRequestPayment) {
            paymentContent = <PaymentRequest setPaymentCompletion={this.setPaymentCompletion}/>;
            //paymentContent = <PaymentRequest/>;
        } else {
            paymentContent = <PaymentCompletion/>;
        }

        return (
          <div>
              {paymentContent}
          </div>
        );
      }    
}

export class PaymentRequest extends React.Component{
    constructor(props) {
        super(props);
        this.state = { 
          artPayment:"무통자입금",
          paymentOwerName:"",
        }
        this.inputArtPayment = this.inputArtPayment.bind(this);
        this.inputPaymentOwnerName = this.inputPaymentOwnerName.bind(this);
      }

      // handlePaymentRequest(event){

      // }

      
      inputArtPayment(event, art) {
        this.setState({artPayment:art}) 
      }

      inputPaymentOwnerName(event){
        this.setState({paymentOwerName:event.target.value}) 
      }

      render() {
        return (
          <div>
            <Card border="dark" style={{ width: '100%', height:'22rem', marginTop:'1rem', marginBottom:'1rem' }}>
                <Card.Header>운송료 결제요청</Card.Header>
                <Card.Body >
                <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon3">
                                    결제<br/>정보
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Card style={{ width: '90%'}}>
                            <Card.Body>
                              <InputGroup className="mb-3">
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
                                    >
                                <Dropdown.Item onSelect={e => this.inputArtPayment(e, "무통장입금")}>
                                  무통장입금</Dropdown.Item>
                                    
                                </DropdownButton>
                              </InputGroup>
                                  <InputGroup className="mb-3" style={{ width: '80%'}}>
                                        <InputGroup.Prepend >
                                            <InputGroup.Text id="basic-addon3">
                                                입금자명
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl id="basic-url" aria-describedby="basic-addon3"
                                            onChange = { this.inputPaymentOwnerName }
                                            style={{ marginRight:'10px'}}
                                        />
                                    {/*ToDo: 입금자명 Null Check */}
                                    <Button variant="secondary"
                                      onClick={() => this.props.setPaymentCompletion(true)}>
                                        결제요청하기
                                    </Button>
                                  </InputGroup >
                                     
                                  <Card.Body>
                                      우리은행 1002 044 635 530 조상훈 
                                  </Card.Body>
                            </Card.Body> 
                            </Card> 
                        </InputGroup>    
                </Card.Body>
                {/* <Card.Footer>
                </Card.Footer> */}
                </Card>
          </div>
        );
      }    
}

class PaymentCompletion extends React.Component{
    constructor(props) {
        super(props);
      }
      
      render() {
        return (
          <div>
              <Card border="dark" style={{ width: '100%', height:'22rem', marginTop:'1rem', marginBottom:'1rem' }}>
                <Card.Header>운송료 결제정보</Card.Header>
                <Card.Body >
                <Table bordered condensed responsive size="sm">
                    <thead>
                    </thead>
                    <tbody>
                    <tr>
                        <td width='400px'>결제번호</td>
                        <td width='400px'>111</td>
                        {/* <td width='250px' align='right'>gkoo-{this.props.customerBaseInfo.customerId}</td> */}
                    </tr>
                    <tr>
                        <td>결제일자</td>
                        <td>2019.04.05</td>
                    </tr>
                    <tr>
                        <td>무게정보</td>
                        <td>실중량: 3.3kg / 부피무게: 5.1kg </td>
                    </tr>
                    <tr>
                        <td>해외배송비</td>
                        <td>35000원</td>
                    </tr>
                    <tr>
                        <td>합배송비/기타수수료</td>
                        <td>0원</td>
                    </tr>
                    <tr>
                        <td>운송료 할인</td>
                        <td>1000원</td>
                    </tr>
                    <tr>
                        <td>총 결제금액</td>
                        <td>34000원</td>
                    </tr>
                    <tr>
                        <td>결제수단</td>
                        <td>무통장입금</td>
                    </tr>
                    </tbody>
                </Table>
                </Card.Body>
                {/* <Card.Footer>
                </Card.Footer> */}
                </Card>
          </div>
        );
      }    
}