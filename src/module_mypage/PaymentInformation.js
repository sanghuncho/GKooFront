import styled from "styled-components";
import React from 'react';
import { NavLink } from "react-router-dom";
import { Button, Modal } from "react-bootstrap"
import BootstrapTable from 'react-bootstrap-table-next';
import { MyPageDetailDeliveryPrice } from "./MyPageDetailDeliveryPrice";
import { Redirect } from 'react-router';
import { PaymentProductBooking, PaymentDeliveryBooking } from '../module_payment/PaymentBuyingService'
import { PaymentArtToString } from '../module_payment/PaymentUtil'

function CaptionMypageTable(props) {
    return <h6 style={{ borderRadius: '0.25em', textAlign: 'left', color: 'black',
    padding: '0.5em', fontWeight:'bold' }}>{props.title}</h6>;
}
  
function paymentFormatter(cell, row) {        
    return (
      <PaymentButton paymentState={cell} orderid={row.orderid}/>
    );
}

function paymentBuyingServiceFormatter(cell, row, rowIndex, formatExtraData) {
    return (
      <PaymentBuyingServiceButton paymentState={cell} 
        orderid={row.orderid} 
        buyingPrice={row.buyingPrice}
        paymentid={row.paymentid}
        paymentOwnername={row.paymentOwnername}
        paymentArt={row.paymentArt}
        />
    );
}

function paymentDeliveryBuyingServiceFormatter(cell, row, rowIndex, formatExtraData) {
    return (
      <PaymentDeliveryBuyingServiceButton 
        paymentState={cell} 
        orderid={row.orderid} 
        shipPrice={row.shipPrice}
        boxActualWeight={row.boxActualWeight}
        boxVolumeWeight={row.boxVolumeWeight}
        paymentid={row.paymentid}
        paymentOwnername={row.paymentOwnername}
        paymentArt={row.paymentArt}
        />
    );
}

const MyPageBodyTableStyle = styled.div`
  margin-top: 10px;
  margin-bottom:10px;
  width: 290px;
  background: #FFFFFF;
  padding: 0px 5px 5px 5px;
  font-size: 13px;
`;

const MyPageBuyingServiceBodyTableStyle = styled.div`
  margin-top: 10px;
  margin-bottom:10px;
  width: 300px;
  background: #FFFFFF;
  padding: 0px 5px 5px 5px;
  font-size: 13px;
`;

const data = [
    {"orderNumber":"1234",
      "productInfo":"저먼사탕",
      "recipient":"성아",
      "deliveryPrice":"45000원",
      "paymentState":"결제요청"
    },
    {"orderNumber":"4567",
      "productInfo":"애플핸드폰",
      "recipient":"성준",
      "deliveryPrice":"450000원",
      "paymentState":"결제완료"
    }
  ]

export class PaymentInformation extends React.Component{
    constructor(props) {
        super(props);
      }
      
      render() {
        
        const columnsPayment = [{
            dataField: 'orderid',
            text: '신청번호'},
            {
            dataField: 'paymentState',
            text: '결제상태',
            formatter:paymentFormatter}, 
          ];
        
        return (
          <div>
            <MyPageBodyTableStyle>
                {/* <CaptionMypageTable title="결제 현황"/> */}
                <BootstrapTable keyField='objectId'  
                    data={ this.props.paymentData } 
                    //data={ data } 
                    columns={ columnsPayment } 
                    bordered={ true }  noDataIndication="Table is empty"  />
            </MyPageBodyTableStyle>
          </div>
        );
      }    
}

export class PaymentInformationBuyingService extends React.Component{
    constructor(props) {
        super(props);
        this.state = { 
          
        };
      }
      
