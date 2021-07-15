import React, { Component } from "react";

import  WangAntTable  from './components/WangAntTable'
import style  from './index.css'

class AntDesignTable extends Component {
  constructor(props) {
    super(props);
    this.state = { 
    }
  }

  render() { 
    return ( 
      <div>
        <div className={style.title}> 
        测试style

        </div>
        <div>
          <WangAntTable />
        </div>
      </div> 
    );
  }
}
 

export default AntDesignTable
