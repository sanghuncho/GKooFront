import styled from "styled-components";
import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Button, FormControl, InputGroup } from "react-bootstrap"


  function CaptionMypageTable(props) {
    return <h6 style={{ borderRadius: '0.25em', textAlign: 'left', color: 'black',
    padding: '0.5em', fontWeight:'bold' }}>{props.title}</h6>;
  }

  function weightButtonFormatter(cell, row) {        
    return (
      <WeightInputButton/>
    );
  }

  function actualWeightFieldFormatter(cell, row) {        
    return (   
      <ActucalWeightInputField/>
    );
  }

  function volumeWeightFieldFormatter(cell, row) {        
    return (   
      <VolumeWeightInputField/>
    );
  }

  const MyPageBodyTableStyle = styled.div`
    margin-top: 25px;
    margin-left:1%; 
    margin-right:15%;
    margin-bottom:25px;
    width: 1000px;
    background: #FFFFFF;
    padding: 0px 5px 5px 5px;
    box-shadow: 2px 2px 3px 3px #888; 
    font-size: 13px;
  `;

export class WarehouseStandby extends React.Component{
    constructor(props) {
        super(props);
      }
      
      render() {
        const columnsWarehouse = [{
                dataField: 'orderNumber',
                text: '신청번호'},
            {
                dataField: 'memberId',
                text: '아이디'},
            {
                dataField: 'weight',
                text: '실무게',
                formatter:actualWeightFieldFormatter},
            {
                dataField: 'weight',
                text: '부피무게',
                formatter:volumeWeightFieldFormatter},    
            {
                dataField: 'arrival',
                text: '입고확인',
                formatter:weightButtonFormatter}
             ];
        
        return (
          <div>
            <MyPageBodyTableStyle>
                <CaptionMypageTable title="입고 대기"/>
                <BootstrapTable keyField='objectId'  
                    data={ this.props.warehouseCommonStates } 
                    columns={ columnsWarehouse } 
                    bordered={ true }  noDataIndication="Table is empty"  />
            </MyPageBodyTableStyle>
          </div>
        );
      }    
}

export class WeightInputButton extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
      
    };
  
      this.handleModalClose = this.handleModalClose.bind(this);
    }
    
    componentDidMount() {
     
    }
  
    handleModalClose() {
      //this.setState({ showModal: false });
      console.log("input")
    }
  
    render() {
      return(
        <div>
            <Button variant="secondary" size="sm" onClick={this.handleModalShow}>저장</Button>
        </div>
      );}
}

export class ActucalWeightInputField extends React.Component {
        constructor(props, context) {
          super(props, context);
          this.state = {
          
        };
      
          this.handleModalClose = this.handleModalClose.bind(this);
        }
        
        componentDidMount() {
         
        }
      
        handleModalClose() {
          //this.setState({ showModal: false });
          console.log("input")
        }
      
        render() {
          return(
            <div>
                <FormControl id="basic-url" aria-describedby="basic-addon3"
                             placeholder="실제"
                             size="sm"
                             width="50%"
                           //onChange = {this.inputBrandName}
                            />
            </div>
        );}
}

export class VolumeWeightInputField extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
      
    };
  
      this.handleModalClose = this.handleModalClose.bind(this);
    }
    
    componentDidMount() {
     
    }
  
    handleModalClose() {
      //this.setState({ showModal: false });
      console.log("input")
    }
  
    render() {
      return(
        <div>
            <FormControl id="basic-url" aria-describedby="basic-addon3"
                         placeholder="부피"
                         size="sm"
                         width="50%"
                       //onChange = {this.inputBrandName}
                        />
        </div>
    );}
}