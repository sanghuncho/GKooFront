import styled from "styled-components";
import React from 'react';
import { Form, Table, Card, Button, InputGroup, FormControl, Dropdown, DropdownButton } from "react-bootstrap"
import { InfoBadge } from "../module_base_component/InfoBadge";
import { Icon as BaseIcon } from "react-icons-kit";
import { times, exchange} from 'react-icons-kit/fa/'
import { headers, basePort } from "../module_mypage/AuthService"

const WhiteSmoke = '#F5F5F5'

const Icon = props => <BaseIcon size={16} icon={props.icon} />;
const IconCnt = styled.div`
`;

export class MyPageDetailProducts extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          doEdit:false,
          setButton:true,
        }

        this.handleShowStoredProductsList = this.handleShowStoredProductsList.bind(this)
      }

      handleEditProductsList(){
        this.setState({doEdit:true}) 
        this.setState({setButton:false}) 
      }

      handleShowStoredProductsList(){
        this.setState({doEdit:false}) 
        this.setState({setButton:true}) 
      }

      componentDidMount () {
      }
      
      render() {
        const setButton = this.state.setButton
        let editButton;
        if(setButton) {
          editButton = <Button variant="secondary" size="sm" onClick={(e) => this.handleEditProductsList(e)} 
                            style={{ marginRight: '10px', float:"right"}}>수정</Button>
        }

        const doEdit = this.state.doEdit
        let displayHeight;

        let productsListDisplay;
        if (doEdit) {
            productsListDisplay = 
              <EditorProductsList 
                handleShowStoredProductsList={this.handleShowStoredProductsList}
                productsInfo={this.props.productsInfo}
                productsCommonInfo={this.props.productsCommonInfo}
                orderNumber={this.props.orderNumber}
                accessToken={this.props.accessToken}
               />
            //displayHeight = '67rem'
            const dynamicHeight = (20 + 22*(this.props.productsInfo.length))
            displayHeight = dynamicHeight + 'rem'
          } else {
            const dynamicHeight = (14 + 17*(this.props.productsInfo.length))
            displayHeight = dynamicHeight + 'rem'
            productsListDisplay = <CompleteProductsListDisplay 
                productsInfo={this.props.productsInfo}
                productsCommonInfo={this.props.productsCommonInfo}/>
          }
        return (
          <div>
            <Card border="dark" style={{ width: '80%', height:displayHeight, marginTop:'1rem' }}>
                <Card.Header>상품 정보
                  {editButton}
                </Card.Header>
                <Card.Body >
                  
                  {productsListDisplay}
               
                </Card.Body>
            </Card>
              {/* <CompleteProductsDisplay
                productsInfo={this.props.productsInfo}
                productsCommonInfo={this.props.productsCommonInfo}/> */}
          </div>
        );
      }    
}

