import * as React from "react";
import styled from "styled-components";
import { Card, Form, InputGroup, FormControl, Dropdown, DropdownButton, Button } from 'react-bootstrap';
import { times, exchange} from 'react-icons-kit/fa/'
import { Icon as BaseIcon } from "react-icons-kit";
import { CATEGORY_LIST, getItemTitleList } from './ShippingServiceConfig'

const Icon = props => <BaseIcon size={16} icon={props.icon} />;
const IconCnt = styled.div`
`;

export class AdditionalProduct extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            categoryTitle:"선택",
            categoryTitleList:CATEGORY_LIST,
            isValidCategory:false,
            categoryVariant:"outline-secondary",

            itemTitle:"선택",
            itemTitleList:[],
            isValidItemTitle:false,
            disabled_itemTitleList:true,
            itemTitleVariant:"outline-secondary",

            brandName:"",
            itemName:"",
            isValidItemName:false,
            warningInvalidItemName: false,
            heightOfInputProduct:"26",

            productPrice:"",
            productAmount:"",
            productTotalPrice:"",
            isValidTotalPrice:false,

        }
        this.handleSelectCategory       = this.handleSelectCategory.bind(this);
        this.handleSelectItem           = this.handleSelectItem.bind(this);
        this.inputBrandName             = this.inputBrandName.bind(this);
        this.inputItemName              = this.inputItemName.bind(this);
        this.inputProductPrice  = this.inputProductPrice.bind(this);
        this.inputProductAmount = this.inputProductAmount.bind(this);
        this.inputProductTotalPrice    = this.inputProductTotalPrice.bind(this);
        
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
        this.props.shippingProductList[this.props.index] = shippingProduct
        console.log(this.props.index)
    }

    handleSelectCategory(event, title) {
        this.setState({
            categoryTitle:title,
            disabled_itemTitleList:false,
            categoryVariant:"outline-secondary",
            isValidCategory:true
        })
        this.props.shippingProductList[this.props.index].categoryTitle = title
        this.state.itemTitleList = getItemTitleList(title)
    }

    handleSelectItem(event, it) {
        this.setState({itemTitle:it, itemTitleVariant:"outline-secondary", isValidItemTitle:true})
        this.props.shippingProductList[this.props.index].itemTitle = it
    }

    inputBrandName(event){
        this.setState({brandName:event.target.value})
        this.props.shippingProductList[this.props.index].brandName = event.target.value
    }

    inputItemName(event){
        this.setState({itemName:event.target.value})
        const itemName = this.state.itemName
        itemName === "" ?  this.setState({isValidItemName:false}) : 
            this.setState({isValidItemName:true, warningInvalidItemName:false})
        this.props.shippingProductList[this.props.index].itemName = event.target.value 
    }

    inputProductPrice(event){
        const inputPrice = event.target.value
        //const isProperPrice = Number.isInteger(parseInt(inputPrice))
        const amount = this.state.productAmount === "" ? "" : parseInt(this.state.productAmount)
        const productTotalPrice = (inputPrice === "") || (amount === "") ? "" : inputPrice*amount 
        this.setState({productPrice:inputPrice})
        this.props.shippingProductList[this.props.index].productPrice = inputPrice

        if(productTotalPrice != ""){
            this.setState({productTotalPrice:productTotalPrice})
            this.props.shippingProductList[this.props.index].productTotalPrice = productTotalPrice
        }
    }

    inputProductAmount(event){
        const amount = (event.target.value === "") || (event.target.value == null) ? "" : parseInt(event.target.value)
        const price =  this.state.productPrice === "" ? "" : parseInt(this.state.productPrice)
        const productTotalPrice = (price === "") || (amount === "") ? "" : price*amount 
        this.setState({productAmount:amount})
        this.props.shippingProductList[this.props.index].productAmount = amount
        if(productTotalPrice != ""){
            this.setState({productTotalPrice:productTotalPrice})
            this.props.shippingProductList[this.props.index].productTotalPrice = productTotalPrice
        }
    }

    inputProductTotalPrice(event){
        // console.log("total price")
        // const price =  this.state.productPrice === "" ? "" : parseInt(this.state.productPrice) 
        // const amount = this.state.productAmount === "" ? "" : parseInt(this.state.productAmount)
        // const productTotalPrice = (price === "") || (amount === "") ? "" : price*amount
        // this.setState({
        //     productTotalPrice:productTotalPrice
        // })

        // total != 0 ? this.setState({isValidTotalPrice:true}) : this.setState({isValidTotalPrice:false})
        // this.props.shippingProductList[this.props.index].productTotalPrice = productTotalPrice
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
        const productTotalPrice = priceInt*amountInt

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
                        drop='right'
                        style={{ marginRight: '200px'}}
                        >
                       {this.state.categoryTitleList.map((category) => 
                                { return (<div><Dropdown.Item style={{fontSize:'14px'}} onSelect={e => this.handleSelectCategory(e, category)}>{category}</Dropdown.Item></div> )})}
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
                        drop='right'
                        disabled={this.state.disabled_itemTitleList}
                        >
                        {this.state.itemTitleList.map((item) => 
                                { return (<div><Dropdown.Item style={{fontSize:'14px'}} onSelect={e => this.handleSelectItem(e, item)}>{item}</Dropdown.Item></div> )})}

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
                        value={ productTotalPrice }
                        onChange = { this.inputProductTotalPrice }
                        readOnly = "true"
                        />
                    <InputGroup.Append>
                            <InputGroup.Text>(Euro)</InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
                <Button variant="secondary" size="sm" 
                    onClick={() => this.props.handleRemoveItemOnList(index)} 
                            style={{ marginRight: '10px', marginTop: '10px', float:"right"}}>상품 삭제</Button>    
             </Card.Body>
             </Card>
        )
    }
 }

  