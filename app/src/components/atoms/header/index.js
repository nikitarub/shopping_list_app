import * as React from "react"

import './style.css'

export default class DropdownMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}

    }

    render() {
        return (
            <>
                <h2 className={"header-text"} >{this.props.name}</h2>            
            </>
        );
    }
}

