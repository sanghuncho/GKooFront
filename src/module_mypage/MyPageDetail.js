import styled from "styled-components";
import React from 'react';
import { MyPageSideNav } from "./MyPageSideNav";
import { AppContainer as BaseAppContainer } from "../container";
import { Table, Card, Breadcrumb, Button, InputGroup, FormControl } from "react-bootstrap"
import { MyPageDetailDeliveryPrice } from "./MyPageDetailDeliveryPrice";
import { CustomerRecipientEditor } from "./CustomerRecipientEditor";
import { MyPageDetailProducts } from "./MyPageDetailProducts"
import { AppNavbar, LogoutButton } from '../AppNavbar'
import { SearchOrderPanel } from '../module_base_component/BaseSearchPanel'

///// keycloak -> /////
import * as Keycloak from 'keycloak-js';
import { keycloakConfigLocal, headers, basePort, setTokenHeader, isAdmin } from "../module_base_component/AuthService"
var keycloak = Keycloak(keycloakConfigLocal);
///// <- keycloak /////

const AppContainer = styled(BaseAppContainer)`
  height: auto;
`;

const BodyContainer = styled(BaseAppContainer)`
  height:auto;
  flex-direction: column;
`;

const UserAccountTableStyle = styled.div`
  margin-top: 25px;
  margin-left:5%; 
  margin-right:15%;
  width: 1100px;
  background: #FFFFFF;
  padding: 0px 5px 5px 5px;
  box-shadow: 2px 2px 3px 3px #888; 
  font-size: 13px;
`;

