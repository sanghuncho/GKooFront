import styled from "styled-components";
import {
    AppContainer as BaseAppContainer,
    BaseNavigation,
  } from "../container";
import { NavLink } from "react-router-dom";
import React, {useState} from 'react';
import { AppNavbar, LogoutButton } from '../AppNavbar'
import { BuyingServiceNavbar } from './BuyingServiceIntro'
import { Breadcrumb, Card, Form, Button, Row, Col, Container, InputGroup, Modal } from 'react-bootstrap';
import { ServiceNoticeBoard } from '../module_base_component/ServiceNoticeBoard'
import { BaseInputGroup, BaseInputGroupEuro, BaseInputGroupUrl } from '../module_base_component/BaseInputGroup'
import { BaseDropdown, BaseDropdownDisabled } from '../module_base_component/BaseDropdown'
import { getKoreanCurrencyWithInfoBadge } from '../module_base_component/BaseUtil'
import { BaseRecipientWrapper } from '../module_base_component/BaseRecipientForm'
import { BaseProductPriceCalc } from '../module_base_component/BaseCustomComponent'
import { LogisticsCenterFont, LogisticsCenterWarnFont, EMPTY_PAGE } from '../module_base_style/baseStyle'
import { CATEGORY_LIST, getItemTitleList } from './BuyingServiceConfig'
import { CompanyIntroductionBottom } from '../module_base_component/BaseCompanyIntroduction'
import { Redirect } from 'react-router';
import { validateInputForm } from '../module_base_component/BaseInputGroup'
import { window_reload } from '../module_base_component/BaseUtil'

///// keycloak -> /////
import * as Keycloak from 'keycloak-js';
import { keycloakConfigLocal, INITIAL_PAGE, basePort, headers, setTokenHeader, getEmptyPage, validToken, fetchRegisterInitialCustomer } from "../module_base_component/AuthService"
var keycloak = Keycloak(keycloakConfigLocal);
///// <- keycloak /////

{/* BuyingServiceRegistration Style */}
export const BodyContainer = styled(BaseAppContainer)`
    min-height:calc(100vh);     
    height:auto;
    flex-direction: column;
`;

const BuyingServiceRegistrationContainer = styled(BaseAppContainer)`
    height: auto;
`;

export class BuyingServiceRegistration extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.state = { 
            keycloakAuth:null,
            accessToken:"",
            userid:'',
        };
    }

    componentDidMount() {
        keycloak.init({onLoad: 'login-required'}).success(() => {
            this.setState({ 
                keycloakAuth: keycloak, 
                accessToken:keycloak.token,
                userid:keycloak.tokenParsed.preferred_username
            })
            fetchRegisterInitialCustomer(keycloak)
        })
    }

    handleLogout(){
        keycloak.logout({ redirectUri: INITIAL_PAGE });
    }

    render() {
        const token = this.state.accessToken
        let buyingServiceRegistration

        if(validToken(token)){
            buyingServiceRegistration = 
                <BuyingServiceController
                    accessToken={this.state.accessToken}
                    userid={this.state.userid}/>
        } else {
            buyingServiceRegistration = getEmptyPage
        }
        return (
            <div>
            {/* 상단 내비 */}
            <AppNavbar>
                <LogoutButton keycloak ={this.state.keycloakAuth}/>
            </AppNavbar>

                {buyingServiceRegistration}
               
                
            </div>
        );}           
}

