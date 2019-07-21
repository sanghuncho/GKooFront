import styled from "styled-components";
import React from 'react';
import { Route, Switch, NavLink } from "react-router-dom";
import { ManagementBase } from "../management/ManagementBase"
import { WarehouseController } from './WarehouseController'
import * as Keycloak from 'keycloak-js';
import { keycloakConfigLocal, headers, basePort } from "../module_mypage/AuthService"

var keycloak = Keycloak(keycloakConfigLocal);

export class ManagementController extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          warehouseCommonStates:'',
          accessToken:''
        };
      }

      componentDidMount() {
        keycloak.init({onLoad: 'login-required'}).success(() => {
            this.setState({ keycloakAuth: keycloak, 
            accessToken:keycloak.token})
            this.fetchWarehouseCommonStates(keycloak.token)
           
        })
      }

      fetchWarehouseCommonStates(token){
        this.setTokenHeader(token)
        fetch(basePort + '/warehousecommonstates', {headers})
        .then((result) => {
           return result.json();
        }).then((data) => {
          this.setState( { warehouseCommonStates: data} )
          console.log(data)
        }) 
      }
      
      setTokenHeader(token){
        headers ['Authorization'] = 'Bearer ' + token;
      }

      render() {
        return (
          <div>
            <ManagementBase warehouse = {<WarehouseController/>} />
          </div>
        );
      }   
}