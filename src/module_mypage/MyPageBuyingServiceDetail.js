import styled from "styled-components";
import React from 'react';
import { MyPageSideNav } from "./MyPageSideNav";
import { AppContainer as BaseAppContainer } from "../container";
import { Table, Card, Breadcrumb, Button, InputGroup, FormControl } from "react-bootstrap"
import { CustomerRecipientEditor } from "./CustomerRecipientEditor";
import { MyPageBuyingServiceDetailProducts } from "./MyPageBuyingServiceDetailProduct"
import { AppNavbar, LogoutButton } from '../AppNavbar'
import { PaymentBuyingServiceButton, PaymentDeliveryBuyingServiceButton } from '../module_mypage/PaymentInformation'
import { TrackingButton } from '../module_mypage/DeliveryInformation'
import { getKoreanCurrency, getEuroCurrency } from '../module_base_component/BaseUtil'
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

export class MyPageBuyingServiceDetail extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
          orderid:'',
          keycloakAuth:null,
          accessToken:"",
          orderingPersonInfo:"",
          recipientInfo:"",
          buyingServiceState:'',
          productPayment:'',
          deliveryPayment:'',
          deliveryKoreaData:'',
          productsInfo:"",
          shopUrl:'',
          productListTotalPrice:'',
          userid:'',
          customerNameKor:'',
        }
        this.mypageBuyingServiceDetailData = this.mypageBuyingServiceDetailData.bind(this)
        this.handleSearchChangeInputUserid = this.handleSearchChangeInputUserid.bind(this)
        this.handleSearchChangeInputOrderid = this.handleSearchChangeInputOrderid.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
      }

      componentDidMount() {
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
              this.fetchOrderingPersonInforamtion(keycloak.token, orderid)
            }
          })
      }

      fetchOrderingPersonInforamtion(token, orderid){
        // setTokenHeader(token)
        // fetch(basePort + '/orderingpersoninfo', {headers})
        // .then((result) => {
        //    return result.json();
        // }).then((data) => {
        //   this.setState({orderingPersonInfo:data})
        //   this.mypageBuyingServiceDetailData(keycloak.token, orderid)
        // })

        // let lastname = keycloak.tokenParsed.family_name
        // let firstname = keycloak.tokenParsed.given_name
        // let fullname = lastname + firstname
        // this.setState({orderingPersonInfo:fullname})
        this.mypageBuyingServiceDetailData(token, orderid)
      }

      mypageBuyingServiceDetailData(token, orderid){
        let userid = this.state.userid
        setTokenHeader(token)
        fetch(basePort + '/mypageBuyingServiceDetailData/'+ orderid + '/' + userid, {headers})
        .then((result) => {
           return result.json();
        }).then((data) => {
          console.log("data.deliveryPayment")
          console.log(data.deliveryPayment)
          this.setState({
            customerNameKor:data.customerData.nameKor,
            orderingPersonInfo:data.customerData.nameKor,
            recipientInfo:data.recipientData, 
            buyingServiceState:data.buyingServiceState,
            productPayment:data.productPayment,
            deliveryPayment:data.deliveryPayment,
            deliveryKoreaData:data.deliveryKoreaData,
            productsInfo:data.productsInfo,
            shopUrl:data.buyingServiceCommonData.shopUrl,
            productListTotalPrice:data.buyingServiceCommonData.productListTotalPrice
          })
        })
      }

      sendPaymentOwnername(ownerName){
        const orderid = this.state.orderid
        const contents =  [{orderid: orderid}, {ownerName:ownerName}]
        this.setTokenHeader(this.state.accessToken)
        fetch(basePort + '/willpaydeleveryfeeupdate', 
                {method:'post', headers, 
                  body:JSON.stringify(contents)})
                .then((result) => { return result.json();}).then((data) => {
                  this.setState( { productsCommonInfo: data} )
                  console.log(data)
           }).catch(err => err);
      }

      createPaymentOwnername(ownerName){
        this.setState({ownerName:ownerName})
        this.sendPaymentOwnername(ownerName)        
      }

      handleSearch(){
        if(this.state.userid === '' || this.state.orderid === ''){
          this.setState({
                      recipientInfo:'', 
                      buyingServiceState:'',
                      productPayment:'',
                      deliveryPayment:'',
                      deliveryKoreaData:'',
                      productsInfo:'',
                      shopUrl:'',
                      productListTotalPrice:'',
                      })
        } else {
          console.log(this.state.userid)
          console.log(this.state.orderid)
          this.mypageBuyingServiceDetailData(this.state.accessToken, this.state.orderid)
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
                buyingServiceState={this.state.buyingServiceState}
                productPayment={this.state.productPayment}
                deliveryPayment={this.state.deliveryPayment}
                deliveryKoreaData={this.state.deliveryKoreaData}
                // createPaymentOwnername={this.createPaymentOwnername}
                productsInfo={this.state.productsInfo}
                shopUrl={this.state.shopUrl}
                productListTotalPrice={this.state.productListTotalPrice}
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

class MyPageDetailWrapper extends React.Component{
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
                    <Breadcrumb.Item active>구매대행</Breadcrumb.Item>
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

                {/* 서비스현황, 구매대행-, 배송비 결제현황 포함 */}
                <MyPageDetailBuyingServiceState 
                  buyingServiceState={this.props.buyingServiceState}
                  accessToken={this.props.accessToken}
                  orderid={this.props.orderid}
                  productPayment={this.props.productPayment}
                  deliveryPayment={this.props.deliveryPayment}
                  deliveryKoreaData={this.props.deliveryKoreaData}
                  userid={this.props.userid}
                />

                {/* 상품정보 */}
                <MyPageBuyingServiceDetailProducts
                  productsInfo={this.props.productsInfo}
                  accessToken={this.props.accessToken}
                  shopUrl={this.props.shopUrl}
                  orderid={this.props.orderid}
                  />

                {/* 총액정보 */}
                <MyPageDetailProductPrice 
                  productListTotalPrice={this.props.productListTotalPrice}
                  />
          </div>
        );
      }    
}