export class BuyingServiceController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            agreement:false,
            //agreement:true,
            agreementBoxsize:false
        }

      this.handleChangeOnCheckbox = this.handleChangeOnCheckbox.bind(this)
      this.handleChangeWarn = this.handleChangeWarn.bind(this)
    }

    handleChangeOnCheckbox(e) {
        this.setState({agreement:e.target.checked}) 
    }

    handleChangeWarn(event) {
        this.setState({agreementBoxsize:event.target.checked}) 
    }
      
    render() {
        const agreement=this.state.agreement;
        return (
          <div>
            <BuyingServiceRegistrationContainer>
                
                {/* 좌측 내비 */}
                <BuyingServiceNavbar/>

                <BodyContainer>
                    <Breadcrumb>
                        <Breadcrumb.Item active>구매대행</Breadcrumb.Item>
                        <Breadcrumb.Item active>구매대행 신청</Breadcrumb.Item>
                    </Breadcrumb>

                    {/* 서비스 신청시 주의사항 */}
                    <ServiceNoticeBoard handleChangeOnCheckbox={this.handleChangeOnCheckbox}
                        service='BuyingService'/>

                    {agreement ? <BuyingServiceCenter 
                                    accessToken={this.props.accessToken}
                                    handleChangeWarn={this.handleChangeWarn}
                                    agreementBoxsize={this.props.agreementBoxsize}
                                     />: EMPTY_PAGE }

                    {this.state.agreementBoxsize ? <BuyingServiceContentWrapper 
                                        accessToken={this.props.accessToken}
                                        userid={this.props.userid} />: EMPTY_PAGE }
                    
                    <CompanyIntroductionBottom/>
                </BodyContainer>

            </BuyingServiceRegistrationContainer>
          </div>
        );
      }    
}

const BuyingServiceCenterStyle = {
    width: '80%', height:'10rem', marginTop:'1rem'
};

class BuyingServiceCenter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //understandWarning:true,
            agreementBoxsize:false,
        }
      this.handleChangeWarn = this.handleChangeWarn.bind(this)
    }

    handleChangeWarn(event) {
        this.setState({agreementBoxsize:event.target.checked}) 
    }
      
    render() {
        return (
          <div>
              <Card border="dark" style={BuyingServiceCenterStyle}>
                <Card.Header>물류센터</Card.Header>
                <Card.Body >
                    <Card.Text>
                        <Form.Check style={LogisticsCenterFont} 
                            type='radio' label='독일' checked='true'/>
                    </Card.Text> 
                </Card.Body>
                <Card.Footer>
                    <Form.Check style={LogisticsCenterWarnFont} 
                        checked={this.props.agreementBoxsize} 
                        type='checkbox' 
                        onChange={e => this.props.handleChangeWarn(e)} 
                        label='Box 어느 한면이라도 152cm를 초과하거나, 1건당 무게 30kg을 초과할 경우 신청불가'/>
                </Card.Footer>
            </Card>
          </div>
        );
      }    
}

class BuyingServiceContentWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            applyService:false,
            shopUrl:'',
            shopDeliveryPrice:'',
            productContentObjectList:[],
            receiverNameByKorea:'',
            receiverNameByEnglish: "",

            transitNumber: "",
            validTransitNumber:false,
            isInvalidTransitNumber:false,

            agreeWithCollection:false,
            validAgreeWithCollection:false,
            isInvalidAgreeWithCollection:false,

            phonenumberFirst: "",
            phonenumberSecond: "",
            postCode: "",
            deliveryAddress: "",
            deliveryMessage:"",
            favoriteAddressList:[],
            openFavoriteAddressListPanel:false,
            buyingPrice:'',
            
            /* 회원배송정보 불러오기 */
            setOwnerContent:false,
            registerFavoriteAddress:false,
            customerBaseData:'',
            modalShow:false,
            userid:'',
            redirectToMypage:false,

            //control total validation
            tryToValidate:false,
            validForm:false,
        }
        
        this.handleApplyService = this.handleApplyService.bind(this)
        this.handleChangeShopUrl = this.handleChangeShopUrl.bind(this)
        this.handleChangeShopDeliveryPrice = this.handleChangeShopDeliveryPrice.bind(this)
        this.handleChangeReceiverNameByKorea = this.handleChangeReceiverNameByKorea.bind(this)
        this.handleChangeReceiverNameByEnglish = this.handleChangeReceiverNameByEnglish.bind(this)
        this.handleChangeTransitNumber = this.handleChangeTransitNumber.bind(this)
        this.handleChangePhonenumberFirst = this.handleChangePhonenumberFirst.bind(this)
        this.handleChangePhonenumberSecond = this.handleChangePhonenumberSecond.bind(this)
        this.handleChangePostCode = this.handleChangePostCode.bind(this)
        this.handleChangeAddress = this.handleChangeAddress.bind(this)
        this.handleChangeMessage = this.handleChangeMessage.bind(this)
        this.handleOpenFavoriteAddressListPanel = this.handleOpenFavoriteAddressListPanel.bind(this)
        this.handleCloseFavoriteAddressListPanel = this.handleCloseFavoriteAddressListPanel.bind(this)
        this.handleLoadSelectedAddress = this.handleLoadSelectedAddress.bind(this)
        this.handleRegisterFavoriteAddress = this.handleRegisterFavoriteAddress.bind(this)
        this.handleGetCustomerAddressData = this.handleGetCustomerAddressData.bind(this)
        this.fetchCustomerBaseData=this.fetchCustomerBaseData.bind(this)
        this.handleModalShow = this.handleModalShow.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleBuyingPrice = this.handleBuyingPrice.bind(this);
        this.handleMoveToMypage = this.handleMoveToMypage.bind(this);
        this.handleChangeAgreeWithCollection = this.handleChangeAgreeWithCollection.bind(this);
    }

    componentDidMount() {
    }

    handleMoveToMypage(){
        this.setState({redirectToMypage: true});
      }

    buildBuyingServiceData(){
        var recipientObjectData = {
            nameKor:this.state.receiverNameByKorea,
            nameEng: this.state.receiverNameByEnglish,
            transitNr: this.state.transitNumber,
            phonenumberFirst: this.state.phonenumberFirst,
            phonenumberSecond: this.state.phonenumberSecond,
            zipCode: this.state.postCode,
            address: this.state.deliveryAddress,
            usercomment: this.state.deliveryMessage,
        }
        
        const buyingServiceData = [
          {shopUrl:this.state.shopUrl},
          {buyingPrice:this.state.buyingPrice.resultPrice},
          {productContentObjectList:JSON.stringify(this.state.productContentObjectList)},
          {recipientObjectData:JSON.stringify(recipientObjectData)}
        ]
        return buyingServiceData
    }

    buildFavoriteAddressData(){
        var favoriteAddressObject = {
            nameKor:this.state.receiverNameByKorea,
            nameEng: this.state.receiverNameByEnglish,
            transitNr: this.state.transitNumber,
            phonenumberFirst: this.state.phonenumberFirst,
            phonenumberSecond: this.state.phonenumberSecond,
            zipCode: this.state.postCode,
            address: this.state.deliveryAddress,
        }
  
        const favoriteAddressData =  [
          {favoriteAddressData: JSON.stringify(favoriteAddressObject)}
        ]
        console.log(favoriteAddressData)
        return favoriteAddressData
    }

    registerFavoriteAddress(contents){
        const token = this.props.accessToken
        let userid = this.props.userid
        setTokenHeader(token)
        fetch(basePort + '/registerFavoriteAddressBuyingService/' + userid, 
                  {method:'post', headers, 
                    body:JSON.stringify(contents)})
                  .then((result) => { return result;}).then((contents) => {
              console.log(contents)
             }).catch(err => err);
    }

    createBuyingService(contents){
        const token = this.props.accessToken
        let userid = this.props.userid
        setTokenHeader(token)
        fetch(basePort + '/createBuyingService/' + userid, 
                {method:'post', headers, 
                  body:JSON.stringify(contents)})
                .then((result) => { return result;}).then((contents) => {
            console.log(contents)
           }).catch(err => err);
    }

    fetchFavoriteAddressList(accessToken){
        let userid = this.props.userid
        setTokenHeader(accessToken)
        fetch(basePort + '/fetchFavoriteAddressList/' + userid, {headers})
            .then((result) => {
               return result.json();
            }).then((data) => {
              this.setState({
                favoriteAddressList:data,
                openFavoriteAddressListPanel:true})
              console.log(data)
        }).catch(error => console.log(error) );
    }

    /* 회원배송정보 불러오기 */
    fetchCustomerBaseData(token){
        let userid = this.props.userid
        setTokenHeader(token)
        fetch(basePort + '/fetchcustomerbaseinfoBuyingService/' + userid, {headers})
          .then((result) => { 
            return result.json();
          }).then((data) => {           
            this.setState({customerBaseData:data})
            this.setState({
                receiverNameByKorea:data.nameKor,
                receiverNameByEnglish:data.nameEng,
                transitNumber:data.transitNr,
                phonenumberFirst:data.phonenumberFirst,
                phonenumberSecond:data.phonenumberSecond,
                postCode:data.zipCode,
                deliveryAddress:data.address
            })
            console.log(data.address);
          }).catch(function() {
            console.log("error fetching userbaseinfo");
        });
    }

    handleChangeShopUrl(shopUrl){
        this.setState({shopUrl})
        console.log(shopUrl)
    }

    handleChangeShopDeliveryPrice(event){
        this.setState({shopDeliveryPrice:event.target.value})
        console.log(event.target.value)
    }

    handleChangeReceiverNameByKorea(event){
        this.setState({receiverNameByKorea:event.target.value})
        console.log(event.target.value)
    }

    handleChangeReceiverNameByEnglish(event){
        this.setState({receiverNameByEnglish:event.target.value})
        console.log(event.target.value)
    }

    handleChangeTransitNumber(event){
        let value = event.target.value
        let valid = validateInputForm('transitNumber', value)
        this.setState({
            transitNumber:value,
            validTransitNumber: valid,
            isInvalidTransitNumber:this.state.tryToValidate && !valid
        })
        this.validForm()
    }

    handleChangeAgreeWithCollection(event){
        let value = event.target.checked
        let valid = validateInputForm('agreeWithCollection', value)
        this.setState({
            agreeWithCollection:value,
            validAgreeWithCollection: valid,
            isInvalidAgreeWithCollection:this.state.tryToValidate && !valid
        })
        this.validForm()
    }

    validForm() {
        if(this.state.agreeWithCollection &
            this.state.validTransitNumber
            ){
            return true
        } else {
            return false
        }
    }

    handleApplyService(e){
        this.setState({applyBuyingService:true, modalShow:false})
        const buyingServiceData = this.buildBuyingServiceData()
        this.createBuyingService(buyingServiceData)
        if(this.state.registerFavoriteAddress){
            const favoriteAddress = this.buildFavoriteAddressData()
            this.registerFavoriteAddress(favoriteAddress)
        }

        setTimeout(() => {
            this.handleMoveToMypage()
        }, 2000);
    }

    handleChangePhonenumberFirst(event){
        this.setState({phonenumberFirst:event.target.value})
        console.log(event.target.value)
    }

    handleChangePhonenumberSecond(event){
        this.setState({phonenumberSecond:event.target.value})
        console.log(event.target.value)
    }

    handleChangePostCode(event){
        this.setState({postCode:event.target.value})
        console.log(event.target.value)
    }

    handleChangeAddress(event){
        this.setState({deliveryAddress:event.target.value})
        console.log(event.target.value)
    }

    handleChangeMessage(event){
        this.setState({deliveryMessage:event.target.value})
        console.log(event.target.value)
    }

    handleCalculation(){
        // var box = this.state.buyingBoxList[0]
        // this.setState({ productsValue:box.productsValue })
        //console.log(box.productsValue)
    }

    handleOpenFavoriteAddressListPanel(){
        console.log("click open address")
        this.fetchFavoriteAddressList(this.props.accessToken)
    }

    handleCloseFavoriteAddressListPanel(){
        this.setState({openFavoriteAddressListPanel:false})
    }

    handleLoadSelectedAddress(index){
        var addressData = this.state.favoriteAddressList[index]
        this.setState({
            receiverNameByKorea:addressData.nameKor,
            receiverNameByEnglish:addressData.nameEng,
            transitNumber:addressData.transitNr,
            phonenumberFirst:addressData.phonenumberFirst,
            phonenumberSecond:addressData.phonenumberSecond,
            postCode:addressData.zipCode,
            deliveryAddress:addressData.address,
        })
    }

    handleGetCustomerAddressData(event){
        const setCustomerBaseData = event.target.checked   
        this.setState({setOwnerContent:setCustomerBaseData})
        if (setCustomerBaseData){
            this.fetchCustomerBaseData(this.props.accessToken)
        } else {
            this.setState({
                receiverNameByKorea:'',
                receiverNameByEnglish:'',
                transitNumber:'',
                phonenumberFirst:'',
                phonenumberSecond:'',
                postCode:'',
                deliveryAddress:'',
            })
        }
    }

    handleRegisterFavoriteAddress(event){    
        this.setState({registerFavoriteAddress:event.target.checked})
    }

    handleModalShow() {
        this.setState({
            tryToValidate:true,
            isInvalidTransitNumber: !validateInputForm('transitNumber', this.state.transitNumber),
            isInvalidAgreeWithCollection: !validateInputForm('agreeWithCollection', this.state.agreeWithCollection)
        });

        if(this.validForm()){
            this.setState({ modalShow: true });
        } else {
            console.log("not showing Modal")
        }
    }

    handleModalClose() {
        this.setState({ modalShow: false })
    }

    handleBuyingPrice(estimationResult){
        this.setState({ buyingPrice: estimationResult });
    }

    render() {
        const link = "/mypagebuyingService"
        if (this.state.redirectToMypage) {
            return <Redirect push to={link}/>
        }

        let button = <ServiceApplyButton 
                        handleApplyService={this.handleApplyService}
                        handleModalShow={this.handleModalShow}
                        handleModalClose={this.handleModalClose}
                        modalShow={this.state.modalShow}/>
        return (
          <div>
            {/* 상품 입력 패널 */}
            <ProductContentForm accessToken={this.props.accessToken}
                productContentObjectList={this.state.productContentObjectList}
                handleChangeShopUrl={this.handleChangeShopUrl}
                handleChangeShopDeliveryPrice={this.handleChangeShopDeliveryPrice}
                />

             <ServiceEstimation
                productContentObjectList={this.state.productContentObjectList}
                shopDeliveryPrice={this.state.shopDeliveryPrice}
                accessToken={this.props.accessToken}
                userid={this.props.userid}
                handleBuyingPrice={this.handleBuyingPrice}
             />

            {/* 수취인 입력 패널 */}
            <BaseRecipientWrapper accessToken={this.props.accessToken}
                serviceApplyButton = {button}
                handleChangeReceiverNameByKorea={this.handleChangeReceiverNameByKorea}
                receiverNameByKorea={this.state.receiverNameByKorea}
                handleChangeReceiverNameByEnglish={this.handleChangeReceiverNameByEnglish}
                receiverNameByEnglish={this.state.receiverNameByEnglish}
                handleChangeTransitNumber={this.handleChangeTransitNumber}
                transitNumber={this.state.transitNumber}
                handleChangePhonenumberFirst={this.handleChangePhonenumberFirst}
                phonenumberFirst={this.state.phonenumberFirst}
                handleChangePhonenumberSecond={this.handleChangePhonenumberSecond}
                phonenumberSecond={this.state.phonenumberSecond}
                handleChangePostCode={this.handleChangePostCode}
                postCode={this.state.postCode}
                handleChangeAddress={this.handleChangeAddress}
                deliveryAddress={this.state.deliveryAddress}
                handleChangeMessage={this.handleChangeMessage}
                handleOpenFavoriteAddressListPanel={this.handleOpenFavoriteAddressListPanel}
                handleCloseFavoriteAddressListPanel={this.handleCloseFavoriteAddressListPanel}
                handleLoadSelectedAddress={this.handleLoadSelectedAddress}
                favoriteAddressList={this.state.favoriteAddressList}
                openFavoriteAddressListPanel={this.state.openFavoriteAddressListPanel}
                handleGetCustomerAddressData={this.handleGetCustomerAddressData}
                handleRegisterFavoriteAddress ={this.handleRegisterFavoriteAddress}
                handleChangeAgreeWithCollection={this.handleChangeAgreeWithCollection}
                validTransitNumber={this.state.validTransitNumber}
                isInvalidTransitNumber={this.state.isInvalidTransitNumber}
                validAgreeWithCollection={this.state.validAgreeWithCollection}
                isInvalidAgreeWithCollection={this.state.isInvalidAgreeWithCollection}
                />

          </div>
        );
      }    
}

