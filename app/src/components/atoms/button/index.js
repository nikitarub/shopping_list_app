import * as React from "react"

// import './style.css'

export default class Button extends React.Component {
    constructor(props) {
        super(props);
        console.log("BUTTON", this.props);
        this.state = {
            buttonName: this.props.props.name,
            className: this.props.props.className,
            id: this.props.props.id,
        }

    }

    componentDidMount = () => {
        console.log('Button mounted')
    }
    
    render() {
        return (
            <>
                <button id={this.state.id} className={this.state.className} onClick={this.props.onClick}>{this.state.buttonName}</button>
            </>
        );
    }
}