// deprecated since 23.08.2020 use SearchOrderPanel in /module_base_component/BaseSearchPanel
// class SearchOrderPanel extends React.Component{
//   constructor(props) {
//       super(props);
//     }
    
//     render() {
//       return (
//         <div>
//           <InputGroup className="mb-3" style={{ width: '30%', marginTop:'1rem', marginBottom:'1rem' }}>
//             <FormControl
//                 placeholder="회원 아이디"
//                 aria-label="Recipient's username"
//                 aria-describedby="basic-addon2"
//                 onChange = {this.props.handleSearchChangeInputUserid} 
//               />
//               <FormControl
//                 placeholder="주문번호"
//                 aria-label="Recipient's username"
//                 aria-describedby="basic-addon2"
//                 onChange = {this.props.handleSearchChangeInputOrderid} 
//               />
//               <InputGroup.Append>
//                 <Button variant="outline-secondary"
//                         onClick={(e) => this.props.handleSearch(e)}>Search
//                 </Button>
//               </InputGroup.Append>
//           </InputGroup>
//         </div>
//       );
//     }    
// }

export function BuyingServiceStateToString(state){
  let stateString
  switch (state) {
    case 1:
      stateString = "구매대행 결제대기";
      break;
    case 2:
      stateString = "구매대행 결제완료";
      break;
    case 3:
      stateString = "배송비 결제대기";
      break
    case 4:
      stateString = "배송비 결제완료";
      break;
    case 5:
      stateString = "해외배송중";
      break;
    case 6:
      stateString = "국내배송중";
      break;
    case 7:
      stateString = "배송완료";
      break;
  }

  return stateString
}

class MyPageDetailBuyingServiceState extends React.Component{
  constructor(props) {
      super(props);

      this.handleDeleteBuyingService = this.handleDeleteBuyingService.bind(this)
    }

