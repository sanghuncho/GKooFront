import * as React from "react";
import styled from "styled-components";
import { Card, Form, InputGroup, FormControl, Dropdown, DropdownButton, Button } from 'react-bootstrap';
import { times, exchange} from 'react-icons-kit/fa/'
import { Icon as BaseIcon } from "react-icons-kit";

const Icon = props => <BaseIcon size={16} icon={props.icon} />;
const IconCnt = styled.div`
`;

export class AdditionalProduct extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            //shopUrl:"",
            
            //trackingTitle:"운송사선택",
            trackingNumber:"",

            categoryTitle:"선택",
            isValidCategory:false,
            categoryVariant:"outline-secondary",

            itemTitle:"선택",
            isValidItemTitle:false,
            itemTitleVariant:"outline-secondary",

            brandName:"",
            itemName:"",
            isValidItemName:false,
            warningInvalidItemName: false,
            heightOfInputProduct:"26",

            productPrice:"",
            productAmount:"",
            totalPrice:"",
            isValidTotalPrice:false,

        }
        //this.inputShopUrl               = this.inputShopUrl.bind(this);
        //this.inputTrackingTitle         = this.inputTrackingTitle.bind(this);
        this.inputTrackingNumber        = this.inputTrackingNumber.bind(this);

        this.handleSelectCategory       = this.handleSelectCategory.bind(this);
        this.handleSelectItem           = this.handleSelectItem.bind(this);

        this.inputBrandName             = this.inputBrandName.bind(this);
        this.inputItemName              = this.inputItemName.bind(this);

        this.inputProductPrice  = this.inputProductPrice.bind(this);
        this.inputProductAmount = this.inputProductAmount.bind(this);
        this.inputTotalPrice    = this.inputTotalPrice.bind(this);
        
    }

    // inputShopUrl(event){
    //     this.setState({shopUrl:event.target.value})
    //     this.props.shopUrlList[this.props.index] = event.target.value
    // }

    // inputTrackingTitle(event, company) {
    //     this.setState({trackingTitle:company})
    //     this.props.trackingTitleList[this.props.index] = company
    // }

    inputTrackingNumber(event){
        this.setState({trackingNumber:event.target.value}) 
    }

    handleSelectCategory(event, title) {
        this.setState({categoryTitle:title, categoryVariant:"outline-secondary", isValidCategory:true}) 
    }

    handleSelectItem(event, it) {
        this.setState({itemTitle:it, itemTitleVariant:"outline-secondary", isValidItemTitle:true}) 
    }

    inputBrandName(event){
        this.setState({brandName:event.target.value}) 
    }

    inputItemName(event){
        this.setState({itemName:event.target.value})
        const itemName = this.state.itemName
        itemName === "" ?  this.setState({isValidItemName:false}) : 
            this.setState({isValidItemName:true, warningInvalidItemName:false}) 
    }

    inputProductPrice(event){
        const inputPrice = event.target.value
        console.log("inputPrice : " + inputPrice)
        const isProperPrice = Number.isInteger(parseInt(inputPrice))
        console.log("isProperPrice : " + isProperPrice)
        this.setState({
            productPrice:inputPrice,
        })
    }

    inputProductAmount(event){
        const amount = (event.target.value === "") || (event.target.value == null) ? "" : parseInt(event.target.value)
        this.setState({
            productAmount:amount,
        })
        console.log("product amount")
    }

    inputTotalPrice(event){
        console.log("total price")

        const price =  this.state.productPrice === "" ? "" : parseInt(this.state.productPrice) 
        const amount = this.state.productAmount === "" ? "" : parseInt(this.state.productAmount)
        const total = (price === "") || (amount === "") ? "" : price*amount
        console.log(price)
        this.setState({
            totalPrice:total
        })

        total != 0 ? this.setState({isValidTotalPrice:true}) : this.setState({isValidTotalPrice:false})
        console.log("total : " + total)
    }

    render(){
        const index = this.props.index
        const categoryVariant = this.state.categoryVariant
        const itemTitleVariant = this.state.itemTitleVariant
        const warningInvalidItemName =  this.state.warningInvalidItemName

        const price = this.state.productPrice
        const isNumberPrice = Number(price) 
        const priceInt  = isNumberPrice ? price : 0
        
        const amount = this.state.productAmount
        const isNumberAmount = Number(amount) 
        const amountInt = isNumberAmount ? parseInt(amount) : 0 
        const totalPrice = priceInt*amountInt

        return(
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
                        variant = {categoryVariant}
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
                <Button variant="secondary" size="sm" 
                    onClick={() => this.props.removeItemOnList(index)} 
                            style={{ marginRight: '10px', marginTop: '10px', float:"right"}}>상품 삭제</Button>    
             </Card.Body>
             </Card>
        )
    }
 }

  