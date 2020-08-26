import React, { Component } from 'react';
import './App.css';
import { MemoryRouter as Router, Route, Switch } from "react-router-dom";
import {
  AppContainer as BaseAppContainer,
  BaseNavigation,
} from "./container";

import { InfodeskIntro } from './module_infodesk/InfodeskIntro'
import { InfodeskBuyingService } from './module_infodesk/InfodeskBuyingService'
import { InfodeskShippingService } from './module_infodesk/InfodeskShippingService'
import { InfodeskInspectRefundService } from './module_infodesk/InfodeskInspectRefundService'
import { InfodeskTransitNr } from './module_infodesk/InfodeskTransitNr'

import { BuyingServiceIntro } from './module_buyingService/BuyingServiceIntro'
import { BuyingService } from './module_buyingService/BuyingService'
import { BuyingServiceRegistration } from './module_buyingService/BuyingServiceRegistration'
import { BuyingServiceEbay } from './module_buyingService/BuyingServiceEbay'
import { AuctionService } from './module_buyingService/AuctionService'

import { RequestShippingService } from './module_shippingService/RequestShippingService';
import { ShippingService } from './module_shippingService_intro/ShippingService'
import { ShippingServiceInfo } from './module_shippingService_intro/ShippingServiceInfo'
import { ShippingServiceAddressPane } from './module_shippingService_intro/ShippingServiceAddressPane'
import { DeliveryPriceTable } from './module_shippingService_intro/DeliveryPriceTable'

import { CustomerCenterIntro } from './module_customerCenter/CustomerCenterIntro'
import { NoticeBoard } from './module_customerCenter/NoticeBoard'
import { QuestionBoard } from './module_customerCenter/QuestionBoard'

import { MyPage } from './module_mypage/MyPage';
import { MyPageDetail } from './module_mypage/MyPageDetail';
import { MyPageBuyingService } from './module_mypage/MyPageBuyingService';
import { MyPageBuyingServiceDetail } from './module_mypage/MyPageBuyingServiceDetail';
import { FavoriteAddressManager } from './module_mypage/FavoriteAddressManager';
import { MyPageShippingAddressPane } from './module_mypage/MyPageShippingAddressPane';
import { MyPagePersonal } from './module_mypage/MyPagePersonal';

import { PaymentHistory } from './module_payment/PaymentHistory';

import { Home } from './Home'
import { ManagementController } from './management/ManagementController'

class App extends Component {
  render() {
    return (
      <div>
        <Main/>
      </div>  
    );
  }
}

const Main = () => (
  <Switch>
    <Route exact path='/' component={ Home }></Route>

     {/* 이용안내 모둘 */}
    <Route exact path='/infodeskintro' component={ InfodeskIntro }></Route>
    <Route exact path='/infodeskBuyingService' component={ InfodeskBuyingService }></Route>
    <Route exact path='/infodeskShippingService' component={ InfodeskShippingService }></Route>
    <Route exact path='/infodeskInspectRefundService' component={ InfodeskInspectRefundService }></Route>
    <Route exact path='/infodeskTransitNr' component={ InfodeskTransitNr }></Route>
    
    {/* 구매대행 모둘 */}
    <Route exact path='/buyingServiceIntro' component={ BuyingServiceIntro }></Route>
    <Route exact path='/buyingService' component={ BuyingService }></Route> 
    <Route exact path='/buyingServiceRegistration' component={ BuyingServiceRegistration }></Route> 
    <Route exact path='/buyingServiceEbay' component={ BuyingServiceEbay }></Route> 
    <Route exact path='/auctionService' component={ AuctionService }></Route>  

    {/* 배송대행 모둘 */}
    <Route exact path='/shippingService/' component={ ShippingService }></Route> 
    <Route exact path='/shippingServiceInfo/' component={ ShippingServiceInfo }></Route> 
    <Route exact path='/requestshipping' component={ RequestShippingService }></Route>
    <Route exact path='/shippingServiceAddressPane' component={ ShippingServiceAddressPane }></Route>
    <Route exact path='/deliveryPriceTable' component={ DeliveryPriceTable }></Route> 
    
    {/* 고객센터 모둘 */}
    <Route exact path='/customercenterIntro' component={ CustomerCenterIntro }></Route> 
    <Route exact path='/noticeBoard' component={ NoticeBoard }></Route> 
    <Route exact path='/questionBoard' component={ QuestionBoard }></Route> 
    
    {/* 마이페이지 모둘 */} 
    <Route exact path='/mypage' component={ MyPage }></Route>
    <Route exact path='/detailsmypage/:orderid' component={ MyPageDetail }></Route>
    <Route exact path='/detailsmypage' component={ MyPageDetail }></Route>
    <Route exact path='/mypagebuyingService' component={ MyPageBuyingService }></Route>
    <Route exact path='/detailsbuyingService/:orderid' component={ MyPageBuyingServiceDetail }></Route>
    <Route exact path='/detailsbuyingService' component={ MyPageBuyingServiceDetail }></Route>
    <Route exact path='/favoriteAddressManager' component={ FavoriteAddressManager }></Route>
    <Route exact path='/mypageShippingAddressPane' component={ MyPageShippingAddressPane }></Route>
    <Route exact path='/mypagePersonal' component={ MyPagePersonal }></Route>
    <Route exact path='/paymentHistory' component={ PaymentHistory }></Route>

    {/* 관리자 모둘 */} 
    <Route exact path='/management' component={ ManagementController }></Route>
  </Switch>
);

export default App;