import styled from "styled-components";
import React from 'react';
import { Table, Card, Form, InputGroup, FormControl, Button, Dropdown, DropdownButton } from "react-bootstrap"
import { Icon as BaseIcon } from "react-icons-kit";
import { PAYMENT_ART_LIST, PaymentArtToString, PaymentArtToInt } from '../module_payment/PaymentUtil'

const Icon = props => <BaseIcon size={16} icon={props.icon} />;
const IconCnt = styled.div`
`;

export class MyPageDetailDeliveryPrice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requestPayment: true,
      //productsCommonInfo: this.props.productsCommonInfo
    }
    this.setPaymentCompletion = this.setPaymentCompletion.bind(this);
    //this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)
  }

  setPaymentCompletion(event) {
    this.setState({ requestPayment: event })
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({ productsCommonInfo: nextProps.productsCommonInfo });
  // }

  render() {
    //const arrived = this.props.productsCommonInfo.shipState === "입고대기" ? false : true; 
    //const paymentState = this.state.productsCommonInfo.paymentState
    const paymentState = this.props.productsCommonInfo.paymentState
    
    /* 테스트용으로 arrived = true */
    const arrived = true
    let paymentContent;

    if (!arrived) {
      paymentContent = ""
    } else if (arrived & paymentState == 1) {//무통장 입금주 입력전
      paymentContent = <PaymentRequest setPaymentCompletion={this.setPaymentCompletion}
        createPaymentOwnername={this.props.createPaymentOwnername}
        productsCommonInfo={this.props.productsCommonInfo} />;
    } else if (arrived & paymentState == 2) {//무통장 결제 요청, 입금확인전 
      paymentContent = <PaymentBooking productsCommonInfo={this.props.productsCommonInfo} />;
    } else if (arrived & paymentState == 3) {//무통장 결제 요청후, 입금확인후
      paymentContent = <PaymentCompletion productsCommonInfo={this.props.productsCommonInfo} />;
    } else {
      //Logger
    }

    return (
      <div>
        {paymentContent}
      </div>
    );
  }
}