export class MyPageDetail extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
          orderid:'',
          keycloakAuth:null,
          accessToken:"",
          orderingPersonInfo:"",
          recipientInfo:"",
          productsInfo:"",
          productsCommonInfo:"", 
          paymentOwnername:'',
          shipstate:'',
          userid:'',
          customerNameKor:'',
        }
        this.createPaymentOwnername = this.createPaymentOwnername.bind(this);
        this.sendPaymentOwnername = this.sendPaymentOwnername.bind(this);
        this.handleUpdateRecipientData = this.handleUpdateRecipientData.bind(this)
        this.fetchRecipientInforamtion = this.fetchRecipientInforamtion.bind(this)
        this.fetchMypageDetailData = this.fetchMypageDetailData.bind(this)
        this.handleSearchChangeInputUserid = this.handleSearchChangeInputUserid.bind(this)
        this.handleSearchChangeInputOrderid = this.handleSearchChangeInputOrderid.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
      }

      componentDidMount () {
          keycloak.init({onLoad: 'login-required'}).success(() => {
            this.setState({ 
              keycloakAuth: keycloak, 
              accessToken:keycloak.token,
              userid:keycloak.tokenParsed.preferred_username,
              //관리자 체크
              isAdmin:isAdmin(keycloak.realmAccess)
            })

            const {orderid} = this.props.match.params
            this.setState({orderid:orderid})
            if(!this.state.isAdmin){
              //회원일 경우 데이터 로딩시작, 관리자는 search
              //this.fetchOrderingPersonInforamtion(keycloak.token)
              this.fetchMypageDetailData(keycloak.token, orderid)
              }
            })
      }

      fetchOrderingPersonInforamtion(token){
        let lastname = keycloak.tokenParsed.family_name
        let firstname = keycloak.tokenParsed.given_name
        let fullname = lastname + firstname
        console.log(fullname)
        this.setState({orderingPersonInfo:fullname})
      }

      fetchMypageDetailData(token, orderid){
        let userid = this.state.userid
        setTokenHeader(token)
        fetch(basePort + '/mypageDetailData/'+ orderid + '/' + userid , {headers})
        .then((result) => {
           return result.json();
        }).then((data) => {
          this.setState({
            recipientInfo:data.recipientData, 
            productsCommonInfo:data.productsCommonInformation,
            customerNameKor:data.customerData.nameKor,
            orderingPersonInfo:data.customerData.nameKor,
          })
          this.fetchProductsInforamtion(token, orderid)
        }) 
      }

      fetchProductsInforamtion(token, orderid){
        let userid = this.state.userid
        setTokenHeader(token)
        fetch(basePort + '/productslistinfo/'+ orderid + '/' + userid, {headers})
        .then((result) => {
           return result.json();
        }).then((data) => {
          this.setState({productsInfo:data})
        })  
      }

      handleUpdateRecipientData(accessToken, orderid){
        this.fetchRecipientInforamtion(accessToken, orderid)
      }

      fetchRecipientInforamtion(token, orderid){
        let userid = this.state.userid
        setTokenHeader(token)
        fetch(basePort + '/recipientinfo/'+ orderid + '/' + userid, {headers})
        .then((result) => {
           return result.json();
        }).then((data) => {
          this.setState({recipientInfo:data})
        })  
      }

      // deprecated - use fetchMypageDetailData
      // fetchProductsCommonInforamtion(token, orderid){
      //   let userid = this.state.userid
      //   setTokenHeader(token)
      //   fetch(basePort + '/productscommoninfo/'+ orderid + '/' + userid, {headers})
      //   .then((result) => {
      //      return result.json();
      //   }).then((data) => {
      //     this.setState({productsCommonInfo:data})
      //   })  
      // }

      createPaymentOwnername(paymentOwnername, paymentArt){
        this.setState({paymentOwnername:paymentOwnername})
        this.sendPaymentOwnername(paymentOwnername, paymentArt)        
      }

      sendPaymentOwnername(paymentOwnername, paymentArt){
        const orderid = this.state.orderid
        const contents =  [{orderid: orderid}, {paymentOwnername:paymentOwnername}, {paymentArt:paymentArt}]
        let userid = this.state.userid
        setTokenHeader(this.state.accessToken)
        fetch(basePort + '/updatePaymentOwnernameShippingService/'+ userid, 
                {method:'post', headers, 
                  body:JSON.stringify(contents)})
                .then((result) => { return result.json();}).then((data) => {
                  this.setState({productsCommonInfo:data})
                  console.log(data)
           }).catch(err => err);
      }

      handleSearch(){
        if(this.state.userid === '' || this.state.orderid === ''){
          this.setState({
                      recipientInfo:'', 
                      productsInfo:'',
                      productsCommonInfo:'',
                      })
        } else {
          this.fetchMypageDetailData(this.state.accessToken, this.state.orderid)
        }
      }
  
      handleSearchChangeInputUserid(event){
        this.setState({userid:event.target.value})
        console.log(event.target.value)
      }

      handleSearchChangeInputOrderid(event){
        this.setState({orderid:event.target.value})
        console.log(event.target.value)
      }

      render() {
        return (
          <div>
          <AppNavbar>
            <LogoutButton keycloak ={this.state.keycloakAuth}/>
          </AppNavbar>
          <AppContainer>
            <MyPageSideNav/>
            
            <BodyContainer>

              <MyPageDetailWrapper 
                orderid={this.state.orderid}
                orderingPersonInfo={this.state.orderingPersonInfo}
                recipientInfo={this.state.recipientInfo}
                handleUpdateRecipientData={this.handleUpdateRecipientData}
                shipstate={this.state.shipstate}
                productsInfo={this.state.productsInfo}
                productsCommonInfo={this.state.productsCommonInfo}
                createPaymentOwnername={this.createPaymentOwnername}
                accessToken={this.state.accessToken}
                userid={this.state.userid}
                //관리지 properties
                isAdmin = {this.state.isAdmin}
                handleSearchChangeInputUserid = {this.handleSearchChangeInputUserid}
                handleSearchChangeInputOrderid = {this.handleSearchChangeInputOrderid}
                handleSearch={this.handleSearch}
              />
            
            </BodyContainer>
          </AppContainer>
          </div>
        );
      }    
}

class MyPageDetailWrapper extends React.Component {
    constructor(props) {
        super(props);
      }
      