class ServiceEstimation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            estimationResult:'',
        }
        
        this.handleCalculation = this.handleCalculation.bind(this)
        this.handleGetEstimation = this.handleGetEstimation.bind(this)
    }

    handleCalculation(){
        const estimationObject = [
            {shopDeliveryPrice:this.props.shopDeliveryPrice},
            {productContentObjectList: JSON.stringify(this.props.productContentObjectList)},
        ]
        console.log(estimationObject)
        this.handleGetEstimation(estimationObject)
    }

    handleGetEstimation(contents){
        const token = this.props.accessToken
        let userid = this.props.userid
        setTokenHeader(token)
        fetch(basePort + '/estimationBuyingService/' + userid, 
                {method:'post', headers, 
                  body:JSON.stringify(contents)})
                .then((result) => { return result.json();})
                .then((data) => {
                    this.setState( { estimationResult: data} )
                    this.props.handleBuyingPrice(data)
                    //console.log(result.resultPrice)
                }).catch(err => err);
    }
      
    render() {

        let estimationResult = getKoreanCurrencyWithInfoBadge(this.state.estimationResult.resultPrice)
        return (
        <div>
             <Card border="dark" style={{ width: '80%', marginTop:'1rem', marginBottom:'1rem' }}>
                <Card.Header>구매대행 견적보기
                </Card.Header>
                    <Card.Body>
                    <Container>
                        <Row>
                            <Col xs={8}>{estimationResult}</Col>
                            {/* <Col></Col> */}
                            <Col>
                                <Button size="sm" 
                                    variant='secondary' 
                                    style={{  marginRight: '10%', fontSize:'14px', float:"right"}}
                                    onClick={(e) => this.handleCalculation(e)}
                                >견적 계산
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                        </Row>    
                    </Container>
                    {/* <InputGroup style={{ width: '90%'}}>

                        {estimationResult}

                        <Button size="sm" 
                            variant='secondary' 
                            style={{  marginRight: '10%', fontSize:'14px', float:"right"}}
                            onClick={(e) => this.handleCalculation(e)}
                        >견적 계산
                        </Button>
                    </InputGroup > */}
                    </Card.Body>
            </Card>
        </div>
        );
      }    
}

