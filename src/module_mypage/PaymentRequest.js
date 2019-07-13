import styled from "styled-components";
import React from 'react';
import { Route, Switch, NavLink } from "react-router-dom";

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
                                      입금계좌: 우리은행 1002 044 635 530, 예금주: 조상훈 
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