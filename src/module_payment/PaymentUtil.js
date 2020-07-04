import * as React from "react";
import { getFormattedDeliveryPrice } from '../module_base_component/BaseUtil'

export function PaymentArtToInt(paymentArt){
    let art
    switch (paymentArt) {
      case "선택":
        art = 0;
        break;
      case "무통장입금":
        art = 1;
        break;
      case "카드결제":
        art = 2;
        break;
    }

    return art
}

{/* 결제수단 */}
export const PAYMENT_ART_LIST = [
  "무통장입금",
  "카드결제(준비중)", 
]

export function PaymentArtToString(paymentArt){
  let art
  switch (paymentArt) {
    case 0:
      art = "선택";
      break;
    case 1:
      art = "무통장입금";
      break;
    case 2:
      art = "카드결제(준비중)";
      break;
  }

  return art
}

export function PaymentStateToString(paymentState){
  let state
  switch (paymentState) {
    case 2:
    state = "결제확인중";
      break;
    case 3:
    state = "결제완료";
      break;
  }

  return state
}

export function currencyFormatter(cell, row) {        
  return (
    <KoreaCurrencyFormatter cell={cell}/>
  );
}

export class KoreaCurrencyFormatter extends React.Component {
  constructor(props) {
      super(props);
    }
    
    render() {
      let formattedPrice = getFormattedDeliveryPrice(this.props.cell)

      return (
        <div>
          {formattedPrice}
       </div>
      );
    }    
}