export class ServiceApplyButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }

    }
      
    render() {
        return (
        <div>
            <InputGroup className="mb-3" style={{ width: '50%', marginTop:'10px', marginLeft:'35%', marginRight:'25%'}}>
                {/* <OverlayTrigger trigger="hover"  placement="left"> */}
                <Button size="sm" variant='secondary' style={{ marginRight:'10px', fontSize:'14px'}}
                    //onClick={(e) => this.props.handleApplyService(e)}
                    //확인 창 떠서 예 클리하면 DB 전달
                    onClick={this.props.handleModalShow}
                    >구매대행 신청하기
                </Button>
                {/* </OverlayTrigger> */}
                    {/* 추후 개발
                    <Button size="sm" variant='secondary'>임시 저장하기</Button> */}
                <Modal show={this.props.modalShow} onHide={this.props.handleModalClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>구매대행 신청</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>구매대행을 신청하시겠습니까?</Modal.Body>
                            <Modal.Footer>
                                {/* 마이페이지 이동 구현됨 */}
                                {/* <NavLink to="/mypage"> */}
                                <Button variant="success" 
                                        onClick={(e) => this.props.handleApplyService(e)}
                                        //onClick={this.handleModalClose}
                                >예
                                </Button>
                                {/* </NavLink> */}
                        <Button variant="dark" onClick={this.props.handleModalClose}>
                            취소
                        </Button>
                    </Modal.Footer>
                </Modal>
            </InputGroup >
        </div>
        );
      }    
}

