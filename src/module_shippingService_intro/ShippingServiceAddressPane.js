import styled from "styled-components";
import React from 'react';
import { Table, Card, Breadcrumb } from "react-bootstrap"
import { AppNavbar } from '../AppNavbar'
import { BodyContainer, ShippingServiceNavbar } from './ShippingService'
import {
    AppContainer as BaseAppContainer,
    BaseNavigation,
  } from "../container";
import { deliveryMapGer } from "../Config"

{/* ShippingServiceAddressPanel CSS */}
const ShippingServiceAddressPanelContainer = styled(BaseAppContainer)`
  height: calc(250vh);
`;

export class ShippingServiceAddressPane extends React.Component{
    constructor(props) {
        super(props);
      }
      
      render() {
        return (
          <div>
              <AppNavbar/>
                <ShippingServiceAddressPanelContainer>
                    
                    <ShippingServiceNavbar/>
                    
                    <BodyContainer>
                      <Breadcrumb style={{ width: '100%'}}>
                        <Breadcrumb.Item active>배송대행 / 배송주소 안내</Breadcrumb.Item>
                      </Breadcrumb>

                      <ShippingServiceAddressTable/>
                    </BodyContainer>
                </ShippingServiceAddressPanelContainer>
          </div>
        );
      }    
}

export class ShippingServiceAddressTable extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
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
                <td width='250px' align='left'>{deliveryMapGer.get("company")} 개인사서함번호 
                  <br/>(e.g {deliveryMapGer.get("company")} GK101010)
                </td>
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