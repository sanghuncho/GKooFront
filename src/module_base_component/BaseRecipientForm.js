import * as React from "react";
import { Card, Form, InputGroup, FormControl, Button, OverlayTrigger } from 'react-bootstrap';
import { InfoBadge } from "../module_base_component/InfoBadge";
import { FavoriteAddressListPanel } from '../module_shippingService/FavoriteAddressListPanel'

export class BaseRecipientWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           modalShow:false,
        }
        this.handleModalShow = this.handleModalShow.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
    }

    componentDidMount() {
        
    }

    handleModalClose() {
        this.setState({ modalShow: false });
    }
    
    handleModalShow() {
        this.setState({ modalShow: true });
    }
    
    render() {
        let favoriteAddressListPanel
        if(this.props.openFavoriteAddressListPanel){
            favoriteAddressListPanel = <FavoriteAddressListPanel 
                favoriteAddressList={this.props.favoriteAddressList}
                handleCloseFavoriteAddressListPanel={this.props.handleCloseFavoriteAddressListPanel}
                handleLoadSelectedAddress={this.props.handleLoadSelectedAddress}
                modalShow={this.props.openFavoriteAddressListPanel} />
        } else {
            favoriteAddressListPanel = ""
        }
        return (
          <div>
              <Card border="dark" style={{ width:'80%', height:'62rem', marginTop:'1rem', marginBottom:'1rem' }}>
                    <Card.Header>받는분 정보
                    <Button variant="secondary" size="sm" 
                        disabled = {this.state.disableButtonFavoriteAddressList}
                        onClick={(e) => this.props.handleOpenFavoriteAddressListPanel(e)} 
                        style={{ marginRight: '10px', float:"right"}}>배송지 불러오기</Button>
                    </Card.Header>
                    <Card.Body >

                        {favoriteAddressListPanel}

                        <BaseRecipientNameForm 
                            handleChangeReceiverNameByKorea={this.props.handleChangeReceiverNameByKorea}
                            receiverNameByKorea={this.props.receiverNameByKorea}
                            handleChangeReceiverNameByEnglish={this.props.handleChangeReceiverNameByEnglish}
                            receiverNameByEnglish={this.props.receiverNameByEnglish}
                            handleGetCustomerAddressData={this.props.handleGetCustomerAddressData}
                            handleRegisterFavoriteAddress={this.props.handleRegisterFavoriteAddress}
                        />

                        <BaseRecipientTransitNrForm
                            handleChangeTransitNumber={this.props.handleChangeTransitNumber}
                            transitNumber={this.props.transitNumber}
                            validTransitNumber={this.props.validTransitNumber}
                            isInvalidTransitNumber={this.props.isInvalidTransitNumber}
                            validAgreeWithCollection={this.props.validAgreeWithCollection}
                            isInvalidAgreeWithCollection={this.props.isInvalidAgreeWithCollection}
                            handleChangeAgreeWithCollection={this.props.handleChangeAgreeWithCollection}
                        />

                        <BaseRecipientAddressContactNrForm
                            handleChangePhonenumberFirst={this.props.handleChangePhonenumberFirst}
                            phonenumberFirst={this.props.phonenumberFirst}
                            handleChangePhonenumberSecond={this.props.handleChangePhonenumberSecond}
                            phonenumberSecond={this.props.phonenumberSecond}
                            handleChangePostCode={this.props.handleChangePostCode}
                            postCode={this.props.postCode}
                            handleChangeAddress={this.props.handleChangeAddress}
                            deliveryAddress={this.props.deliveryAddress}
                        />

                        <BaseRecipientMessageForm 
                            handleChangeMessage={this.props.handleChangeMessage}
                        />

                        {this.props.serviceApplyButton}

                    </Card.Body>
                </Card>
          </div>
        );
      }    
}

export class BaseRecipientNameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }

    }
      
    render() {
        return (
          <div>
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
                                onChange={e => this.props.handleGetCustomerAddressData(e)} label='회원정보와 동일'
                                defaultChecked={this.state.customerDeliveryData}
                                style={{marginLeft:'5px', marginTop:'5px', marginRight:'20px', fontSize:'14px'}}
                            />
                            <Form.Check type='checkbox'
                                onChange={e => this.props.handleRegisterFavoriteAddress(e)} 
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
                                onChange={this.props.handleChangeReceiverNameByKorea}
                                defaultValue={this.props.receiverNameByKorea}
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
                                onChange = { this.props.handleChangeReceiverNameByEnglish }
                                defaultValue={this.props.receiverNameByEnglish}
                            />
                        </InputGroup>
                        
                        <InfoBadge infoText={"상품을 수취하실 분의 성함/사업자 상호를 적어주세요. 상품도착후 변경은 불가능합니다"} />
                        <InfoBadge infoText={"통관시 받는분을 기준으로 수입신고 합니다."} />
                        <InfoBadge infoText={"사업자 통관으로 진행하실 경우 받는분 이름(국문/영문)을 사업체 이름으로 기입주세요."} />
                    </Card.Body> 
                </Card> 
            </InputGroup>
          </div>
        );
      }    
}

export class BaseRecipientTransitNrForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }

    }
      
    render() {
        return (
          <div>
            <InputGroup size="sm" style={{ width:'90%'}} className="mb-3" >
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon3" >
                        받는분 <br/>정보
                    </InputGroup.Text>
                </InputGroup.Prepend>
                <Card style={{ width: '90%'}}>
                    <Card.Body>
                        {/* 나중에 사업자통관 기능 추가, 배송대행 및 구매대행 */}
                        <Form.Check inline checked={true} type='radio' label='개인통관고유번호' style={{marginRight:'10rem', fontSize:'14px'}}/>
                        {/* <Form.Check inline checked={this.state.privateTransit} type='radio' onChange={e => this.inputPrivateTransit(e)} label='개인통관고유번호' style={{marginRight:'10rem', fontSize:'14px'}}/>
                        <Form.Check inline checked={this.state.businessTransit} type='radio' onChange={e => this.inputBusinessTransit(e)} label='사업자번호(사업자통관)' style={{marginRight:'10rem', fontSize:'14px'}}/> */}
                        <Form noValidate validated={this.props.validTransitNumber}>
                            <InputGroup size="sm" className="mb-3" style={{ width: '50%', marginTop:'10px'}}>
                                <FormControl id="basic-url" aria-describedby="basic-addon3" 
                                    placeholder="8자리 고유번호" 
                                    onChange = { this.props.handleChangeTransitNumber }
                                    defaultValue={this.props.transitNumber}
                                    style={{ marginRight:'10px'}}
                                    required
                                    isInvalid={ this.props.isInvalidTransitNumber }
                                />
                                <Button size="sm" variant='secondary' style={{marginRight:'10px', fontSize:'14px'}}>발급방법</Button>
                            </InputGroup >
                        </Form>

                        <Form noValidate validated={this.props.validAgreeWithCollection}>    
                            <Form.Check type='checkbox' 
                                onChange={this.props.handleChangeAgreeWithCollection} 
                                label='수입통관신고를 위한 개인통관고유번호 수집에 동의합니다'
                                checked={this.state.agreeWithCollection}
                                style={{fontSize:'14px'}}
                                required
                                isInvalid={this.props.isInvalidAgreeWithCollection}
                            />
                                <InfoBadge infoText={"목록통관 대상품목도 개인통관고유번호 제출이 필수입니다."} />
                        </Form>
                    </Card.Body> 
                </Card> 
            </InputGroup>
          </div>
        );
      }    
}

export class BaseRecipientAddressContactNrForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }

    }
      
    render() {
        return (
          <div>
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
                            onChange = { this.props.handleChangePhonenumberFirst }
                            style={{backgroundColor: '#FFFFFF', marginRight:'1px'}}
                            defaultValue={this.props.phonenumberFirst}
                        />
                        <InputGroup.Prepend >
                        <InputGroup.Text id="basic-addon3" >
                                연락처2
                        </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl id="basic-url" aria-describedby="basic-addon3"
                            onChange = { this.props.handleChangePhonenumberSecond }
                            style={{backgroundColor: '#FFFFFF', marginRight:'1px'}}
                            defaultValue={this.props.phonenumberSecond}
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
                            onChange={ this.props.handleChangePostCode}
                            defaultValue={this.props.postCode}
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
                            onChange={this.props.handleChangeAddress}
                            value={this.props.deliveryAddress}
                        />
                    </InputGroup >
                </Card.Body> 
                </Card> 
            </InputGroup> 
          </div>
        );
      }    
}

export class BaseRecipientMessageForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }

    }
      
    render() {
        return (
          <div>
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
                                onChange={e => this.props.handleChangeMessage(e)}
                                style={{ height:'5em'}}
                            />
                    </Card.Body> 
                </Card> 
            </InputGroup>
          </div>
        );
      }    
}