import styled from "styled-components";
import React from 'react';
import { Route, Switch, NavLink } from "react-router-dom";
import { WarehouseStandby } from "./WarehouseStandby" 
import { WarehouseArrival } from "./WarehouseArrival" 

export class WarehouseController extends React.Component{
    constructor(props) {
        super(props);
      }
      
      
      render() {

        return (
          <div>
            {/* 입고대기 */}
            <WarehouseStandby warehouseCommonStates={this.props.warehouseCommonStates}/>

            {/* 결제대기 */}
            <WarehouseArrival warehouseCommonStates={this.props.warehouseCommonStates}/>
          </div>
        );
      }    
}