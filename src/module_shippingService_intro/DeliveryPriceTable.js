import styled from "styled-components";
import React from 'react';
import { Route, Switch, NavLink } from "react-router-dom";
import { AppNavbar } from '../AppNavbar'
import { BodyContainer, ShippingServiceNavbar } from './ShippingService'
import {
    AppContainer as BaseAppContainer,
    BaseNavigation,
  } from "../container";
import { Card, Tabs, Tab, InputGroup, Row, Col, Container, Button, Breadcrumb } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import { CompanyIntroductionBottom } from '../module_base_component/BaseCompanyIntroduction'

{/* ShippingServiceInfo CSS */}
const DeliveryPriceTableContainer = styled(BaseAppContainer)`
  min-height:calc(100vh);  
  height: auto;
`;

export class DeliveryPriceTable extends React.Component{
    constructor(props) {
        super(props);
      }
      
      render() {
        return (
          <div>
              <AppNavbar/>
                <DeliveryPriceTableContainer>
                    
                    <ShippingServiceNavbar/>
                    
                    <BodyContainer>
                      <Breadcrumb style={{ width: '100%'}}>
                        <Breadcrumb.Item active>배송대행 / 국제배송요금</Breadcrumb.Item>
                      </Breadcrumb>

                    <DeliveryPriceTaleTabs/>

                    {/* 부피무게배송비 계산 안내 */}
                    <DeliveryCalculation/>
                    
                    {/* 기타 서비스 요금안내 */}
                    <DeliveryOptionsInfo/>
                    
                    <CompanyIntroductionBottom/>
                    </BodyContainer>
                </DeliveryPriceTableContainer>
          </div>
        );
      }    
}

export class DeliveryPriceTaleTabs extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        value:null,
       
      }

    this.handleBaseValue = this.handleBaseValue.bind(this)
   
  }

  componentDidMount() {
      var base_var = {
          value: "",
      };
  }

  handleBaseValue(event){
      this.setState({value:event.target.value})
  }

  render() {
      return (
        <div>
           <Card border="dark" style={{ width: '60%', marginTop:'1rem', marginBottom:'1rem', marginLeft:'1rem' }}>
            <Card.Header>
              국제배송요금표
            </Card.Header>
            <Card.Body >
            <Tabs
              id="controlled-tab-example"
              defaultActiveKey="germnay"
              activeKey={this.state.key}
              onSelect={key => this.setState({ key })}
              style={{marginLeft:'2px'}}
            >

              {/* 독일 배송요금표 */}
              <Tab eventKey="germnay" title="독일">
                <DeliveryPriceTableGermany/>
              </Tab>

              {/* 영국 배송요금표 */}
              <Tab eventKey="england" title="영국">
                <DeliveryPriceTableEngland/>
              </Tab>

              {/* 미국 배송요금표 */}
              <Tab eventKey="america" title="미국">
                <DeliveryPriceTableAmerica/>
              </Tab>

              {/* 일본 배송요금표 */}
              <Tab eventKey="japan" title="일본">
                <DeliveryPriceTableJapan/>
              </Tab>

              {/* 중국 배송요금표 */}
              <Tab eventKey="china" title="중국">
                <DeliveryPriceTableChina/>
              </Tab>
           
          </Tabs>
          </Card.Body>
          </Card>
        </div>
      );
    }    
}

const DeliveryPriceTableStyle = styled.div`
  margin-top: 20px;
  width: 100%;
  font-size: 13px;
`;

const deiveryPriceColumns = [
  {
    dataField: 'weight',
    text: '무게(kg)',
    
  },{
    dataField: 'deiveryPrice',
    text: '배송요금(원)'
  }
];

// const deliveryPriceGermnayTableData = [
//   {"weight":"0.5",
//     "deiveryPrice":"14000",
//   },
//   {"weight":"1",
//     "deiveryPrice":"15000",
//   },
// ]

let del1 = {weight:"0.5", deiveryPrice:"14000"};
let del2 = {weight:"1", deiveryPrice:"15000"};

var list = [
];

for (var i=0; i<20; i++) {
  let weight_price = { weight: getDeliveryWeight(i), deiveryPrice: getDeliveryPrice(i)}
  list.push(weight_price)
}

function getDeliveryWeight(i){
  const start_weight = 1
  const weight_range = 1
  return start_weight + (weight_range*i)
}

function getDeliveryPrice(){
  const start_price = 13000
  const price_range = 4000
  return start_price + (price_range*i)
}

const deliveryPriceGermnayTableData = list

 {/* 독일 배송요금표 */}
export class DeliveryPriceTableGermany extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
      }
  }

  
  render() {
      return (
        <div>
          <DeliveryPriceTableStyle>
            <BootstrapTable keyField='objectId'  
              data={ deliveryPriceGermnayTableData } 
              columns={ deiveryPriceColumns } 
              bordered={ true }  
              noDataIndication="주문하신 물품이 없습니다"
              expandRow={ "" }
              striped />
          </DeliveryPriceTableStyle>
        </div>
      );
    }    
}