      render() {
        let searchOrderPanel
        if(this.props.isAdmin){
          searchOrderPanel = <SearchOrderPanel 
                          handleSearchChangeInputUserid={this.props.handleSearchChangeInputUserid}
                          handleSearchChangeInputOrderid={this.props.handleSearchChangeInputOrderid}
                          handleSearch={this.props.handleSearch}/>
        }
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item active>마이페이지</Breadcrumb.Item>
                    <Breadcrumb.Item active>배송대행 </Breadcrumb.Item>
                    <Breadcrumb.Item active>주문 상세정보</Breadcrumb.Item>
                </Breadcrumb> 
                
                {/* 주문번호로 찾기 */}
                {searchOrderPanel}

                {/* 주문자정보 */}
                <MyPageDetailPerson 
                  orderid={this.props.orderid}
                  orderingPersonInfo={this.props.orderingPersonInfo}/>

                {/* 수취인정보 */}
                <MyPageDetailRecipient
                  recipientInfo={this.props.recipientInfo}
                  handleUpdateRecipientData={this.props.handleUpdateRecipientData}
                  orderid={this.props.orderid}
                  accessToken={this.props.accessToken}
                  userid={this.props.userid}
                />

                {/* 서비스현황 */}
                <MyPageDetailState 
                  productsCommonInfo={this.props.productsCommonInfo}
                  accessToken={this.props.accessToken}
                  orderid={this.props.orderid}
                  userid={this.props.userid}
                />

                {/* 배송료 결제정보 */}
                <MyPageDetailDeliveryPrice 
                  productsCommonInfo={this.props.productsCommonInfo}
                  createPaymentOwnername={this.props.createPaymentOwnername}/>

                {/* 상품정보 */}
                <MyPageDetailProducts
                  productsInfo={this.props.productsInfo}
                  productsCommonInfo={this.props.productsCommonInfo}
                  accessToken={this.props.accessToken}
                  orderid={this.props.orderid}
                  userid={this.props.userid}
                  />

                {/* 총액정보 */}
                <MyPageDetailProductPrice 
                  productsCommonInfo={this.props.productsCommonInfo}/>
          </div>
        );
      }    
}

class MyPageDetailState extends React.Component{
    constructor(props) {
        super(props);

        this.handleDeleteShippingService = this.handleDeleteShippingService.bind(this)
      }

      handleDeleteShippingService(){
        const deleteShippingServceData =  [
          {orderid: this.props.orderid}
        ]
        let userid = this.props.userid
        setTokenHeader(this.props.accessToken)
        fetch(basePort + '/deleteShipingServiceData/' + userid, 
                  {method:'post', headers, 
                    body:JSON.stringify(deleteShippingServceData)})
        window.location.replace("/mypage");
      }

      render() {
        let shipState = this.props.productsCommonInfo.shipState
        /*refactoring : return only value backend, and rendering value to string in frontend*/
        let notArrived = "입고대기"
        let deleteButton;
        if(shipState === notArrived) {
          deleteButton = <Button variant="secondary" size="sm" onClick={(e) => this.handleDeleteShippingService(e)} 
                            style={{ marginRight: '10px', float:"right"}}>서비스 삭제</Button>
        }
        return (
          <div>
              <Card border="dark" style={{ width: '80%', height:'8rem', marginTop:'1rem', marginBottom:'1rem' }}>
                <Card.Header>서비스현황</Card.Header>
                <Card.Body>
                    <Card.Text>
                        {this.props.productsCommonInfo.shipState}
                        {deleteButton}
                    </Card.Text> 
                </Card.Body>
                </Card>
          </div>
        );
      }    
}

class MyPageDetailProductPrice extends React.Component{
    constructor(props) {
        super(props);
      }
      
      render() {
        return (
          <div>
               <Card border="dark" style={{ width: '80%', height:'8rem', marginTop:'1rem', marginBottom:'1rem' }}>
                <Card.Header>주문금액</Card.Header>
                <Card.Body>
                <Table bordered condensed responsive size="sm">
                      <thead>
                          {/* 상품 */}
                      </thead>
                      <tbody>
                      {/* <tr>
                          <td width='300px'>현지배송비</td>
                          <td width='300px'>30Euro</td>
                      </tr> */}
                      <tr>
                          <td width='300px'>총 구매금액</td>
                          <td width='300px'>{this.props.productsCommonInfo.totalPrice} EUR</td>
                      </tr>
                      </tbody>
                  </Table>
                </Card.Body>
                {/* <Card.Footer>
                </Card.Footer> */}
                </Card>
          </div>
        );
      }    
}

class MyPageDetailPerson extends React.Component{
    constructor(props) {
        super(props);
      }
      
