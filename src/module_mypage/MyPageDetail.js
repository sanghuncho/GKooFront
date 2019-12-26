import styled from "styled-components";
import React from 'react';
import { MyPageSideNav } from "./MyPageSideNav";
import { AppContainer as BaseAppContainer } from "../container";
import { Table, Card, Breadcrumb, Button, InputGroup, FormControl } from "react-bootstrap"
import { MyPageDetailDeliveryPrice } from "./MyPageDetailDeliveryPrice";
import { CustomerRecipientEditor } from "./CustomerRecipientEditor";
import { MyPageDetailProducts } from "./MyPageDetailProducts"
import * as Keycloak from 'keycloak-js';
import { keycloakConfigLocal, headers, basePort, setTokenHeader } from "../module_mypage/AuthService"
import { AppNavbar, LogoutButton } from '../AppNavbar'

var keycloak = Keycloak(keycloakConfigLocal);

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
          ownerName:'',
          shipstate:'',
        }

        this.createPaymentOwnername = this.createPaymentOwnername.bind(this);
        this.sendPaymentOwnername = this.sendPaymentOwnername.bind(this);
        this.handleUpdateRecipientData = this.handleUpdateRecipientData.bind(this)
        this.fetchRecipientInforamtion = this.fetchRecipientInforamtion.bind(this)
      }

      componentDidMount () {
          const {id} = this.props.match.params
          this.setState({orderid:id})
          keycloak.init({onLoad: 'login-required'}).success(() => {
            this.setState({ keycloakAuth: keycloak, 
              accessToken:keycloak.token})
              this.fetchOrderingPersonInforamtion(keycloak.token)
              this.fetchRecipientInforamtion(keycloak.token, id)
              this.fetchProductsInforamtion(keycloak.token, id)
              this.fetchProductsCommonInforamtion(keycloak.token, id)
            })
      }

      setTokenHeader(token){
        headers ['Authorization'] = 'Bearer ' + token;
      }

      fetchOrderingPersonInforamtion(token){
        this.setTokenHeader(token)
        fetch(basePort + '/orderingpersoninfo', {headers})
        .then((result) => {
           return result.json();
        }).then((data) => {
          this.setState( { orderingPersonInfo: data} )
        })  
      }

      fetchRecipientInforamtion(token, id){
        setTokenHeader(token)
        fetch(basePort + '/recipientinfo/'+ id, {headers})
        .then((result) => {
           return result.json();
        }).then((data) => {
          this.setState( { recipientInfo: data} )
        })  
      }

      handleUpdateRecipientData(accessToken, orderid){
        this.fetchRecipientInforamtion(accessToken, orderid)
      }

      fetchProductsInforamtion(token, id){
        this.setTokenHeader(token)
        fetch(basePort + '/productslistinfo/'+ id, {headers})
        .then((result) => {
           return result.json();
        }).then((data) => {
          this.setState( { productsInfo: data} )
        })  
      }

      fetchProductsCommonInforamtion(token, id){
        this.setTokenHeader(token)
        fetch(basePort + '/productscommoninfo/'+ id, {headers})
        .then((result) => {
           return result.json();
        }).then((data) => {
          this.setState( { productsCommonInfo: data} )
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
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item active>마이페이지</Breadcrumb.Item>
                    <Breadcrumb.Item active>주문 상세정보</Breadcrumb.Item>
                </Breadcrumb> 
                
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
                />

                {/* 서비스현황 */}
                <MyPageDetailState 
                  productsCommonInfo={this.props.productsCommonInfo}
                  accessToken={this.props.accessToken}
                  orderid={this.props.orderid}
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

        this.setTokenHeader(this.props.accessToken)
        fetch(basePort + '/deleteShipingServiceData', 
                  {method:'post', headers, 
                    body:JSON.stringify(deleteShippingServceData)})
        window.location.replace("/mypage");
      }

      setTokenHeader(token){
        headers ['Authorization'] = 'Bearer ' + token;
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
                          <td width='300px'>{this.props.productsCommonInfo.totalPrice}원</td>
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
                        <td width='400px'>{this.props.orderingPersonInfo.fullname}</td>
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