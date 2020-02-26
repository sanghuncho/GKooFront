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
  "카드결제", 
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
      art = "카드결제";
      break;
  }

  return art
}