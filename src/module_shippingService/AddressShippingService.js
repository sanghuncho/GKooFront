import * as React from "react";
import { ShippingService } from "../ShippingService";
import styled from "styled-components";
import {
    AppContainer as BaseAppContainer,
  } from "../container";
const AppContainer = styled(BaseAppContainer)`
  height: calc(150vh);
`;

export class AddressShippingService extends React.Component {
  render() {
    return(
        <div>
            <AppContainer>
                <ShippingService/>
                    Address
            </AppContainer>
        </div>
    );}
}

export default RequestShippingService;