export class EditorProductsList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            orderNumber:this.props.orderNumber,
            shopUrl:this.props.productsCommonInfo.shopUrl,
            trackingTitle:this.props.productsCommonInfo.trackingCompany,
            trackingNumber:this.props.productsCommonInfo.trackingNr,
            shippingProductList:[],
            deliveryObject: null,
        }

        this.handleShopUrl = this.handleShopUrl.bind(this);
        this.handleTrackingTitle = this.handleTrackingTitle.bind(this);
        this.handleTrackingNumber  = this.handleTrackingNumber.bind(this);
        this.handleSave = this.handleSave.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }

    componentDidMount() {
        for(var i=0; i<this.props.productsInfo.length; i++){
          this.state.shippingProductList[i] = ""
        }

        //{/* set the first product element */}
        //this.state.shippingProductList[0] = shippingProduct

        var deliveryObject = {
            shopUrl:this.props.productsCommonInfo.shopUrl,
            trackingTitle:this.props.productsCommonInfo.trackingCompany,
            trackingNumber:this.props.productsCommonInfo.trackingNr
        }
        this.setState({deliveryObject:deliveryObject})
    }

    handleShopUrl(event){
        this.setState({shopUrl:event.target.value})
        this.state.deliveryObject.shopUrl = event.target.value
    }

    handleTrackingTitle(event, company) {
        this.setState({trackingTitle:company})
        this.state.deliveryObject.trackingTitle=company
    }

    handleTrackingNumber(event){
        this.setState({trackingNumber:event.target.value})
        this.state.deliveryObject.trackingNumber = event.target.value 
    }

    handleCancel(update){

        /* ToDo : dynamic position of product info */
        window.scrollTo(0, 1000);
        this.props.handleShowStoredProductsList()
    }

    updateDataEditorProductsList(accessToken){

        const editedProductsData =  [
            {orderNumber: this.state.orderNumber},
            {deliveryDataObject: JSON.stringify(this.state.deliveryObject)},
            {shippingProductList: JSON.stringify(this.state.shippingProductList)}
        ]

        this.setTokenHeader(accessToken)
        fetch(basePort + '/updateDataEditorProductsList', 
                  {method:'post', headers, 
                    body:JSON.stringify(editedProductsData)})
    }

    handleSave(){
        //comparing the state?

        this.updateDataEditorProductsList(this.props.accessToken)
        
        window.scrollTo(0, 340);
        window.location.reload();
        this.props.handleShowStoredProductsList()
    }

    setTokenHeader(token){
        headers ['Authorization'] = 'Bearer ' + token;
    }
      
      render() {
        
        return (
          <div>
            {/*strcture.1: display the shop url, tracking data editor */}
            {/* <Card border="dark" style={{ width: '90%', marginTop:'1rem', marginBottom:'1rem' }}>
                <Card.Header>상품입력</Card.Header>          
                <Card.Body> */}
                    <Card border="dark" style={{ width: '90%', marginBottom:'1rem'}}>
                        <Card.Header>상품 배송 정보</Card.Header>
                        <Card.Body >
                        <InputGroup size="sm" style={{ width:'90%'}} className="mb-3" >
                            <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon3" style={{ width: '100px'}} >
                                쇼핑몰 URL
                            </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl id="basic-url" aria-describedby="basic-addon3"
                                onChange = {this.handleShopUrl} 
                                placeholder="정확한 URL을 입력해주세요"
                                defaultValue={this.state.shopUrl}
                            />
                        </InputGroup>

                        <InputGroup size="sm" style={{ width:'90%'}} className="mb-3">
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
                                <Dropdown.Item onSelect={e => this.handleTrackingTitle(e, "DHL")}>DHL</Dropdown.Item>
                                <Dropdown.Item onSelect={e => this.handleTrackingTitle(e, "헤르메스")}>헤르메스</Dropdown.Item>
                                <Dropdown.Item onSelect={e => this.handleTrackingTitle(e, "기타")}>기타</Dropdown.Item>
                            </DropdownButton>
                            <FormControl id="basic-url" aria-describedby="basic-addon3" 
                                style={{ width: '200px'}} 
                                placeholder="트랙킹번호"
                                onChange = {this.handleTrackingNumber}
                                defaultValue={this.state.trackingNumber}
                                />
                            <InfoBadge infoText={"트랙킹번호 허위/미기재시 입고가 지연/미처리 될수 있습니다."} />
                        </InputGroup>
                        </Card.Body>
                    </Card>
                {/* </Card.Body>
            </Card> */}

            {/*strcture.2: show the products list editor*/}
            {this.state.shippingProductList.map((itemName, index) => { return (
                    <div key={index}>
                      <MyPageDetailProductEditor productIndex={index}
                        product={this.props.productsInfo[index]}
                        shippingProductList={this.state.shippingProductList}
                        />
                    </div>
            )})}

            <InputGroup className="mb-3"  style={{ marginTop:'10px',marginLeft:'40%'}} >
                <Button size="sm" variant='secondary' style={{ marginRight:'10px'}}
                    onClick={this.handleSave}
                    >완료
                </Button>
                <Button size="sm" variant='secondary'
                    onClick={(e) => this.handleCancel(e)}
                >취소</Button>
            </InputGroup >
          </div>
        );
      }    
}

export class CompleteProductsListDisplay extends React.Component{
    constructor(props) {
        super(props);
        
      }

      render() {
        var array = new Array()
        for(var i=0; i<this.props.productsInfo.length; i++){
          array.push(i)
        }

        return (
          <div>
            <Table bordered condensed responsive size="sm">
                <thead>
                </thead>
                <tbody>
                <tr>
                  <td>쇼핑몰 URL</td>
                  <td>{this.props.productsCommonInfo.shopUrl}</td>
                </tr>
                <tr>
                  <td width='300px'>운송사</td>
                  <td width='300px'>{this.props.productsCommonInfo.trackingCompany}</td>
                </tr>
                <tr>
                  <td width='300px'>트래킹번호</td>
                  <td width='300px'>{this.props.productsCommonInfo.trackingNr}</td>
                </tr>
                </tbody>
                </Table>

                {array.map((itemName, index) => { return (
                    <div key={index}>
                      <MyPageDetailProduct productIndex={index+1}
                        product={this.props.productsInfo[index]}/>
                    </div>
                )})}

          </div>
        );
      }    
  }

