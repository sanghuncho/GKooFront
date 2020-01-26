import styled from "styled-components";
import {
    AppContainer as BaseAppContainer,
    BaseNavigation,
  } from "../container";
import React, {useState} from 'react';
import { AppNavbar, LogoutButton } from '../AppNavbar'
import { BuyingServiceNavbar } from './BuyingServiceIntro'
import { Breadcrumb, Card, Form, Button, OverlayTrigger, InputGroup } from 'react-bootstrap';
import { ServiceNoticeBoard } from '../module_base_component/ServiceNoticeBoard'
import { BaseInputGroup } from '../module_base_component/BaseInputGroup'
import { BaseDropdown } from '../module_base_component/BaseDropdown'
import { BaseRecipientWrapper } from '../module_base_component/BaseRecipientForm'
import { BaseProductPriceCalc } from '../module_base_component/BaseReactBootstrap'
import { LogisticsCenterFont, LogisticsCenterWarnFont, EMPTY_PAGE } from '../module_base_style/baseStyle'
import { CATEGORY_LIST, DELIVERY_COMPANY_LIST, ITEM_TITLE_LIST } from './BuyingServiceConfig'

import * as Keycloak from 'keycloak-js';
import { keycloakConfigLocal, INITIAL_PAGE, basePort, headers, setTokenHeader, getEmptyPage, validToken } from "../module_base_component/AuthService"
var keycloak = Keycloak(keycloakConfigLocal);

