import styled from "styled-components";
import React from 'react';
import { MyPageSideNav } from "./MyPageSideNav";
import { AppContainer as BaseAppContainer } from "../container";
import { Table, Card, Breadcrumb, Form } from "react-bootstrap"
import { MyPageDetailDeliveryPrice } from "./MyPageDetailDeliveryPrice";
import * as Keycloak from 'keycloak-js';
import { keycloakConfigLocal, headers } from "../module_mypage/AuthService"
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
          orderNumber:'',
          keycloakAuth:null,
          accessToken:"",
          orderingPersonInfo:"",
          recipientInfo:"",
          productsInfo:"",
          productsCommonInfo:"", 
          ownerName:'', 
        }

        this.createPaymentOwnername = this.createPaymentOwnername.bind(this);
        this.sendPaymentOwnername = this.sendPaymentOwnername.bind(this);
        this.fetchProductsCommonInforamtion = this.fetchProductsCommonInforamtion.bind(this)
      }

      componentDidMount () {
          const {id} = this.props.match.params
          this.setState({orderNumber:id})
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
        fetch('http://localhost:8888/orderingpersoninfo', {headers})
        .then((result) => {
           return result.json();
        }).then((data) => {
          this.setState( { orderingPersonInfo: data} )
          console.log(data)
        })  
      }

      fetchRecipientInforamtion(token, id){
        this.setTokenHeader(token)
        fetch('http://localhost:8888/recipientinfo/'+id, {headers})
        .then((result) => {
           return result.json();
        }).then((data) => {
          this.setState( { recipientInfo: data} )
          console.log("recipientInformation")
          console.log(data)
        })  
      }

      fetchProductsInforamtion(token, id){
        this.setTokenHeader(token)
        fetch('http://localhost:8888/productslistinfo/'+id, {headers})
        .then((result) => {
           return result.json();
        }).then((data) => {
          this.setState( { productsInfo: data} )
          console.log("productsInfo")
          console.log(this.state.productsInfo)
        })  
      }

      fetchProductsCommonInforamtion(token, id){
        console.log("productsCommonInfo")
        this.setTokenHeader(token)
        fetch('http://localhost:8888/productscommoninfo/'+id, {headers})
        .then((result) => {
           return result.json();
        }).then((data) => {
          this.setState( { productsCommonInfo: data} )
          console.log(this.state.productsCommonInfo)
        })  
      }

      sendPaymentOwnername(ownerName){
        const orderNumber = this.state.orderNumber
        console.log(ownerName)
        const contents =  [{orderNumber: orderNumber}, {ownerName:ownerName}]
        this.setTokenHeader(this.state.accessToken)
        console.log("OwnerName: "+ contents)
        fetch('http://localhost:8888/willpaydeleveryfeeupdate', 
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
          <AppContainer>
            <MyPageSideNav/>
            
            <BodyContainer>

              <MyPageDetailWrapper 
                orderNumber={this.state.orderNumber}
                orderingPersonInfo={this.state.orderingPersonInfo}
                recipientInfo={this.state.recipientInfo}
                productsInfo={this.state.productsInfo}
                productsCommonInfo={this.state.productsCommonInfo}
                createPaymentOwnername={this.createPaymentOwnername}
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
                  orderNumber={this.props.orderNumber}
                  orderingPersonInfo={this.props.orderingPersonInfo}/>

                {/* 수취인정보 */}
                <MyPageDetailRecipient
                  recipientInfo={this.props.recipientInfo}/>

                {/* 서비스현황 */}
                <MyPageDetailState productsCommonInfo={this.props.productsCommonInfo}/>

                {/* 배송료 결제정보 */}
                <MyPageDetailDeliveryPrice productsCommonInfo={this.props.productsCommonInfo}
                                           createPaymentOwnername={this.props.createPaymentOwnername}
                                           />

                {/* 상품정보 */}
                <MyPageDetailProducts
                  productsInfo={this.props.productsInfo}
                  productsCommonInfo={this.props.productsCommonInfo}/>

                {/* 총액정보 */}
                <MyPageDetailProductPrice productsCommonInfo={this.props.productsCommonInfo}/>
          </div>
        );
      }    
}

class MyPageDetailState extends React.Component{
    constructor(props) {
        super(props);
      }
      
      render() {
        return (
          <div>
              <Card border="dark" style={{ width: '100%', height:'8rem', marginTop:'1rem', marginBottom:'1rem' }}>
                <Card.Header>서비스현황</Card.Header>
                <Card.Body>
                    <Card.Text>
                        {this.props.productsCommonInfo.shipState}
                    </Card.Text> 
                </Card.Body>
                {/* <Card.Footer>
                </Card.Footer> */}
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
               <Card border="dark" style={{ width: '100%', height:'8rem', marginTop:'1rem', marginBottom:'1rem' }}>
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

class MyPageDetailProducts extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
        }

      }

