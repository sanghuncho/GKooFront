import styled from "styled-components";
import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Button, Modal } from "react-bootstrap"
import { BaseTablePagination } from '../module_base_component/BaseTable'

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

const TrackingButtonStyle = styled.div`
    text-align:center;
`;

function CaptionMypageTable(props) {
    return <h6 style={{ borderRadius: '0.25em', textAlign: 'left', color: 'black',
    padding: '0.5em', fontWeight:'bold' }}>{props.title}</h6>;
}

function trackingFormatter(cell, row) {        
    return (
      <TrackingButtonStyle>
        <TrackingButton
          orderid={row.orderid}
          deliveryTracking={row.deliveryTracking}/>
       </TrackingButtonStyle>
    );
}

const data = [
    {"orderNumber":"1234",
      "productInfo":"독일",
      "recipient":"상훈",
      "deliveryPayment":"39500원",
      "deliveryState":"배송중",
      "deliveryTracking":"송장번호조회"
    },
    {"orderNumber":"4567",
      "productInfo":"portable",
      "recipient":"성준",
      "deliveryPayment":"45800원",
      "deliveryState":"배송완료",
      "deliveryTracking":"송장번호조회"
    },
]

export class DeliveryInformation extends React.Component{
    constructor(props) {
        super(props);
      }
      
      render() {
        const columnsDelivery = [{
          dataField: 'orderid',
          text: '신청번호'},
          {
          dataField: 'deliveryTracking',
          text: '국내 배송조회',
          formatter:trackingFormatter,
          headerStyle: (colum, colIndex) => {
            return { textAlign: 'center' };
          }} 
        ];

        return (
          <div>
            <MyPageBodyTableStyle>
              {/* <CaptionMypageTable title="배송 현황"/> */}
              <BaseTablePagination
                  keyField='objectId'  
                  data={ this.props.deliveryKoreaData } 
                  columns={ columnsDelivery } 
                  bordered={ true }  
                  noDataIndication="Table is empty"
              />
            </MyPageBodyTableStyle></div>
        );
      }    
  }

  export class DeliveryInformationBuyingService extends React.Component{
    constructor(props) {
        super(props);
      }
      
      render() {
        const columnsDelivery = [{
          dataField: 'orderid',
          text: '신청번호'},
          {
          dataField: 'deliveryTracking',
          text: '국내 배송조회',
          formatter:trackingFormatter,
          headerStyle: (colum, colIndex) => {
            return { textAlign: 'center' };
          }}
        ];

        return (
          <div>
            <MyPageBuyingServiceBodyTableStyle>
              {/* <CaptionMypageTable title="배송 현황"/> */}
              <BaseTablePagination
                  keyField='objectId'  
                  data={ this.props.deliveryKoreaData } 
                  columns={ columnsDelivery } 
                  bordered={ true }  
                  noDataIndication="Table is empty"
              />
            </MyPageBuyingServiceBodyTableStyle></div>
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
      this.handleOpenTrackingSite = this.handleOpenTrackingSite.bind(this);
    }
    
    componentDidMount() {
     
    }
  
    handleModalClose() {
      this.setState({showModal:false});
    }
  
    handleModalShow() {
        this.setState({showModal:true});
    }

    handleOpenTrackingSite(){
      let trackingNr = this.props.deliveryTracking
      const url = 'http://nplus.doortodoor.co.kr/web/info.jsp?slipno=' + trackingNr;
      window.open(url, '_blank');
    }
  
    render() {
      return(
        <div>
        <Button  variant="outline-secondary" size="sm" onClick={this.handleOpenTrackingSite} disabled={this.props.disable}>조회</Button>
          <Modal show={this.state.showModal} onHide={this.handleModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>배송조회</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              
              {/* 배송조회 api 연동 */}
              {this.props.deliveryTracking}

            </Modal.Body>
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