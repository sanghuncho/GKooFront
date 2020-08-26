import { SideNav, Nav as BaseNav} from "react-sidenav";
import styled from "styled-components";
import React, { Component } from 'react';
import { Icon as BaseIcon } from "react-icons-kit";
import { UserAccount } from "./UserAccount";
import {
  AppContainer as BaseAppContainer,
  BaseNavigation,
} from "../container";
import { MyPageSideNav } from "./MyPageSideNav";
import { Breadcrumb } from "react-bootstrap"
import { AppNavbar, LogoutButton } from '../AppNavbar'
import { CompanyIntroductionBottom } from '../module_base_component/BaseCompanyIntroduction'
import { SearchPanel_ID } from '../module_base_component/BaseSearchPanel'

///// keycloak -> /////
import * as Keycloak from 'keycloak-js';
import { keycloakConfigLocal, headers, basePort, setTokenHeader, keycloakUrlLocal, 
  validToken, getEmptyPage, isAdmin } from "../module_base_component/AuthService"
var keycloak = Keycloak(keycloakConfigLocal);
///// <- keycloak /////

//dynamic height
const AppContainer = styled(BaseAppContainer)`
  min-height:calc(100vh);
  height: auto;
`;

const Navigation = styled(BaseNavigation)`
    background: #80b13e;
    color: #FFFFFF;
    letter-spacing: 1px;
    width: 110px;
    line-height: 22px;
    border-radius: 0px;
    height: auto;
`;

export const BodyContainer = styled(BaseAppContainer)`
  height:auto;
  flex-direction: column;
`;

const theme = {
    selectionBgColor: '#B0CC8B',
  };

const NavLinkStyle = styled(BaseNav)`
  flex-direction: column;
`;

const IconCnt = styled.div`
  color: #FFF;
  display: flex;
  justify-content: center;
  aligh-items: center;
`;

const Text = styled.div`
  padding-left: 0px;
  font-size: 12px;
`;

var naviGreen = '#80b13e'
var grey = '#727676';

const Icon = props => <BaseIcon size={18} icon={props.icon} />;

