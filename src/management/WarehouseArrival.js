import styled from "styled-components";
import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

function CaptionMypageTable(props) {
    return <h6 style={{ borderRadius: '0.25em', textAlign: 'left', color: 'black',
    padding: '0.5em', fontWeight:'bold' }}>{props.title}</h6>;
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

export class WarehouseArrival extends React.Component{
    constructor(props) {
        super(props);
      }
      
      render() {
        const columnsWarehouse = [{
            dataField: 'orderNumber',
            text: '신청번호',}, {
            dataField: 'memberId',
            text: '아이디'}
          ];
        
        return (
          <div>
            <MyPageBodyTableStyle>
                <CaptionMypageTable title="결제 대기"/>
                <BootstrapTable keyField='objectId'  
                    data={ this.props.warehouseCommonStates } 
                    columns={ columnsWarehouse } 
                    bordered={ true }  noDataIndication="Table is empty"  />
            </MyPageBodyTableStyle>
          </div>
        );
      }    
}