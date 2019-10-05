import React from 'react';
import { Button, Modal, InputGroup, DropdownButton, Dropdown, FormControl, Form } from "react-bootstrap"
import { headers, basePort } from "./AuthService"

export class EditTracking extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          showModal:false,
          orderNumber:this.props.orderNumber,
          trackingTitle:"운송사선택",
          trackingNumber:"",
        };
    
        this.handleModalShow    = this.handleModalShow.bind(this);
        this.handleModalClose   = this.handleModalClose.bind(this);
        this.handleSaveClose   = this.handleSaveClose.bind(this);
        this.inputTrackingTitle = this.inputTrackingTitle.bind(this);
        this.inputTrackingNumber = this.inputTrackingNumber.bind(this);
      }

      handleModalClose() {
        this.setState({ showModal: false });
      }

      handleSaveClose(){
        this.updateTrackingNumber(this.props.accessToken)
        this.setState({ showModal: false });
        window.location.reload();
      }

      updateTrackingNumber(accessToken){
        const contents =  [{orderNumber: this.state.orderNumber}, 
            {trackingCompany:this.state.trackingTitle},
            {trackingNumber:this.state.trackingNumber}]
        this.setTokenHeader(accessToken)
        fetch(basePort + '/updatetrackingnumber', 
                  {method:'post', headers, 
                    body:JSON.stringify(contents)})
      }
    
      handleModalShow() {
        this.setState({ showModal: true });
      }
      
      inputTrackingTitle(event, company) {
        this.setState({trackingTitle:company}) 
      }

      inputTrackingNumber(event) {
        this.setState({trackingNumber:event.target.value}) 
      }

      setTokenHeader(token){
        headers ['Authorization'] = 'Bearer ' + token;
      }
      
      render() {
        return (
          <div>
          <Button variant="secondary" size="sm" onClick={this.handleModalShow}>트랙킹번호 입력</Button>
          <Modal show={this.state.showModal} onHide={this.handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>트랙킹 정보</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <row>
              <InputGroup className="mb-3">
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
                </InputGroup>
            </row>
            <row>
              <Form.Text className="text-muted">
              트랙킹번호 허위/미기재시 입고가 지연/미처리 될수 있습니다.
              </Form.Text>
            </row>   
          </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark" onClick={this.handleSaveClose}>
              저장
            </Button>
            <Button variant="dark" onClick={this.handleModalClose}>
              취소
            </Button>
          </Modal.Footer>
          </Modal>
          </div>
        );
      }    
}