export class PaymentRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artPayment: "선택",
      artPaymentList:PAYMENT_ART_LIST,
      paymentOwername: "",
    }
    this.inputArtPayment = this.inputArtPayment.bind(this);
    this.inputPaymentOwnerName = this.inputPaymentOwnerName.bind(this);
  }

  // handlePaymentRequest(event){

  // }


  inputArtPayment(event, art) {
    this.setState({artPayment:art})
    //console.log(PaymentArtToInt(art))
  }

  inputPaymentOwnerName(event) {
    this.setState({ paymentOwername: event.target.value })
  }

  handleClickPayment() {
    //console.log(this.state.paymentOwerName)
    this.props.setPaymentCompletion(false)
    const paymentArt = PaymentArtToInt(this.state.artPayment)
    this.props.createPaymentOwnername(this.state.paymentOwername, paymentArt)
  }

  render() {

    const actualWeight = this.props.productsCommonInfo.actualWeight
    const volumeWeight = this.props.productsCommonInfo.volumeWeight
    const shipPrice = this.props.productsCommonInfo.shipPrice
    const priceDiscount = 1000
    const shouldDeposit = shipPrice - priceDiscount

    return (
      <div>
        <Card border="dark" style={{ width: '80%', height: '34rem', marginTop: '1rem', marginBottom: '1rem' }}>
          <Card.Header>운송료 결제요청</Card.Header>
          <Card.Body >
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon3">
                  운송<br />정보
                    </InputGroup.Text>
              </InputGroup.Prepend>
              <Card style={{ width: '90%' }}>
                <Card.Body>
                  <Table bordered condensed responsive size="sm">
                    <thead>
                    </thead>
                    <tbody>
                      <tr>
                        <td width='300px'>무게정보</td>
                        <td>실중량: {actualWeight}kg / 부피무게: {volumeWeight}kg </td>
                      </tr>
                      <tr>
                        <td>해외배송비</td>
                        <td>{shipPrice}원</td>
                      </tr>
                      <tr>
                        <td>합배송비/기타수수료</td>
                        <td>0원</td>
                      </tr>
                      <tr>
                        <td>운송료 할인</td>
                        <td>{priceDiscount}원</td>
                      </tr>
                      <tr>
                        <td>총 결제하실 금액</td>
                        <td>{shouldDeposit}원</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon3">
                  결제<br />정보
                    </InputGroup.Text>
              </InputGroup.Prepend>
              <Card style={{ width: '90%' }}>
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
                    {/* <Dropdown.Item onSelect={e => this.inputArtPayment(e, "무통장입금")}>
                        무통장입금</Dropdown.Item> */}
                    {this.state.artPaymentList.map((artPayment) => 
                                { return (<div><Dropdown.Item onSelect={e => this.inputArtPayment(e, artPayment)}>{artPayment}</Dropdown.Item></div> )})}
                    </DropdownButton>
                  </InputGroup>
                  <InputGroup size="sm" className="mb-3" style={{ width: '50%' }}>
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

class PaymentBooking extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const actualWeight = this.props.productsCommonInfo.actualWeight
    const volumeWeight = this.props.productsCommonInfo.volumeWeight
    const shipPrice = this.props.productsCommonInfo.shipPrice
    const priceDiscount = 1000
    const shouldDeposit = shipPrice - priceDiscount

    return (
      <div>
        <Card border="dark" style={{ width: '80%', height: '36rem', marginTop: '1rem', marginBottom: '1rem' }}>
          <Card.Header>운송료 결제정보</Card.Header>
          <Card.Body >
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon3">
                  운송<br />정보
                    </InputGroup.Text>
              </InputGroup.Prepend>
              <Card style={{ width: '90%' }}>
                <Card.Body>
                  <Table bordered condensed responsive size="sm">
                    <thead>
                    </thead>
                    <tbody>
                      <tr>
                        <td width='300px'>무게정보</td>
                        <td>실중량: {actualWeight}kg / 부피무게: {volumeWeight}kg </td>
                      </tr>
                      <tr>
                        <td>해외배송비</td>
                        <td>{shipPrice}원</td>
                      </tr>
                      <tr>
                        <td>합배송비/기타수수료</td>
                        <td>0원</td>
                      </tr>
                      <tr>
                        <td>운송료 할인</td>
                        <td>{priceDiscount}원</td>
                      </tr>
                      <tr>
                        <td>총 결제하실 금액</td>
                        <td>{shouldDeposit}원</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon3">
                  결제<br />정보
                    </InputGroup.Text>
              </InputGroup.Prepend>
              <Card style={{ width: '90%' }}>
                <Card.Body>
                  <Table bordered condensed responsive size="sm">
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
                  </Table>
                </Card.Body>
              </Card>
            </InputGroup>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

class PaymentCompletion extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const actualWeight = this.props.productsCommonInfo.actualWeight
    const volumeWeight = this.props.productsCommonInfo.volumeWeight
    const shipPrice = this.props.productsCommonInfo.shipPrice
    const priceDiscount = 1000
    const shouldDeposit = shipPrice - priceDiscount
    const paymentDeposit = this.props.productsCommonInfo.paymentDeposit
    const paymentArt = PaymentArtToString(this.props.productsCommonInfo.paymentArt)
    return (
      <div>
        <Card border="dark" style={{ width: '80%', height: '39rem', marginTop: '1rem', marginBottom: '1rem' }}>
          <Card.Header>운송료 결제정보</Card.Header>
          <Card.Body >
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon3">
                  운송<br />정보
                    </InputGroup.Text>
              </InputGroup.Prepend>
              <Card style={{ width: '90%' }}>
                <Card.Body>
                  <Table bordered condensed responsive size="sm">
                    <thead>
                    </thead>
                    <tbody>
                      <tr>
                        <td width='300px'>무게정보</td>
                        <td>실중량: {actualWeight}kg / 부피무게: {volumeWeight}kg </td>
                      </tr>
                      <tr>
                        <td>해외배송비</td>
                        <td>{shipPrice}원</td>
                      </tr>
                      <tr>
                        <td>합배송비/기타수수료</td>
                        <td>0원</td>
                      </tr>
                      <tr>
                        <td>운송료 할인</td>
                        <td>{priceDiscount}원</td>
                      </tr>
                      <tr>
                        <td>총 결제하실 금액</td>
                        <td>{shouldDeposit}원</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon3">
                  결제<br />정보
                    </InputGroup.Text>
              </InputGroup.Prepend>
              <Card style={{ width: '90%' }}>
                <Card.Body>
                  <Table bordered condensed responsive size="sm">
                    <thead>
                    </thead>
                    <tbody>
                      <tr>
                        <td width='300px'>결제번호</td>
                        <td>{this.props.productsCommonInfo.paymentid}</td>
                      </tr>
                      <tr>
                        <td>결제일자</td>
                        <td>{this.props.productsCommonInfo.paymentDate}</td>
                      </tr>
                      <tr>
                        <td>운송료 할인</td>
                        <td>1000원</td>
                      </tr>
                      <tr>
                        <td>총 결제금액</td>
                        <td>{paymentDeposit}원</td>
                      </tr>
                      <tr>
                        <td>결제수단</td>
                        <td>{paymentArt}</td>
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
                  </Table>
                </Card.Body>
              </Card>
            </InputGroup>
          </Card.Body>
        </Card>
      </div>
    );
  }
}