const deliveryPriceAmericaTableData = [
 
]

 {/* 미국 배송요금표 */}
export class DeliveryPriceTableAmerica extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
      }
  }

  render() {
      return (
        <div>
           <DeliveryPriceTableStyle>
            <BootstrapTable keyField='objectId'  
              data={ deliveryPriceAmericaTableData } 
              columns={ deiveryPriceColumns } 
              bordered={ true }  
              noDataIndication="준비중입니다"
              expandRow={ "" }
              striped />
          </DeliveryPriceTableStyle>
        </div>
      );
    }    
}

const deliveryPriceEnglandTableData = [
 
]
 {/* 영국 배송요금표 */}
export class DeliveryPriceTableEngland extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
      }
  }

  render() {
      return (
        <div>
           <DeliveryPriceTableStyle>
            <BootstrapTable keyField='objectId'  
              data={ deliveryPriceEnglandTableData } 
              columns={ deiveryPriceColumns } 
              bordered={ true }  
              noDataIndication="준비중입니다"
              expandRow={ "" }
              striped />
          </DeliveryPriceTableStyle>
        </div>
      );
    }    
}

const deliveryPriceJapanTableData = [
 
]
 {/* 일본 배송요금표 */}
export class DeliveryPriceTableJapan extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
      }
  }

  render() {
      return (
        <div>
           <DeliveryPriceTableStyle>
            <BootstrapTable keyField='objectId'  
              data={ deliveryPriceJapanTableData } 
              columns={ deiveryPriceColumns } 
              bordered={ true }  
              noDataIndication="준비중입니다"
              expandRow={ "" }
              striped />
          </DeliveryPriceTableStyle>
        </div>
      );
    }    
}

const deliveryPriceChinaTableData = [
 
]
 {/* 중국 배송요금표 */}
export class DeliveryPriceTableChina extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
      }
  }

  render() {
      return (
        <div>
           <DeliveryPriceTableStyle>
            <BootstrapTable keyField='objectId'  
              data={ deliveryPriceChinaTableData } 
              columns={ deiveryPriceColumns } 
              bordered={ true }  
              noDataIndication="준비중입니다"
              expandRow={ "" }
              striped />
          </DeliveryPriceTableStyle>
        </div>
      );
    }    
}

const WeightCalcStyle = styled.div`
  width: 350px;
  padding: 10px;
  border: 2px solid gray;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export class DeliveryCalculation extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
      }
  }

  render() {
      return (
        <div>
          <Card border="dark" style={{ width: '60%', marginTop:'1rem', marginBottom:'1rem', marginLeft:'1rem' }}>
            <Card.Header>
              국제배송비 책정 안내
            </Card.Header>
            <Card.Body >
             
              항공 운송 특성상, 특송화물에 대해서는 <span style={{ color: 'red' }}>실무게 VS 부피무게</span> 중 무거운 쪽으로 배송비가 책정됩니다.<br/>
              부피무게 계산 기준은 아래와 같습니다.<br/>
              <WeightCalcStyle>
                가로(cm) * 세로(cm) * 높이(cm) / 6000(kg)
              </WeightCalcStyle>
              예시 1. 실무게(<span style={{ color: 'blue' }}>4kg</span>) > 부피무게(<span style={{ color: 'blue' }}>1kg</span>, 
                20cm * 30cm * 10cm / 6000 = 1) => 배송비 <span style={{ color: 'blue' }}>4kg</span> 요금 책정<br/> 
              예시 2. 부피무게(<span style={{ color: 'blue' }}>12kg</span>, 60cm * 40cm * 30cm / 6000 = 12) > 
                실무게(<span style={{ color: 'blue' }}>4kg</span>) => 배송비 <span style={{ color: 'blue' }}>12kg</span> 요금 책정
              
              <br/>
              <br/>
            </Card.Body>
          </Card>
        </div>
      );
    }    
}

export class DeliveryOptionsInfo extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
      }
  }

  render() {
      return (
        <div>
          <Card border="dark" style={{ width: '60%', marginTop:'1rem', marginBottom:'1rem', marginLeft:'1rem' }}>
            <Card.Header>
              추가비용 및 부가서비스 안내
            </Card.Header>
            <Card.Body >
              무게 또는 부피 초과비용 (<span style={{ fontSize: '12px' }}>박스중량이 20kg초과시, 세변의 길이합이 160cm 초과시, 한변의 길이가 120cm 초과시</span>)<br/> 
               - 3만원<br/> 
              분할비용<br/> 
               - 3000원<br/> 
              합배송<br/> 
               - 3000원
            </Card.Body>
          </Card>
        </div>
      );
    }    
}