import * as React from "react";
import { ShippingService } from "../ShippingService";
import styled from "styled-components";
import {
    AppContainer as BaseAppContainer,
  } from "../container";
import { Breadcrumb, Card, Form, InputGroup, FormControl, Dropdown, DropdownButton, Button } from 'react-bootstrap';
import { times, exchange, check, minus } from 'react-icons-kit/fa/'
import { Icon as BaseIcon } from "react-icons-kit";
import { TransportShippingRequest } from "../module_shippingService/TransportShippingRequest";

const Icon = props => <BaseIcon size={16} icon={props.icon} />;
const IconCnt = styled.div`
    
`;

const IconStyle = {justifyContent:"center"}

const AppContainer = styled(BaseAppContainer)`
    height: calc(330vh);
    width: 100vw;
`;

const BodyContainer = styled(BaseAppContainer)`
  height: calc(330vh);
  flex-direction: column;
`;

export class RequestShippingService extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { 
            //agreement:false,
            agreement:true,
        };
        this.handleChangeOnCheckbox = this.handleChangeOnCheckbox.bind(this);
    }

    handleChangeOnCheckbox(e) {
        this.setState({agreement:e.target.checked}) 
    }

  render() {
    const didAgreeWith=this.state.agreement;
    return(
        <div>
            <AppContainer>
                <ShippingService/>
                
                <BodyContainer>
                    <Breadcrumb>
                        <Breadcrumb.Item active>배송대행</Breadcrumb.Item>
                        <Breadcrumb.Item active>배송대행 신청</Breadcrumb.Item>
                    </Breadcrumb> 
                    <Card border="dark" style={{ width: '80%', height:'21rem', marginTop:'1rem' }}>
                        <Card.Header>서비스 신청시 주의사항</Card.Header>
                        <Card.Body style={{'max-height': 'calc(100vh - 210px)', 'overflow-y': 'auto'}}>
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
                            <Form.Check type='checkbox' onChange={e => this.handleChangeOnCheckbox(e)} label='주의사항을 모두 확인하였으며, 위의 내용에 동의하고 배송대행을 신청합니다.'/>
                        </Card.Footer>
                    </Card>
                    {didAgreeWith?<ShippingCenter/>:""}
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
        <div>
            <Card border="dark" style={{ width: '80%', height:'18rem', marginTop:'1rem' }}>
                <Card.Header>물류센터</Card.Header>
                <Card.Body >
                    <Card.Text>
                        <Form.Check type='radio' label='독일' checked='true'/>
                    </Card.Text> 
                </Card.Body>
                
                <Card.Header>서비스 선택</Card.Header>
                <Card.Body>
                    <Form.Check inline checked={this.state.easyShip} type='radio' onChange={e => this.handleChangeEasy(e)} label='간편배송' style={{marginRight:'10rem'}}/>
                    <Form.Check inline checked={this.state.customShip} type='radio' onChange={e => this.handleChangeCustom(e)} label='체크인배송'/>
                </Card.Body>
                <Card.Footer>
                    <Form.Check checked={this.state.understandWarning} type='checkbox' onChange={e => this.handleChangeWarn(e)} label='Box 어느 한면이라도 152cm를 초과하거나, 1건당 무게 30kg을 초과할 경우 신청불가'/>
                </Card.Footer>
            </Card>
            {didUnderstand ? <InputDeliveryContent easyShip={this.state.easyShip}/>:""}
            {/* {didUnderstand ? <InputDelivery/>:""} */}
            {didUnderstand ? <TransportShippingRequest/>:""}
        </div>
    );}
 }

 class InputDeliveryContent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            shopUrl:"",
            brandName:"",
            productName:"",
            trackingTitle:"운송사선택",
            trackingNumber:"",
            categoryTitle:"선택",
            itemTitle:"선택",
            brandName:"",
            receiverNameByKorea:"",
            receiverNameByEnglish:"",
            prouctPrice:"",
            productAmount:"",
            totalPrice:"",
            changeServiceCall:false,
        };
        this.inputTrackingTitle         = this.inputTrackingTitle.bind(this);
        this.inputTrackingNumber        = this.inputTrackingNumber.bind(this);
        this.handleSelectCategory       = this.handleSelectCategory.bind(this);
        this.handleSelectItem           = this.handleSelectItem.bind(this);
        this.inputBrandName             = this.inputBrandName.bind(this);
        this.inputItemName              = this.inputItemName.bind(this);
        this.inputReceiverNameByKorea    = this.inputReceiverNameByKorea.bind(this); 
        this.inputReceiverNameByEnglish  = this.inputReceiverNameByEnglish.bind(this); 

        this.inputProductPrice  = this.inputProductPrice.bind(this);
        this.inputProductAmount = this.inputProductAmount.bind(this);
        this.inputTotalPrice    = this.inputTotalPrice.bind(this);
        this.inputShopUrl       = this.inputShopUrl.bind(this);
        this.changeServiceCall  = this.changeServiceCall.bind(this);
    }

    handleChangeOwnerCheckbox(event){
        
    }

    inputTrackingTitle(event, company) {
        this.setState({trackingTitle:company}) 
    }

    inputTrackingNumber(event){
        this.setState({trackingNumber:event.target.value}) 
    }

    handleSelectCategory(event,ct) {
        this.setState({categoryTitle:ct}) 
    }

    inputBrandName(event){
        this.setState({brandName:event.target.value}) 
    }

    inputItemName(event){
        this.setState({itemName:event.target.value}) 
    }

    handleSelectItem(event, it) {
        this.setState({itemTitle:it}) 
    }

    inputReceiverNameByKorea(event){
        this.setState({receiverNameByKorea:event.target.value}) 
    }

    inputReceiverNameByEnglish(event){
        this.setState({receiverNameByEnglish:event.target.value}) 
    }

    inputShopUrl(event){
        this.setState({
            shopUrl:event.target.value
        })
    }

    inputProductPrice(event){
        const price = (event.target.value === "") || (event.target.value === null) ? "" : parseInt(event.target.value)
        const amount = this.state.productAmount === "" ? "" : parseInt(this.state.productAmount)
        const total = (price === "") || (amount === "") ? "" : price+amount
        this.setState({
            productPrice:price,
            totoalPrice:total
        })
        console.log("product price")
        console.log(price+"_"+amount+"_"+total)
        console.log(this.state.productPrice+"_"+this.state.productAmount+"_"+this.state.totalPrice)
    }

    inputProductAmount(event){
        const price = (this.state.productAmount === "") ? "" : parseInt(this.state.productPrice)
        const amount = (event.target.value === "") || (event.target.value == null) ? "" : parseInt(event.target.value)
        const total = (price === "") || (amount === "") ? "" : price+amount
        this.setState({
            productAmount:amount,
            totoalPrice:total
        })
        console.log("product amount")
        console.log(price+"_"+amount+"_"+total)
        console.log(this.state.productPrice+"_"+this.state.productAmount+"_"+this.state.totalPrice)
    }

    inputTotalPrice(event){
        console.log("total price")

        const price =  this.state.productPrice === "" ? "" : parseInt(this.state.productPrice) 
        const amount = this.state.productAmount === "" ? "" : parseInt(this.state.productAmount)
        const total = (price === "") || (amount === "") ? "" : price+amount
        console.log(price)
        this.setState({
            totalPrice:total
        })
    }

    changeServiceCall(){
        this.setState({
            changeServiceCall:true,
        })
    }

    render(){

        const price = this.state.productPrice
        const priceInt  = (price === "") || (price === null) || (price === undefined) ? "" : parseInt(price)
        
        const amount = this.state.productAmount
        const amountInt = (amount === "") || (amount === null || (amount === undefined)) ? "" : parseInt(amount)
        const totalPrice = (priceInt === "" || amountInt === "") ? "" : priceInt + amountInt

        return(
            <Card>
            {/* 상품입력 박스*/}
            <Card border="dark" style={{ width: '80%', height:'26rem', marginTop:'1rem', marginBottom:'1rem' }}>
                <Card.Header>상품입력</Card.Header>
                <Card.Body >

                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon3">
                            쇼핑몰 URL
                        </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl id="basic-url" aria-describedby="basic-addon3"
                            onChange = {this.inputShopUrl} 
                            placeholder="정확한 URL을 입력해주세요"/>
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon3">
                            트랙킹번호
                        </InputGroup.Text>
                        </InputGroup.Prepend>
                       
                        <DropdownButton
                            as={InputGroup.Prepend}
                            variant="outline-secondary"
                            title={this.state.trackingTitle}
                            id="input-group-dropdown-1"
                            >
                            <Dropdown.Item onSelect={e => this.inputTrackingTitle(e, "DHL")}>DHL</Dropdown.Item>
                            <Dropdown.Item onSelect={e => this.inputTrackingTitle(e, "헤르메스")}>헤르메스</Dropdown.Item>
                            <Dropdown.Item onSelect={e => this.inputTrackingTitle(e, "기타")}>기타</Dropdown.Item>
                        </DropdownButton>
                        <FormControl id="basic-url" aria-describedby="basic-addon3" 
                            placeholder="트랙킹번호"
                            onChange = {this.inputTrackingNumber}/>
                        <InputGroup.Append>
                            <InputGroup.Text>트랙킹번호 허위/미기재시 입고가 지연/미처리 될수 있습니다.</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>

                    <InputGroup className="mb-3">
                   
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon4">
                                카테고리
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                       
                        <DropdownButton
                            as={InputGroup.Prepend}
                            variant="outline-secondary"
                            title={this.state.categoryTitle}
                            id="input-group-dropdown-category"
                            style={{ marginRight: '200px'}}
                            >
                            <Dropdown.Item onSelect={e => this.handleSelectCategory(e, "전자제품")}>전자제품</Dropdown.Item>
                            <Dropdown.Item onSelect={e => this.handleSelectCategory(e, "음식")}>음식</Dropdown.Item>
                            <Dropdown.Item onSelect={e => this.handleSelectCategory(e, "동물")}>동물</Dropdown.Item>
                        </DropdownButton>

                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon4">
                                품목
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                       
                        <DropdownButton
                            as={InputGroup.Prepend}
                            variant="outline-secondary"
                            title={this.state.itemTitle}
                            id="input-group-dropdown-category"
                            >
                            <Dropdown.Item onSelect={e => this.handleSelectItem(e, "오디오")}>오디오</Dropdown.Item>
                            <Dropdown.Item onSelect={e => this.handleSelectItem(e, "쌀")}>쌀</Dropdown.Item>
                            <Dropdown.Item onSelect={e => this.handleSelectItem(e, "강아지")}>강아지</Dropdown.Item>
                        </DropdownButton>
                       
                    </InputGroup>
                    
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon3">
                            브랜드(영문)
                        </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl id="basic-url" aria-describedby="basic-addon3"
                            placeholder="정확한 브랜드이름을 입력해주세요"
                            onChange = {this.inputBrandName}/>
                    </InputGroup>

                     <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon3">
                            상품명(영문)
                        </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl id="basic-url" aria-describedby="basic-addon3" 
                            placeholder="정확한 영문 상품명을 입력해주세요"
                            onChange = {this.inputItemName}/>
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon3">
                            단가/수량
                        </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl id="basic-url" aria-describedby="basic-addon3" 
                            placeholder="상품단가"
                            value={this.state.productPrice}
                            onChange = {this.inputProductPrice}/>
                        <IconCnt style={{marginTop:"5px",marginLeft:"2px", marginRight:"2px"}}>
                                <Icon icon={ times } />
                        </IconCnt>

                        <FormControl id="basic-url" aria-describedby="basic-addon3" 
                            placeholder="수량"
                            value={this.state.prouctAmount}
                            onChange = {this.inputProductAmount}/>
                        <IconCnt style={{marginTop:"5px", marginLeft:"5px", marginRight:"5px"}}>
                                <Icon icon={ exchange } />
                        </IconCnt>

                        <FormControl id="basic-url" aria-describedby="basic-addon3" 
                            value={ totalPrice }
                            onChange = { this.inputTotalPrice }
                            readOnly = "true"
                            />
                        <InputGroup.Append>
                                <InputGroup.Text>(Euro)</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                </Card.Body>
            </Card>
            
            {/* 받는분정보 박스 */}
            <Card border="dark" style={{ width: '80%', height:'60rem', marginTop:'1rem', marginBottom:'1rem' }}>
                    <Card.Header>받는분 정보</Card.Header>
                    <Card.Body >
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon3">
                                    받는분
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Card style={{ width: '90%'}}>
                            <Card.Body>
                                    <InputGroup className="mb-3" style={{ width: '80%'}}>
                                        <InputGroup.Prepend >
                                            <InputGroup.Text id="basic-addon3">
                                                이름(국문)
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                    <FormControl id="basic-url" aria-describedby="basic-addon3"
                                        onChange = { this.inputReceiverNameByKorea }
                                    />
                                    <Form.Check type='checkbox' 
                                        onChange={e => this.handleChangeOwnerCheckbox(e)} label='회원정보와 동일'
                                        style={{marginLeft:'5px', marginTop:'5px', marginRight:'20px'}}
                                    />
                                    <Button variant="secondary">받는분 정보 불러오기</Button>
                                    
                                    </InputGroup >
                                    <InputGroup className="mb-3" style={{ width: '40%'}}>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="basic-addon3">
                                                이름(영문)
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl id="basic-url" aria-describedby="basic-addon3"
                                            onChange = { this.inputReceiverNameByEnglish }/>
                                    </InputGroup>    
                                    <Card.Body>
                                    <InputGroup>
                                        <IconCnt style={{ marginRight:"5px" }}>
                                            <Icon icon={ check } />
                                        </IconCnt>
                                        <Card.Text>상품을 수취하실 분의 성함/사업자 상호를 적어주세요. 상품도착후 변경은 불가능합니다</Card.Text>
                                    </InputGroup>
                                    <InputGroup>
                                        <IconCnt style={{ marginRight:"5px" }}>
                                            <Icon icon={ check } />
                                        </IconCnt>
                                        <Card.Text>통관시 받는분을 기준으로 수입신고 합니다.</Card.Text>
                                    </InputGroup>
                                    <InputGroup>
                                        <IconCnt style={{ marginRight:"5px" }}>
                                            <Icon icon={ check } />
                                        </IconCnt>
                                        <Card.Text>사업자 통관으로 진행하실 경우 받는분 이름(국문/영문)을 사업체 이름으로 기입주세요.</Card.Text>
                                    </InputGroup>
                                    </Card.Body>
                            </Card.Body> 
                            </Card> 
                        </InputGroup>
                   
                        <InputGroup className="mb-3" >
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon3" >
                                    받는분 정보
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Card style={{ width: '86%'}}>
                            <Card.Body>
                                <Form.Check inline checked={this.state.easyShip} type='radio' onChange={e => this.handleChangeEasy(e)} label='개인통관고유번호' style={{marginRight:'10rem'}}/>
                                <Form.Check inline checked={this.state.customShip} type='radio' onChange={e => this.handleChangeCustom(e)} label='사업자번호(사업자통관)'/>
                                        
                                    <InputGroup className="mb-3" style={{ width: '80%', marginTop:'10px'}}>
                                        <FormControl id="basic-url" aria-describedby="basic-addon3" placeholder="8자리 고유번호" style={{ marginRight:'10px'}}/>
                                        <Button variant='secondary' style={{ marginRight:'10px'}}>발급방법</Button>
                                        <Button variant='secondary'>내 개인통관고유번호 저장</Button>
                                    </InputGroup >
                                    <Form.Check type='checkbox' 
                                        onChange={e => this.handleChangeOwnerCheckbox(e)} label='수입통관신고를 위한 개인통관고유번호 수집에 동의합니다'
                                        style={{}}
                                    />
                                     <InputGroup>
                                     <IconCnt style={{ marginRight:"5px" }}>
                                        <Icon icon={ check } />
                                    </IconCnt>
                                    <Card.Text style={{marginTop:'5px'}}>목록통관 대상품목도 개인통관고유번호 제출이 필수입니다.</Card.Text>
                                    </InputGroup>
                            </Card.Body> 
                            </Card> 
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon3" >
                                    연락처
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Card style={{ width: '90%'}}>
                            <Card.Body>
                                <InputGroup className="mb-3" style={{ width: '50%'}}>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon3">
                                            연락처
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl id="basic-url" aria-describedby="basic-addon3" />
                                        <IconCnt style={{ marginRight:"5px", marginLeft:"5px", marginTop:"5px" }}>
                                            <Icon icon={ minus } />
                                        </IconCnt>
                                    <FormControl id="basic-url" aria-describedby="basic-addon3" />
                                        <IconCnt style={{ marginRight:"5px", marginLeft:"5px", marginTop:"5px" }}>
                                            <Icon icon={ minus } />
                                        </IconCnt>
                                    <FormControl id="basic-url" aria-describedby="basic-addon3" />
                                </InputGroup >
                                <InputGroup className="mb-3" style={{ width: '40%'}}>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon3">
                                            우편번호
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl id="basic-url" aria-describedby="basic-addon3" style={{ marginRight:'10px'}}/>
                                    <Button variant='secondary' >우편번호 찾기</Button>
                                </InputGroup >
                                <InputGroup className="mb-3" style={{ width: '50%'}}>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon3">
                                            주소
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl id="basic-url" aria-describedby="basic-addon3" />
                                </InputGroup >
                                <InputGroup className="mb-3" style={{ width: '50%'}}>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon3">
                                            상세주소
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl id="basic-url" aria-describedby="basic-addon3" />
                                </InputGroup >
                            </Card.Body> 
                            </Card> 
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon3" >
                                    국내배송 요청사항
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Card style={{ width: '80%'}}>
                            <Card.Body>
                            </Card.Body> 
                            </Card> 
                        </InputGroup>

                        <InputGroup className="mb-3" style={{ width: '50%', marginTop:'10px', marginLeft:'25%', marginRight:'25%'}}>
                            <Button size="lg" variant='secondary' style={{ marginRight:'10px'}}
                                onClick={this.changeServiceCall}
                                >배송대행 신청하기
                            </Button>
                            <Button size="lg" variant='secondary'>임시 저장하기</Button>
                        </InputGroup >

                    </Card.Body>
                    <TransportShippingRequest 
                        serviceCall={this.state.changeServiceCall}
                        shopUrl={this.state.shopUrl}
                        trackingTitle={this.state.trackingTitle}
                        trackingNumber={this.state.trackingNumber}
                        categoryTitle={this.state.categoryTitle}
                        itemTitle={this.state.itemTitle}
                        brandName={this.state.brandName}
                        itemName={this.state.itemName}
                        totalPrice={this.state.totalPrice}
                        receiverNameByKorea={this.state.receiverNameByKorea}
                        receiverNameByEnglish={this.state.receiverNameByEnglish}
                        easyShip={this.props.easyShip}
                        />
                </Card>
            </Card>
            );
        }
    }
