import * as React from "react";
import { ShippingService } from "../ShippingService";
import styled from "styled-components";
import {
    AppContainer as BaseAppContainer,
  } from "../container";
import { Breadcrumb, Card, Form, InputGroup, FormControl, Dropdown, DropdownButton } from 'react-bootstrap';

const AppContainer = styled(BaseAppContainer)`
  height: calc(160vh);
  width: 100vw;
`;

const BodyContainer = styled(BaseAppContainer)`
  height: calc(150vh);
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
            {didUnderstand?<InputProduct/>:""}
        </div>
    );}
 }

 class InputProduct extends React.Component{
    constructor(props) {
        super(props);
        this.state = { 
          trackingTitle:"운송사선택",
          categoryTitle:"선택",
          itemTitle:"선택",
        };

    }

    handleSelectTracking(event, company) {
        this.setState({trackingTitle:company}) 
        console.log("change tracking")
    }

    handleSelectCategory(event, nr) {
            this.setState({categoryTitle:nr}) 
            console.log("change 3")
    }

    handleSelectItem(event, nr) {
        this.setState({itemTitle:nr}) 
        console.log("change 3")
    }

    render(){
        return(
            <Card border="dark" style={{ width: '80%', height:'21rem', marginTop:'1rem', marginBottom:'1rem' }}>
                <Card.Header>상품입력</Card.Header>
                <Card.Body >

                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon3">
                            쇼핑몰 URL
                        </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl id="basic-url" aria-describedby="basic-addon3" 
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
                            <Dropdown.Item onSelect={e => this.handleSelectTracking(e, "DHL")}>DHL</Dropdown.Item>
                            <Dropdown.Item onSelect={e => this.handleSelectTracking(e, "헤르메스")}>헤르메스</Dropdown.Item>
                            <Dropdown.Item onSelect={e => this.handleSelectTracking(e, "기타")}>기타</Dropdown.Item>
                        </DropdownButton>
                        <FormControl id="basic-url" aria-describedby="basic-addon3" 
                            placeholder="트랙킹번호"/>
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
                            <Dropdown.Item onSelect={e => this.handleSelectCategory(e, 1)}>1</Dropdown.Item>
                            <Dropdown.Item onSelect={e => this.handleSelectCategory(e, 2)}>2</Dropdown.Item>
                            <Dropdown.Item onSelect={e => this.handleSelectCategory(e, 3)}>3</Dropdown.Item>
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
                            <Dropdown.Item onSelect={e => this.handleSelectItem(e, 11)}>1</Dropdown.Item>
                            <Dropdown.Item onSelect={e => this.handleSelectItem(e, 22)}>2</Dropdown.Item>
                            <Dropdown.Item onSelect={e => this.handleSelectItem(e, 33)}>3</Dropdown.Item>
                        </DropdownButton>
                       
                    </InputGroup>
                    
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon3">
                            브랜드(영문)
                        </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl id="basic-url" aria-describedby="basic-addon3" 
                            placeholder="정확한 브랜드이름을 입력해주세요"/>
                    </InputGroup>

                     <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon3">
                            상품명(영문)
                        </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl id="basic-url" aria-describedby="basic-addon3" 
                            placeholder="정확한 영문 상품명을 입력해주세요"/>
                    </InputGroup>

                </Card.Body>
            </Card>
        );
    }
 }
