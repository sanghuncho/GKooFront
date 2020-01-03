import styled from "styled-components";
import React from 'react';
import { NavLink } from "react-router-dom";
import { Button, Modal } from "react-bootstrap"
import BootstrapTable from 'react-bootstrap-table-next';
import { MyPageDetailDeliveryPrice } from "./MyPageDetailDeliveryPrice";
import { Redirect } from 'react-router';

function CaptionMypageTable(props) {
    return <h6 style={{ borderRadius: '0.25em', textAlign: 'left', color: 'black',
    padding: '0.5em', fontWeight:'bold' }}>{props.title}</h6>;
}
  
function paymentFormatter(cell, row) {        
    return (
      <PaymentButton paymentState={cell} orderid={row.orderid}/>
    );
}

const MyPageBodyTableStyle = styled.div`
  margin-top: 25px;
  margin-bottom:25px;
  width: 290px;
  background: #FFFFFF;
  padding: 0px 5px 5px 5px;
  box-shadow: 2px 2px 3px 3px #888; 
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
            //  {
            // dataField: 'productInfo',
            // text: '상품정보'}, {
            // dataField: 'recipient',
            // text: '받는분'},{
            // dataField: 'deliveryPrice',
            // text: '운송료'}, 
            {
            dataField: 'paymentState',
            text: '결제상태',
            formatter:paymentFormatter}, 
          ];
        
        return (
          <div>
            <MyPageBodyTableStyle>
                <CaptionMypageTable title="결제 현황"/>
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
                    {/* <NavLink to="/">
                    <Button variant="success" onClick={this.handleModalClose}>
                        OK
                    </Button>
                    </NavLink> */}
                    <Button variant="dark" size="sm" onClick={this.handleModalClose}>
                        닫음
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }    
}