import { BuyingServiceNavbar } from './BuyingServiceIntro'
import styled from "styled-components";
import {
    AppContainer as BaseAppContainer,
    BaseNavigation,
  } from "../container";
import React, { Component } from 'react';
import { AppNavbar, LogoutButton } from '../AppNavbar'
import { Breadcrumb, Card, Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import { CompanyIntroductionBottom } from '../module_base_component/BaseCompanyIntroduction'
import { BaseInputGroupEuro, BaseInputGroupUrl, BaseInputGroupUrlReadable } from '../module_base_component/BaseInputGroup'
import { currencyFormatterEuro } from '../module_payment/PaymentUtil';
import { BaseTablePagination, BaseExpandableTablePagination } from '../module_base_component/BaseTable'
import { Redirect } from 'react-router';

///// keycloak -> /////
import * as Keycloak from 'keycloak-js';
import { keycloakConfigLocal, INITIAL_PAGE, basePort, headers, setTokenHeader, 
    getEmptyPage, validToken, fetchRegisterInitialCustomer, isAdmin, validAuctionUser } from "../module_base_component/AuthService"
var keycloak = Keycloak(keycloakConfigLocal);
///// <- keycloak /////

{/* BuyingServiceEbay CSS */}
export const BodyContainer = styled(BaseAppContainer)`
    min-height:calc(100vh);  
    height:auto;
    flex-direction: column;
`;
const AutionServiceContainer = styled(BaseAppContainer)`
    height:auto;
    min-height:calc(100vh);
`;

export class AuctionService extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { 
            keycloakAuth:null,
            accessToken:"",
            userid:'',
            isAdmin:false,
            validAuctionUser:false,
            auctionBidData:'',
        };
    }

    componentDidMount() {
        keycloak.init({onLoad: 'login-required'}).success(() => {
            this.setState({ 
                keycloakAuth: keycloak, 
                accessToken:keycloak.token,
                userid:keycloak.tokenParsed.preferred_username,
                //관리자 체크
                isAdmin:isAdmin(keycloak.realmAccess),
                //경매권한 체크
                validAuctionUser:validAuctionUser(keycloak.realmAccess)
            })
            //save the token and userid for deletion of AuctionBidService
            localStorage.setItem("react-token", keycloak.token);
            localStorage.setItem("userid", keycloak.tokenParsed.preferred_username);
            if(!this.state.isAdmin){
                //회원일 경우 데이터 로딩시작, 관리자는 search
                //fetchRegisterInitialCustomer(keycloak)
                this.fetchAuctionBidList(keycloak.token)
              }
        })
    }

    fetchAuctionBidList(accessToken){
      let userid = this.state.userid
      setTokenHeader(accessToken)
      fetch(basePort + '/fetchAuctionBidDataList/'+ userid, {headers})
        .then((result) => {
           return result.json();
        }).then((data) => {
           console.log(data)
           this.setState({auctionBidData:data})
        })   
    }

    render() {
        const accessToken = this.state.accessToken
        let auctionServiceController

        if(validToken(accessToken)){
            auctionServiceController = 
                <AuctionServiceController
                    accessToken={this.state.accessToken}
                    userid={this.state.userid}
                    isAdmin={this.state.isAdmin}
                    validAuctionUser={this.state.validAuctionUser}
                    auctionBidData={this.state.auctionBidData}
                    />
        } else {
            auctionServiceController = getEmptyPage
        }

        return (
            <div>
            {/* 상단 내비 */}
            <AppNavbar>
                <LogoutButton keycloak ={this.state.keycloakAuth}/>
            </AppNavbar>

            {auctionServiceController}
            </div>
        );}           
}

export class AuctionServiceController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }
    }

    render() {
        let auctionServicePane
        if(this.props.validAuctionUser){
            auctionServicePane = <AuctionServiceListPanel 
                                    userid={this.props.userid}
                                    accessToken={this.props.accessToken}
                                    auctionBidData={this.props.auctionBidData}
                                  />
        } else {
            {/* 경매보증금 안내 */}
            auctionServicePane = <AuctionDepositPanel/>
        }
        return (

          <div>
            <AutionServiceContainer>
                
                {/* 좌측 내비 */}
                <BuyingServiceNavbar/>

                <BodyContainer>
                    <Breadcrumb>
                        <Breadcrumb.Item active>경매대행</Breadcrumb.Item>
                        <Breadcrumb.Item active>경매대행 서비스</Breadcrumb.Item>
                    </Breadcrumb>

                    {auctionServicePane}

                    <CompanyIntroductionBottom/>
                </BodyContainer>

            </AutionServiceContainer>
          </div>
        );
      }    
}

class AuctionServiceListPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
         
        }
    }
      
    render() {
        return (
          <div>
              {/* 경매 대행 서비스 */}
              <AuctionBidPanel 
                    userid={this.props.userid} 
                    accessToken={this.props.accessToken}
                    auctionBidData={this.props.auctionBidData}
               />
              
              {/* 흥정 대행 서비스 */}
              {/* <AuctionOfferPanel/> */}
              
              {/* 즉시 구매대행 서비스 */}
              
              {/* 예약 입찰 서비스 */}

          </div>
        );
      }    
}

const AuctionBidTableStyle = styled.div`
  margin-top: 20px;
  width: 100%;
  font-size: 13px;
`;

const columnsAuctionService = [
    {
      dataField: 'objectid',
      text: '신청번호',
    },{
      dataField: 'productUrl',
      text: '상품 URL',
      formatter:openUrlPageFormatter
    }, {
        dataField: 'bidValue',
        text: '입찰가',
        formatter:currencyFormatterEuro,
    }, {
      dataField: 'auctionResult',
      text: '경매결과',
      formatter:auctionResultFormatter
    },{
      dataField: 'auctionBidDate',
      text: '신청날짜',
    },{
      dataField: 'auctionMessage',
      text: '요청사항',
      formatter:auctionMessageFormatter
    },{
      dataField: 'objectid',
      text: '기타',
      formatter:extraServiceFormatter
    }

];

const data = [
    {"objectid":"1234",
      "productUrl":"https://www.ebay.de/",
      "bidValue":"2.5",
      "auctionResult":"낙찰",
      "orderDate":"2020.04.05",
      "auctionMessage":"Y"
    },
    {"objectid":"1235",
      "productUrl":"https://www.ebay.de/",
      "bidValue":"2.5",
      "auctionResult":"유찰",
      "orderDate":"2020.04.05",
      "auctionMessage":""
    },
  ]

class AuctionBidPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productUrl:'',
            bidValue:'',
            auctionMessage:'',
            readyToPost:true,
        }
        this.handleChangeProductUrl = this.handleChangeProductUrl.bind(this)
        this.handleChangeBidValue = this.handleChangeBidValue.bind(this)
        this.handleChangeMessage = this.handleChangeMessage.bind(this)
        this.handleContinueRequestBid = this.handleContinueRequestBid.bind(this)
    }

    handleChangeProductUrl(event){
        console.log(event.target.value)
        this.setState({productUrl:event.target.value})
    }

    handleChangeBidValue(event){
        console.log(event.target.value)
        this.setState({bidValue:event.target.value})
    }

    handleChangeMessage(event){
        console.log(event.target.value)
        this.setState({auctionMessage:event.target.value})
    }

    handleRequestBid(){
        let userid = this.props.userid
        let productUrl = this.state.productUrl 
        let bidValue = this.state.bidValue
        let auctionMessage = this.state.auctionMessage 
        
        var auctionBidServiceObject = [
            {userid:userid},
            {productUrl:productUrl},
            {bidValue:bidValue},
            {auctionMessage:auctionMessage},
        ]
        
        setTokenHeader(this.props.accessToken)
        fetch(basePort + '/auctionBidService', 
                {method:'post', headers, 
                  body:JSON.stringify(auctionBidServiceObject)})
                .then(response => { 
                    this.setState({readyToPost:false})
                    console.log(response)
                    return response.json();})
                    // console.log(response.ok)
                    // if(response.ok) {
                    //     return response.json();
                    // } else {
                    //     throw new Error('Auction biding service went wrong...');
                    // }})
                .then((data) => {
                })
                .catch(error => {
                    //console.error('Error posting auctionBidService!', error);
                    //Error posting
                })
    }

    handleContinueRequestBid(){
        this.setState({
            readyToPost:true,
            productUrl:'',
            bidValue:'',
            auctionMessage:''
            })
    }
      
    render() {

        let auctionBidServiceButton
        if(this.state.readyToPost) {
            auctionBidServiceButton = <Button variant="secondary" size="sm" 
                                            onClick={(e) => this.handleRequestBid(e)} 
                                            style={{ marginRight: '10%', marginTop: '10px', float:"right"}}>
                                            입찰 신청 
                                      </Button>
        } else {
            auctionBidServiceButton = <Button variant="secondary" size="sm" 
                                            onClick={(e) => this.handleContinueRequestBid(e)} 
                                            style={{ marginRight: '10%', marginTop: '10px', float:"right"}}>
                                            입찰 계속
                                      </Button>
        }

        return (
          <div>
              <Card border="dark" style={{ width: '80%', marginTop:'1rem', marginBottom:'1rem' }}>
                <Card.Header>경매대행 입찰신청</Card.Header>          
                <Card.Body>
                    <Card border="dark" style={{ width: '90%', marginBottom:'1rem'}}>
                        <Card.Header>경매물품</Card.Header>
                        <Card.Body >
                        <BaseInputGroupUrlReadable 
                            label="상품 URL"
                            placeholder="정확한 URL을 입력해주세요"
                            handleChangeInput={this.handleChangeProductUrl}
                            value={this.state.productUrl}
                            readOnly={!this.state.readyToPost}
                            />
                         <BaseInputGroupUrlReadable 
                            label="맥시멈 입찰가"
                            placeholder="최대입찰가를 유로로 입력해주세요"
                            handleChangeInput={this.handleChangeBidValue}
                            readOnly={!this.state.readyToPost}
                            value={this.state.bidValue}
                            type="number"
                            />
                        <InputGroup size="sm" style={{ width:'100%'}} className="mb-3">
                            <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon3" >
                                경매대행시 <br/>요청사항
                            </InputGroup.Text>
                            </InputGroup.Prepend>
                                <Card style={{ width: '80%', height: '8em'}}>
                                    <Card.Body>
                                        <Form.Control id="basic-url" as="textarea" rows="3" 
                                            aria-describedby="basic-addon3"
                                            value={this.state.auctionMessage}
                                            onChange={e => this.handleChangeMessage(e)}
                                            readOnly={!this.state.readyToPost}
                                            value={this.state.auctionMessage}
                                            style={{ height:'5em'}}
                                        />
                                    </Card.Body> 
                                </Card> 
                        </InputGroup>
                        </Card.Body>
                    </Card>

                    {/* <Button variant="secondary" size="sm" 
                            onClick={(e) => this.handleRequestBid(e)} 
                            style={{ marginRight: '10%', marginTop: '10px', float:"right"}}>
                            입찰 신청
                    </Button> */}
                    
                    {auctionBidServiceButton}

                </Card.Body>
            </Card>

            <Card border="dark" style={{ width: '80%', marginTop:'1rem', marginBottom:'1rem' }}>
                <Card.Header>경매대행 신청내역</Card.Header>          
                <Card.Body>
                    <AuctionBidTableStyle>
                    {/*ToDo: contents located in center */}
                        <BaseExpandableTablePagination
                            keyField='objectid'  
                            data={ this.props.auctionBidData } 
                            //data={ data } 
                            columns={ columnsAuctionService } 
                            bordered={ true }  
                            noDataIndication="입찰내역이 없습니다"
                        />
                    </AuctionBidTableStyle>
                </Card.Body>
            </Card>
          </div>
        );
      }    
}

