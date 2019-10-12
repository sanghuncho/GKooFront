import styled from "styled-components";
import React from 'react';
import { Table, Card,Button } from "react-bootstrap"

const WhiteSmoke = '#F5F5F5'

export class MyPageDetailProducts extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          doEdit:false,
          setButton:true,
        }

        this.showStoredProductsList = this.showStoredProductsList.bind(this)
      }

      doEditProductsList(){
        this.setState({doEdit:true}) 
        this.setState({setButton:false}) 
      }

      showStoredProductsList(){
        this.setState({doEdit:false}) 
        this.setState({setButton:true}) 
      }

      componentDidMount () {
      }
      
      render() {
        const setButton = this.state.setButton
        let editButton;
        if(setButton) {
          editButton = <Button variant="secondary" size="sm" onClick={(e) => this.doEditProductsList(e)} 
                            style={{ marginRight: '10px', float:"right"}}>수정</Button>
        }

        const doEdit = this.state.doEdit
        let displayHeight;

        let productsListDisplay;
        if (doEdit) {
            productsListDisplay = 
              <EditorProductsList 
                showStoredProductsList={this.showStoredProductsList}
               />
            displayHeight = '67rem'
          } else {
            const dynamicHeight = (12 + 15*(this.props.productsInfo.length))
            displayHeight = dynamicHeight + 'rem'
            productsListDisplay = <CompleteProductsListDisplay 
                productsInfo={this.props.productsInfo}
                productsCommonInfo={this.props.productsCommonInfo}/>
          }
        return (
          <div>
            <Card border="dark" style={{ width: '100%', height:displayHeight, marginTop:'1rem' }}>
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
      }
      
      render() {
        return (
          <div>
            {/* <Card border="dark" style={{ width: '80%', height:{heightOfInputProduct}, marginTop:'1rem', marginBottom:'1rem' }}>
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
                            <Dropdown.Item onSelect={e => this.inputTrackingTitle(e, "DHL")}>DHL</Dropdown.Item>
                            <Dropdown.Item onSelect={e => this.inputTrackingTitle(e, "헤르메스")}>헤르메스</Dropdown.Item>
                            <Dropdown.Item onSelect={e => this.inputTrackingTitle(e, "기타")}>기타</Dropdown.Item>
                        </DropdownButton>
                        <FormControl id="basic-url" aria-describedby="basic-addon3" 
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
                            variant={itemTitleVariant}
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
                            value={this.state.productPrice}
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

                {this.state.goodsList.map((itemName, index) => { return (
                    <div key={index}>

                    <AdditionalProduct index={index} 
                        shopUrlList={this.state.shopUrlList}
                        trackingTitleList = {this.state.trackingTitleList}
                        trackingNumberList = {this.state.trackingNumberList}
                        categoryTitleList = {this.state.categoryTitleList}
                        itemTitleList = {this.state.itemTitleList}
                        brandNameList = {this.state.brandNameList}
                        itemNameList = {this.state.itemNameList}
                        productPriceList = {this.state.productPriceList}
                        productAmountList = {this.state.productAmountList}
                        totalPriceList = {this.state.totalPriceList}

                        removeItemOnList={this.removeItemOnList}
                        />
                    </div>
                )})}

                 <Button variant="secondary" size="sm" onClick={(e) => this.addItemOnList(e)} 
                            style={{ marginRight: '10%', marginTop: '10px', float:"right"}}>상품 추가</Button>
                </Card.Body>

            </Card> */}
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
                  <td width='300px'>트래킹번호</td>
                  <td width='300px'>{this.props.productsCommonInfo.trackingNr}</td>
                </tr>
                <tr>
                  <td>쇼핑몰 URL</td>
                  <td>{this.props.productsCommonInfo.shopUrl}</td>
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
                        <td width='300px'>{this.props.product.categorytitle}</td>
                    </tr>
                    <tr>
                        <td>품목</td>
                        <td>{this.props.product.itemtitle}</td>
                    </tr>
                    <tr>
                        <td>브랜드</td>
                        <td>{this.props.product.brandname}</td>
                    </tr>
                    <tr>
                        <td>상품명</td>
                        <td>{this.props.product.itemname}</td>
                    </tr>
                    <tr>
                        <td>수량</td>
                        <td>{this.props.product.amount}</td>
                    </tr>
                    <tr>
                        <td>단가</td>
                        <td>{this.props.product.price}원</td>
                    </tr>
                    </tbody>
                </Table>
          </div>
        );
      }    
}