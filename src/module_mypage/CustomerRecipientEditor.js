import styled from "styled-components";
import React from 'react';
import { Route, Switch, NavLink } from "react-router-dom";
import { Card, Button, InputGroup, FormControl, Form, Badge } from "react-bootstrap"
import { Icon as BaseIcon } from "react-icons-kit";
import { check, minus, circle } from 'react-icons-kit/fa/'
import { InfoBadge } from "../module_base_component/InfoBadge";

/**
 *
 */
const IconCnt = styled.div`
  color: #FFF;
  display: flex;
  justify-content: center;
  aligh-items: center;
`;

const textFontSize = '14px';

const Icon = props => <BaseIcon size={16} icon={props.icon} />;  

export class CustomerRecipientEditor extends React.Component{
    constructor(props) {
        super(props);
      }
      
      render() {
        // const addButton = this.props.addButton
        // let applyButton;

        // if(addButton) {
        //     applyButton = <ShippingServiceApplyButton/>
        // }

        return (
        <div>
            <Card border="dark" style={{ width:'100%', height:'60rem', marginTop:'1rem', marginBottom:'1rem' }}>
                <Card.Header>
                    받는분 정보
                </Card.Header>
                    <Card.Body >
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon3">
                                    받는분
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Card style={{ width: '90%'}}>
                                <Card.Body>
                                    <InputGroup size="sm" className="mb-4" style={{ width:'70%'}}>
                                        <InputGroup.Prepend >
                                            <InputGroup.Text id="basic-addon3" >
                                                이름(국문)
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                    
                                        <FormControl id="basic-url" aria-describedby="basic-addon3"
                                            // onChange = { this.inputReceiverNameByKorea }
                                            readOnly={"readonly"}
                                            style={{backgroundColor: '#FFFFFF'}}
                                        />
                                    </InputGroup >
                                    
                                    {/*
                                    추후 개발                                     
                                    <InputGroup className="mb-4" style={{ width:'80%'}}>
                                        <Form.Check type='checkbox'
                                            onChange={e => this.setOwnerContentCheckbox(e)} label='회원정보와 동일'
                                            checked={this.state.setOwnerContent}
                                            style={{marginLeft:'5px', marginTop:'5px', marginRight:'20px'}}
                                        />
                                        <Button size='sm' variant="secondary">받는분 정보 불러오기</Button>
                                    </InputGroup> 
                                    */}
                                
                                    <InputGroup size="sm" className="mb-4" style={{ width: '70%'}}>
                                        <InputGroup.Prepend>
                                                <InputGroup.Text id="basic-addon3">
                                                    이름(영문)
                                                </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl id="basic-url" aria-describedby="basic-addon3"
                                                style={{ width: '50px'}}
                                                //onChange = { this.inputReceiverNameByEnglish }
                                                />
                                    </InputGroup>
                                   
                                    <InfoBadge infoText={"상품을 수취하실 분의 성함/사업자 상호를 적어주세요."} />
                                    <InfoBadge infoText={"통관시 받는분을 기준으로 수입신고 합니다."}/>
                                    <InfoBadge infoText={"상품을 수취하실 분의 성함/사업자 상호를 적어주세요."}/>

                                </Card.Body> 
                            </Card> 
                        </InputGroup>
                   
                        <InputGroup className="mb-3" >
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon3" >
                                    받는분<br/>정보
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Card style={{ width: '90%'}}>
                            <Card.Body>
                                <Form.Check inline 
                                    //checked={this.state.privateTransit} 
                                    type='radio' 
                                    //onChange={e => this.inputPrivateTransit(e)} 
                                    label='개인통관고유번호' style={{marginRight:'10rem', fontSize:'14px'}}/>
                                <Form.Check inline 
                                    //checked={this.state.businessTransit} 
                                    type='radio' 
                                    //onChange={e => this.inputBusinessTransit(e)} 
                                    label='사업자번호(사업자통관)' style={{ fontSize: textFontSize}}/>
                                        
                                <InputGroup size="sm" className="mb-3" style={{ width: '80%', marginTop:'10px'}}>
                                        <FormControl id="basic-url" aria-describedby="basic-addon3" 
                                            placeholder="8자리 고유번호" 
                                            //onChange = { this.inputTransitNumber }
                                            style={{ marginRight:'10px'}}/>
                                        <Button size="sm" variant='secondary' style={{ marginRight:'10px'}}>발급방법</Button>
                                        <Button size="sm" variant='secondary'>내 개인통관고유번호 저장</Button>
                                    </InputGroup >
                                    <Form.Check type='checkbox' 
                                        //onChange={e => this.agreeWithCollectionCheckbox(e)} 
                                        label='수입통관신고를 위한 개인통관고유번호 수집에 동의합니다'
                                        //checked={this.state.agreeWithCollection}
                                        style={{fontSize: textFontSize}}
                                    />
                                    <InfoBadge infoText={"목록통관 대상품목도 개인통관고유번호 제출이 필수입니다."}/>
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
                                <InputGroup size='sm' className="mb-3" style={{ width: '50%'}}>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon3" style={{ width: '100px'}}>
                                            연락처
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl id="basic-url" aria-describedby="basic-addon3"
                                                style={{ width: '50px', marginRight:'1px'}}
                                                //onChange={e => this.inputCallNumberFront(e)} 
                                                />
                                            
                                    <FormControl id="basic-url" aria-describedby="basic-addon3"
                                                style={{ width: '50px', marginRight:'1px'}}
                                                //onChange={e => this.inputCallNumberMiddle(e)} 
                                                />
                                       
                                    <FormControl id="basic-url" aria-describedby="basic-addon3"
                                                style={{ width: '50px'}}
                                                //onChange={e => this.inputCallNumberRear(e)} 
                                                />
                                </InputGroup>

                                <InputGroup size='sm' className="mb-3" style={{ width: '50%'}}>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon3" style={{ width: '100px'}}>
                                            우편번호
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl id="basic-url" aria-describedby="basic-addon3" 
                                        style={{ marginRight:'10px'}}
                                        //onChange={e => this.inputPostCode(e)}
                                        />
                                    <Button size='sm' variant='secondary' >우편번호 찾기</Button>
                                </InputGroup >

                                <InputGroup size='sm' className="mb-3" style={{ width: '50%'}}>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon3" style={{ width: '100px'}}>
                                            주소
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl id="basic-url" aria-describedby="basic-addon3"
                                        //onChange={e => this.inputDeliveryAddress(e)} 
                                        />
                                </InputGroup >

                                <InputGroup size='sm' className="mb-3" style={{ width: '70%'}}>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon3" style={{ width: '100px'}}>
                                            상세주소
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl id="basic-url" aria-describedby="basic-addon3"
                                        //onChange={e => this.inputDetailAddress(e)}
                                        />
                                </InputGroup >
                            </Card.Body> 
                            </Card> 
                        </InputGroup> 

                        {/* 
                        react table 비교후 결정
                        <RecipientController/> */}

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon3" >
                                    배송<br/>메세지
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Card style={{ width: '90%', height: '8em'}}>
                            <Card.Body>
                                <Form.Control id="basic-url" as="textarea" rows="3" 
                                            aria-describedby="basic-addon3"
                                            //value={this.state.deliveryMessage}
                                            //onChange={e => this.inputDeliveryMessage(e)}
                                            style={{ height:'5em'}}/>
                            </Card.Body> 
                            </Card> 
                        </InputGroup>
                        
                </Card.Body>
                 {/* 수정 OK 버튼 */}
                 <InputGroup className="mb-3"  style={{ marginLeft:'40%'}} >
                            <Button size="sm" variant='secondary' style={{ marginRight:'10px'}}
                                    //onClick={(e) => this.applyDeliveryService(e, allowToApply, itemNameLength)}
                                    //onClick={this.handleModalShow}
                                    >완료
                            </Button>
                            <Button size="sm" variant='secondary'>취소</Button>
                </InputGroup >
            </Card>
        </div>
        );
      }    //style={{ marginRight: '10px', float:"right"}}
}