function auctionMessageFormatter(cell, row) {
    let message = row.auctionMessage === '' ? 'N' : 'Y'
    return (
        <div>
            {message}
        </div>
    );
}

const SUCCESS = "낙찰"
const FAIL = "유찰"

//입찰접수
//BID_READY(1),
    
//입찰완료
//BID_COMPLETED(2),

//낙찰
//AUCTION_FAILED(3),

//유찰
//AUCTION_SUCCESS(4),

//URL 에러
//URL_UNKNOWN(5);
export var auctonResult_map = new Map();
    auctonResult_map.set("BID_READY" , "입찰접수")
    auctonResult_map.set("BID_COMPLETED" , "입찰완료")
    auctonResult_map.set("AUCTION_FAILED" , "낙찰")
    auctonResult_map.set("AUCTION_SUCCESS" , "유찰")
    auctonResult_map.set("URL_UNKNOWN" , "URL 에러")

function auctionResultFormatter(cell, row) {
    let result
    switch (row.auctionResult) {
        case "BID_READY":
            result = auctonResult_map.get("BID_READY");
            break
        case 'BID_COMPLETED':
            result = auctonResult_map.get("BID_COMPLETED");
            break
        case 'AUCTION_FAILED':
            result = auctonResult_map.get("AUCTION_FAILED");
            break
        case 'AUCTION_SUCCESS':
            result = auctonResult_map.get("AUCTION_SUCCESS");
            break
        case 'URL_UNKNOWN':
            result = auctonResult_map.get("URL_UNKNOWN");
            break
    }
    return (
        <div> 
            {result}
        </div>
    );
}

function openUrlPageFormatter(cell, row) {        
    return (
      <OpenUrlButton productUrl={cell}/>
    );
}

function extraServiceFormatter(cell, row) {        
    return (
      <ExtraServiceButton 
        objectid={row.objectid}
        auctionResult={row.auctionResult}
        />
    );
  }

class OpenUrlButton extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        redirect:false,
      };
      this.handleOpenUrlPage = this.handleOpenUrlPage.bind(this);
      
    }
    
    componentDidMount() {
     
    }
  
    handleOpenUrlPage(){
        const url = this.props.productUrl
        window.open(url, '_blank');
    }
  
    render() {
      return(
        <div>
          <Button variant="outline-secondary" size="sm" 
            onClick={this.handleOpenUrlPage}>Open</Button>
        </div>
      );}
}