      render() {
        
        const columnsPayment = [{
            dataField: 'orderid',
            text: '신청번호'},
            {
            dataField: 'paymentState',
            text: '결제상태',
            formatter:paymentBuyingServiceFormatter,
            }
          ];
        
        return (
          <div>
            <MyPageBuyingServiceBodyTableStyle>
                {/* <CaptionMypageTable title="결제 현황"/> */}
                <BootstrapTable keyField='objectId'  
                    data={ this.props.paymentData } 
                    //data={ data } 
                    columns={ columnsPayment } 
                    bordered={ true }  noDataIndication="Table is empty"  />
            </MyPageBuyingServiceBodyTableStyle>
          </div>
        );
      }    
}

export class PaymentDeliveryDataBuyingService extends React.Component{
    constructor(props) {
        super(props);
      }
      
      render() {
        
        const columnsPayment = [{
            dataField: 'orderid',
            text: '신청번호'},
            {
            dataField: 'paymentState',
            text: '결제상태',
            formatter:paymentDeliveryBuyingServiceFormatter}, 
          ];
        
        return (
          <div>
            <MyPageBuyingServiceBodyTableStyle>
                {/* <CaptionMypageTable title="결제 현황"/> */}
                <BootstrapTable keyField='objectId'  
                    data={ this.props.paymentDelivery } 
                    //data={ data } 
                    columns={ columnsPayment } 
                    bordered={ true }  noDataIndication="Table is empty"  />
            </MyPageBuyingServiceBodyTableStyle>
          </div>
        );
      }    
}

class PaymentButton extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        showModal:false
      };
  
      this.handleModalShow = this.handleModalShow.bind(this);
      this.handleModalClose = this.handleModalClose.bind(this);
    }
    
    componentDidMount() {
     
    }
  
    handleModalClose() {
      this.setState({ showModal: false });
    }
  
    handleModalShow() {
        this.setState({ showModal: true });
    }
  
    render() {
        const paymentState = this.props.paymentState
        let paymentButton;

        if (paymentState === 1) {
            paymentButton = <RequestPayment orderid={this.props.orderid} />;
        } else if(paymentState === 2) {
            paymentButton = <ApprovalPayment orderid={this.props.orderid} />;
        } else if(paymentState === 3) {
            paymentButton = <div>결제완료</div>
        }

        return(
            <div>
                {paymentButton}
            </div>
        );}
}
    
class PaymentBuyingServiceButton extends React.Component {
        constructor(props, context) {
          super(props, context);
          this.state = {
            showModal:false,
          };
      
          this.handleModalShow = this.handleModalShow.bind(this);
          this.handleModalClose = this.handleModalClose.bind(this);
        }

        handleModalClose() {
          this.setState({ showModal: false });
        }
      
        handleModalShow() {
            this.setState({ showModal: true });
        }
      
        render() {
            const paymentState = this.props.paymentState
            const paymentOwnername = this.props.paymentOwnername
            let paymentButton;
            console.log("paymentOwnername: " + paymentOwnername )
            console.log("paymentState: " + paymentState )
            if (paymentState === 1 && paymentOwnername === "") {
                paymentButton = <RequestPaymentProduct 
                                    orderid={this.props.orderid} 
                                    buyingPrice={this.props.buyingPrice}
                                    paymentid={this.props.paymentid}
                                    buttonLabel={"결제하기"}
                                    paymentOwnername={this.props.paymentOwnername}
                                    readOnly={false}
                                    paymentArt={"선택"}/>

            } else if (paymentState === 1 && paymentOwnername != "") {
                paymentButton = <RequestPaymentProduct 
                                    orderid={this.props.orderid} 
                                    buyingPrice={this.props.buyingPrice}
                                    buttonLabel={"결제확인중"}
                                    paymentOwnername={this.props.paymentOwnername}
                                    paymentArt={this.props.paymentArt}
                                    readOnly={true} />
            } else if (paymentState === 2 && paymentOwnername != "") {
                paymentButton = <RequestPaymentProduct 
                                    orderid={this.props.orderid} 
                                    buyingPrice={this.props.buyingPrice}
                                    buttonLabel={"결제완료"}
                                    paymentOwnername={this.props.paymentOwnername}
                                    paymentArt={this.props.paymentArt}
                                    readOnly={true} />
            } else {
                new Error("paymentState is error", paymentState)
            }
    
            return(
                <div>
                    {paymentButton}
                </div>
            );}
}

