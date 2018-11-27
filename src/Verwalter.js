import * as React from "react";
import { VerwalterTable } from './VerwalterTable'; 


export class Verwalter extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return(
    <div  style={{ background: '#f1f1f1', width: '100%'}}>
    
      <VerwalterTable/>
    
    </div>
    );}
}

//export default Verwalter;

