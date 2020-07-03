import styled from "styled-components";
import React from 'react';
import { Table, Button, Card, InputGroup, FormControl } from "react-bootstrap"
import { Link } from "react-router-dom";
import { keycloakConfigLocal, basePort, headers, setTokenHeader } from "../module_base_component/AuthService"
import { Redirect } from 'react-router';
import { getFormatKoreanCurrency, getFormattedPoint } from '../module_base_component/BaseUtil'
import { KEYCLOAK_USER_ACCOUNT, INITIAL_PAGE_URL } from "../Config"
import naho from '../assets/naho.pdf'
export class UserBaseInfo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            doEditUserBaseInfo:false,
            doOpenAddressManager:false,
            showBaseInfoButtons:true,
            showUserBaseInfoButtons:false,
            userBaseInfo:null,
            goToMypagePersonal:false,
            goToAddressManager:false,
        };

        this.doEditUserBaseInfo = this.doEditUserBaseInfo.bind(this)
        this.doOpenAddressManager = this.doOpenAddressManager.bind(this)
        this.doOpenPaymentHistory = this.doOpenPaymentHistory.bind(this)
      }

      componentDidMount () {
      }

      doEditUserBaseInfo(){
        this.setState({goToMypagePersonal:true})
      }
  
      doOpenAddressManager(){
        this.setState({goToAddressManager: true});
      }

      doOpenPaymentHistory(){
        this.setState({goToPaymentHistory: true});
        const url = INITIAL_PAGE_URL + 'paymentHistory';
        window.open(naho, '_blank');
      }

      render() {
        if (this.state.goToAddressManager) {
          return <Redirect push to="/favoriteAddressManager"/>;
        }

        if (this.state.goToMypagePersonal) {
          return <Redirect push to="/mypagePersonal"/>;
        }

        return (
          <div>
            <CompleteUserBaseInfo 
                customerStatusData={this.props.customerStatusData}
                doEditUserBaseInfo={this.doEditUserBaseInfo}
                doOpenAddressManager={this.doOpenAddressManager}
                doOpenPaymentHistory={this.doOpenPaymentHistory}/>
          </div>
        );
      }    
}

export class CompleteUserBaseInfo extends React.Component{
    constructor(props) {
        super(props);

        this.doEditUserBaseInfo = this.doEditUserBaseInfo.bind(this)
        this.doOpenAddressManager = this.doOpenAddressManager.bind(this)
        this.doOpenPaymentHistory = this.doOpenPaymentHistory.bind(this)
      }

      doEditUserBaseInfo(){
        this.props.doEditUserBaseInfo()
      }
      
      doOpenAddressManager(){
        this.props.doOpenAddressManager()
      }

      doOpenPaymentHistory(){
        this.props.doOpenPaymentHistory()
      }
      
      render() {
        let insuranceAmount = getFormatKoreanCurrency(this.props.customerStatusData.insuranceAmount)
        let depositeAmount = getFormatKoreanCurrency(this.props.customerStatusData.depositeAmount)
        let pointAmount = getFormattedPoint(this.props.customerStatusData.pointAmount)
        
        return (
          <div>
            <Card border="dark" style={{ width: '80%', height:'11rem', marginTop:'1rem' }}>
            <Card.Header>기본정보
               {/* 결제내역버튼 */}
               <Button variant="secondary" size="sm" onClick={(e) => this.doOpenPaymentHistory(e)} 
                style={{ marginRight: '10px', float:"right"}}>결제내역</Button>
              
              {/* 배송지관리버튼 */}
              <Button variant="secondary" size="sm" onClick={(e) => this.doOpenAddressManager(e)} 
                style={{ marginRight: '10px', float:"right"}}>배송지관리</Button>
                
              {/* 개인정보수정버튼 */}
              <Button variant="secondary" size="sm" onClick={(e) => this.doEditUserBaseInfo(e)} 
                style={{ marginRight: '10px', float:"right"}}>개인정보</Button>
            </Card.Header>
            <Card.Body >
            <Table bordered condensed responsive size="sm">
            <thead>
            </thead>
            <tbody>
              <tr>  
                <td width='300px'>개인사서함주소</td>
                <td width='250px' align='right'>{this.props.customerStatusData.personalBoxAddress}</td>
                <td width='300px'>보유예치금</td>
                <td width='250px' align='right'>{insuranceAmount}</td>
              </tr>
              <tr>
                <td>보유적립금</td>
                <td align='right'>{depositeAmount}</td>
                <td >보유포인트</td>
                <td align='right'>{pointAmount}</td>
              </tr>
            </tbody>
          </Table>
          </Card.Body>
          </Card> 
          </div>
        );
      }    
}