class PaymentDeliveryBuyingServiceButton extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        showModal:false,
      };
  
      this.handleModalShow = this.handleModalShow.bind(this);
      this.handleModalClose = this.handleModalClose.bind(this);
    }

    handleModalClose() {
      this.setState({ showModal: false });
    }
  
    handleModalShow() {
        this.setState({ showModal: true });
    }
  
    render() {
        const paymentState = this.props.paymentState
        const paymentOwnername = this.props.paymentOwnername
        let paymentButton;
        console.log("paymentOwnername: " + paymentOwnername )
        console.log("paymentState: " + paymentState )
        if (paymentState === 3 && paymentOwnername === "") {
            paymentButton = <RequestPaymentDelivery 
                                orderid={this.props.orderid} 
                                shipPrice={this.props.shipPrice}
                                boxActualWeight={this.props.boxActualWeight}
                                boxVolumeWeight={this.props.boxVolumeWeight}
                                paymentid={this.props.paymentid}
                                buttonLabel={"결제하기"}
                                paymentOwnername={this.props.paymentOwnername}
                                readOnly={false}
                                paymentArt={this.props.paymentArt}/>

        } else if (paymentState === 3 && paymentOwnername != "") {
            paymentButton = <RequestPaymentDelivery 
                                orderid={this.props.orderid} 
                                shipPrice={this.props.shipPrice}
                                boxActualWeight={this.props.boxActualWeight}
                                boxVolumeWeight={this.props.boxVolumeWeight}
                                buttonLabel={"결제확인중"}
                                paymentOwnername={this.props.paymentOwnername}
                                paymentArt={this.props.paymentArt}
                                readOnly={true} />
        } else if (paymentState === 4 && paymentOwnername != "") {
            paymentButton = <RequestPaymentDelivery 
                                orderid={this.props.orderid} 
                                shipPrice={this.props.shipPrice}
                                boxActualWeight={this.props.boxActualWeight}
                                boxVolumeWeight={this.props.boxVolumeWeight}
                                buttonLabel={"결제완료"}
                                paymentOwnername={this.props.paymentOwnername}
                                paymentArt={this.props.paymentArt}
                                readOnly={true} />
        } else {
            new Error("paymentState is error", paymentState)
        }

        return(
            <div>
                {paymentButton}
            </div>
        );}
}

class RequestPaymentProduct extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showModal:false,
            redirect:false,
          };
      
          this.handleModalShow = this.handleModalShow.bind(this);
          this.handleModalClose = this.handleModalClose.bind(this);
          this.handleShowDetailPage = this.handleShowDetailPage.bind(this);
    }

    componentDidMount() {
    }
  
    handleModalClose() {
      this.setState({ showModal: false });
    }
  
    handleModalShow() {
        this.setState({ showModal: true });
    }

    handleShowDetailPage(){
        this.setState({redirect: true});
    }

    render() {
        return (
            <div>
               
                <Button variant="outline-secondary" size="sm" onClick={this.handleModalShow}>{this.props.buttonLabel}</Button>
                <Modal show={this.state.showModal} onHide={this.handleModalClose}>
                   
                    <Modal.Body >
                        <PaymentProductBooking 
                            buyingPrice={this.props.buyingPrice} 
                            paymentid={this.props.paymentid}
                            paymentOwnername={this.props.paymentOwnername}
                            paymentArt={PaymentArtToString(this.props.paymentArt)}
                            readOnly={this.props.readOnly}
                            />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="dark" size="sm" onClick={this.handleModalClose}>
                            닫기
                        </Button>
                    </Modal.Footer>
                </Modal>
              </div>
            );
          }    
}

