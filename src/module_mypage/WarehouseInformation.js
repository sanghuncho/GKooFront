import styled from "styled-components";
import React from 'react';
import { NavLink } from "react-router-dom";
import { Button, Modal } from "react-bootstrap"
import BootstrapTable from 'react-bootstrap-table-next';

function CaptionMypageTable(props) {
    return <h6 style={{ borderRadius: '0.25em', textAlign: 'left', color: 'black',
    padding: '0.5em', fontWeight:'bold' }}>{props.title}</h6>;
}
  
function trackingFormatter(cell, row) {        
    return (
      <TrackingButton/>
    );
}

const MyPageBodyTableStyle = styled.div`
  margin-top: 25px;
  margin-left:1%; 
  margin-right:15%;
  margin-bottom:25px;
  width: 1100px;
  background: #FFFFFF;
  padding: 0px 5px 5px 5px;
  box-shadow: 2px 2px 3px 3px #888; 
  font-size: 13px;
`;

// const data = [
//     {"orderNumber":"1234",
//       "productInfo":"독일",
//       "recipient":"상훈",
//       "warehouseState":"입고대기",
//       "deliveryTracking":"송장번호조회"
//     },
//   ]

function deliveryStateFormatter(cell, row) {        
  return (
    <DeliveryState cell={cell}/>
  );
}

export class WarehouseInformation extends React.Component{
    constructor(props) {
        super(props);
      }
      
      render() {
        
        const columnsWarehouse = [{
            dataField: 'orderNumber',
            text: '신청번호',}, {
            dataField: 'productInfo',
            text: '상품정보'}, {
            dataField: 'recipient',
            text: '받는분'}, {
            dataField: 'deliveryState',
            text: '진행상태',
            formatter:deliveryStateFormatter}, {
            dataField: 'deliveryTracking',
            text: '배송조회',
            formatter:trackingFormatter}
        ];
        return (
          <div>
            <MyPageBodyTableStyle>
                <CaptionMypageTable title="입고 현황"/>
                <BootstrapTable keyField='objectId'  
                    // data={ this.props.userAccount } 
                    data={ this.props.warehouseInformation } 
                    columns={ columnsWarehouse } 
                    bordered={ true }  noDataIndication="Table is empty"  />
            </MyPageBodyTableStyle>
          </div>
        );
      }    
}

export class TrackingButton extends React.Component {
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
      return(
        <div>
        <Button variant="secondary" size="sm" onClick={this.handleModalShow}>배송조회</Button>
          <Modal show={this.state.showModal} onHide={this.handleModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>배송조회</Modal.Title>
            </Modal.Header>
            <Modal.Body>독일내 배송중</Modal.Body>
            <Modal.Footer>
              {/* <NavLink to="/">
              <Button variant="success" onClick={this.handleModalClose}>
                OK
              </Button>
              </NavLink> */}
              <Button variant="dark" onClick={this.handleModalClose}>
                OK
              </Button>
            </Modal.Footer>
            </Modal>
        </div>
      );}
    } 
    
    class DeliveryState extends React.Component{
      constructor(props) {
          super(props);
        }
        
        render() {
          const state = this.props.cell;
          let deliveryState;
    
          // 입고대기 (1),
          // 입고완료 (2),
          // 결제요청 (3),
          // 결제완료 (4),
          // 해외배송중 (5),
          // 통관진행 (6),
          // 국내배송 (7),
          // 배송완료 (8)
    
          if (state==1) {
            deliveryState = "입고대기";
          } else if(state==2){
            deliveryState = "입고완료";
          } else if(state==3){
            deliveryState = "결제요청";
          } else if(state==4){
            deliveryState = "결제완료";
          } else if(state==5){
            deliveryState = "해외배송중";
          } else if(state==6){
            deliveryState = "통관진행";
          } else if(state==7){
            deliveryState = "국내배송";
          } else if(state==8){
            deliveryState = "배송완료";
          } else {
            deliveryState = "";
          }
    
          return (
            <div>{deliveryState}</div>
          );
        }    
    }