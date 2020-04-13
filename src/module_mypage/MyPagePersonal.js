import { SideNav, Nav as BaseNav} from "react-sidenav";
import styled from "styled-components";
import React, { Component } from 'react';
import { Icon as BaseIcon } from "react-icons-kit";
import {
  AppContainer as BaseAppContainer,
  BaseNavigation,
} from "../container";
import { MyPageSideNav } from "./MyPageSideNav";
import { Breadcrumb, Button, CardGroup, Table, Card, InputGroup, FormControl } from "react-bootstrap"
import { AppNavbar, LogoutButton } from '../AppNavbar'
import { KEYCLOAK_USER_ACCOUNT } from "../Config"

///// keycloak -> /////
import * as Keycloak from 'keycloak-js';
import { keycloakConfigLocal, basePort, headers, setTokenHeader, getEmptyPage, validToken } from "../module_base_component/AuthService"
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

const BodyContainer = styled(BaseAppContainer)`
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
export class MyPagePersonal extends React.Component{

    state = { 
      active: null,
      keycloakAuth:null,
      accessToken:"",
      userBaseInfo:'',
      userid:'',
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
      keycloak.init({onLoad: 'login-required'}).success(() => {
          this.setState({ 
              keycloakAuth: keycloak, 
              accessToken:keycloak.token, 
              userid:keycloak.tokenParsed.preferred_username
        })
        this.fetchUserBaseInfo(keycloak.token)
      })
      
    }

    // fetchCustomerStatusData(token){
    //   let lastname = keycloak.tokenParsed.family_name
    //   let firstname = keycloak.tokenParsed.given_name
    //   const customername =  [{lastname:lastname}, {firstname:firstname}]
    //   let userid = this.state.userid
    //   setTokenHeader(token)
    //   fetch(basePort + '/customerstatus/'+ userid, 
    //   {method:'post', headers, body:JSON.stringify(customername)})
    //     .then((result) => {
    //        return result.json();
    //     }).then((data) => {
    //       this.setState({customerStatusData:data})
    //       this.fetchOrderInformation(token)
    //     })   
    // }

    fetchUserBaseInfo(token){
      let userid = this.state.userid
      console.log(userid)
      setTokenHeader(token)
      fetch(basePort + '/fetchuserbaseinfo/'+ userid, {headers})
        .then((result) => { 
          return result.json();
        }).then((data) => {           
          this.setState({userBaseInfo:data})
          console.log(data)
        }).catch(function() {
      });
    }

    validToken(token){
      return token === "" ? false : true
    }

    getEmptyPage(){
      return ""
    }

    render() {
        const token = this.state.accessToken
        let mypage_personal;

        if(this.validToken(token)){
            mypage_personal = 
                <MypagePersonalController 
                  userBaseInfo = {this.state.userBaseInfo}
                  accessToken = { this.state.accessToken }
                />
        } else {
            mypage_personal = this.getEmptyPage
        }
        return (
            <div>
              <AppNavbar>
                 <LogoutButton keycloak ={this.state.keycloakAuth}/>
              </AppNavbar>

              {mypage_personal}

            </div>
           
        );}           
}

export class MypagePersonalController extends React.Component{
  constructor(props) {
      super(props);
    }
    
    render() {
      return (
        <div>
          <AppContainer>
      
          <MyPageSideNav/>
      
          <BodyContainer>
            <Breadcrumb style={{ width: '100%'}}>
              <Breadcrumb.Item active>마이페이지 / 개인정보 </Breadcrumb.Item>
            </Breadcrumb>
            
            <UserBaseInfoEditor userBaseInfo={this.props.userBaseInfo}/>
        
        </BodyContainer>
        
        </AppContainer>
      </div>
      );
    }    
}

export class UserBaseInfoEditor extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          showUserBaseInfoDisplayer:true,
        };
        this.doEditUserBaseInfo = this.doEditUserBaseInfo.bind(this)
        this.doShowUserBaseInfo = this.doShowUserBaseInfo.bind(this)
    }

    handleMoveToBaseInfo(update){
        window.scrollTo(0, 0);
        this.props.handleShowStoredUserBaseInfo()
    }

    doEditUserBaseInfo(){
      this.setState({showUserBaseInfoDisplayer:false}) 
    }

    doShowUserBaseInfo(){
      this.setState({showUserBaseInfoDisplayer:true}) 
    }

    handleSave(){
      
    }

    render() {
      let userBaseInfoDisplayer
      if(this.state.showUserBaseInfoDisplayer) {
        /* read mode */
        userBaseInfoDisplayer = <UserBaseInfoDisplayer
          handleMoveToBaseInfo={this.props.handleMoveToBaseInfo}
          doEditUserBaseInfo={this.doEditUserBaseInfo}
          displaySaveButton={false}
          accessToken={this.props.accessToken}
          userBaseInfo={this.props.userBaseInfo}
          readOnly={true}
          userid={this.props.userid}
          />
      } 
      /* edit mode */
      else {
        userBaseInfoDisplayer = <UserBaseInfoDisplayer
          handleMoveToBaseInfo={this.props.handleMoveToBaseInfo}
          displaySaveButton={true}
          doShowUserBaseInfo={this.doShowUserBaseInfo}
          accessToken={this.props.accessToken}
          userBaseInfo={this.props.userBaseInfo}
          readOnly={false}
          userid={this.props.userid} />
      }
      return (
          <div>
             {userBaseInfoDisplayer}
          </div>
        );
      }    
}

export class UserBaseInfoDisplayer extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        nameKor:this.props.userBaseInfo.nameKor,
        nameEng:this.props.userBaseInfo.nameEng,
        email:this.props.userBaseInfo.email,
        transitNr:this.props.userBaseInfo.transitNr,
        phonenumberFirst:this.props.userBaseInfo.phonenumberFirst,
        phonenumberSecond:this.props.userBaseInfo.phonenumberSecond,
        zipCode:this.props.userBaseInfo.zipCode,
        address:this.props.userBaseInfo.address,
      };

      this.changeHandlerNameKor = this.changeHandlerNameKor.bind(this)
      this.changeHandlerNameEng = this.changeHandlerNameEng.bind(this)
      this.changeHandlerEmail = this.changeHandlerEmail.bind(this)
      this.changeHandlerTransitNr = this.changeHandlerTransitNr.bind(this)
      this.changeHandlerPhonenumberFirst = this.changeHandlerPhonenumberFirst.bind(this)
      this.changeHandlerPhonenumberSecond = this.changeHandlerPhonenumberSecond.bind(this)
      this.changeHandlerZipCode = this.changeHandlerZipCode.bind(this)
      this.changeHandlerAddress = this.changeHandlerAddress.bind(this)
      this.handleLinkAccountPage = this.handleLinkAccountPage.bind(this);
    }

    handleLinkAccountPage(){
      window.location.replace(KEYCLOAK_USER_ACCOUNT)
    }

    /* 기본정보란으로 이동 */
    handleCancel(){
      window.scrollTo(0, 0);
      this.props.doShowUserBaseInfo()
    }

    handleSave(){
      this.updateUserBaseInfo(this.props.accessToken)
      this.props.doShowUserBaseInfo()
    }

    updateUserBaseInfo(accessToken){
      var userBaseInfoData = {
          nameKor: this.state.nameKor,
          nameEng: this.state.nameEng,
          email: this.state.email,
          transitNr: this.state.transitNr,
          phonenumberFirst: this.state.phonenumberFirst,
          phonenumberSecond: this.state.phonenumberSecond,
          zipCode: this.state.zipCode,
          address: this.state.address,
      }

      const editedUserBaseInfo =  [
          {userBaseInfoData: JSON.stringify(userBaseInfoData)}
      ]

      setTokenHeader(accessToken)
      console.log(editedUserBaseInfo)
      let userid = this.props.userid
      fetch(basePort + '/updateuserbaseinfo/'+ userid, 
                {method:'post', headers, 
                  body:JSON.stringify(editedUserBaseInfo)})
    }

    changeHandlerNameKor(event){
      this.setState({nameKor:event.target.value})
      this.props.userBaseInfo.nameKor = event.target.value
    }

    changeHandlerNameEng(event){
      this.setState({nameEng:event.target.value})
      this.props.userBaseInfo.nameEng = event.target.value
    }
    
    changeHandlerEmail(event){
      this.setState({email:event.target.value})
      this.props.userBaseInfo.email = event.target.value
    }

    changeHandlerTransitNr(event){
      this.setState({transitNr:event.target.value})
      this.props.userBaseInfo.transitNr = event.target.value
    }

    changeHandlerPhonenumberFirst(event){
      this.setState({phonenumberFirst:event.target.value})
      this.props.userBaseInfo.phonenumberFirst = event.target.value
    }

    changeHandlerPhonenumberSecond(event){
      this.setState({phonenumberSecond:event.target.value})
      this.props.userBaseInfo.phonenumberSecond = event.target.value
    }

    changeHandlerZipCode(event){
      this.setState({zipCode:event.target.value})
      this.props.userBaseInfo.zipCode = event.target.value
    }

    changeHandlerAddress(event){
      this.setState({address:event.target.value})
      this.props.userBaseInfo.address = event.target.value
    }

    render() {
      let saveButton;
      let headerLine;
      if(this.props.displaySaveButton){
        /* 개인정보수정 편집가능 및 저장,취소버튼 노출 */
        headerLine = <div>개인정보 수정</div>
        saveButton = <InputGroup className="mb-3"  style={{ marginLeft:'40%'}} >
                          <Button size="sm" variant='secondary' style={{ marginRight:'10px'}}
                              onClick={(e) => this.handleSave(e)}
                          >완료
                          </Button>
                          <Button size="sm" variant='secondary' 
                              onClick={(e) => this.handleCancel(e)}
                          >취소</Button>
                    </InputGroup >
      } else {
        /* 개인정보 ony read 및 개인정보수정 버튼 노출 */
        headerLine = <div>개인정보
                            <Button variant="secondary" size="sm" 
                              onClick={(e) => this.props.handleMoveToBaseInfo()} 
                              style={{ marginRight: '10px', float:"right"}}>OK</Button>
                            
                            </div>
      }
      
      return (
        <div>
        {/* <Card border="dark" style={{ width: '80%', height:'48rem', marginTop:'1rem' }}> */}
        <Card border="dark" style={{ width: '80%', height:'auto', marginTop:'1rem' }}>
            <Card.Header>
              
              {headerLine}
              
            </Card.Header>
            <Card.Body >
            <Card border="dark" style={{ width: '80%', marginBottom:'10px'}}>
            <Card.Header>기본정보
              <Button variant="secondary" size="sm" 
                                onClick={(e) => this.handleLinkAccountPage()} 
                                style={{ marginRight: '10px', float:"right"}}>변경</Button>
            </Card.Header>
            <Card.Body >
                <InputGroup size="sm" className="mb-4" style={{ width:'80%'}}>
                  <InputGroup.Prepend >
                  <InputGroup.Text id="basic-addon3" >
                    이름(국문)
                  </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl id="basic-url" aria-describedby="basic-addon3"
                      onChange = { this.changeHandlerNameKor }
                      readOnly={true}
                      defaultValue={this.props.userBaseInfo.nameKor}
                      style={{backgroundColor: '#FFFFFF', marginRight:'1px'}}
                  />
                  
                  </InputGroup>
                  <InputGroup size="sm" className="mb-4" style={{ width: '80%'}}>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon3">
                        이메일
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl id="basic-url" aria-describedby="basic-addon3"
                      readOnly={true}
                      defaultValue={this.props.userBaseInfo.email}
                      style={{ width: '50px',backgroundColor: '#FFFFFF'}}
                      onChange = { this.changeHandlerEmail }
                    />
                  </InputGroup>

                   <InputGroup size="sm" className="mb-4" style={{ width: '80%'}}>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon3">
                        패스워드
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl id="basic-url" aria-describedby="basic-addon3"
                      readOnly={true}
                      style={{ width: '50px',backgroundColor: '#FFFFFF'}}
                      type="password"
                    />
                  </InputGroup>
                  
                
                </Card.Body>
            </Card>
            
            <Card border="dark" style={{ width: '80%', marginBottom:'10px'}}>
            <Card.Header>상세정보 
              <Button variant="secondary" size="sm" 
                              onClick={(e) => this.props.doEditUserBaseInfo()} 
                              style={{ marginRight: '10px', float:"right"}}>변경</Button>
            </Card.Header>
            <Card.Body >
                <InputGroup size="sm" className="mb-4" style={{ width:'80%'}}>
                  <InputGroup.Prepend >
                  <InputGroup.Text id="basic-addon3">
                        이름(영문)
                  </InputGroup.Text>
                  </InputGroup.Prepend>
                    <FormControl id="basic-url" aria-describedby="basic-addon3"
                      readOnly={this.props.readOnly}
                      defaultValue={this.props.userBaseInfo.nameEng}
                      style={{ width: '50px',backgroundColor: '#FFFFFF'}}
                      onChange = { this.changeHandlerNameEng }
                    />
                  </InputGroup>
                  
                  <InputGroup size="sm" className="mb-4" style={{ width: '80%'}}>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon3">
                        개인통관고유번호
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl id="basic-url" aria-describedby="basic-addon3"
                      readOnly={this.props.readOnly}
                      defaultValue={this.props.userBaseInfo.transitNr}
                      style={{ width: '50px', backgroundColor: '#FFFFFF'}}
                      onChange = { this.changeHandlerTransitNr }
                      />
                  </InputGroup>
                  <InputGroup size='sm' className="mb-3" style={{ width: '80%'}}>
                        <InputGroup.Prepend>
                          <InputGroup.Text id="basic-addon3">
                            연락처1
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl id="basic-url" aria-describedby="basic-addon3"
                          readOnly={this.props.readOnly}
                          defaultValue={this.props.userBaseInfo.phonenumberFirst}
                          style={{ width: '50px', marginRight:'1px', backgroundColor: '#FFFFFF'}}
                          onChange={this.changeHandlerPhonenumberFirst}
                        />
                        <InputGroup.Prepend >
                        <InputGroup.Text id="basic-addon3" >
                          연락처2
                        </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl id="basic-url" aria-describedby="basic-addon3"
                          readOnly={this.props.readOnly}
                          defaultValue={this.props.userBaseInfo.phonenumberSecond}
                          style={{ width: '50px', backgroundColor: '#FFFFFF'}}
                          onChange={this.changeHandlerPhonenumberSecond}
                        />
                  </InputGroup>
                  <InputGroup size='sm' className="mb-3" style={{ width: '80%'}}>
                        <InputGroup.Prepend>
                          <InputGroup.Text id="basic-addon3">
                            우편번호
                        </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl id="basic-url" aria-describedby="basic-addon3" 
                          readOnly={this.props.readOnly}
                          defaultValue={this.props.userBaseInfo.zipCode}
                          style={{ marginRight:'1px', backgroundColor: '#FFFFFF'}}
                          onChange={this.changeHandlerZipCode}
                        />
                        {/* <Button size='sm' variant='secondary' >우편번호 찾기</Button> */}
                  </InputGroup >

                  <InputGroup size='sm' className="mb-3" style={{ width: '80%'}}>
                        <InputGroup.Prepend>
                          <InputGroup.Text id="basic-addon3" style={{ width: '50px'}}>
                            주소
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl id="basic-url" aria-describedby="basic-addon3"
                          as="textarea" rows="2"
                          readOnly={this.props.readOnly}
                          defaultValue={this.props.userBaseInfo.address}
                          style={{backgroundColor: '#FFFFFF'}}
                          onChange={this.changeHandlerAddress} 
                        />
                  </InputGroup>
                   {/* 완료 및 저장버튼 */}
                  {saveButton}
                </Card.Body>
              </Card>
            
            </Card.Body>
          </Card>
        </div>
      );
    }    
}