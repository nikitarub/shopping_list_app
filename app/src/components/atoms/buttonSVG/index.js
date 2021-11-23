import * as React from "react"


import './style.css'
import ButtonMenuSVG from './buttonMenu.svg'

export default class ButtonSVG extends React.Component {
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
        console.log("ButtonMenuSVG: ", ButtonMenuSVG)
        console.log('Button mounted')
    }
    
    render() {
        return (
            <>
                <button id={this.state.id} className={"buttonMenu"} onClick={this.props.onClick}>
                    <img id={this.state.id+'SVG'} src={this.props.svg} />
                </button>
            </>
        );
    }
}


