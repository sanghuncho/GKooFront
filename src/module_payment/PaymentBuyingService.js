import styled from "styled-components";
import React from 'react';
import { Table, Card, Form, InputGroup, FormControl, Button, Dropdown, DropdownButton } from "react-bootstrap"
import { Icon as BaseIcon } from "react-icons-kit";

export class PaymentProductBooking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          artPayment: "무통자입금",
          paymentOwerName: "",
        }
        this.inputArtPayment = this.inputArtPayment.bind(this);
        this.inputPaymentOwnerName = this.inputPaymentOwnerName.bind(this);
    }

    inputArtPayment(event, art) {
        this.setState({ artPayment: art })
    }
    
    inputPaymentOwnerName(event) {
        this.setState({ paymentOwerName: event.target.value })
    }

    handleClickPayment() {
        //console.log(this.state.paymentOwerName)
        this.props.setPaymentCompletion(false)
        this.props.createPaymentOwnername(this.state.paymentOwerName)
    }
  
    render() {
    //   const actualWeight = this.props.productsCommonInfo.actualWeight
    //   const volumeWeight = this.props.productsCommonInfo.volumeWeight
    //   const shipPrice = this.props.productsCommonInfo.shipPrice
    //   const priceDiscount = 1000
    //   const shouldDeposit = shipPrice - priceDiscount
  
      return (
        <div>
          <Card border="dark" style={{ height: '27rem', marginTop: '1rem', marginBottom: '1rem' }}>
            <Card.Header>구매대행 결제정보</Card.Header>
            <Card.Body >
              
              <InputGroup className="mb-3">
                {/* <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon3">
                        견적<br/>정보
                    </InputGroup.Text>
                </InputGroup.Prepend> */}
                
                <Card style={{ width: '100%' }}>
                  <Card.Body>
                    <Table bordered condensed responsive size="sm">
                      <thead>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{textAlign:"center", width:'140px'}} >구매대행 견적</td>
                          <td style={{textAlign:"center"}}> 18000원 </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </InputGroup>

              <InputGroup className="mb-3">
                {/* <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon3">
                    결제<br/>정보
                    </InputGroup.Text>
                </InputGroup.Prepend> */}
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
                        >
                        <Dropdown.Item onSelect={e => this.inputArtPayment(e, "무통장입금")}>
                            무통장입금</Dropdown.Item>
                        </DropdownButton>
                    </InputGroup>
                    <InputGroup size="sm" className="mb-3" style={{ width: '80%' }}>
                    <InputGroup.Prepend >
                      <InputGroup.Text id="basic-addon3" >
                        입금자명
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl id="basic-url" aria-describedby="basic-addon3"
                      onChange={this.inputPaymentOwnerName}
                      style={{ marginRight: '10px' }}
                    />
                    {/*ToDo: 입금자명 Null Check */}
                    <Button variant="secondary"
                      size="sm"
                      //onClick={() => this.props.setPaymentCompletion(true)}>
                      onClick={() => this.handleClickPayment()}>
                      결제 하기
                       </Button>
                    </InputGroup >
                    <Card.Body>
                        입금계좌: 우리은행 1002 044 635 530<br/> 예금주: 조상훈
                    </Card.Body>
                    {/* <Table bordered condensed responsive size="sm">
                      <thead>
                      </thead>
                      <tbody>
                        <tr>
                          <td>총 결제하실 금액</td>
                          <td>{shouldDeposit}원</td>
                        </tr>
                        <tr>
                          <td>결제수단</td>
                          <td>무통장입금</td>
                        </tr>
                        <tr>
                          <td>입금계좌</td>
                          <td>우리은행 1002 044 635 530, 예금주: 조상훈</td>
                        </tr>
                        <tr>
                          <td>입금자명</td>
                          <td>{this.props.productsCommonInfo.paymentOwnerName}</td>
                        </tr>
                      </tbody>
                    </Table> */}
                  </Card.Body>
                </Card>
              </InputGroup>
            </Card.Body>
          </Card>
        </div>
      );
    }
  }
  