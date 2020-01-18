import styled from "styled-components";
import {
    AppContainer as BaseAppContainer,
    BaseNavigation,
  } from "../container";
import React, { Component } from 'react';
import { AppNavbar, LogoutButton } from '../AppNavbar'
import { BuyingServiceNavbar } from './BuyingServiceIntro'
import { Breadcrumb, Card, Form, Button } from 'react-bootstrap';
import { ServiceNoticeBoard } from '../module_base_component/ServiceNoticeBoard'
import { BaseInputGroup } from '../module_base_component/BaseInputGroup'
import { BaseDropdown } from '../module_base_component/BaseDropdown'
import { BaseProductPriceCalc } from '../module_base_component/BaseReactBootstrap'
import { LogisticsCenterFont, LogisticsCenterWarnFont, EMPTY_PAGE } from '../module_base_style/baseStyle'
import { CATEGORY_LIST, DELIVERY_COMPANY_LIST, ITEM_TITLE_LIST } from './BuyingServiceConfig'

import * as Keycloak from 'keycloak-js';
import { keycloakConfigLocal, INITIAL_PAGE, basePort, headers, setTokenHeader } from "../module_base_component/AuthService"
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
            //agreement:false,
            agreement:true,
            keycloakAuth:null,
            accessToken:"",
        };
        this.handleChangeOnCheckbox = this.handleChangeOnCheckbox.bind(this);
    }

    handleChangeOnCheckbox(e) {
        this.setState({agreement:e.target.checked}) 
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
        const aggrement=this.state.agreement;
        return (
            <div>
            {/* 상단 내비*/}
            <AppNavbar>
                <LogoutButton keycloak ={this.state.keycloakAuth}/>
            </AppNavbar>

            <BuyingServiceRegistrationContainer>
                {/* 좌측 내비 */}
                <BuyingServiceNavbar/>
                
                 {/* Todo show the content after authentification of Keycloak */}
                <BodyContainer>
                    <Breadcrumb>
                        <Breadcrumb.Item active>구매대행</Breadcrumb.Item>
                        <Breadcrumb.Item active>구매대행 신청</Breadcrumb.Item>
                    </Breadcrumb>

                    {/* 서비스 신청시 주의사항 */}
                    <ServiceNoticeBoard handleChangeOnCheckbox={this.handleChangeOnCheckbox}
                        service='BuyingService'/>

                    {aggrement ? <BuyingServiceCenter accessToken={this.state.accessToken}/>: EMPTY_PAGE }

                    {aggrement ? <BuyingServiceContentWrapper accessToken={this.state.accessToken}/>: EMPTY_PAGE }
                </BodyContainer>
            </BuyingServiceRegistrationContainer>
            </div>
        );}           
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

        }
    }

    render() {
        return (
          <div> 
            <ProductContentForm/>
          </div>
        );
      }    
}

export class ProductContentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shopUrl:'',
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

      this.handleChangeShopUrl = this.handleChangeShopUrl.bind(this)
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

    handleChangeShopUrl(event){
        this.setState({shopUrl:event.target.value})
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
                            handleChangeInput={this.handleChangeShopUrl} />
                        </Card.Body>
                    </Card>

                    {this.state.productContentList.map((itemName, index) => { return (
                        <div key={index}>
                        <ProductContent
                            index={index}
                        />
                        </div>
                    )})}

                 <Button variant="secondary" size="sm" 
                        onClick={(e) => this.handleAddproductOnList(e)} 
                        style={{ marginRight: '10%', marginTop: '10px', float:"right"}}>상품 추가</Button> 
                        
                </Card.Body>
            </Card>
          </div>
        );
    }
}

export class ProductContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shopUrl:'',
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

      this.handleChangeShopUrl = this.handleChangeShopUrl.bind(this)
      this.handleSelectCategory = this.handleSelectCategory.bind(this)
      this.handleSelectItem = this.handleSelectItem.bind(this)
      this.handleChangeBrandName = this.handleChangeBrandName.bind(this)
      this.handleChangeItemName = this.handleChangeItemName.bind(this)
      this.handleChangeProductPrice = this.handleChangeProductPrice.bind(this)
      this.handleChangeProductAmount = this.handleChangeProductAmount.bind(this)
    }

    handleChangeShopUrl(event){
        this.setState({shopUrl:event.target.value})
    }

    handleSelectCategory(event, title) {
        this.setState({categoryTitle:title})
    }

    handleSelectItem(event, item) {
        this.setState({itemTitle:item})
    }

    handleChangeBrandName(event){
        this.setState({brandName:event.target.value})
    }

    handleChangeItemName(event){
        this.setState({itemName:event.target.value})
    }

    handleChangeProductPrice(event){
        this.setState({productPrice:event.target.value})
        this.setProductTotalPrice()
    }

    handleChangeProductAmount(event){
        this.setState({productAmount:event.target.value})
        this.setProductTotalPrice()
    }

    setProductTotalPrice(){
        var price = this.state.productPrice
        var amount = this.state.productAmount
        this.setState({productTotalPrice:price*amount})
    }

    render() {
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

                </Card.Body>
            </Card> 
          </div>
        );
      }    
}