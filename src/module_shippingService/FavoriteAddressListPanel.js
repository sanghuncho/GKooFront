import styled from "styled-components"
import React from 'react'
import { Card, Button } from 'react-bootstrap';
import { headers, basePort, setTokenHeader } from "../module_base_component/AuthService"

export class FavoriteAddressListPanel extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            favoriteAddressList:[],
            sizeOnList:null
        }
        this.handleSelectFavoriteAddress = this.handleSelectFavoriteAddress.bind(this)
      }

      fetchFavoriteAddressList(accessToken){
        setTokenHeader(accessToken)
        fetch(basePort + '/retriveFavoriteAddressList', {headers})
            .then((result) => {
               return result.json();
            }).then((data) => {
              this.setState({favoriteAddressList:data})
              console.log(data)
            })
      }

      handleSelectFavoriteAddress(index){
        this.props.handleLoadSelectedAddress(index)
      }
      
      render() {
        const sizeOnList = this.props.favoriteAddressList.length
        console.log("sizeonList:")
        let intro
        let heightAddressManager
        if(sizeOnList == 0) {
            intro = <div>배송지 관리 등록하기에 체크하시면 자주 이용하는 주소로 등록하실수 있습니다.</div>
            heightAddressManager = '7rem'
          } else {
            intro = ""
            heightAddressManager = 6 + 14*sizeOnList + 'rem'
        }
        
        return (
          <div>
              <Card border="dark" style={{ width: '80%', height:heightAddressManager, marginTop:'1rem', marginBottom:'10px' }}>
                <Card.Header>배송지 관리
                 
                </Card.Header>
                <Card.Body >
                  
                  {intro}

                  {this.props.favoriteAddressList.map((itemName, index) => { return (
                    <div key={index}>
                      <FavoriteAddress
                        index={index}
                        favoriteAddressData = {this.props.favoriteAddressList[index]}
                        handleSelectFavoriteAddress={this.handleSelectFavoriteAddress}
                        //handleEditingFavoriteAddressInputPanel={this.handleEditingFavoriteAddressInputPanel}
                      />
                    </div>
                  )})}

                <Button variant="outline-secondary" size="sm" 
                        style={{ marginRight: '10px', float:"right"}}
                        onClick={() => this.props.handleCloseFavoriteAddressListPanel()}
                        >닫기
                </Button>

                </Card.Body>
              </Card>
          </div>
        );
      }    
}

class FavoriteAddress extends React.Component{
    constructor(props) {
        super(props);

        this.handleSelectFavoriteAddress=this.handleSelectFavoriteAddress.bind(this)
      }

  
    componentDidMount() {
       console.log(this.props.index)
    }

    handleSelectFavoriteAddress(index){
        this.props.handleSelectFavoriteAddress(index)
    }
      
    render() {
        const index = this.props.index
        return (
          <div>
            <Card border="dark" style={{ width: '60%', marginBottom:'1rem'}}>
              <Card.Body >
                <Card.Title style={{ fontSize:'1rem'}} >이름: {this.props.favoriteAddressData.nameKor} {this.props.favoriteAddressData.nameEng}</Card.Title>
                <Card.Title style={{ fontSize:'1rem'}} >전화번호: {this.props.favoriteAddressData.phonenumberFirst} {this.props.favoriteAddressData.phonenumberSecond}</Card.Title>
                <Card.Title style={{ fontSize:'1rem'}} >개인통관고유번호: {this.props.favoriteAddressData.transitNr} </Card.Title>
                <Card.Subtitle></Card.Subtitle>
                <Card.Text>
                  주소: {this.props.favoriteAddressData.zipCode} {this.props.favoriteAddressData.address}
                </Card.Text>
                <Button variant="outline-secondary" size="sm" 
                        style={{ marginRight: '10px', float:"right"}}
                        onClick={() => this.handleSelectFavoriteAddress(index)}
                        >선택
                </Button>
                
              </Card.Body>
            </Card>
          </div>
        );
      }    
}