{/* BuyingServiceRegistration Style */}
export const BodyContainer = styled(BaseAppContainer)`
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
        };
    }

    componentDidMount() {
        keycloak.init({onLoad: 'login-required'}).success(() => {
            this.setState({ keycloakAuth: keycloak, 
            accessToken:keycloak.token})
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
                    accessToken = { this.state.accessToken }/>
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
            //agreement:false,
            agreement:true,
        }

      this.handleChangeOnCheckbox = this.handleChangeOnCheckbox.bind(this)
    }

    handleChangeOnCheckbox(e) {
        this.setState({agreement:e.target.checked}) 
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
                                    accessToken={this.props.accessToken}/>: EMPTY_PAGE }

                    {agreement ? <BuyingServiceContentWrapper 
                                        accessToken={this.props.accessToken}/>: EMPTY_PAGE }
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
            understandWarning:true,
        }
      this.handleChangeWarn = this.handleChangeWarn.bind(this)
    }

    handleChangeWarn(event) {
        this.setState({understandWarning:event.target.checked}) 
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
                        checked={this.state.understandWarning} 
                        type='checkbox' 
                        onChange={e => this.handleChangeWarn(e)} 
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
            productContentObjectList:[],
            receiverNameByKorea:'',
            receiverNameByEnglish: "",
            transitNumber: "",
            phonenumberFirst: "",
            phonenumberSecond: "",
            postCode: "",
            deliveryAddress: "",
            deliveryMessage:"",
        }
        
        this.handleApplyService = this.handleApplyService.bind(this)
        this.handleChangeShopUrl = this.handleChangeShopUrl.bind(this)
        this.handleChangeReceiverNameByKorea = this.handleChangeReceiverNameByKorea.bind(this)
        this.handleChangeReceiverNameByEnglish = this.handleChangeReceiverNameByEnglish.bind(this)
        this.handleChangeTransitNumber = this.handleChangeTransitNumber.bind(this)
        this.handleChangePhonenumberFirst = this.handleChangePhonenumberFirst.bind(this)
        this.handleChangePhonenumberSecond = this.handleChangePhonenumberSecond.bind(this)
        this.handleChangePostCode = this.handleChangePostCode.bind(this)
        this.handleChangeAddress = this.handleChangeAddress.bind(this)
        this.handleChangeMessage = this.handleChangeMessage.bind(this)
    }

    componentDidMount() {
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
          {productContentObjectList: JSON.stringify(this.state.productContentObjectList)},
          {recipientObjectData:JSON.stringify(recipientObjectData)}
        ]
        return buyingServiceData
    }

    handleApplyService(e){
        this.setState({applyBuyingService:true})
        const buyingServiceData = this.buildBuyingServiceData()
        this.createBuyingService(buyingServiceData)
        console.log(buyingServiceData)
    }

    createBuyingService(contents){
        const token = this.props.accessToken
        setTokenHeader(token)
        fetch(basePort + '/createBuyingService', 
                {method:'post', headers, 
                  body:JSON.stringify(contents)})
                .then((result) => { return result;}).then((contents) => {
            console.log(contents)
           }).catch(err => err);
    }

    handleChangeShopUrl(event){
        this.setState({shopUrl:event.target.value})
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
        this.setState({transitNumber:event.target.value})
        console.log(event.target.value)
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

    render() {
        

        let button = <ServiceApplyButton handleApplyService={this.handleApplyService}/>
        return (
          <div>
            {/* 상품 입력 패널 */}
            <ProductContentForm accessToken={this.props.accessToken}
                productContentObjectList={this.state.productContentObjectList}
                handleChangeShopUrl={this.handleChangeShopUrl}/>

            {/* 수취인 입력 패널 */}
            <BaseRecipientWrapper accessToken={this.props.accessToken}
                serviceApplyButton = {button}
                handleChangeReceiverNameByKorea={this.handleChangeReceiverNameByKorea}
                handleChangeReceiverNameByEnglish={this.handleChangeReceiverNameByEnglish}
                handleChangeTransitNumber={this.handleChangeTransitNumber}
                handleChangePhonenumberFirst={this.handleChangePhonenumberFirst}
                handleChangePhonenumberSecond={this.handleChangePhonenumberSecond}
                handleChangePostCode={this.handleChangePostCode}
                handleChangeAddress={this.handleChangeAddress}
                handleChangeMessage={this.handleChangeMessage}
                />

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
                    onClick={(e) => this.props.handleApplyService(e)}
                    //확인 창 떠서 예 클리하면 DB 전달
                    //onClick={this.handleModalShow}
                    >구매대행 신청하기
                </Button>
                {/* </OverlayTrigger> */}
                    {/* 추후 개발
                    <Button size="sm" variant='secondary'>임시 저장하기</Button> */}
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
        }
      this.handleAddproductOnList = this.handleAddproductOnList.bind(this)
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

    render() {
        return (
          <div>
            <Card border="dark" style={{ width: '80%', marginTop:'1rem', marginBottom:'1rem' }}>
                <Card.Header>상품입력</Card.Header>          
                <Card.Body>
                    <Card border="dark" style={{ width: '90%', marginBottom:'1rem'}}>
                        <Card.Header>상품 구매 주소</Card.Header>
                        <Card.Body >
                        <BaseInputGroup 
                            label="쇼핑몰 URL"
                            placeholder="정확한 URL을 입력해주세요"
                            handleChangeInput={this.props.handleChangeShopUrl} />
                        </Card.Body>
                    </Card>

                    {this.state.productContentList.map((itemName, index) => { return (
                        <div key={index}>
                        <ProductContent
                            index={index}
                            productContentObjectList={this.props.productContentObjectList}
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
            itemTitleList:ITEM_TITLE_LIST,
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
        this.setState({categoryTitle:title})
        this.props.productContentObjectList[this.props.index].categoryTitle = title
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
        let buttonDeleteProduct
        if (this.props.index === 0){
            buttonDeleteProduct = EMPTY_PAGE
        } else {
            buttonDeleteProduct = 
                <Button variant="secondary" size="sm" 
                    //onClick={() => this.props.handleRemoveItemOnList(index)} 
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

                <BaseDropdown
                    label="품목"
                    title={this.state.itemTitle}
                    titleList={this.state.itemTitleList}
                    handleSelectTitle={this.handleSelectItem}
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