export class MyPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = { 
      active: null,
      image:null,
      keycloakAuth:null,
      accessToken:"",
      customerStatusData:'',
      userAccount:'',
      purchaseOrder:'',
      orderInformation:'',
      warehouseInformation:'',
      paymentData:'',
      deliveryKoreaData:'',
      userBaseInfo:'',
      userid:'',
      isUseridChecked:false,
      isAdmin:false
    }
    this.handleSearchChangeInput = this.handleSearchChangeInput.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
   };
  
    toggle(position) {
      if (this.state.active === position) {
        this.setState({active : null})
      } else {
        this.setState({active : position})
      }
    }
  
    myColor (position) {
      if (this.state.active === position) {
        return grey;
      }
      return "";
    }
  
    onItemSelection = arg => {
      this.setState({ selectedPath: arg.path });
    };

    componentDidMount() {
      console.log(keycloakUrlLocal)
      keycloak.init({onLoad: 'login-required'}).success(() => {
          this.setState({ 
            keycloakAuth: keycloak, 
            accessToken:keycloak.token, 
            userid:keycloak.tokenParsed.preferred_username,
            //관리자 체크
            isAdmin:isAdmin(keycloak.realmAccess)
          })
          //console.log(keycloak.tokenParsed.preferred_username)
          //console.log(keycloak.tokenParsed.given_name)
          //console.log(keycloak.tokenParsed.email)
        
          if(!this.state.isAdmin){
            //회원일 경우 데이터 로딩시작, 관리자는 search
            this.fetchCustomerStatusData(keycloak.token)
          }
      })
    }

    fetchCustomerStatusData(token){
      let lastname = keycloak.tokenParsed.family_name
      let firstname = keycloak.tokenParsed.given_name
      let email = keycloak.tokenParsed.email
      const customername =  [{lastname:lastname}, {firstname:firstname}, {email:email}]
      let userid = this.state.userid
      setTokenHeader(token)
      fetch(basePort + '/customerstatus/'+ userid,
      {method:'post', headers, body:JSON.stringify(customername)})
      .then((result) => {
           return result.json();
        }).then((data) => {
          this.setState({customerStatusData:data})
          this.fetchOrderInformation(token)
        }).catch(error => {
          console.error('Error fetching customerStatusData!', error);
        }); 
    }

    fetchCustomerStatusDataAdmin(token){
      let userid = this.state.userid
      setTokenHeader(token)
      fetch(basePort + '/fetchCustomerStatusAdmin/'+ userid, {headers})
        .then((result) => {
           return result.json();
        }).then((data) => {
          this.setState({customerStatusData:data})
          this.fetchOrderInformation(token)
        })   
    }

    fetchOrderInformation(token){
      let userid = this.state.userid
      setTokenHeader(token)
      fetch(basePort + '/orderinformation/'+ userid, {headers})
        .then((result) => {
           return result.json();
        }).then((data) => {
          this.setState({orderInformation:data})
          console.log(data)
          this.fetchWarehouseInformation(token)
        })   
    }

    fetchWarehouseInformation(token){
      let userid = this.state.userid
      setTokenHeader(token)
      fetch(basePort + '/warehouseinformation/'+ userid, {headers})
        .then((result) => { 
           return result.json();
        }).then((data) => {
          this.setState({warehouseInformation:data})
          this.fetchPaymentData(token)
        })   
    }

    fetchPaymentData(token){
      let userid = this.state.userid
      setTokenHeader(token)
      fetch(basePort + '/paymentData/'+ userid, {headers})
        .then((result) => {
           return result.json();
        }).then((data) => {
          this.setState({paymentData:data})
          this.fetchDeliveryKoreaData(token)
        })   
    }

    fetchDeliveryKoreaData(token){
      let userid = this.state.userid
      setTokenHeader(token)
      fetch(basePort + '/deliveryKoreaData/'+ userid, {headers})
        .then((result) => {
           return result.json();
        }).then((data) => {
          console.log(data)
          this.setState({deliveryKoreaData: data})
          this.fetchUserBaseInfo(token)
        })   
    }

    fetchUserBaseInfo(token){
      let userid = this.state.userid
      setTokenHeader(token)
      fetch(basePort + '/fetchuserbaseinfo/'+ userid, {headers})
        .then((result) => { 
          return result.json();
        }).then((data) => {           
          this.setState({userBaseInfo:data})
        }).catch(function() {
          console.log("error fetching userbaseinfo");
      });
    }

    handleSearch(){
      if(this.state.userid === ''){
        this.setState({customerStatusData:'',
                       orderInformation:'',
                       paymentData:'',
                       paymentDelivery:'',
                       deliveryKoreaData:'',
                       userBaseInfo:'',
                    })
      } else {
        this.fetchCustomerStatusDataAdmin(this.state.accessToken)
      }
    }

    handleSearchChangeInput(event){
      this.setState({userid:event.target.value})
      console.log(event.target.value)
    }

    // maybe could be necessary for image tanfering later @since 25.02.2020
    // fetchPurchasedImage(){
    //   fetch(basePort + '/getItemImage')
    //     .then((response) => {
    //        return response.blob();
    //     }).then((data) => {
    //       var objectURL = URL.createObjectURL(data);
    //       this.setState({image: objectURL, loaded:true})
    //     })
    // }

    render() {
        const token = this.state.accessToken
        let mypage;

        if(validToken(token)){
          mypage = <MypageController 
                      purchaseOrder={this.state.purchaseOrder} 
                      userAccount={this.state.userAccount} 
                      customerStatusData = { this.state.customerStatusData}
                      orderInformation = { this.state.orderInformation }
                      warehouseInformation = { this.state.warehouseInformation }
                      paymentData = {this.state.paymentData}
                      deliveryKoreaData = {this.state.deliveryKoreaData}
                      userBaseInfo={this.state.userBaseInfo}
                      accessToken = {this.state.accessToken}
                      userid={this.state.userid}
                      //관리자 properties
                      isAdmin = {this.state.isAdmin}
                      handleSearchChangeInput = {this.handleSearchChangeInput}
                      handleSearch={this.handleSearch}
                      />
        } else {
          mypage = getEmptyPage()
        }
        return (
            <div>
              <AppNavbar>
                 <LogoutButton keycloak ={this.state.keycloakAuth}/>
              </AppNavbar>
              {mypage}
            </div>
           
        );}           
}

export class MypageController extends React.Component{
  constructor(props) {
      super(props);
    }
    
    render() {
      let searchPane
      if(this.props.isAdmin){
        searchPane = <SearchPanel_ID 
                        handleSearchChangeInput={this.props.handleSearchChangeInput}
                        handleSearch={this.props.handleSearch}/>
      }
      return (
        <div>
          <AppContainer>
      
          <MyPageSideNav/>
      
          <BodyContainer>
            <Breadcrumb style={{ width: '100%'}}>
              <Breadcrumb.Item active>마이페이지 / 배송대행</Breadcrumb.Item>
            </Breadcrumb>

          {searchPane}

          {/* ToDo : userAccount name as mypagebody */}
          <UserAccount 
            purchaseOrder={this.props.purchaseOrder} 
            userAccount={this.props.userAccount} 
            customerStatusData={ this.props.customerStatusData}
            orderInformation={ this.props.orderInformation }
            warehouseInformation={ this.props.warehouseInformation }
            paymentData = {this.props.paymentData}
            deliveryKoreaData = {this.props.deliveryKoreaData}
            userBaseInfo={this.props.userBaseInfo}
            accessToken = {this.props.accessToken}
            userid={this.props.userid}
            />

            <CompanyIntroductionBottom/>
        </BodyContainer>
        
        </AppContainer>
      </div>
      );
    }    
}