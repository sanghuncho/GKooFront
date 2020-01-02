import styled from "styled-components";
import React from 'react';
import { NavLink } from "react-router-dom";
import { Button, Modal, InputGroup, DropdownButton, Dropdown, FormControl, Form } from "react-bootstrap"
import BootstrapTable from 'react-bootstrap-table-next';
import { keycloakConfigLocal, headers, localPort } from "./AuthService"
import * as Keycloak from 'keycloak-js';
import { EditTracking } from "./EditTracking";

function CaptionMypageTable(props) {
    return <h6 style={{ borderRadius: '0.25em', textAlign: 'left', color: 'black',
    padding: '0.5em', fontWeight:'bold' }}>{props.title}</h6>;
}

const MyPageBodyTableStyle = styled.div`
  margin-top: 25px;
  margin-bottom:25px;
  width: 400px;
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

function trackingFormatter(cell, row, rowIndex, formatExtraData) {
  return (
    <TrackingView cell={cell} row={row} accessToken={formatExtraData.data}/>
  );
}

export class WarehouseInformation extends React.Component{
    constructor(props) {
        super(props);
      }

      render() {
        
        const columnsWarehouse = [{
            dataField: 'orderid',
            text: '신청번호'}, 
            // {
            // dataField: 'productInfo',
            // text: '상품정보'}, {
            // dataField: 'recipient',
            // text: '받는분'}, {
            // dataField: 'deliveryState',
            // text: '진행상태',
            // formatter:deliveryStateFormatter}, 
            {
            dataField: 'deliveryTracking',
            text: '독일내 트랙킹번호',
            formatter:trackingFormatter,
            formatExtraData: {data:this.props.accessToken},
          }
        ];

        return (
          <div>
            <MyPageBodyTableStyle>
                <CaptionMypageTable title="입고 현황"/>
                <BootstrapTable keyField='objectId'  
                    // data={ this.props.userAccount } 
                    data={ this.props.warehouseInformation } 
                    columns={ columnsWarehouse } 
                    bordered={ true }  noDataIndication="Table is empty"/>
            </MyPageBodyTableStyle>
          </div>
        );
      }    
}

export class TrackingView extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        
      };
    }
  
    render() {
      const trackingStatus = this.props.cell;
      let trackingContent;

      if (trackingStatus == "default") {
        trackingContent = <EditTracking orderNumber = {this.props.row.orderNumber}
                              accessToken={this.props.accessToken}/>
         
      } else {
        trackingContent = trackingStatus
      }
      return(
        <div>
          {trackingContent}
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
    
          switch(state){
            case 1 :
              deliveryState = "입고대기";
              break;
            case 2 :
              deliveryState = "입고완료";
              break;
            case 3 :
              deliveryState = "결제요청";
              break;
            case 4 :
              deliveryState = "결제완료";
              break;
            case 5 :
              deliveryState = "해외배송중";
              break;
            case 6 :
              deliveryState = "통관진행";
              break;
            case 7 :
              deliveryState = "국내배송";
              break;
            case 8 :
              deliveryState = "배송완료";
              break;
          }
    
          return (
            <div>{deliveryState}</div>
          );
        }    
    }