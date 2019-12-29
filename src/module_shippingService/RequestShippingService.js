import * as React from "react";
import { ShippingServiceNavbar } from "../ShippingService";
import styled from "styled-components";
import {
    AppContainer as BaseAppContainer,
  } from "../container";
import { Breadcrumb, Card, Form, InputGroup, FormControl, Dropdown, DropdownButton, Button, Popover, 
    OverlayTrigger, Modal } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import { times, exchange, signOut } from 'react-icons-kit/fa/'
import { Icon as BaseIcon } from "react-icons-kit";
import { TransportShippingRequest } from "../module_shippingService/TransportShippingRequest";
import { AdditionalProduct } from "../module_shippingService/AdditionalProduct" 
import * as Keycloak from 'keycloak-js';
import { keycloakConfigLocal, INITIAL_PAGE, basePort, headers, setTokenHeader } from "../module_mypage/AuthService"
import { InfoBadge } from "../module_base_component/InfoBadge";
import { AppNavbar, LogoutButton } from '../AppNavbar'
import { FavoriteAddressListPanel } from '../module_shippingService/FavoriteAddressListPanel'
import { CATEGORY_LIST, DELIVERY_COMPANY_LIST, ITEM_TITLE_LIST } from './ShippingServiceConfig'
var keycloak = Keycloak(keycloakConfigLocal);

const Icon = props => <BaseIcon size={16} icon={props.icon} />;
const IconCnt = styled.div`
`;

const IconStyle = {justifyContent:"center"}

const AppContainer = styled(BaseAppContainer)`
    height:auto;
    width: 99vw;
`;

const BodyContainer = styled(BaseAppContainer)`
  height:auto;
  flex-direction: column;
`;

const FITST_ELEMENT = 0;

export class RequestShippingService extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { 
            //agreement:false,
            agreement:true,
            keycloakAuth:null,
            accessToken:"",
        };
        this.handleChangeOnCheckbox = this.handleChangeOnCheckbox.bind(this);
    }

    handleChangeOnCheckbox(e) {
        this.setState({agreement:e.target.checked}) 
    }

    componentDidMount() {
        keycloak.init({onLoad: 'login-required'}).success(() => {
            this.setState({ keycloakAuth: keycloak, 
            accessToken:keycloak.token})
        })
    }

    handleLogout(){
        keycloak.logout({ redirectUri: INITIAL_PAGE });
    }

  render() {
    const didAgreeWith=this.state.agreement;
    return(
        <div>
            <AppNavbar>
                <LogoutButton keycloak ={this.state.keycloakAuth}/>
            </AppNavbar>
            
            <AppContainer>
                <ShippingServiceNavbar/>
                
                <BodyContainer>
                    <Breadcrumb>
                        <Breadcrumb.Item active>배송대행</Breadcrumb.Item>
                        <Breadcrumb.Item active>배송대행 신청</Breadcrumb.Item>
                    </Breadcrumb> 
                    <Card border="dark" style={{ width: '80%', height:'20rem', marginTop:'1rem'}}>
                        <Card.Header>서비스 신청시 주의사항</Card.Header>
                        <Card.Body style={{'height': '210px','overflow-y': 'scroll', fontSize:'14px'}}>
                        {/* <Card.Body style={{'max-height': '210px', 'overflow-y': 'auto'}}> */}
                        <Card.Text>1. 지쿠 배송대행 신청서에 기재된 모든 내용은 통관시 세관에 신고되므로 허위로 작성하실 수 없습니다.</Card.Text>
                        <Card.Text>2. 지쿠는 나눔배송 또는 분할배송 서비스를 제공하지 않습니다.</Card.Text>
                        <Card.Text>3. 한곳의 쇼핑몰에서 한번에 여러 개의 상품을 주문한 경우에는 하나의 배송대행 신청서에 모두 등록하여야 합니다. 
                            이때에는 상품들이 나뉘어 입고되어도 지쿠에서 한 박스로 포장 후 배송 중량 및 해외운송료를 책정합니다.</Card.Text>
                        <Card.Text>4. 지쿠는 수입이 금지되어 있는 상품이나 선적이 불가능한 상품의 구매로 인해 발생하는 고객의 불이익은 책임지지 않습니다.</Card.Text>
                        <Card.Text>5. 배송대행 신청서의 상품이 모두 입고완료된 이후에는 상품정보(상품명, 수량, 단가, 트래킹번호)를 수정하거나 삭제할 수 없습니다.</Card.Text>
                        <Card.Text>6. 배송대행 신청서의 상품 중 일부라도 입고된 이후 부터는 묶음배송 신청이나, 묶음배송 건 해제가 불가능 합니다.</Card.Text>
                        <Card.Text>7. 배송대행 상품의 입고지를 선택하여 신청서를 작성한 후에는 입고지 변경이 불가능 합니다.</Card.Text>
                        </Card.Body>
                        <Card.Footer> 
                            <Form.Check style={{fontSize:'15px'}} type='checkbox' onChange={e => this.handleChangeOnCheckbox(e)} label='주의사항을 모두 확인하였으며, 위의 내용에 동의하고 배송대행을 신청합니다.'/>
                        </Card.Footer>
                    </Card>
                    {didAgreeWith?<ShippingCenter accessToken={this.state.accessToken}/>:""}
                </BodyContainer>
            </AppContainer>
        </div>
    );}
}