class ExtraServiceButton extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        
      };
      this.handleDeleteAuctionService = this.handleDeleteAuctionService.bind(this);
      
    }
    
    componentDidMount() {
     
    }
  
    handleDeleteAuctionService(){
        let userid = localStorage.getItem("userid", keycloak.tokenParsed.preferred_username)
        let accessToken = localStorage.getItem("react-token", keycloak.token)
        setTokenHeader(localStorage.getItem("react-token", keycloak.token))
        console.log(userid)
        console.log(accessToken)

        const contents = [
            {objectid:this.props.objectid},
            {userid:userid},
        ]


        fetch(basePort + '/deleteAuctionBidData/' + userid, 
          {method:'post', headers, 
            body:JSON.stringify(contents)})
            .then((response) => { 
                if(response.accepted) {
                    return response.json();
                } else {
                    throw new Error('Deletion of Auction biding service went wrong...');
                }})
            .catch(err => err);
        window.location.reload();
    }

    render() {
      let auctionResult = this.props.auctionResult
      let disableDeletion = auctionResult === 'BID_COMPLETED' ? true : false
      return(
        <div>
          <Button variant="outline-secondary" size="sm" disabled={disableDeletion}
            onClick={this.handleDeleteAuctionService}>삭제</Button>
        </div>
      );}
}

class AuctionDepositPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          openPaymentDepositPanel:false,
        }
        this.handleAuctionServiceDeposit = this.handleAuctionServiceDeposit.bind(this);
    }

    handleAuctionServiceDeposit(){
        this.setState({openPaymentDepositPanel:true});
    }
      
    render() {
        let paymentDepositPanel
        if(this.state.openPaymentDepositPanel) {
            paymentDepositPanel = <PaymentDepositPanel/>
        }
        return (
          <div>
              <Card border="dark" style={{ width: '70%', marginBottom:'5px', marginTop:'1rem', marginLeft:'1rem'}}>
                <Card.Header>경매대행 보증금 안내</Card.Header>
                <Card.Body >
                    경매대행은 낙찰시 구매를 전제로 진행하기 때문에 보증금 30000원을 결제하셔야 서비스 이용이 가능합니다.<br/>
                    경매보증금은 더이상 서비스 이용을 원하시지 않을 경우 보증금 환불을 신청해주시면 되돌려 드리는 요금입니다.<br/>
                    <br/>
                    경매대행 서비스 신청을 해주시고 보증금 결제를 해주시면 서비스 이용권한을 부여해드립니다.
                    <br/>
                    <Button variant="secondary" size="sm" 
                        onClick={() => this.handleAuctionServiceDeposit()} 
                        style={{ marginRight: '10px', marginTop: '10px', float:"left"}}>경매대행 서비스 신청</Button>     
                </Card.Body>
            </Card>

            {paymentDepositPanel}
          </div>
        );
      }    
}

class AuctionOfferPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          state_name:null,
        }
    }
      
    render() {
        return (
          <div>offer</div>
        );
      }    
}

class PaymentDepositPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requestValidUser:false,
        }
    }

    handleRequestValidUser(){
        this.setState({requestValidUser:true});
    }
      
    render() {

        let reqeustValidUserButton
        if(!this.state.requestValidUser) {
            reqeustValidUserButton = <Button variant="secondary" size="sm" 
                                        onClick={() => this.handleRequestValidUser()} 
                                        style={{ marginRight: '10px', marginTop: '10px', float:"left"}}>권한요청</Button>     
        } else {
            reqeustValidUserButton = 
                <div>
                    권한요청이 접수되었습니다.<br/>
                    결제확인후 권한부여와 함께 안내메일을 드리겠습니다.
                </div>
        }
        return (
          <div>
            <Card border="dark" style={{ width: '70%', marginBottom:'5px', marginTop:'1rem', marginLeft:'1rem'}}>
                <Card.Header>경매대행 보증금 결제 안내</Card.Header>
                <Card.Body >
                    무통장 입금 Account<br/>
                    우리은행 1002 843 3689 38<br/>
                    예금주: 조상훈 <br/>
                    <br/>

                    다른 결제시스템은 준비중에 있으며 무통장입금만 현재 가능합니다.<br/>
                    권한요청을 클릭해주시고 위에 안내되어있는 계좌로 보증금 입금을 해주시면 서비스 이용권한을 부여해드립니다.<br/>
                    감사합니다.<br/><br/>

                    {reqeustValidUserButton}


                </Card.Body>
            </Card>
          </div>
        );
      }    
}