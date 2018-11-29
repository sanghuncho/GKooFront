import * as React from "react";

export class Einheit extends React.Component {

    constructor(props) {
        super(props);
    }


  render() {
    return(
        <div className='home'>
            <h1>Einheit</h1>
            <p> 한국에 가고 싶다..</p>
            <p>{this.props.propertyTest}</p>
        </div>
    );}
}

export default Einheit;
  