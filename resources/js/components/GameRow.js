import React, {Component} from 'react';

export default class Games extends Component{

    render(){
        return(
            <div className="w3-quaeter">
             {this.props.children}
            </div>
        )
    }
}