      render() {
        return (
          <div>
              <Card border="dark" style={{ width: '80%', height:'13rem', marginTop:'1rem' }}>
                <Card.Header>주문자 정보</Card.Header>
                <Card.Body >
                <Table striped bordered condensed responsive size="sm">
                    <thead>
                    </thead>
                    <tbody>
                    <tr>
                        <td width='400px'>주문자명</td>
                        <td width='400px'>{this.props.orderingPersonInfo}</td>
                        {/* <td width='250px' align='right'>gkoo-{this.props.customerBaseInfo.customerId}</td> */}
                    </tr>
                    <tr>
                        <td>물류센터</td>
                        <td>독일</td>
                    </tr>
                    <tr>
                        <td>서비스신청번호</td>
                        <td>{this.props.orderid}</td>
                    </tr>
                    </tbody>
                </Table>
                  {/* <InputGroup size="sm" className="mb-4" style={{ width:'90%'}}>
                      <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon3" style={{width:'100px'}}>
                          주문자명
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl id="basic-url" aria-describedby="basic-addon3"
                        disabled={true} 
                        defaultValue={this.props.orderingPersonInfo.fullname}
                        style={{backgroundColor: '#FFFFFF'}}
                      />
                    </InputGroup > */}
                </Card.Body>
                {/* <Card.Footer>
                </Card.Footer> */}
                </Card>
          </div>
        );
      }    
}

class MyPageDetailRecipient extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          doEdit:false,
          setButton:true,
        }

        this.showStoredRecipient = this.showStoredRecipient.bind(this)
      }

      doEditRecipient(){
        this.setState({doEdit:true}) 
        this.setState({setButton:false}) 
      }

      //move the page position 
      showStoredRecipient(){
        this.setState({doEdit:false}) 
        this.setState({setButton:true})
        this.props.handleUpdateRecipientData(this.props.accessToken, this.props.orderid)
      }
      
      render() {
        const setButton = this.state.setButton
        let editButton;
        if(setButton) {
          editButton = <Button variant="secondary" size="sm" onClick={(e) => this.doEditRecipient(e)} 
                            style={{ marginRight: '10px', float:"right"}}>수정</Button>
        }

        const doEdit = this.state.doEdit
        let displayHeight;
        let recipientFormDisplay;
        if (doEdit) {
          recipientFormDisplay = 
            <CustomerRecipientEditor 
              showStoredRecipient={this.showStoredRecipient}
              recipientInfo={this.props.recipientInfo}
              orderid={this.props.orderid}
              accessToken={this.props.accessToken}
              updateUrl={'updaterecipientdata'}
              userid={this.props.userid}
             />
          displayHeight = '67rem'
        } else {
          recipientFormDisplay = <CompleteRecipientDisplay recipientInfo={this.props.recipientInfo}/>
          displayHeight = '20rem'
        }
        return (
          <div>
              <Card border="dark" style={{ width: '80%', height:displayHeight, marginTop:'1rem' }}>
                <Card.Header>수취인 정보
                  {editButton}
                </Card.Header>
                <Card.Body >
                  
                  {recipientFormDisplay}
               
                </Card.Body>
              </Card>
          </div>
        );
      }    
}

export class CompleteRecipientDisplay extends React.Component{
  constructor(props) {
      super(props);
    }
    
    render() {

      {/* refactoring */}
      const nameKor = this.props.recipientInfo.nameKor
      const nameEng = this.props.recipientInfo.nameEng
      let name
      if(nameKor != null && nameEng != null){
        name = nameKor +  " (" + nameEng + ")"
      } else {
        name = ""
      }
      return (
        <div>
          <Table bordered condensed responsive size="sm">
                    <thead>
                    </thead>
                    <tbody>
                      <tr>
                          <td width='150px' > 받는분 </td>
                          <td width='250px' > {name} </td>
                          <td width='150px' > 연락처1 </td>
                          <td width='250px' > {this.props.recipientInfo.phonenumberFirst} </td>
                      </tr>
                      <tr>
                          <td width='150px' > 개인통관고유번호 </td>
                          <td width='250px' > {this.props.recipientInfo.transitNr} </td>
                          <td width='150px' > 연락처2 </td>
                          <td width='250px' > {this.props.recipientInfo.phonenumberSecond} </td>
                      </tr>
                      <tr height="60">
                          <td>주소</td>
                          <td colSpan="3">{this.props.recipientInfo.zipCode} {this.props.recipientInfo.address} </td>
                      </tr>
                      <tr height="80">
                          <td>배송요청사항</td>
                          <td colSpan="3">{this.props.recipientInfo.usercomment}</td>
                      </tr>
                    </tbody> 
          </Table>
        </div>
      );
    }    
}