export default RequestShippingService;

class ShippingCenter extends React.Component{
    constructor(props) {
        super(props);
        this.state = { 
          easyShip:true,
          customShip:false,
          //understandWarning:false,
          understandWarning:true,
        };
        this.handleChangeEasy = this.handleChangeEasy.bind(this);
        this.handleChangeCustom = this.handleChangeCustom.bind(this);
        this.handleChangeWarn = this.handleChangeWarn.bind(this);
    }

    handleChangeEasy(e) {
        this.setState({easyShip:true})
        this.setState({customShip:false})
    }

    handleChangeCustom(e) {
        this.setState({easyShip:false}) 
        this.setState({customShip:true})
    }

    handleChangeWarn(event) {
        this.setState({understandWarning:event.target.checked}) 
    }

    render(){
     const didUnderstand=this.state.understandWarning;   
     return(
        /* ToDo : as component */
        <div>
            <Card border="dark" style={{ width: '80%', height:'18rem', marginTop:'1rem' }}>
                <Card.Header>물류센터</Card.Header>
                <Card.Body >
                    <Card.Text>
                        <Form.Check style={{fontSize:'14px'}} type='radio' label='독일' checked='true'/>
                    </Card.Text> 
                </Card.Body>
                
                <Card.Header>서비스 선택</Card.Header>
                <Card.Body>
                    <Form.Check style={{fontSize:'14px', marginRight:'10rem'}} inline checked={this.state.easyShip} type='radio' onChange={e => this.handleChangeEasy(e)} label='간편배송'/>
                    <Form.Check style={{fontSize:'14px'}} inline checked={this.state.customShip} type='radio' onChange={e => this.handleChangeCustom(e)} label='체크인배송'/>
                </Card.Body>
                <Card.Footer>
                    <Form.Check style={{fontSize:'15px'}} checked={this.state.understandWarning} type='checkbox' onChange={e => this.handleChangeWarn(e)} label='Box 어느 한면이라도 152cm를 초과하거나, 1건당 무게 30kg을 초과할 경우 신청불가'/>
                </Card.Footer>
            </Card>
            {didUnderstand ? <InputDeliveryContentWrapper easyShip={this.state.easyShip}
                accessToken={this.props.accessToken}/>:""}
            {/* {didUnderstand ? <InputDelivery/>:""} */}
            {didUnderstand ? <TransportShippingRequest/>:""}
        </div>
    );}
 }

 class InputDeliveryContentWrapper extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            goodsList:[],

            shopUrl:"",
            //shopUrlList:[],

            trackingTitle:"운송사선택",
            deliveryCompanies:DELIVERY_COMPANY_LIST,

            trackingNumber:"",
            trackingNumberList:[],

            categoryTitle:"선택",
            categoryTitleList:CATEGORY_LIST,
            isValidCategory:false,
            //categoryVariant:"danger",
            categoryVariant:"outline-secondary",

            itemTitle:"선택",
            itemTitleList:ITEM_TITLE_LIST,
            isValidItemTitle:false,
            //itemTitleVariant:"danger",
            itemTitleVariant:"outline-secondary",

            brandName:"",
            brandNameList:[],
            
            itemName:"",
            itemNameList:[],
            isValidItemName:false,
            warningInvalidItemName: false,
            
            heightOfInputProduct:"20",

            productPrice:"",
            productPriceList:[],

            productAmount:"",
            productAmountList:[],
            productTotalPrice:"",

            totalPriceList:[],
            isValidTotalPrice:false,

            disableButtonFavoriteAddressList:false,
            setOwnerContent:false,
            registerFavoriteAddress:false,

            receiverNameByKorea:"",
            receiverNameByEnglish:"",

            privateTransit:true,
            businessTransit:false,

            transitNumber:"",
            isValidTransitNumber:false,

            agreeWithCollection:false,

            phonenumberFirst:"",
            phonenumberSecond:"",
           
            postCode:"",
            deliveryAddress:"",
            deliveryMessage:"",

            applyDeliveryService:false,
            //without validation
            //applyDeliveryService:true,
            show: false,
            shippingProductList:[],
            deliveryObject: null,
            customerBaseData:null,
            favoriteAddressList:[],
            openFavoriteAddressListPanel:false
        };

        this.inputShopUrl               = this.inputShopUrl.bind(this);
        this.inputTrackingTitle         = this.inputTrackingTitle.bind(this);
        this.inputTrackingNumber        = this.inputTrackingNumber.bind(this);

        this.handleSelectCategory       = this.handleSelectCategory.bind(this);
        this.handleSelectItem           = this.handleSelectItem.bind(this);

        this.inputBrandName             = this.inputBrandName.bind(this);
        this.inputItemName              = this.inputItemName.bind(this);

        this.inputReceiverNameByKorea   = this.inputReceiverNameByKorea.bind(this);
        this.handleGetCustomerAddressData = this.handleGetCustomerAddressData.bind(this);
        this.handleRegisterFavoriteAddress = this.handleRegisterFavoriteAddress.bind(this);  
        this.inputReceiverNameByEnglish = this.inputReceiverNameByEnglish.bind(this); 

        this.inputProductPrice  = this.inputProductPrice.bind(this);
        this.inputProductAmount = this.inputProductAmount.bind(this);
        this.inputProductTotalPrice    = this.inputProductTotalPrice.bind(this);

        this.inputPrivateTransit  = this.inputPrivateTransit.bind(this); 
        this.inputBusinessTransit  = this.inputBusinessTransit.bind(this); 
        this.inputTransitNumber  = this.inputTransitNumber.bind(this); 
        this.agreeWithCollectionCheckbox = this.agreeWithCollectionCheckbox.bind(this);


        this.changeHandlerPhonenumberFirst    = this.changeHandlerPhonenumberFirst.bind(this);
        this.changeHandlerPhonenumberSecond   = this.changeHandlerPhonenumberSecond.bind(this);

        this.inputPostCode              = this.inputPostCode.bind(this);
        this.inputDeliveryAddress       = this.inputDeliveryAddress.bind(this);
        this.inputDeliveryMessage       = this.inputDeliveryMessage.bind(this);
        
        this.applyDeliveryService  = this.applyDeliveryService.bind(this);

        this.handleRemoveItemOnList = this.handleRemoveItemOnList.bind(this)
        this.finishService = this.finishService.bind(this)

        this.handleModalShow = this.handleModalShow.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.fetchCustomerBaseData = this.fetchCustomerBaseData.bind(this)
        this.fetchFavoriteAddressList = this.fetchFavoriteAddressList.bind(this)
        this.handleOpenFavoriteAddressListPanel = this.handleOpenFavoriteAddressListPanel.bind(this)
        this.handleCloseFavoriteAddressListPanel = this.handleCloseFavoriteAddressListPanel.bind(this)
        this.handleLoadSelectedAddress = this.handleLoadSelectedAddress.bind(this)
    }

    componentDidMount() {
        var shippingProduct = {
            categoryTitle: "",
            itemTitle: "",
            brandName: "",
            itemName: "",
            productPrice: null,
            productAmount: null,
            productTotalPrice: null,
        };
        {/* set the first product element */}
        this.state.shippingProductList[0] = shippingProduct

        var deliveryObject = {
            shopUrl:"",
            trackingTitle:"",
            trackingNumber:""
        }
        this.setState({deliveryObject:deliveryObject})


        //this.fetchCustomerBaseData(this.props.accessToken)
    }

    /* 회원배송정보 불러오기 */
    fetchCustomerBaseData(token){
        console.log("fetchCustomerBaseData");
        setTokenHeader(token)
        fetch(basePort + '/fetchcustomerbaseinfo', {headers})
          .then((result) => { 
            return result.json();
          }).then((data) => {           
            this.setState({customerBaseData:data})
            this.setState({
                receiverNameByKorea:data.nameKor,
                receiverNameByEnglish:data.nameEng,
                transitNumber:data.transitNr,
                phonenumberFirst:data.phonenumberFirst,
                phonenumberSecond:data.phonenumberSecond,
                postCode:data.zipCode,
                deliveryAddress:data.address,
            })
            console.log(data.nameKor);
          }).catch(function() {
            console.log("error fetching userbaseinfo");
        });
      }

    handleGetCustomerAddressData(event){
        const setCustomerBaseData = event.target.checked   
        this.setState({setOwnerContent:setCustomerBaseData})
        if (setCustomerBaseData){
            this.fetchCustomerBaseData(this.props.accessToken)
        } else {
            this.setState({
                receiverNameByKorea:null,
                receiverNameByEnglish:null,
                transitNumber:null,
                phonenumberFirst:null,
                phonenumberSecond:null,
                postCode:null,
                deliveryAddress:null,
            })
        }
    }

    handleLoadSelectedAddress(index){
        var addressData = this.state.favoriteAddressList[index]
        this.setState({
            receiverNameByKorea:addressData.nameKor,
            receiverNameByEnglish:addressData.nameEng,
            transitNumber:addressData.transitNr,
            phonenumberFirst:addressData.phonenumberFirst,
            phonenumberSecond:addressData.phonenumberSecond,
            postCode:addressData.zipCode,
            deliveryAddress:addressData.address,
        })
    }

    handleRegisterFavoriteAddress(event){    
        this.setState({registerFavoriteAddress:event.target.checked})
        console.log(this.state.registerFavoriteAddress)
    }

    inputShopUrl(event){
        this.setState({shopUrl:event.target.value})
        this.state.deliveryObject.shopUrl = event.target.value
    }

    inputTrackingTitle(event, company) {
        this.setState({trackingTitle:company})
        this.state.deliveryObject.trackingTitle=company
    }

    inputTrackingNumber(event){
        this.setState({trackingNumber:event.target.value})
        this.state.deliveryObject.trackingNumber = event.target.value 
    }

    handleSelectCategory(event, title) {
        this.setState({categoryTitle:title, categoryVariant:"outline-secondary", isValidCategory:true})
        this.state.shippingProductList[0].categoryTitle = title
    }

    handleSelectItem(event, it) {
        this.setState({itemTitle:it, itemTitleVariant:"outline-secondary", isValidItemTitle:true})
        this.state.shippingProductList[0].itemTitle = it
    }

    inputBrandName(event){
        this.setState({brandName:event.target.value})
        this.state.shippingProductList[0].brandName = event.target.value
    }

    inputItemName(event){
        this.setState({itemName:event.target.value})
        const itemName = this.state.itemName
        itemName === "" ?  this.setState({isValidItemName:false}) : 
            this.setState({isValidItemName:true, warningInvalidItemName:false})
        this.state.shippingProductList[0].itemName = event.target.value
    }

    inputProductPrice(event){
        const inputPrice = event.target.value
        //const isProperPrice = Number.isInteger(parseInt(inputPrice))
        const amount = this.state.productAmount === "" ? "" : parseInt(this.state.productAmount)
        const productTotalPrice = (inputPrice === "") || (amount === "") ? "" : inputPrice*amount 
        this.setState({productPrice:inputPrice, productTotalPrice:productTotalPrice})
        this.state.shippingProductList[0].productPrice = inputPrice
        this.state.shippingProductList[0].productTotalPrice = productTotalPrice
    }

    inputProductAmount(event){
        const amount = (event.target.value === "") || (event.target.value == null) ? "" : parseInt(event.target.value)
        const price =  this.state.productPrice === "" ? "" : parseInt(this.state.productPrice)
        const productTotalPrice = (price === "") || (amount === "") ? "" : price*amount 
        this.setState({productAmount:amount, productTotalPrice:productTotalPrice})
        this.state.shippingProductList[0].productAmount = amount
        this.state.shippingProductList[0].productTotalPrice = productTotalPrice
    }

    inputProductTotalPrice(event){
        // const price =  this.state.productPrice === "" ? "" : parseInt(this.state.productPrice) 
        // const amount = this.state.productAmount === "" ? "" : parseInt(this.state.productAmount)
        // const total = (price === "") || (amount === "") ? "" : price*amount
        
        // this.setState({
        //     totalPrice:total
        // })

        // total != 0 ? this.setState({isValidTotalPrice:true}) : this.setState({isValidTotalPrice:false})
        // console.log("total : " + total)
    }

    inputReceiverNameByKorea(event){
        this.setState({receiverNameByKorea:event.target.value}) 
    }

    inputReceiverNameByEnglish(event){
        this.setState({receiverNameByEnglish:event.target.value}) 
    }

    inputPrivateTransit(e) {
        this.setState({privateTransit:true})
        this.setState({businessTransit:false})
    }

    inputBusinessTransit(e) {
        this.setState({privateTransit:false})
        this.setState({businessTransit:true})
    }

    inputTransitNumber(event){
        this.setState({transitNumber:event.target.value})
    }

    agreeWithCollectionCheckbox(event){
        this.setState({agreeWithCollection:event.target.checked})
    }

    changeHandlerPhonenumberFirst(event){
        this.setState({phonenumberFirst:event.target.value})
    }

    changeHandlerPhonenumberSecond(event){
        this.setState({phonenumberSecond:event.target.value})
    }

    // applyDeliveryService(e, allowToApply, itemNameLength){
    //     console.log("==>additional shopList")
    //     console.log(this.state.shopUrlList)
    //     console.log("<==additional shopList")
    //     if(allowToApply){
    //         console.log("allowToApply")
    //         this.setState({applyDeliveryService:true})
    //     } else {
    //         console.log("Not allowToApply")
    //         console.log("itemNameLength: " + itemNameLength)
    //         itemNameLength === 0 ? this.setState({warningInvalidItemName:true}) : 
    //             this.setState({warningInvalidItemName:false}) 
            
    //     }
    // }

    applyDeliveryService(e, allowToApply, itemNameLength){
        this.setState({applyDeliveryService:true})
    }

    inputPostCode(event){
        this.setState({
            postCode:event.target.value
        })
    }

    inputDeliveryAddress(event){
        this.setState({
            deliveryAddress:event.target.value
        })
    }

    inputDeliveryMessage(event){
        this.setState({
            deliveryMessage:event.target.value
        })
    }

    addItemOnList(event){
        this.setState({
            goodsList:[...this.state.goodsList, ""],
            heightOfInputProduct:this.state.heightOfInputProduct+4
        })
    }

    handleRemoveItemOnList(index){
        this.state.goodsList.splice(index, 1)
        this.state.shippingProductList.splice(index, 1)
        this.setState({
                goodsList:this.state.goodsList, 
                shippingProductList:this.state.shippingProductList })
    }

    finishService(){
        this.setState({applyDeliveryService:false})
    }

    handleModalClose() {
        this.setState({ show: false });
    }
    
    handleModalShow() {
        this.setState({ show: true });
    }

    handleOpenFavoriteAddressListPanel(){
        this.fetchFavoriteAddressList(this.props.accessToken)
    }

    handleCloseFavoriteAddressListPanel(){
        this.setState({openFavoriteAddressListPanel:false})
    }

    fetchFavoriteAddressList(accessToken){
        setTokenHeader(accessToken)
        fetch(basePort + '/retrieveFavoriteAddressList', {headers})
            .then((result) => {
               return result.json();
            }).then((data) => {
              this.setState({
                favoriteAddressList:data,
                openFavoriteAddressListPanel:true})
              console.log(data)
        })
    }

    render(){

        const price = this.state.productPrice
        const isNumberPrice = Number(price) 
        const priceInt  = isNumberPrice ? price : 0
        
        const amount = this.state.productAmount
        const isNumberAmount = Number(amount) 
        const amountInt = isNumberAmount ? parseInt(amount) : 0 
        const productTotalPrice = priceInt*amountInt

        const categoryVariant = this.state.categoryVariant
        const isValidCategory = this.state.isValidCategory

        const itemTitleVariant = this.state.itemTitleVariant
        const isValidItemTitle = this.state.isValidItemTitle

        const transitNumber = this.state.transitNumber
        //const isValidTransitNumber = this.state.isValidTransitNumber
        //const isValidTransitNumber = transitNumber.length == 8 ? true : false
        const isValidTransitNumber = true
        
        const isValidItemName = this.state.isValidItemName
        const itemNameLength = this.state.itemName.length
        //const warningItemName = isValidItemName == true ? "" : true
        const warningInvalidItemName =  this.state.warningInvalidItemName
        const heightOfInputProduct = heightOfInputProduct + "rem"

        const isValidTotalPrice = productTotalPrice == 0 ? false : true  
        const allowToApply = (isValidCategory & isValidItemTitle & isValidTransitNumber 
                & isValidItemName & isValidTotalPrice)

        let popOver
        let warnCategory
        let warnItemTitle
        let warnComma
        let warnMessageTransitNumber

        if(isValidCategory & isValidItemTitle & isValidTransitNumber){
            popOver = <div></div>   
        } else if( isValidCategory & isValidItemTitle & !isValidTransitNumber){
            warnMessageTransitNumber = isValidTransitNumber  ? "" : "개인통관고유번호를 체크해주세요.";
            popOver = <Popover id="popover-basic" title="필수기재사항">
                            {warnMessageTransitNumber}
                      </Popover>
        } else {
            warnCategory = isValidCategory ? "" : "카테고리";
            warnItemTitle = isValidItemTitle ? "" : "품목";
            warnComma = (isValidCategory || isValidItemTitle) ? "" : ", ";

            warnMessageTransitNumber = isValidTransitNumber  ? "" : "개인통관고유번호를 체크해주세요.";
            popOver = <Popover id="popover-basic" title="필수기재사항">
                            {warnCategory}{warnComma} {warnItemTitle} 영역을 선택해주세요.<br/>
                            {warnMessageTransitNumber}
                      </Popover>
        }

        let favoriteAddressListPanel
        if(this.state.openFavoriteAddressListPanel){
            favoriteAddressListPanel = <FavoriteAddressListPanel 
                favoriteAddressList={this.state.favoriteAddressList}
                handleCloseFavoriteAddressListPanel={this.handleCloseFavoriteAddressListPanel}
                handleLoadSelectedAddress={this.handleLoadSelectedAddress} />
        } else {
            favoriteAddressListPanel = ""
        }

        return(
            <div>
            {/* 상품입력 박스*/}
            <Card border="dark" style={{ width: '80%', height:{heightOfInputProduct}, marginTop:'1rem', marginBottom:'1rem' }}>
                <Card.Header>상품입력</Card.Header>          
                <Card.Body>
                <Card border="dark" style={{ width: '90%', marginBottom:'1rem'}}>
                    <Card.Header>상품 배송 정보</Card.Header>
                    <Card.Body >
                    <InputGroup size="sm" style={{ width:'70%'}} className="mb-3" >
                        <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon3" style={{ width: '100px'}} >
                            쇼핑몰 URL
                        </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl id="basic-url" aria-describedby="basic-addon3"
                            onChange = {this.inputShopUrl} 
                            placeholder="정확한 URL을 입력해주세요"/>
                    </InputGroup>

                    <InputGroup size="sm" style={{ width:'70%'}} className="mb-3">
                        <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon3" style={{ width: '100px'}}>
                            트랙킹번호
                        </InputGroup.Text>
                        </InputGroup.Prepend>
                       
                        <DropdownButton
                            as={InputGroup.Prepend}
                            variant="outline-secondary"
                            title={this.state.trackingTitle}
                            id="input-group-dropdown-1"
                            >
                            {this.state.deliveryCompanies.map((comapany) => { return (<div><Dropdown.Item onSelect={e => this.inputTrackingTitle(e, comapany)}>{comapany}</Dropdown.Item></div> )})}
                        </DropdownButton>
                        <FormControl id="basic-url" aria-describedby="basic-addon3" 
                            style={{ width: '200px'}} 
                            placeholder="트랙킹번호"
                            onChange = {this.inputTrackingNumber}/>
                        <InfoBadge infoText={"트랙킹번호 허위/미기재시 입고가 지연/미처리 될수 있습니다."} />
                    </InputGroup>
                    </Card.Body>
                </Card>
                <Card border="dark" style={{ width: '90%'}}>
                    <Card.Header>상품</Card.Header>
                    <Card.Body >
                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon4" style={{ width: '110px'}}>
                                카테고리
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <DropdownButton
                            as={InputGroup.Prepend}
                            variant = {categoryVariant}
                            title={this.state.categoryTitle}
                            id="input-group-dropdown-category"
                            >
                            {this.state.categoryTitleList.map((category) => 
                                { return (<div><Dropdown.Item onSelect={e => this.handleSelectCategory(e, category)}>{category}</Dropdown.Item></div> )})}
                        </DropdownButton>
                    </InputGroup> 
                    <InputGroup size="sm" className="mb-3">   
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon4" style={{ width: '110px'}}>
                                품목
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                       
                        <DropdownButton
                            as={InputGroup.Prepend}
                            variant={itemTitleVariant}
                            title={this.state.itemTitle}
                            id="input-group-dropdown-category"
                            >
                            {this.state.itemTitleList.map((item) => 
                                { return (<div><Dropdown.Item onSelect={e => this.handleSelectItem(e, item)}>{item}</Dropdown.Item></div> )})}

                        </DropdownButton>
                       
                    </InputGroup>
                    
                    <InputGroup size="sm" style={{ width:'70%'}} className="mb-3">
                        <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon3" style={{ width: '110px'}}>
                            브랜드(영문)
                        </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl id="basic-url" aria-describedby="basic-addon3"
                            placeholder="정확한 브랜드이름을 입력해주세요"
                            onChange = {this.inputBrandName}/>
                    </InputGroup>

                    <InputGroup size="sm" style={{ width:'70%'}} className="mb-3">
                        <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon3" style={{ width: '110px'}}>
                            상품명(영문)
                        </InputGroup.Text>
                        </InputGroup.Prepend>
                       
                        <Form.Control id="basic-url" aria-describedby="basic-addon3" 
                            placeholder="정확한 영문 상품명을 입력해주세요"
                            onChange={this.inputItemName}
                            type="text"
                            isInvalid={warningInvalidItemName}/>
                    </InputGroup>

                    <InputGroup size="sm" style={{ width:'70%'}} className="mb-3">
                        <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon3" style={{ width: '110px'}}>
                            단가/수량
                        </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl id="basic-url" aria-describedby="basic-addon3" 
                            placeholder="상품단가"
                            val ue={this.state.productPrice}
                            onChange = {this.inputProductPrice}/>
                        <IconCnt style={{marginTop:"2px",marginLeft:"2px", marginRight:"2px"}}>
                                <Icon icon={ times } />
                        </IconCnt>

                        <FormControl id="basic-url" aria-describedby="basic-addon3" 
                            placeholder="수량"
                            value={this.state.prouctAmount}
                            onChange = {this.inputProductAmount}/>
                        <IconCnt style={{marginTop:"2px", marginLeft:"5px", marginRight:"5px"}}>
                                <Icon icon={ exchange } />
                        </IconCnt>

                        <FormControl id="basic-url" aria-describedby="basic-addon3" 
                            value={ productTotalPrice }
                            onChange = { this.inputProductTotalPrice }
                            readOnly = "true"
                            />
                        <InputGroup.Append>
                            <InputGroup.Text>(Euro)</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                 </Card.Body>
                 </Card>

                {/* 상품추가 구현 index[0] = first element*/}
                {this.state.goodsList.map((itemName, index) => { return (
                    <div key={index}>

                    <AdditionalProduct index={index} 
                        shippingProductList = {this.state.shippingProductList}
                        trackingNumberList = {this.state.trackingNumberList}
                        brandNameList = {this.state.brandNameList}
                        itemNameList = {this.state.itemNameList}
                        productPriceList = {this.state.productPriceList}
                        productAmountList = {this.state.productAmountList}
                        totalPriceList = {this.state.totalPriceList}
                        handleRemoveItemOnList={this.handleRemoveItemOnList}
                        />
                    </div>
                )})}

                 {/* 상품추가 버튼 */}
                 <Button variant="secondary" size="sm" onClick={(e) => this.addItemOnList(e)} 
                            style={{ marginRight: '10%', marginTop: '10px', float:"right"}}>상품 추가</Button>
                </Card.Body>

            </Card>
            
            {/* 받는분정보 박스
            ToDo : Component
            */}
            <Card border="dark" style={{ width:'80%', height:'62rem', marginTop:'1rem', marginBottom:'1rem' }}>
                    <Card.Header>받는분 정보
                    <Button variant="secondary" size="sm" 
                        disabled = {this.state.disableButtonFavoriteAddressList}
                        onClick={(e) => this.handleOpenFavoriteAddressListPanel(e)} 
                        style={{ marginRight: '10px', float:"right"}}>배송지 불러오기</Button>
                    </Card.Header>
                    <Card.Body >

                        {favoriteAddressListPanel}

                        <InputGroup size="sm" style={{ width:'90%'}} className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon3">
                                    받는분
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Card style={{ width: '90%'}}>
                            <Card.Body>
                                <InputGroup size="sm" style={{ width:'70%'}} className="mb-4" >
                                    <Form.Check type='checkbox'
                                        onChange={e => this.handleGetCustomerAddressData(e)} label='회원정보와 동일'
                                        defaultChecked={this.state.customerDeliveryData}
                                        style={{marginLeft:'5px', marginTop:'5px', marginRight:'20px', fontSize:'14px'}}
                                    />
                                    <Form.Check type='checkbox'
                                        onChange={e => this.handleRegisterFavoriteAddress(e)} 
                                        label='배송지 관리 등록하기'
                                        defaultChecked={this.state.registerFavoriteAddress}
                                        style={{marginLeft:'5px', marginTop:'5px', marginRight:'20px', fontSize:'14px'}}
                                    />
                                </InputGroup>

                                <InputGroup size="sm" style={{ width:'70%'}} className="mb-4">
                                    <InputGroup.Prepend >
                                        <InputGroup.Text id="basic-addon3">
                                            이름(국문)
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl id="basic-url" aria-describedby="basic-addon3"
                                        onChange={this.inputReceiverNameByKorea}
                                        defaultValue={this.state.receiverNameByKorea}
                                    />
                                </InputGroup >
                                
                                <InputGroup size="sm" style={{ width:'70%'}} className="mb-4">
                                    <InputGroup.Prepend>
                                            <InputGroup.Text id="basic-addon3">
                                                이름(영문)
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl id="basic-url" aria-describedby="basic-addon3"
                                            style={{ width: '50px'}}
                                            onChange = { this.inputReceiverNameByEnglish }
                                            defaultValue={this.state.receiverNameByEnglish}
                                            />
                                    </InputGroup>
                                    <InfoBadge infoText={"상품을 수취하실 분의 성함/사업자 상호를 적어주세요. 상품도착후 변경은 불가능합니다"} />
                                    <InfoBadge infoText={"통관시 받는분을 기준으로 수입신고 합니다."} />
                                    <InfoBadge infoText={"사업자 통관으로 진행하실 경우 받는분 이름(국문/영문)을 사업체 이름으로 기입주세요."} />
                            </Card.Body> 
                            </Card> 
                        </InputGroup>
                   
                        <InputGroup size="sm" style={{ width:'90%'}} className="mb-3" >
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon3" >
                                    받는분 <br/>정보
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Card style={{ width: '90%'}}>
                            <Card.Body>
                                <Form.Check inline checked={this.state.privateTransit} type='radio' onChange={e => this.inputPrivateTransit(e)} label='개인통관고유번호' style={{marginRight:'10rem'}}/>
                                <Form.Check inline checked={this.state.businessTransit} type='radio' onChange={e => this.inputBusinessTransit(e)} label='사업자번호(사업자통관)'/>
                                        
                                    <InputGroup size="sm" className="mb-3" style={{ width: '80%', marginTop:'10px'}}>
                                        <FormControl id="basic-url" aria-describedby="basic-addon3" 
                                            placeholder="8자리 고유번호" 
                                            onChange = { this.inputTransitNumber }
                                            defaultValue={this.state.transitNumber}
                                            style={{ marginRight:'10px'}}/>
                                        <Button size="sm" variant='secondary' style={{marginRight:'10px', fontSize:'14px'}}>발급방법</Button>
                                        <Button size="sm" variant='secondary' style={{fontSize:'14px'}}>내 개인통관고유번호 저장</Button>
                                    </InputGroup >
                                    
                                    <Form.Check type='checkbox' 
                                        onChange={e => this.agreeWithCollectionCheckbox(e)} label='수입통관신고를 위한 개인통관고유번호 수집에 동의합니다'
                                        checked={this.state.agreeWithCollection}
                                        style={{fontSize:'14px'}}/>
                                    <InfoBadge infoText={"목록통관 대상품목도 개인통관고유번호 제출이 필수입니다."} />
                            </Card.Body> 
                            </Card> 
                        </InputGroup>

                        <InputGroup size="sm" style={{ width:'90%'}} className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon3" >
                                    연락처
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Card style={{ width: '90%'}}>
                            <Card.Body>
                                <InputGroup size="sm" className="mb-3" style={{width: '80%'}}>
                                <InputGroup.Prepend >
                                    <InputGroup.Text id="basic-addon3" >
                                        연락처1
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl id="basic-url" aria-describedby="basic-addon3"
                                    onChange = { this.changeHandlerPhonenumberFirst }
                                    style={{backgroundColor: '#FFFFFF', marginRight:'1px'}}
                                    defaultValue={this.state.phonenumberFirst}
                                />
                                <InputGroup.Prepend >
                                <InputGroup.Text id="basic-addon3" >
                                    연락처2
                                </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl id="basic-url" aria-describedby="basic-addon3"
                                    onChange = { this.changeHandlerPhonenumberSecond }
                                    style={{backgroundColor: '#FFFFFF', marginRight:'1px'}}
                                    defaultValue={this.state.phonenumberSecond}
                                />
                                </InputGroup>

                                <InputGroup size="sm" className="mb-3" style={{ width: '50%'}}>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon3" style={{ width: '100px'}}>
                                            우편번호
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl id="basic-url" aria-describedby="basic-addon3" 
                                        style={{ marginRight:'10px'}}
                                        onChange={e => this.inputPostCode(e)}
                                        defaultValue={this.state.postCode}
                                        />
                                    {/* 추후 개발 
                                    <Button size="sm" variant='secondary' >우편번호 찾기</Button> */}
                                </InputGroup >
                                <InputGroup size="sm" className="mb-3" style={{ width: '80%'}}>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon3" style={{ width: '100px'}}>
                                            주소
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl id="basic-url" aria-describedby="basic-addon3"
                                         as="textarea" rows="2"
                                        onChange={e => this.inputDeliveryAddress(e)}
                                        defaultValue={this.state.address}
                                        />
                                </InputGroup >
                            </Card.Body> 
                            </Card> 
                        </InputGroup> 

                        {/* 
                        react table 비교후 결정
                        <RecipientController/> */}

                        <InputGroup size="sm" style={{ width:'100%'}} className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon3" >
                                    국내배송 <br/>요청사항
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Card style={{ width: '80%', height: '8em'}}>
                            <Card.Body>
                                <Form.Control id="basic-url" as="textarea" rows="3" 
                                            aria-describedby="basic-addon3"
                                            value={this.state.deliveryMessage}
                                            onChange={e => this.inputDeliveryMessage(e)}
                                            style={{ height:'5em'}}/>
                            </Card.Body> 
                            </Card> 
                        </InputGroup>

                        <InputGroup className="mb-3" style={{ width: '50%', marginTop:'10px', marginLeft:'25%', marginRight:'25%'}}>
                            <OverlayTrigger trigger="hover" overlay={popOver} placement="left">
                                <Button size="sm" variant='secondary' style={{ marginRight:'10px', fontSize:'14px'}}
                                    onClick={(e) => this.applyDeliveryService(e, allowToApply, itemNameLength)}
                                    //확인 창 떠서 예 클리하면 DB 전달
                                    //onClick={this.handleModalShow}
                                    >배송대행 신청하기
                                </Button>
                            </OverlayTrigger>
                            <Button size="sm" variant='secondary'>임시 저장하기</Button>
                        </InputGroup >

                        {/* if success after validation, then it shows the dialog*/}
                        <Modal show={this.state.show} onHide={this.handleModalClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>배송대행 신청</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>배송대행을 신청하시겠습니까?</Modal.Body>
                            <Modal.Footer>
                                {/* not automtic link */}
                                <NavLink to="/mypage">
                                    <Button variant="success" 
                                        //onClick={(e) => this.applyDeliveryService(e, allowToApply, itemNameLength)}
                                        onClick={this.handleModalClose}
                                        >
                                    예
                                    </Button>
                                </NavLink>
                                <Button variant="dark" onClick={this.handleModalClose}>
                                취소
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Card.Body>

                    <TransportShippingRequest 
                        applyDeliveryService={this.state.applyDeliveryService}
                        finishService={this.finishService}

                        easyShip={this.props.easyShip}

                        shippingProductList={this.state.shippingProductList}
                        deliveryObject={this.state.deliveryObject}

                        setOwnerContent={this.state.setOwnerContent}
                        registerFavoriteAddress={this.state.registerFavoriteAddress}

                        receiverNameByKorea={this.state.receiverNameByKorea}
                        receiverNameByEnglish={this.state.receiverNameByEnglish}
                        
                        privateTransit={this.state.privateTransit}
                        transitNumber={this.state.transitNumber}
                        agreeWithCollection={this.state.agreeWithCollection}
                        
                        phonenumberFirst={this.state.phonenumberFirst}
                        phonenumberSecond={this.state.phonenumberSecond}
                        
                        postCode={this.state.postCode}
                        deliveryAddress={this.state.deliveryAddress}
                        deliveryMessage={this.state.deliveryMessage}

                        accessToken={this.props.accessToken}
                        />
                </Card>
            </div>
            );
        }
    }
