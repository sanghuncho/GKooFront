import * as React from "react";
import { headers, basePort, setTokenHeader } from "../module_mypage/AuthService"


export class TransportShippingRequest extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    createShippingService(contents){
        const token = this.props.accessToken
        setTokenHeader(token)
        fetch(basePort + '/createshippingservice', 
                {method:'post', headers, 
                  body:JSON.stringify(contents)})
                .then((result) => { return result;}).then((contents) => {
            console.log(contents)
           }).catch(err => err);
    }

    registerFavoriteAddress(contents){
      const token = this.props.accessToken
      setTokenHeader(token)
      fetch(basePort + '/registerFavoriteAddress', 
                {method:'post', headers, 
                  body:JSON.stringify(contents)})
                .then((result) => { return result;}).then((contents) => {
            console.log(contents)
           }).catch(err => err);
    }

    buildFavoriteAddressData(){
      var favoriteAddressObject = {
        nameKor:this.props.receiverNameByKorea,
        nameEng:this.props.receiverNameByEnglish,
        transitNr:this.props.transitNumber,
        phonenumberFirst:this.props.phonenumberFirst,
        phonenumberSecond:this.props.phonenumberSecond,
        zipCode:this.props.postCode,
        address:this.props.deliveryAddress,
      }

      const favoriteAddressData =  [
        {favoriteAddressData: JSON.stringify(favoriteAddressObject)}
      ]
      console.log(favoriteAddressData)
      return favoriteAddressData
    }

    buildShippingServiceData(){
      const shippingServiceData = [
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
      return shippingServiceData
    }

    render() {
      if (this.props.applyDeliveryService){
        const shippingServiceData = this.buildShippingServiceData()
        this.createShippingService(shippingServiceData)
        this.props.finishService()
        if(this.props.registerFavoriteAddress){
          const favoriteAddress = this.buildFavoriteAddressData()
          this.registerFavoriteAddress(favoriteAddress)
        }
      }
      return(
        //without GUI
          <div>
              
          </div>
      );}
  }
  
  export default TransportShippingRequest;