export class ProductContentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shopUrl:'',
            productTotalPrice:"",
            productContentList:[],
            shopUrl:''
        }
        this.handleAddproductOnList = this.handleAddproductOnList.bind(this)
        this.handleRemoveItemOnList = this.handleRemoveItemOnList.bind(this)
        this.handleChangeShopUrl = this.handleChangeShopUrl.bind(this)
    }

    //Lifting state up implementation
    handleChangeShopUrl(event){
        this.props.handleChangeShopUrl(event.target.value);
        console.log(event.target.value)
    }

    componentDidMount() {
        this.setState({
            productContentList:[...this.state.productContentList, ""],
        })
    }

    handleAddproductOnList(event){
        this.setState({
            productContentList:[...this.state.productContentList, ""],
        })
    }

    handleRemoveItemOnList(index){
        this.state.productContentList.splice(index, 1)
        this.props.productContentObjectList.splice(index, 1)
        this.setState({
            productContentList:this.state.productContentList, 
             })
    }

    render() {
        return (
          <div>
            <Card border="dark" style={{ width: '80%', marginTop:'1rem', marginBottom:'1rem' }}>
                <Card.Header>상품입력</Card.Header>          
                <Card.Body>
                    <Card border="dark" style={{ width: '90%', marginBottom:'1rem'}}>
                        <Card.Header>상품 구매 주소</Card.Header>
                        <Card.Body >
                        <BaseInputGroupUrl 
                            label="쇼핑몰 URL"
                            placeholder="정확한 URL을 입력해주세요"
                            handleChangeInput={this.handleChangeShopUrl} />
                         <BaseInputGroupEuro 
                            label="독일내 배송비"
                            placeholder="무료배송일 경우 0 으로 기입해주세요"
                            handleChangeInput={this.props.handleChangeShopDeliveryPrice} 
                            />
                        </Card.Body>
                        
                    </Card>

                    {this.state.productContentList.map((itemName, index) => { return (
                        <div key={index}>
                        <ProductContent
                            index={index}
                            productContentObjectList={this.props.productContentObjectList}
                            productContentList={this.state.productContentList}
                            handleRemoveItemOnList={this.handleRemoveItemOnList}
                        />
                        </div>
                    )})}

                <Button variant="secondary" size="sm" 
                        onClick={(e) => this.handleAddproductOnList(e)} 
                        style={{ marginRight: '10%', marginTop: '10px', float:"right"}}>
                        상품 추가
                </Button>

                </Card.Body>
            </Card>
          </div>
        );
    }
}

