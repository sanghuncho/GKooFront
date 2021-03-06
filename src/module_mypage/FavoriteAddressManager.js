import { SideNav, Nav as BaseNav} from "react-sidenav"
import styled from "styled-components"
import React, { Component } from 'react'
import { Icon as BaseIcon } from "react-icons-kit"
import {
  AppContainer as BaseAppContainer,
  ExampleNavigation as BaseNavigation,
} from "../container"
import { MyPageSideNav } from "./MyPageSideNav"
import { Breadcrumb, Card, Button } from "react-bootstrap"
import { AppNavbar, LogoutButton } from '../AppNavbar'
import { FavoriteAddressInputForm } from './FavoriteAddressInputForm'
import { get_log_message } from "../module_base_component/LogMessenger"
import { SearchPanel_ID } from '../module_base_component/BaseSearchPanel'

///// keycloak -> /////
import * as Keycloak from 'keycloak-js';
import { keycloakConfigLocal, headers, basePort, setTokenHeader, isAdmin } from "../module_base_component/AuthService"
var keycloak = Keycloak(keycloakConfigLocal);
///// <- keycloak /////

const AppContainer = styled(BaseAppContainer)`
  height: auto;
  min-height:calc(100vh);    
`;

const BodyContainer = styled(BaseAppContainer)`
  height:auto;
  min-height:calc(100vh);    
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

export class FavoriteAddressManager extends React.Component{

  constructor(props) {
    super(props);
    this.state = { 
      userid:'',
      active: null,
      keycloakAuth:null,
      accessToken:"",
      //image:null,
      //customerStatusData:'',
      //userAccount:'',
      //purchaseOrder:'',
      //orderInformation:'',
      //warehouseInformation:'',
      //trackingNumber:'1234',
    }
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
          this.setState({ keycloakAuth: keycloak, 
          accessToken:keycloak.token,
          userid:keycloak.tokenParsed.preferred_username,
          //관리자 체크
          isAdmin:isAdmin(keycloak.realmAccess)
        })
        get_log_message("FavoriteAddressManager", "userid", keycloak.tokenParsed.preferred_username)
      })
    }
    
    validToken(token){
      return token === "" ? false : true
    }

    getEmptyPage(){
      return ""
    }

    render() {
        const token = this.state.accessToken
        let addressManagerController;

        if(this.validToken(token)){
            addressManagerController = <AddressManagerController 
              accessToken={this.state.accessToken}
              userid={this.state.userid}
              //관리자 properties
              isAdmin={this.state.isAdmin}
             />
        } else {
            addressManagerController = this.getEmptyPage
        }
        return (
            <div>
              <AppNavbar>
                 <LogoutButton keycloak ={this.state.keycloakAuth}/>
              </AppNavbar>

              {addressManagerController}

            </div>
           
        );}           
}

export class AddressManagerController extends React.Component{
  constructor(props) {
      super(props);
    }
    
    render() {
      return (
        <div>
          <AppContainer>
      
          <MyPageSideNav/>
      
          <BodyContainer>
            <Breadcrumb style={{ width: '105%'}}>
              <Breadcrumb.Item active>마이페이지 / 배송지관리</Breadcrumb.Item>
            </Breadcrumb>

            {/* ToDo : userAccount name as mypagebody */}
            <AddressManagerWrapper 
              accessToken={this.props.accessToken}
              userid={this.props.userid}
              isAdmin={this.props.isAdmin}/>

        </BodyContainer>
        
        </AppContainer>
      </div>
      );
    }    
}

export class AddressManagerWrapper extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        doEdit:false,
        doAddAddress:false,
        showAddingAddressButton:true,
        showFavoriteAddressInputPanel:false,
        doLoadingFavoriteAddressInputPanel:false,
        favoriteAddressList:[],
        disableButtonAddingAddress:false,
        indexEditedFavoriteAddress:"",
        userid:this.props.userid
      }
      this.handleRemoveFavoriteAddressOnList = this.handleRemoveFavoriteAddressOnList.bind(this);
      this.handleOpenFavoriteAddressInputPanel = this.handleOpenFavoriteAddressInputPanel.bind(this);
      this.handleCloseAddingAddressPanel = this.handleCloseAddingAddressPanel.bind(this);
      this.handleEditingFavoriteAddressInputPanel = this.handleEditingFavoriteAddressInputPanel.bind(this)
      this.handleSearchChangeInput = this.handleSearchChangeInput.bind(this)
      this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount() {
    if(!this.props.isAdmin){
      //회원일 경우 데이터 로딩시작, 관리자는 search
      this.fetchFavoriteAddressList(this.props.accessToken)
    }
  }

  fetchFavoriteAddressList(accessToken){
    let userid = this.state.userid
    setTokenHeader(accessToken)
    fetch(basePort + '/getFavoriteAddressList/' + userid, {headers})
        .then((result) => {
           return result.json();
        }).then((data) => {
          this.setState( { favoriteAddressList: data} )
          console.log(data)
        })
  }

  deleteFavoriteAddress(accessToken, favoriteAddressId){
    const deletedAddressData =  [{favoriteAddressId: favoriteAddressId}]
    let userid = this.state.userid
    setTokenHeader(accessToken)
    fetch(basePort + '/deleteFavoriteAddress/' + userid, 
      {method:'post', headers, 
        body:JSON.stringify(deletedAddressData)})
    
    window.location.reload();
  }

  handleAddFavoriteAddressOnList(event){
      this.setState({
        favoriteAddressList:[...this.state.favoriteAddressList, ""],
      })
  }

  handleOpenFavoriteAddressInputPanel(event){
    this.setState({showFavoriteAddressInputPanel:true, disableButtonAddingAddress:true})
  }

  handleEditingFavoriteAddressInputPanel(index){
    this.setState({disableButtonAddingAddress:true, doLoadingFavoriteAddressInputPanel:true,
      indexEditedFavoriteAddress:index})
  }

  handleCloseAddingAddressPanel(event){
    this.setState({showFavoriteAddressInputPanel:false, 
        disableButtonAddingAddress:false, 
        doLoadingFavoriteAddressInputPanel:false})
  }

  handleRemoveFavoriteAddressOnList(index){
    var favoriteAddressId = this.state.favoriteAddressList[index].id
    this.deleteFavoriteAddress(this.props.accessToken, favoriteAddressId)
  }

  handleSearch(){
    if(this.state.userid === ''){
      this.setState({favoriteAddressList:[]})
    } else {
      this.fetchFavoriteAddressList(this.props.accessToken)
    }
  }

  handleSearchChangeInput(event){
    this.setState({userid:event.target.value})
    console.log(event.target.value)
  }
    
  render() {
      const showAddingAddressButton = this.state.showAddingAddressButton
      let addAddressButton;
      if(showAddingAddressButton) {
        addAddressButton = 
        <Button variant="secondary" size="sm" 
        disabled = {this.state.disableButtonAddingAddress}
        onClick={(e) => this.handleOpenFavoriteAddressInputPanel(e)} 
        style={{ marginRight: '10px', float:"right"}}>배송지 추가</Button>
      }
      
      const sizeOnList = this.state.favoriteAddressList.length
      const showFavoriteAddressInputPanel = this.state.showFavoriteAddressInputPanel
      const doLoadingFavoriteAddressInputPanel = this.state.doLoadingFavoriteAddressInputPanel
      let intro
      let heightAddressManager
        if(sizeOnList == 0 & showFavoriteAddressInputPanel == false) {
          intro = <div>배송지 추가버튼으로 자주 이용하는 주소를 등록하실수 있습니다.</div>
          heightAddressManager = '11rem'
          console.log(sizeOnList)
        } else {
          heightAddressManager = 6 + 15*sizeOnList + 'rem'
        }
      
      let addingAddressPanel
        if(showFavoriteAddressInputPanel){
          heightAddressManager = 35 + 15*sizeOnList + 'rem'
          addingAddressPanel = 
            <AddingAddressPanel 
              handleCloseAddingAddressPanel={this.handleCloseAddingAddressPanel}    
              accessToken={this.props.accessToken}
              favoriteAddressData = {""}
              userid={this.props.userid}
              />
        } else if(doLoadingFavoriteAddressInputPanel){
          const indexEdited = this.state.indexEditedFavoriteAddress
          heightAddressManager = 35 + 15*sizeOnList + 'rem'
          addingAddressPanel = 
            <EditingAddressPanel 
              handleCloseAddingAddressPanel={this.handleCloseAddingAddressPanel} 
              favoriteAddressData = {this.state.favoriteAddressList[indexEdited]}
              accessToken={this.props.accessToken}
              userid={this.props.userid}
              />
        }

        let searchPane
        if(this.props.isAdmin){
          searchPane = <SearchPanel_ID 
                          handleSearchChangeInput={this.handleSearchChangeInput}
                          handleSearch={this.handleSearch}/>
        }
      return (
        <div>
          <Card border="dark" style={{ width: '80%', height:heightAddressManager, marginTop:'1rem' }}>
                <Card.Header>배송지 관리
                  {addAddressButton}
                </Card.Header>
                <Card.Body >
                   {/* 관리자모드 */}
                  {searchPane}
                  
                  {intro}

                  {addingAddressPanel}

                  {this.state.favoriteAddressList.map((itemName, index) => { return (
                    <div key={index}>
                      <FavoriteAddress
                        index={index}
                        favoriteAddressData = {this.state.favoriteAddressList[index]}
                        handleRemoveFavoriteAddressOnList={this.handleRemoveFavoriteAddressOnList}
                        handleEditingFavoriteAddressInputPanel={this.handleEditingFavoriteAddressInputPanel}
                      />
                    </div>
                  )})}

                </Card.Body>
              </Card>
        </div>
      );
    }    
}

export class FavoriteAddress extends React.Component{
  constructor(props) {
      super(props);
    }

  componentDidMount() {
     console.log(this.props.index)
  }
    
  render() {
      const index = this.props.index
      return (
        <div>
          <Card border="dark" style={{ width: '60%', marginBottom:'1rem'}}>
          {/* <Card.Header></Card.Header> */}
            <Card.Body >
              <Card.Title style={{ fontSize:'1rem'}} >이름: {this.props.favoriteAddressData.nameKor} {this.props.favoriteAddressData.nameEng}</Card.Title>
              <Card.Title style={{ fontSize:'1rem'}} >전화번호: {this.props.favoriteAddressData.phonenumberFirst} {this.props.favoriteAddressData.phonenumberSecond}</Card.Title>
              <Card.Title style={{ fontSize:'1rem'}} >개인통관고유번호: {this.props.favoriteAddressData.transitNr} </Card.Title>
              <Card.Subtitle></Card.Subtitle>
              <Card.Text>
                주소: {this.props.favoriteAddressData.zipCode} {this.props.favoriteAddressData.address}
              </Card.Text>
              <Button variant="outline-secondary" size="sm" 
                      style={{ marginRight: '10px', float:"right"}}
                      onClick={() => this.props.handleEditingFavoriteAddressInputPanel(index)}
                      >수정
              </Button>
              <Button variant="outline-secondary" size="sm" 
                      style={{ marginRight: '10px', float:"right"}}
                      onClick={() => this.props.handleRemoveFavoriteAddressOnList(index)}
                      >삭제
              </Button>
            </Card.Body>
          </Card>
        </div>
      );
    }    
}

{/* 배송지 추가 */}
class AddingAddressPanel extends React.Component{
  constructor(props) {
      super(props);
    }
    
    render() {
      return (
        <div>
          <FavoriteAddressInputForm
            handleCancel={this.props.handleCloseAddingAddressPanel}
            handleOpenFavoriteAddressInputPanel={this.props.handleOpenFavoriteAddressInputPanel}
            saveType={"CREATE"}
            accessToken={this.props.accessToken}
            favoriteAddressData={this.props.favoriteAddressData}
            userid={this.props.userid}
            />
        </div>
      );
    }    
}

{/* 배송지 수정 */}
class EditingAddressPanel extends React.Component{
  constructor(props) {
      super(props);
    }
    
    render() {
      return (
        <div>
          <FavoriteAddressInputForm
            handleCancel={this.props.handleCloseAddingAddressPanel}
            handleOpenFavoriteAddressInputPanel={this.props.handleOpenFavoriteAddressInputPanel}
            saveType={"UPDATE"}
            accessToken={this.props.accessToken}
            userid={this.props.userid}
            favoriteAddressData={this.props.favoriteAddressData}
            />
        </div>
      );
    }    
}