class MyPageDetailProductEditor extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            categoryTitle:this.props.product.categoryTitle,
            isValidCategory:false,
            categoryVariant:"outline-secondary",

            itemTitle:this.props.product.itemTitle,
            isValidItemTitle:false,
            itemTitleVariant:"outline-secondary",

            brandName:this.props.product.brandName,
            itemName:this.props.product.itemName,
            isValidItemName:false,
            warningInvalidItemName: false,
            heightOfInputProduct:"26",

            productPrice:this.props.product.price,
            productAmount:this.props.product.amount,
            productTotalPrice:this.props.product.totalPrice,
            isValidTotalPrice:false,
        };

        this.handleSelectCategory = this.handleSelectCategory.bind(this);
        this.handleSelectItem = this.handleSelectItem.bind(this);
        this.inputBrandName = this.inputBrandName.bind(this);
        this.inputItemName = this.inputItemName.bind(this);
        this.inputProductPrice  = this.inputProductPrice.bind(this);
        this.inputProductAmount = this.inputProductAmount.bind(this);
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

        this.props.shippingProductList[this.props.productIndex] = shippingProduct
        this.props.shippingProductList[this.props.productIndex].categoryTitle = this.props.product.categoryTitle
        this.props.shippingProductList[this.props.productIndex].itemTitle = this.props.product.itemTitle
        this.props.shippingProductList[this.props.productIndex].brandName = this.props.product.brandName
        this.props.shippingProductList[this.props.productIndex].itemName = this.props.product.itemName
        this.props.shippingProductList[this.props.productIndex].productPrice = this.props.product.price
        this.props.shippingProductList[this.props.productIndex].productAmount = this.props.product.amount
        this.props.shippingProductList[this.props.productIndex].productTotalPrice = this.props.product.totalPrice
    }

    handleSelectCategory(event, title) {
        this.setState({categoryTitle:title, categoryVariant:"outline-secondary", isValidCategory:true})
        this.props.shippingProductList[this.props.productIndex].categoryTitle = title
    }

    handleSelectItem(event, it) {
        this.setState({itemTitle:it, itemTitleVariant:"outline-secondary", isValidItemTitle:true})
        this.props.shippingProductList[this.props.productIndex].itemTitle = it
    }

    inputBrandName(event){
        this.setState({brandName:event.target.value})
        this.props.shippingProductList[this.props.productIndex].brandName = event.target.value
    }

    inputItemName(event){
        this.setState({itemName:event.target.value})
        const itemName = this.state.itemName
        itemName === "" ?  this.setState({isValidItemName:false}) : 
            this.setState({isValidItemName:true, warningInvalidItemName:false})
        this.props.shippingProductList[this.props.productIndex].itemName = event.target.value
    }

    inputProductPrice(event){
        const inputPrice = event.target.value
        //const isProperPrice = Number.isInteger(parseInt(inputPrice))
        const amount = this.state.productAmount === "" ? "" : parseInt(this.state.productAmount)
        const productTotalPrice = (inputPrice === "") || (amount === "") ? "" : inputPrice*amount 
        this.setState({productPrice:inputPrice, productTotalPrice:productTotalPrice})
        this.props.shippingProductList[this.props.productIndex].productPrice = inputPrice
        this.props.shippingProductList[this.props.productIndex].productTotalPrice = productTotalPrice
    }

    inputProductAmount(event){
        const amount = (event.target.value === "") || (event.target.value == null) ? "" : parseInt(event.target.value)
        const price =  this.state.productPrice === "" ? "" : parseInt(this.state.productPrice)
        const productTotalPrice = (price === "") || (amount === "") ? "" : price*amount 
        this.setState({productAmount:amount, productTotalPrice:productTotalPrice})
        this.props.shippingProductList[this.props.productIndex].productAmount = amount
        this.props.shippingProductList[this.props.productIndex].productTotalPrice = productTotalPrice
    }
      
      render() {
        //const index = this.props.index
        //const categoryVariant = this.state.categoryVariant
        //const itemTitleVariant = this.state.itemTitleVariant
        const warningInvalidItemName =  this.state.warningInvalidItemName

        const price = this.state.productPrice
        const isNumberPrice = Number(price) 
        const priceInt  = isNumberPrice ? price : 0
        
        const amount = this.state.productAmount
        const isNumberAmount = Number(amount) 
        const amountInt = isNumberAmount ? parseInt(amount) : 0 
        const productTotalPrice = priceInt*amountInt

        return (
          <div>
              <Card border="dark" style={{ width: '90%', marginTop:'10px'}}>
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
                        variant = {this.state.categoryVariant}
                        title={this.state.categoryTitle}                        
                        id="input-group-dropdown-category"
                        style={{ marginRight: '200px'}}
                        >
                        <Dropdown.Item onSelect={e => this.handleSelectCategory(e, "전자제품")}>전자제품</Dropdown.Item>
                        <Dropdown.Item onSelect={e => this.handleSelectCategory(e, "음식")}>음식</Dropdown.Item>
                        <Dropdown.Item onSelect={e => this.handleSelectCategory(e, "동물")}>동물</Dropdown.Item>
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
                        variant={this.state.itemTitleVariant}
                        title={this.state.itemTitle}
                        id="input-group-dropdown-category"
                        >
                        <Dropdown.Item onSelect={e => this.handleSelectItem(e, "오디오")}>오디오</Dropdown.Item>
                        <Dropdown.Item onSelect={e => this.handleSelectItem(e, "쌀")}>쌀</Dropdown.Item>
                        <Dropdown.Item onSelect={e => this.handleSelectItem(e, "강아지")}>강아지</Dropdown.Item>
                    </DropdownButton>
                   
                </InputGroup>
                
                <InputGroup size="sm" style={{ width:'70%'}} className="mb-3">
                    <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon3" style={{ width: '110px'}}>
                        브랜드(영문)
                    </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl id="basic-url" aria-describedby="basic-addon3"
                        //placeholder="정확한 브랜드이름을 입력해주세요"
                        value={this.state.brandName}
                        onChange = {this.inputBrandName}/>
                </InputGroup>

                <InputGroup size="sm" style={{ width:'70%'}} className="mb-3">
                    <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon3" style={{ width: '110px'}}>
                        상품명(영문)
                    </InputGroup.Text>
                    </InputGroup.Prepend>
                   
                    <Form.Control id="basic-url" aria-describedby="basic-addon3" 
                        //placeholder="정확한 영문 상품명을 입력해주세요"
                        value={this.state.itemName}
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
                        value={this.state.productPrice}
                        onChange = {this.inputProductPrice}/>
                    <IconCnt style={{marginTop:"2px",marginLeft:"2px", marginRight:"2px"}}>
                            <Icon icon={ times } />
                    </IconCnt>

                    <FormControl id="basic-url" aria-describedby="basic-addon3" 
                        placeholder="수량"
                        value={this.state.productAmount}
                        onChange = {this.inputProductAmount}/>
                    <IconCnt style={{marginTop:"2px", marginLeft:"5px", marginRight:"5px"}}>
                            <Icon icon={ exchange } />
                    </IconCnt>

                    <FormControl id="basic-url" aria-describedby="basic-addon3" 
                        value={ productTotalPrice }
                        //onChange = { this.inputProductTotalPrice }
                        readOnly = "true"
                        />
                    <InputGroup.Append>
                            <InputGroup.Text>(Euro)</InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
                
             </Card.Body>
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
                    <tr bgcolor={WhiteSmoke}>
                        <td width='300px'>상품</td>
                        <td width='300px'>{this.props.productIndex}</td>
                    </tr>
                    <tr>
                        <td width='300px'>카테고리</td>
                        <td width='300px'>{this.props.product.categoryTitle}</td>
                    </tr>
                    <tr>
                        <td>품목</td>
                        <td>{this.props.product.itemTitle}</td>
                    </tr>
                    <tr>
                        <td>브랜드</td>
                        <td>{this.props.product.brandName}</td>
                    </tr>
                    <tr>
                        <td>상품명</td>
                        <td>{this.props.product.itemName}</td>
                    </tr>
                    <tr>
                        <td>단가</td>
                        <td>{this.props.product.price}원</td>
                    </tr>
                    <tr>
                        <td>수량</td>
                        <td>{this.props.product.amount}개</td>
                    </tr>
                    <tr>
                        <td>총 가격</td>
                        <td>{this.props.product.totalPrice}원</td>
                    </tr>
                    
                    </tbody>
                </Table>
          </div>
        );
      }    
}