      componentDidMount () {
      }
      
      render() {
        // Todo : refactoring
        var array = new Array()
        for(var i=0;i<this.props.productsInfo.length;i++){
          array.push(i)
        }

        return (
          <div>
              <Card border="dark" style={{ width: '100%', height:'42rem', marginTop:'1rem', marginBottom:'1rem' }}>
                <Card.Header>상품 정보</Card.Header>
                <Card.Body>
                <Table bordered condensed responsive size="sm">
                <thead>
                </thead>
                <tbody>
                <tr>
                  <td width='300px'>트래킹번호</td>
                  <td width='300px'>{this.props.productsCommonInfo.trackingNr}</td>
                </tr>
                <tr>
                  <td>쇼핑몰 URL</td>
                  <td>{this.props.productsCommonInfo.shopUrl}</td>
                </tr>
                </tbody>
                </Table>

                {array.map((itemName, index) => { return (
                    <div key={index}>
                      <MyPageDetailProduct productIndex={index+1}
                        product={this.props.productsInfo[index]}/>
                    </div>
                )})}
              
                </Card.Body>
                {/* <Card.Footer>
                </Card.Footer> */}
                </Card>
          </div>
        );
      }    
}

class MyPageDetailProduct extends React.Component{
    constructor(props) {
        super(props);
      }
      
      render() {
        return (
          <div>
              <Table bordered condensed responsive size="sm">
                    <thead>
                        {/* 상품 */}
                    </thead>
                    <tbody>
                    <tr>
                        <td width='300px'>상품</td>
                        <td width='300px'>{this.props.productIndex}</td>
                    </tr>
                    <tr>
                        <td width='300px'>카테고리</td>
                        <td width='300px'>{this.props.product.categorytitle}</td>
                    </tr>
                    <tr>
                        <td>품목</td>
                        <td>{this.props.product.itemtitle}</td>
                    </tr>
                    <tr>
                        <td>브랜드</td>
                        <td>{this.props.product.brandname}</td>
                    </tr>
                    <tr>
                        <td>상품명</td>
                        <td>{this.props.product.itemname}</td>
                    </tr>
                    <tr>
                        <td>수량</td>
                        <td>{this.props.product.amount}</td>
                    </tr>
                    <tr>
                        <td>단가</td>
                        <td>{this.props.product.price}원</td>
                    </tr>
                    </tbody>
                </Table>
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
              <Card border="dark" style={{ width: '100%', height:'13rem', marginTop:'1rem' }}>
                <Card.Header>주문자 정보</Card.Header>
                <Card.Body >
                <Table bordered condensed responsive size="sm">
                    <thead>
                    </thead>
                    <tbody>
                    <tr>
                        <td width='400px'>주문자명</td>
                        <td width='400px'>{this.props.orderingPersonInfo.fullname}</td>
                        {/* <td width='250px' align='right'>gkoo-{this.props.customerBaseInfo.customerId}</td> */}
                    </tr>
                    <tr>
                        <td>물류센터</td>
                        <td>독일</td>
                    </tr>
                    <tr>
                        <td>서비스신청번호</td>
                        <td>{this.props.orderNumber}</td>
                    </tr>
                    {/* <tr>
                        <td>트래킹번호</td>
                        <td>123456</td>
                    </tr>
                    <tr>
                        <td>쇼핑몰 URL</td>
                        <td>www.gkoo.de</td>
                    </tr> */}
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

class MyPageDetailRecipient extends React.Component{
    constructor(props) {
        super(props);
      }
      
      render() {
        return (
          <div>
              <Card border="dark" style={{ width: '100%', height:'17rem', marginTop:'1rem' }}>
                <Card.Header>수취인 정보</Card.Header>
                <Card.Body >
                <Table bordered condensed responsive size="sm">
                    <thead>
                    </thead>
                    <tbody>
                    <tr>
                        <td width='400px'>받는분</td>
                        <td width='400px'>{this.props.recipientInfo.nameKor}</td>
                        {/* <td width='250px' align='right'>gkoo-{this.props.customerBaseInfo.customerId}</td> */}
                    </tr>
                    <tr>
                        <td>연락처</td>
                        <td>{this.props.recipientInfo.phoneNr}</td>
                    </tr>
                    <tr>
                        <td>개인통관고유번호</td>
                        <td>{this.props.recipientInfo.transitNr}</td>
                    </tr>
                    <tr>
                        <td>주소</td>
                        <td>{this.props.recipientInfo.fullAdress}</td>
                    </tr>
                    <tr>
                        <td>배송요청사항</td>
                        <td>{this.props.recipientInfo.usercomment}</td>
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