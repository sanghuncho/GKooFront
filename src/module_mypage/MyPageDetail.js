import styled from "styled-components";
import React from 'react';
import { MyPageSideNav } from "./MyPageSideNav";
import { AppContainer as BaseAppContainer } from "../container";
import { Table, Card, Breadcrumb, Form } from "react-bootstrap"
import { MyPageDetailDeliveryPrice } from "./MyPageDetailDeliveryPrice";

const AppContainer = styled(BaseAppContainer)`
  height: auto;
`;

const BodyContainer = styled(BaseAppContainer)`
  height:auto;
  flex-direction: column;
`;

const UserAccountTableStyle = styled.div`
  margin-top: 25px;
  margin-left:5%; 
  margin-right:15%;
  width: 1100px;
  background: #FFFFFF;
  padding: 0px 5px 5px 5px;
  box-shadow: 2px 2px 3px 3px #888; 
  font-size: 13px;
`;

export class MyPageDetail extends React.Component{
    constructor(props) {
        super(props);
      }
      
      render() {
        return (
          <div>
          <AppContainer>
            <MyPageSideNav/>
            
            <BodyContainer>

              {/* 주문자정보 */}
              <MyPageDetailWrapper/>
            
            </BodyContainer>
          </AppContainer>
          </div>
        );
      }    
}

class MyPageDetailWrapper extends React.Component{
    constructor(props) {
        super(props);
      }
      
      render() {
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item active>마이페이지</Breadcrumb.Item>
                    <Breadcrumb.Item active>주문 상세정보</Breadcrumb.Item>
                </Breadcrumb> 
                
                {/* 주문자정보 */}
                <MyPageDetailPerson/>

                {/* 수취인정보 */}
                <MyPageDetailRecipient/>

                {/* 배송료결제정보 */}
                <MyPageDetailDeliveryPrice/>

                {/* 배송상태 */}
                <MyPageDetailState/>

                {/* 상품정보 */}
                <MyPageDetailProducts/>

                {/* 총액정보 */}
                <MyPageDetailProductPrice/>
          </div>
        );
      }    
}

class MyPageDetailState extends React.Component{
    constructor(props) {
        super(props);
      }
      
      render() {
        return (
          <div>
              <Card border="dark" style={{ width: '100%', height:'8rem', marginTop:'1rem', marginBottom:'1rem' }}>
                <Card.Header>서비스현황</Card.Header>
                <Card.Body>
                    <Card.Text>
                        배송중
                    </Card.Text> 
                </Card.Body>
                {/* <Card.Footer>
                </Card.Footer> */}
                </Card>
          </div>
        );
      }    
}

class MyPageDetailProductPrice extends React.Component{
    constructor(props) {
        super(props);
      }
      
      render() {
        return (
          <div>
               <Card border="dark" style={{ width: '100%', height:'10rem', marginTop:'1rem', marginBottom:'1rem' }}>
                <Card.Header>주문금액</Card.Header>
                <Card.Body>
                <Table bordered condensed responsive size="sm">
                      <thead>
                          {/* 상품 */}
                      </thead>
                      <tbody>
                      <tr>
                          <td width='300px'>현지배송비</td>
                          <td width='300px'>30Euro</td>
                      </tr>
                      <tr>
                          <td width='300px'>총 구매금액</td>
                          <td width='300px'>100Euro</td>
                      </tr>
                      </tbody>
                  </Table>
                </Card.Body>
                {/* <Card.Footer>
                </Card.Footer> */}
                </Card>
          </div>
        );
      }    
}

class MyPageDetailProducts extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            productsList:[1,2]
        }

      }
      
      render() {
        return (
          <div>
              <Card border="dark" style={{ width: '100%', height:'40rem', marginTop:'1rem', marginBottom:'1rem' }}>
                <Card.Header>상품 정보</Card.Header>
                <Card.Body>
                {this.state.productsList.map((itemName, index) => { return (
                    <div key={index}>
                    <MyPageDetailProduct/>
                    </div>
                )})}
                </Card.Body>
                {/* <Card.Footer>
                </Card.Footer> */}
                </Card>
          </div>
        );
      }    
}

class MyPageDetailProduct extends React.Component{
    constructor(props) {
        super(props);
      }
      
