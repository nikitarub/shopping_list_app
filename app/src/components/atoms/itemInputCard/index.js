import * as React from "react"

import './style.css'

export default class ItemInputCard extends React.Component {
    constructor(props) {
        super(props);
        console.log("ItemInputCard", this.props);

    }

    
    render() {
        return (
            <>
                <div className={"item-input-card"} onClick={this.props.onCardClick}>
                    <h2>{this.props.title}</h2>
                    <p>
                        {this.props.text}
                    </p>
                </div>
            </>
            
        );
    }
}
