import styled from "styled-components";
import React from 'react';
import { Table, Card } from "react-bootstrap"
import { AppNavbar, LogoutButton } from '../AppNavbar'
import { BodyContainer } from './MyPage'
import { MyPageSideNav } from './MyPageSideNav'
import {
    AppContainer as BaseAppContainer,
    BaseNavigation,
  } from "../container";
import { deliveryMapGer } from "../Config"

///// keycloak -> /////
import * as Keycloak from 'keycloak-js';
import { keycloakConfigLocal, basePort, headers, setTokenHeader } from "../module_base_component/AuthService"
var keycloak = Keycloak(keycloakConfigLocal);
///// <- keycloak /////

{/* MyPageShippingAddressPane CSS */}
const MyPageShippingAddressPaneContainer = styled(BaseAppContainer)`
  height: calc(250vh);
`;

export class MyPageShippingAddressPane extends React.Component{
    constructor(props) {
        super(props);
        this.state = { 
          keycloakAuth:null,
          accessToken:"",
          userid:'',
          customerStatus:'',
        };
      }
    componentDidMount() {
        keycloak.init({onLoad: 'login-required'}).success(() => {
            this.setState({ keycloakAuth: keycloak, accessToken:keycloak.token, 
                userid:keycloak.tokenParsed.preferred_username})
            this.fetchPersonalBoxAddress(keycloak.token)
        })
    }

    fetchPersonalBoxAddress(token){
      let userid = this.state.userid
      setTokenHeader(token)
      fetch(basePort + '/getPersonalBoxAddress/'+ userid, {headers})
        .then((result) => {
           return result.json();
        }).then((data) => {
          this.setState({customerStatus: data})
          console.log(data.personalBoxAddress)
        })
    }
      
      render() {
        return (
          <div>
              <AppNavbar>
                 <LogoutButton keycloak ={this.state.keycloakAuth}/>
              </AppNavbar>
                <MyPageShippingAddressPaneContainer>
                    
                    <MyPageSideNav/>
                    
                    <BodyContainer>
                      <ShippingAddressTable customerStatus={this.state.customerStatus}/>
                    </BodyContainer>
                </MyPageShippingAddressPaneContainer>
          </div>
        );
      }    
}

export class ShippingAddressTable extends React.Component {
  constructor(props) {
    super(props);
    
  }
  
  render() {
    let personalBoxAddress
    if (this.props.customerStatus === '') {
      personalBoxAddress = deliveryMapGer.get("company") + ' 개인사서함번호 (e.g GK101010)'
    } else {
      personalBoxAddress = this.props.customerStatus.personalBoxAddress
    }
    return (
      <div>
          <Card border="dark" style={{ width: '50%', height:'21rem', marginTop:'1rem', marginLeft:'1rem' }}>
            <Card.Header>독일 배송대행 주소안내 (개인사서함)
            </Card.Header>
            <Card.Body >
            <Table bordered condensed responsive size="sm">
            <thead>
            </thead>
            <tbody>
              <tr>  
                <td width='300px'>Vorname Nachname</td>
                <td width='250px' align='left'>{deliveryMapGer.get("company")} {personalBoxAddress}</td>
              </tr>
              <tr>
                <td>Anschrift (Firma, c/o)</td>
                <td align='left'>{deliveryMapGer.get("company")}</td>
              </tr>
              <tr>
                <td>Anschrift (Strasse und Hausnummer)</td>
                <td align='left'>{deliveryMapGer.get("street")}</td>
              </tr>
              <tr>
                <td>Anschrift (Postleitzahl)</td>
                <td align='left'>{deliveryMapGer.get("plz")}</td>
              </tr>
              <tr>
                <td>Stadt</td>
                <td align='left'>{deliveryMapGer.get("city")}</td>
              </tr>
              <tr>
                <td>Bundesland</td>
                <td align='left'>{deliveryMapGer.get("federal_state")}</td>
              </tr>
              <tr>
                <td>Land</td>
                <td align='left'>{deliveryMapGer.get("land")}</td>
              </tr>
            </tbody>
          </Table>
          </Card.Body>
          </Card> 
      </div>
    );
  }
}