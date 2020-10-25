import * as React from "react";
import { AppNavbar } from './AppNavbar'
import { Card, Navbar, Nav, Form, Button, OverlayTrigger, Image } from 'react-bootstrap';
import { Icon as BaseIcon } from "react-icons-kit";
import GKoo_Service_Info  from './assets/GKoo_Service_Info.jpg';
import { CompanyIntroductionBottom } from './module_base_component/BaseCompanyIntroduction'

const Icon = props => <BaseIcon size={18} icon={props.icon} />;


export class Home extends React.Component {
  render() {
    return(
    <div className='home'>
        <AppNavbar>
           
        </AppNavbar>
        <DeliveryShipServiceInstructions/>

        <BuyingServiceInstructions/>

        <AuctionServiceInstructions/>

        <GkooCafeInstructions/>

        <CompanyIntroductionBottom/>
        {/* <Image src={GKoo_Service_Info} style={{ width: '600px', marginLeft:'20%', marginTop:'20px'}}/> */}
    </div>
    );}
}

export class GkooCafeInstructions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          //value:null,
        }

      this.handleOpenAuctionRequestSite = this.handleOpenAuctionRequestSite.bind(this)
    }

    componentDidMount() {
    }

    handleOpenAuctionRequestSite(){
        const url = 'https://cafe.naver.com/ggigguinmuenchen';
        window.open(url, '_blank');
    }
      
    render() {
        return (
          <div>
            <Card border="dark" style={{ width: '60%', marginBottom:'5px', marginTop:'1rem', marginLeft:'1rem'}}>
                <Card.Header>지쿠 카페</Card.Header>
                <Card.Body >
                    기타 궁금한 사항은 언제든지 지쿠웹이나 네이버카페에서 문의주세요.<br/>
                    
                    <Button variant="secondary" size="sm" 
                        onClick={() => this.handleOpenAuctionRequestSite()} 
                        style={{ marginRight: '10px', marginTop: '10px', float:"left"}}>방문하기</Button>     
                </Card.Body>
            </Card>
        </div>
        );
      }    
}

export class AuctionServiceInstructions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          //value:null,
        }

      this.handleOpenAuctionRequestSite = this.handleOpenAuctionRequestSite.bind(this)
      this.handleOpenBuyingEstimationSite = this.handleOpenBuyingEstimationSite.bind(this)
    }

    componentDidMount() {
    }

    handleOpenAuctionRequestSite(){
        const url = '/auctionService';
        window.open(url, '_blank');
    }

    handleOpenBuyingEstimationSite(){
        const url = '/buyingService';
        window.open(url, '_blank');
    }
      
    render() {
        return (
          <div>
            <Card border="dark" style={{ width: '60%', marginBottom:'5px', marginTop:'1rem', marginLeft:'1rem'}}>
                <Card.Header>지쿠 경매대행 서비스</Card.Header>
                <Card.Body >
                    이베이에서 경매에 참여를 원하지만 결제, 회원가입, 배송절차, 셀러와의 커뮤니케이션이 어렵고 복잡하시다면 경매대행 서비스를 이용하세요.<br/> <br/>
                    회원가입과 함께 상품주소 및 맥시멈입찰금액만 입력해주시면 경매입찰에서 배송까지 지쿠에서 모든과정을 처리해드립니다.<br/><br/>
                    1. 간단한 견적을 받아보세요<br/>
                    2. 견적이 마음에 드시면 회원가입과 함께 경매대행을 신청해주세요.<br/>
                    
                    <Button variant="secondary" size="sm" 
                        onClick={() => this.handleOpenBuyingEstimationSite()} 
                        style={{ marginRight: '10px', marginTop: '10px', float:"left"}}>견적보기</Button>

                    <Button variant="secondary" size="sm" 
                        onClick={() => this.handleOpenAuctionRequestSite()} 
                        style={{ marginRight: '10px', marginTop: '10px', float:"left"}}>경매대행 신청하기</Button>     
                </Card.Body>
            </Card>
        </div>
        );
      }    
}

export class BuyingServiceInstructions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          //value:null,
        }

      this.handleOpenBuyingRequestSite = this.handleOpenBuyingRequestSite.bind(this)
      this.handleOpenBuyingEstimationSite = this.handleOpenBuyingEstimationSite.bind(this)
    }

    componentDidMount() {
    }

    handleOpenBuyingRequestSite(){
        const url = '/buyingServiceRegistration';
        window.open(url, '_blank');
    }

    handleOpenBuyingEstimationSite(){
        const url = '/buyingService';
        window.open(url, '_blank');
    }
      
    render() {
        return (
          <div>
            <Card border="dark" style={{ width: '60%', marginBottom:'5px', marginTop:'1rem', marginLeft:'1rem'}}>
                <Card.Header>지쿠 구매대행 서비스</Card.Header>
                <Card.Body >
                    해외쇼핑몰(아마존, 이베이, 기타쇼핑몰)의 결제. 회원가입, 배송절차가 어렵고 복잡하시다면 구매대행 서비스를 이용하세요.<br/> <br/>
                    회원가입과 함께 상품주소만 입력해주시면 구매에서 배송까지 지쿠에서 모든과정을 처리해드립니다.<br/><br/>
                    1. 간단한 견적을 받아보세요<br/>
                    2. 견적이 마음에 드시면 회원가입과 함께 구매대행을 신청해주세요.<br/>
                    <Button variant="secondary" size="sm" 
                        onClick={() => this.handleOpenBuyingEstimationSite()} 
                        style={{ marginRight: '10px', marginTop: '10px', float:"left"}}>견적보기</Button>
                    
                    <Button variant="secondary" size="sm" 
                        onClick={() => this.handleOpenBuyingRequestSite()} 
                        style={{ marginRight: '10px', marginTop: '10px', float:"left"}}>구매대행 신청하기</Button>     
                </Card.Body>
            </Card>
        </div>
        );
      }    
}


export class DeliveryShipServiceInstructions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          //value:null,
        }

      this.handleOpenDeliveryRequestSite = this.handleOpenDeliveryRequestSite.bind(this)
    }

    componentDidMount() {
    }

    handleOpenDeliveryRequestSite(){
        const url = '/requestshipping';
        window.open(url, '_blank');
    }
      
    render() {
        return (
          <div>
            <Card border="dark" style={{ width: '60%', marginBottom:'5px', marginTop:'1rem', marginLeft:'1rem'}}>
                <Card.Header>지쿠 배송대행 서비스</Card.Header>
                <Card.Body >
                    해외에서 구매하신 상품을 지쿠 해외현지 배송센터주소로 보내주시면 현지에서 1차수령한후 <br/>
                    고객님의 한국주소로 2차 발송해드리는 서비스입니다.<br/>
                    서비스 이용을 위해 회원가입을 하시면 개인사서함주소가 발급됩니다.<br/><br/>
                    <Button variant="secondary" size="sm" 
                        onClick={() => this.handleOpenDeliveryRequestSite()} 
                        style={{ marginRight: '10px', marginTop: '10px', float:"left"}}>배송대행 신청하기</Button>     
                </Card.Body>
            </Card>
        </div>
        );
      }    
}

export default Home;
