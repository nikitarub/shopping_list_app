import * as React from "react"

import './style.css'

export default class Checkbox extends React.Component {
    constructor(props) {
        super(props);
        console.log("Checkbox: ", this.props);
        this.state = {}

    }

    componentDidMount = () => {
        console.log('Checkbox mounted')
    }

    
    render() {
        return (
            <>
                <input type="checkbox" id={this.props.props.id} onChange={this.props.props.onChange}/>            
            </>
        );
    }
}

