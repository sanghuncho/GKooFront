import styled from "styled-components";
import React from 'react';
import { Card, Form } from 'react-bootstrap';


{/* 서비스 신청시 주의사항 */}
export class ServiceNoticeBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            agreement:false,
        }
    }
      
    render() {
        let notice
        let noticeLabel
        const service = this.props.service
        if (service === 'ShippingService'){
            notice = <ShippingServiceNotice/>
            noticeLabel = SHIPPING_LABEL
        } else if (service === "BuyingService"){
            notice = <BuyingServiceNotice/>
            noticeLabel = BUYING_LABEL
        }

        return (
          <div>
               <Card border="dark" style={{ width: '80%', height:'20rem', marginTop:'1rem'}}>
                    <Card.Header>서비스 신청시 주의사항</Card.Header>
                        {notice}
                    <Card.Footer> 
                        <Form.Check style={{fontSize:'15px'}} type='checkbox' 
                        onChange={e => this.props.handleChangeOnCheckbox(e)} 
                        label={noticeLabel}/>
                    </Card.Footer>
                </Card>
          </div>
        );
      }    
}

const BUYING_LABEL = '주의사항을 모두 확인하였으며, 위의 내용에 동의하고 구매대행을 신청합니다.'
{/* 구매대행 서비스 신청시 주의사항 */}
function BuyingServiceNotice(props) {
  
    return (
      <div>
        <Card.Body style={{'height': '210px','overflow-y': 'scroll', fontSize:'14px'}}>
            <Card.Text>1. 지쿠 구매대행 신청서에 기재된 모든 내용은 통관시 세관에 신고되므로 허위로 작성하실 수 없습니다.</Card.Text>
            <Card.Text>2. 지쿠는 나눔배송 또는 분할배송 서비스를 제공하지 않습니다.</Card.Text>
            <Card.Text>3. 한곳의 쇼핑몰에서 한번에 여러 개의 상품을 주문한 경우에는 하나의 구매대행 신청서에 모두 등록하여야 합니다. 
                이때에는 상품들이 나뉘어 입고되어도 지쿠에서 한 박스로 포장 후 배송 중량 및 해외운송료를 책정합니다.</Card.Text>
            <Card.Text>4. 지쿠는 수입이 금지되어 있는 상품이나 선적이 불가능한 상품의 구매로 인해 발생하는 고객의 불이익은 책임지지 않습니다.</Card.Text>
            <Card.Text>5. 구매대행 신청서의 상품이 모두 입고완료된 이후에는 상품정보(상품명, 수량, 단가, 트래킹번호)를 수정하거나 삭제할 수 없습니다.</Card.Text>
            <Card.Text>6. 구매대행 신청서의 상품 중 일부라도 입고된 이후 부터는 묶음배송 신청이나, 묶음배송 건 해제가 불가능 합니다.</Card.Text>
            <Card.Text>7. 구매대행 상품의 입고지를 선택하여 신청서를 작성한 후에는 입고지 변경이 불가능 합니다.</Card.Text>
        </Card.Body>
      </div>
    );
}

{/* 배송대행 서비스 신청시 주의사항 */}
const SHIPPING_LABEL = '주의사항을 모두 확인하였으며, 위의 내용에 동의하고 배송대행을 신청합니다.'
function ShippingServiceNotice(props) {
  
    return (
      <div>
         <Card.Body style={{'height': '210px','overflow-y': 'scroll', fontSize:'14px'}}>
            <Card.Text>1. 지쿠 배송대행 신청서에 기재된 모든 내용은 통관시 세관에 신고되므로 허위로 작성하실 수 없습니다.</Card.Text>
            <Card.Text>2. 지쿠는 나눔배송 또는 분할배송 서비스를 제공하지 않습니다.</Card.Text>
            <Card.Text>3. 한곳의 쇼핑몰에서 한번에 여러 개의 상품을 주문한 경우에는 하나의 배송대행 신청서에 모두 등록하여야 합니다. 
                이때에는 상품들이 나뉘어 입고되어도 지쿠에서 한 박스로 포장 후 배송 중량 및 해외운송료를 책정합니다.</Card.Text>
            <Card.Text>4. 지쿠는 수입이 금지되어 있는 상품이나 선적이 불가능한 상품의 구매로 인해 발생하는 고객의 불이익은 책임지지 않습니다.</Card.Text>
            <Card.Text>5. 배송대행 신청서의 상품이 모두 입고완료된 이후에는 상품정보(상품명, 수량, 단가, 트래킹번호)를 수정하거나 삭제할 수 없습니다.</Card.Text>
            <Card.Text>6. 배송대행 신청서의 상품 중 일부라도 입고된 이후 부터는 묶음배송 신청이나, 묶음배송 건 해제가 불가능 합니다.</Card.Text>
            <Card.Text>7. 배송대행 상품의 입고지를 선택하여 신청서를 작성한 후에는 입고지 변경이 불가능 합니다.</Card.Text>
        </Card.Body>
      </div>
    );
  }