// property : productContentObjectList
export class ProductContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryTitle:"선택",
            categoryTitleList:CATEGORY_LIST,
            itemTitle:"선택",
            itemTitleList:[],
            disabled_itemTitleList:true,
            brandName:'',
            itemName:'',
            productPrice:"",
            productAmount:"",
            productTotalPrice:"",
            productContentList:[],
        }

      this.handleSelectCategory = this.handleSelectCategory.bind(this)
      this.handleSelectItem = this.handleSelectItem.bind(this)
      this.handleChangeBrandName = this.handleChangeBrandName.bind(this)
      this.handleChangeItemName = this.handleChangeItemName.bind(this)
      this.handleChangeProductPrice = this.handleChangeProductPrice.bind(this)
      this.handleChangeProductAmount = this.handleChangeProductAmount.bind(this)
    }

    componentDidMount() {
        var productContentObject = {
            categoryTitle: "",
            itemTitle: "",
            brandName: "",
            itemName: "",
            productPrice: "",
            productAmount: "",
            productTotalPrice: "",
        };
        this.props.productContentObjectList[this.props.index] = productContentObject
    }

    handleSelectCategory(event, title) {
        this.setState({
            categoryTitle:title,
            disabled_itemTitleList:false,
        })
        this.props.productContentObjectList[this.props.index].categoryTitle = title
        this.state.itemTitleList = getItemTitleList(title)
    }

    handleSelectItem(event, item) {
        this.setState({itemTitle:item})
        this.props.productContentObjectList[this.props.index].itemTitle = item
    }

    handleChangeBrandName(event){
        this.setState({brandName:event.target.value})
        this.props.productContentObjectList[this.props.index].brandName = event.target.value
    }

    handleChangeItemName(event){
        this.setState({itemName:event.target.value})
        this.props.productContentObjectList[this.props.index].itemName = event.target.value
    }

    handleChangeProductPrice(event){
        var amount = this.state.productAmount
        var price = event.target.value
        var totalPrice = price*amount
        this.setState({productPrice:price})
        this.props.productContentObjectList[this.props.index].productPrice = price
        this.props.productContentObjectList[this.props.index].productTotalPrice = totalPrice
    }

    handleChangeProductAmount(event){
        var amount = event.target.value
        var price = this.state.productPrice
        var totalPrice = price*amount
        this.setState({productAmount:amount})
        this.props.productContentObjectList[this.props.index].productAmount = amount
        this.props.productContentObjectList[this.props.index].productTotalPrice = totalPrice
    }

    render() {
        const index = this.props.index
        let buttonDeleteProduct
        if (this.props.index === 0){
            buttonDeleteProduct = EMPTY_PAGE
        } else {
            buttonDeleteProduct = 
                <Button variant="secondary" size="sm" 
                    onClick={() => this.props.handleRemoveItemOnList(index)} 
                    style={{ marginRight: '10px', marginTop: '10px', float:"right"}}>
                    상품 삭제
                </Button>
        }

        return (
          <div>
            <Card border="dark" style={{ width: '90%', marginBottom:'1rem'}}>
                <Card.Header>상품</Card.Header>
                <Card.Body>
                <BaseDropdown
                    label="카테고리"
                    title={this.state.categoryTitle}
                    titleList={this.state.categoryTitleList}
                    handleSelectTitle={this.handleSelectCategory}
                />

                <BaseDropdownDisabled
                    label="품목"
                    title={this.state.itemTitle}
                    titleList={this.state.itemTitleList}
                    handleSelectTitle={this.handleSelectItem}
                    disabled_itemTitleList={this.state.disabled_itemTitleList}
                />

                <BaseInputGroup 
                label="브랜드(영문)"
                placeholder="정확한 브랜드이름을 입력해주세요"
                handleChangeInput={this.handleChangeBrandName}
                />

                <BaseInputGroup 
                    label="상품명(영문)"
                    placeholder="정확한 영문 상품명을 입력해주세요"
                    handleChangeInput={this.handleChangeItemName}
                />
                            
                <BaseProductPriceCalc
                    handleChangeProductPrice={this.handleChangeProductPrice}
                    handleChangeProductAmount={this.handleChangeProductAmount}
                    price = {this.state.productPrice}
                    amount = {this.state.productAmount}
                />

                {buttonDeleteProduct}

                </Card.Body>
            </Card> 
          </div>
        );
      }    
}