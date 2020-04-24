import React, {Component} from 'react';

export default class Games extends Component{

    render(){
        return(
            <div className="w3-quaeter">
                <img src={this.props.info.thumbnail} alt={this.props.info.title}/>
                <h3> {this.props.info.title }</h3>
                <p>{this.props.info.desc } </p>
            </div>
        )
    }
}