    handleDeleteBuyingService(){
      const deleteBuyingServceData =  [
        {orderid: this.props.orderid}
      ]

      this.setTokenHeader(this.props.accessToken)
      fetch(basePort + '/deleteBuyingServiceData', 
                {method:'post', headers, 
                  body:JSON.stringify(deleteBuyingServceData)})
      window.location.replace("/mypagebuyingService");
    }

    setTokenHeader(token){
      headers ['Authorization'] = 'Bearer ' + token;
  }
    
    render() {
      let buyingServiceState = this.props.buyingServiceState
      let productPaymentReady = 1
      let deleteButton;
      if(productPaymentReady === buyingServiceState) {
        deleteButton = <Button variant="secondary" size="sm" onClick={(e) => this.handleDeleteBuyingService(e)} 
                          style={{ marginRight: '10px', float:"right"}}>서비스 삭제</Button>
      }
      let serviceState = BuyingServiceStateToString(buyingServiceState)

      let deliveryPaymentButton
      if (buyingServiceState === 1 || buyingServiceState === 2){
        deliveryPaymentButton = "입고대기중"
      } else {
        deliveryPaymentButton = <PaymentDeliveryBuyingServiceButton 
                                    paymentState={this.props.buyingServiceState} 
                                    orderid={this.props.deliveryPayment.orderid} 
                                    shipPrice={this.props.deliveryPayment.shipPrice}
                                    boxActualWeight={this.props.deliveryPayment.boxActualWeight}
                                    boxVolumeWeight={this.props.deliveryPayment.boxVolumeWeight}
                                    paymentid={this.props.deliveryPayment.paymentid}
                                    paymentOwnername={this.props.deliveryPayment.paymentOwnername}
                                    paymentArt={this.props.deliveryPayment.paymentArt}/> 
      }
      return (
        <div>
            <Card border="dark" style={{ width: '80%', height:'15rem', marginTop:'1rem', marginBottom:'1rem' }}>
              <Card.Header>서비스현황 {deleteButton}</Card.Header>
              <Card.Body>
              <div>
                <Table bordered condensed responsive size="sm">
                  <thead>
                  </thead>
                  <tbody>
                      <tr>
                        <td width='150px'>구매대행 결제현황</td>
                        <td width='250px' align='center'>  <PaymentBuyingServiceButton 
                                                paymentState={this.props.buyingServiceState} 
                                                orderid={this.props.productPayment.orderid} 
                                                buyingPrice={this.props.productPayment.buyingPrice}
                                                paymentid={this.props.productPayment.paymentid}
                                                paymentOwnername={this.props.productPayment.paymentOwnername}
                                                paymentArt={this.props.productPayment.paymentArt}
                                                userid={this.props.userid}/>
                        </td>
                      </tr>
                      <tr>
                        <td width='150px'>배송비 결제현황</td>
                        <td width='250px' align='center'> 
                          {deliveryPaymentButton}
                        </td>
                      </tr>
                      <tr>
                          <td>전체 현황</td>
                          <td colSpan="3" align='center'>{serviceState} 
                          {/* {deleteButton} */}
                          </td>
                      </tr>
                      <tr>
                        <td width='150px'>배송현황</td>
                        <td width='250px' align='center'>
                          <TrackingButton 
                            deliveryTracking={this.props.deliveryKoreaData.deliveryTracking}
                            disable={true}
                          />
                        </td>
                      </tr>
                    </tbody> 
                </Table>
                </div>
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
        let totalPrice = getEuroCurrency(this.props.productListTotalPrice)
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
                          <td width='300px'>{totalPrice}</td>
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
                        <td >물류센터</td>
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
        // new recipient holen, oder
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
              updateUrl={'updateRecipientdataBuyingService'}
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
        name = nameKor +  "(" + nameEng + ")"
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
                          <td width='250px' > {this.props.recipientInfo.nameKor} </td>
                          <td width='150px' > 연락처1 </td>
                          <td width='250px' > {this.props.recipientInfo.phonenumberFirst} </td>
                      </tr>
                      <tr>
                          <td width='150px' > 개인통관고유부호 </td>
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