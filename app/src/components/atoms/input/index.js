import * as React from "react"

// import './style.css'

export default class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }

    }

    componentDidMount = () => {
        console.log('Input mounted')
    }
    
    render() {
        return (
            <>
                <input id={this.props.id} onChange={this.props.onChange}></input>
            </>
        );
    }
}