class RequestPaymentDelivery extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showModal:false,
            redirect:false,
          };
      
          this.handleModalShow = this.handleModalShow.bind(this);
          this.handleModalClose = this.handleModalClose.bind(this);
          this.handleShowDetailPage = this.handleShowDetailPage.bind(this);
    }

    componentDidMount() {
    }
  
    handleModalClose() {
      this.setState({ showModal: false });
    }
  
    handleModalShow() {
        this.setState({ showModal: true });
    }

    handleShowDetailPage(){
        this.setState({redirect: true});
    }

    render() {
        return (
            <div>
               
                <Button variant="outline-secondary" size="sm" onClick={this.handleModalShow}>{this.props.buttonLabel}</Button>
                <Modal show={this.state.showModal} onHide={this.handleModalClose}>
                   
                    <Modal.Body >
                        <PaymentDeliveryBooking 
                            shipPrice={this.props.shipPrice}
                            paymentid={this.props.paymentid}
                            boxActualWeight={this.props.boxActualWeight}
                            boxVolumeWeight={this.props.boxVolumeWeight}
                            paymentOwnername={this.props.paymentOwnername}
                            paymentArt={PaymentArtToString(this.props.paymentArt)}
                            readOnly={this.props.readOnly}
                            />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="dark" size="sm" onClick={this.handleModalClose}>
                            닫기
                        </Button>
                    </Modal.Footer>
                </Modal>
              </div>
            );
          }    
}

class RequestPayment extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showModal:false,
            redirect:false,
          };
      
          this.handleModalShow = this.handleModalShow.bind(this);
          this.handleModalClose = this.handleModalClose.bind(this);
          this.handleShowDetailPage = this.handleShowDetailPage.bind(this);
    }

    componentDidMount() {
     
    }
  
    handleModalClose() {
      this.setState({ showModal: false });
    }
  
    handleModalShow() {
        this.setState({ showModal: true });
    }

    handleShowDetailPage(){
        this.setState({redirect: true});
    }

    render() {
        const orderid = this.props.orderid
        const link = "/detailsmypage/" + orderid
        if (this.state.redirect) {
            return <Redirect push to={link}/>
        }
        return (
            <div>
                <Button variant="outline-secondary" size="sm" 
                    onClick={this.handleShowDetailPage}>결제하기</Button>
                {/* <Button variant="outline-secondary" size="sm" onClick={this.handleModalShow}>결제하기</Button>
                <Modal show={this.state.showModal} onHide={this.handleModalClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>결제</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>결제수단
                       
                    </Modal.Body>
                    <Modal.Footer>
                   
                    <Button variant="success" onClick={this.handleModalClose}>
                        OK
                    </Button>
                   
                    <Button variant="dark" onClick={this.handleModalClose}>
                        OK
                    </Button>
                    </Modal.Footer>
                </Modal> */}
              </div>
            );
          }    
}

class ApprovalPayment extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showModal:false
          };
      
          this.handleModalShow = this.handleModalShow.bind(this);
          this.handleModalClose = this.handleModalClose.bind(this);
    }

    componentDidMount() {
     
    }
  
    handleModalClose() {
      this.setState({ showModal: false });
    }
  
    handleModalShow() {
        this.setState({ showModal: true });
    }
          
    render() {
        return (
            <div>
                <Button variant="outline-secondary" size="sm" onClick={this.handleModalShow}>결제확인중</Button>
                <Modal show={this.state.showModal} onHide={this.handleModalClose} size="lg">
                    <Modal.Header closeButton>
                    <Modal.Title>{this.props.paymentState}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <MyPageDetailDeliveryPrice/>
                    </Modal.Body>
                    <Modal.Footer>
                   
                    <Button variant="dark" size="sm" onClick={this.handleModalClose}>
                        닫음
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }    
}