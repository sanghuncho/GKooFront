import * as React from "react";

export class TransportShippingRequest extends React.Component {
    constructor(props, context) {
        super(props, context);
      }

    
    render() {
      if (this.props.serviceCall){

          console.log("Transport shopurl: " + this.props.shopUrl)
          console.log("Transport easyship: " + this.props.easyShip)
          console.log("Transport trackingTitle: " + this.props.trackingTitle)
          console.log("Transport trackingNumber: " + this.props.trackingNumber)
          console.log("Transport categoryTitle: " + this.props.categoryTitle)
          console.log("Transport itemTitle: " + this.props.itemTitle)
          console.log("Transport brandName: " + this.props.brandName) 
          console.log("Transport itemName: " + this.props.itemName) 
          console.log("Transport totalPrice: " + this.props.totalPrice) 
          console.log("Transport receiverNameByKorea: " + this.props.receiverNameByKorea) 
          console.log("Transport receiverNameByEnglish: " + this.props.receiverNameByEnglish) 
        }
      return(
          <div>
              
          </div>
      );}
  }
  
  export default TransportShippingRequest;