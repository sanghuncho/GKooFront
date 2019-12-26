import * as React from "react";
import { headers, basePort } from "../module_mypage/AuthService"


export class TransportShippingRequest extends React.Component {
    constructor(props, context) {
        super(props, context);
      }

      createShippingService(contents){
        const token = this.props.accessToken
        this.setTokenHeader(token)
        fetch(basePort + '/createshippingservice', 
                {method:'post', headers, 
                  body:JSON.stringify(contents)})
                .then((result) => { return result;}).then((contents) => {
            console.log(contents)
           }).catch(err => err);
      }

      setTokenHeader(token){
        headers ['Authorization'] = 'Bearer ' + token;
      }

    render() {
        
        if (this.props.applyDeliveryService){

        // console.log("Transport shopurl: " + this.props.shopUrl)
        // console.log("Transport shopurlList: " + this.props.shopUrlList)
        // console.log("Transport easyship: " + this.props.easyShip)

        // console.log("Transport trackingTitle: " + this.props.trackingTitle)
        // console.log("Transport trackingTitleList: " + this.props.trackingTitleList)

        // console.log("Transport trackingNumber: " + this.props.trackingNumber)
        // console.log("Transport categoryTitle: " + this.props.categoryTitle)

        // console.log("Transport itemTitle: " + this.props.itemTitle)
        // console.log("Transport brandName: " + this.props.brandName) 
        // console.log("Transport itemName: " + this.props.itemName) 
        // console.log("Transport totalPrice: " + this.props.totalPrice) 
          
        // console.log("Transport receiverNameByKorea: " + this.props.receiverNameByKorea) 
        // console.log("Transport setOwnerContent: " + this.props.setOwnerContent) 
        // console.log("Transport receiverNameByEnglish: " + this.props.receiverNameByEnglish) 
          
        // console.log("Transport privateTransit: " + this.props.privateTransit) 
        // console.log("Transport transitNumber: " + this.props.transitNumber)
        // console.log("Transport agreeWithCollection: " + this.props.agreeWithCollection)
          
        // console.log("Transport callNumberFront: " + this.props.callNumberFront)
        // console.log("Transport callNumberMiddle: " + this.props.callNumberMiddle)
        // console.log("Transport callNumberRear: " + this.props.callNumberRear)  
          
        // console.log("Transport postCode: " + this.props.postCode)  
        // console.log("Transport DeliveryAddress: " + this.props.deliveryAddress)  
        // console.log("Transport DetailAddress: " + this.props.detailAddress)
        // console.log("Transport deliveryMessage: " + this.props.deliveryMessage)  
        //console.log("Transport deliveryMessage: " + this.props.productObjectList)   
       
        const contents = [{shopUrl: this.props.shopUrl}, 
                          {easyship:this.props.easyShip},

                          {trackingTitle:this.props.trackingTitle},
                          {trackingNumber:this.props.trackingNumber},
                          {categoryTitle:this.props.categoryTitle},

                          {itemTitle:this.props.itemTitle},
                          {brandName:this.props.brandName},
                          {itemName:this.props.itemName},
                          
                          {totalPrice:this.props.totalPrice},

                          {receiverNameByKorea:this.props.receiverNameByKorea},
                          {setOwnerContent:this.props.setOwnerContent},
                          {receiverNameByEnglish:this.props.receiverNameByEnglish},

                          {privateTransit:this.props.privateTransit},
                          {transitNumber:this.props.transitNumber},
                          {agreeWithCollection:this.props.agreeWithCollection},

                          {phonenumberFirst:this.props.phonenumberFirst},
                          {phonenumberSecond:this.props.phonenumberSecond},

                          {postCode:this.props.postCode},
                          {deliveryAddress:this.props.deliveryAddress},
                          {deliveryMessage:this.props.deliveryMessage},
                          //{shopUrlList: this.props.shopUrlList}     
                          {shopUrlList: JSON.stringify(this.props.shopUrlList)}     
                        ]

                        const contentNewConstruct = [
                          {easyship:this.props.easyShip},

                          {deliveryDataObject: JSON.stringify(this.props.deliveryObject)},     
                          {shippingProductList: JSON.stringify(this.props.shippingProductList)},
                          
                          {receiverNameByKorea:this.props.receiverNameByKorea},
                          {setOwnerContent:this.props.setOwnerContent},
                          {receiverNameByEnglish:this.props.receiverNameByEnglish},

                          {privateTransit:this.props.privateTransit},
                          {transitNumber:this.props.transitNumber},
                          {agreeWithCollection:this.props.agreeWithCollection},

                          {phonenumberFirst:this.props.phonenumberFirst},
                          {phonenumberSecond:this.props.phonenumberSecond},

                          {postCode:this.props.postCode},
                          {deliveryAddress:this.props.deliveryAddress},
                          {deliveryMessage:this.props.deliveryMessage},
                        ]
        

        console.log(JSON.stringify(contentNewConstruct))
        //this.createShippingService(contents)
        this.createShippingService(contentNewConstruct)
        this.props.finishService()
    }
      return(
        //without GUI
          <div>
              
          </div>
      );}
  }
  
  export default TransportShippingRequest;