      render() {
        return (
          <div>
              <Table bordered condensed responsive size="sm">
                    <thead>
                        {/* 상품 */}
                    </thead>
                    <tbody>
                    <tr>
                        <td width='300px'>상품</td>
                        <td width='300px'>1</td>
                    </tr>
                    <tr>
                        <td width='300px'>카테고리</td>
                        <td width='300px'>전자</td>
                    </tr>
                    <tr>
                        <td>품목</td>
                        <td>스피커</td>
                    </tr>
                    <tr>
                        <td>브랜드</td>
                        <td>삼성</td>
                    </tr>
                    <tr>
                        <td>상품명</td>
                        <td>Samsung</td>
                    </tr>
                    <tr>
                        <td>수량</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>단가</td>
                        <td>35000원</td>
                    </tr>
                    </tbody>
                </Table>
          </div>
        );
      }    
}

// export class MyPageDetailDeliveryPrice extends React.Component{
//     constructor(props) {
//         super(props);
//       }
      
//       render() {
//         return (
//           <div>
//               <Card border="dark" style={{ width: '100%', height:'20rem', marginTop:'1rem', marginBottom:'1rem' }}>
//                 <Card.Header>운송료 결제정보</Card.Header>
//                 <Card.Body >
//                 <Table bordered condensed responsive size="sm">
//                     <thead>
//                     </thead>
//                     <tbody>
//                     <tr>
//                         <td width='400px'>결제번호</td>
//                         <td width='400px'>111</td>
//                         {/* <td width='250px' align='right'>gkoo-{this.props.customerBaseInfo.customerId}</td> */}
//                     </tr>
//                     <tr>
//                         <td>결제일자</td>
//                         <td>2019.04.05</td>
//                     </tr>
//                     <tr>
//                         <td>무게정보</td>
//                         <td>54321</td>
//                     </tr>
//                     <tr>
//                         <td>해외배송비</td>
//                         <td>35000원</td>
//                     </tr>
//                     <tr>
//                         <td>합배송비/기타수수료</td>
//                         <td>0원</td>
//                     </tr>
//                     <tr>
//                         <td>총 결제금액</td>
//                         <td>35000원</td>
//                     </tr>
//                     <tr>
//                         <td>결제수단</td>
//                         <td>무통장입금</td>
//                     </tr>
//                     </tbody>
//                 </Table>
//                 </Card.Body>
//                 {/* <Card.Footer>
//                 </Card.Footer> */}
//                 </Card>
//           </div>
//         );
//       }    
// }

class MyPageDetailPerson extends React.Component{
    constructor(props) {
        super(props);
      }
      
      render() {
        return (
          <div>
              <Card border="dark" style={{ width: '100%', height:'17rem', marginTop:'1rem' }}>
                <Card.Header>주문자 정보</Card.Header>
                <Card.Body >
                <Table bordered condensed responsive size="sm">
                    <thead>
                    </thead>
                    <tbody>
                    <tr>
                        <td width='400px'>주문자명</td>
                        <td width='400px'>조상훈</td>
                        {/* <td width='250px' align='right'>gkoo-{this.props.customerBaseInfo.customerId}</td> */}
                    </tr>
                    <tr>
                        <td>물류센터</td>
                        <td>독일</td>
                    </tr>
                    <tr>
                        <td>서비스신청번호</td>
                        <td>54321</td>
                    </tr>
                    <tr>
                        <td>트래킹번호</td>
                        <td>123456</td>
                    </tr>
                    <tr>
                        <td>쇼핑몰 URL</td>
                        <td>www.gkoo.de</td>
                    </tr>
                    </tbody>
                </Table>
                </Card.Body>
                {/* <Card.Footer>
                </Card.Footer> */}
                </Card>
          </div>
        );
      }    
}

class MyPageDetailRecipient extends React.Component{
    constructor(props) {
        super(props);
      }
      
      render() {
        return (
          <div>
              <Card border="dark" style={{ width: '100%', height:'17rem', marginTop:'1rem' }}>
                <Card.Header>수취인 정보</Card.Header>
                <Card.Body >
                <Table bordered condensed responsive size="sm">
                    <thead>
                    </thead>
                    <tbody>
                    <tr>
                        <td width='400px'>받는분</td>
                        <td width='400px'>조성준</td>
                        {/* <td width='250px' align='right'>gkoo-{this.props.customerBaseInfo.customerId}</td> */}
                    </tr>
                    <tr>
                        <td>연락처</td>
                        <td>017665224205</td>
                    </tr>
                    <tr>
                        <td>개인통관고유번호</td>
                        <td>54321</td>
                    </tr>
                    <tr>
                        <td>주소</td>
                        <td>대구광역시 달서구</td>
                    </tr>
                    <tr>
                        <td>베송요청사항</td>
                        <td>관리실</td>
                    </tr>
                    </tbody>
                </Table>
                </Card.Body>
                {/* <Card.Footer>
                </Card.Footer> */}
                </Card>
          </div>
        );
      }    
}