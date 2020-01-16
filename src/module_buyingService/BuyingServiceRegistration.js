import styled from "styled-components";
import {
    AppContainer as BaseAppContainer,
    BaseNavigation,
  } from "../container";
import React, { Component } from 'react';
import { AppNavbar, LogoutButton } from '../AppNavbar'
import { BuyingServiceNavbar } from './BuyingServiceIntro'
import { Breadcrumb, Card, Form, InputGroup, FormControl, Dropdown, DropdownButton, Button, Popover, 
    OverlayTrigger, Modal } from 'react-bootstrap';
import { ServiceNoticeBoard } from '../module_base_component/ServiceNoticeBoard'
import { BaseInputGroup } from '../module_base_component/BaseInputGroup'
import { LogisticsCenterFont, LogisticsCenterWarnFont, EMPTY_PAGE } from '../module_base_style/baseStyle'

import * as Keycloak from 'keycloak-js';
import { keycloakConfigLocal, INITIAL_PAGE, basePort, headers, setTokenHeader } from "../module_base_component/AuthService"
var keycloak = Keycloak(keycloakConfigLocal);

    {/* BuyingServiceRegistration Style */}
export const BodyContainer = styled(BaseAppContainer)`
  height:auto;
  flex-direction: column;
`;
const BuyingServiceRegistrationContainer = styled(BaseAppContainer)`
  height: calc(150vh);
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
          state_name:null,
        }

      //this.handleMethod = this.handleMethod.bind(this)
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
        }

      this.handleChangeShopUrl = this.handleChangeShopUrl.bind(this)
    }

    handleChangeShopUrl(event){
        this.setState({shopUrl:event.target.value})
        //this.state.deliveryObject.shopUrl = event.target.value
        console.log(event.target.value)
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

                    <Card border="dark" style={{ width: '90%', marginBottom:'1rem'}}>
                        <Card.Header>상품</Card.Header>
                        <Card.Body >
                        
                        </Card.Body>
                    </Card> 

                </Card.Body>
            </Card>
          </div>
        );
      }    
}