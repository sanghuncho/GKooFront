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

import { BuyingServiceIntro } from './module_buyingService/BuyingServiceIntro'
import { BuyingService } from './module_buyingService/BuyingService'
import { BuyingServiceEbay } from './module_buyingService/BuyingServiceEbay'
import { AutionService } from './module_buyingService/AutionService'

import { RequestShippingService } from './module_shippingService/RequestShippingService';
import { ShippingService } from './module_shippingService_intro/ShippingService'
import { ShippingServiceInfo } from './module_shippingService_intro/ShippingServiceInfo'
import { ShippingServiceAddressPane } from './module_shippingService_intro/ShippingServiceAddressPane'

import { CustomerCenterIntro } from './module_customerCenter/CustomerCenterIntro'
import { NoticePane } from './module_customerCenter/NoticePane'
import { QuestionPane } from './module_customerCenter/QuestionPane'

import { MyPage } from './module_mypage/MyPage';
import { FavoriteAddressManager } from './module_mypage/FavoriteAddressManager';

import { Home } from './Home'
import { MyPageDetail } from './module_mypage/MyPageDetail';
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
    
    {/* 구매대행 모둘 */}
    <Route exact path='/buyingServiceIntro' component={ BuyingServiceIntro }></Route>
    <Route exact path='/buyingService' component={ BuyingService }></Route> 
    <Route exact path='/buyingServiceEbay' component={ BuyingServiceEbay }></Route> 
    <Route exact path='/autionService' component={ AutionService }></Route>  

    {/* 배송대행 모둘 */}
    <Route exact path='/shippingService/' component={ ShippingService }></Route> 
    <Route exact path='/shippingServiceInfo/' component={ ShippingServiceInfo }></Route> 
    <Route exact path='/requestshipping' component={ RequestShippingService }></Route>
    <Route exact path='/shippingServiceAddressPane' component={ ShippingServiceAddressPane }></Route> 
    
    {/* 고객센터 모둘 */}
    <Route exact path='/customercenterIntro' component={ CustomerCenterIntro }></Route> 
    <Route exact path='/noticePane' component={ NoticePane }></Route> 
    <Route exact path='/questionPane' component={ QuestionPane }></Route> 
    
    {/* 마이페이지 모둘 */} 
    <Route exact path='/mypage' component={ MyPage }></Route> 
    <Route exact path='/detailsmypage/:id' component={ MyPageDetail }></Route>
    <Route exact path='/favoriteAddressManager' component={ FavoriteAddressManager }></Route>
    
    {/* 관리자 모둘 */} 
    <Route exact path='/management' component={ ManagementController }></Route>
  </Switch>
);

export default App;