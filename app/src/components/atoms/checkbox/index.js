import * as React from "react"

import './style.css'
import CheckboxSVG from './checkbox.svg'
import CheckboxClickedSVG from './checkboxClicked.svg'


export default class Checkbox extends React.Component {
    constructor(props) {
        super(props);
        console.log("Checkbox: ", this.props);
        this.state = {}

    }j

    componentDidMount = () => {
        console.log("checkboxSVG: ", CheckboxSVG)
        console.log('Checkbox mounted')
    }

    svgOnClick = () => {
        let svg = document.getElementById('CheckboxSVG_'+this.props.props.id);
        svg.src = CheckboxClickedSVG;
        
    }

    
    render() {
        return (
            <>
                <img id={'CheckboxSVG_'+this.props.props.id} src={CheckboxSVG} onClick={this.props.props.onChange}/>
                <input type="checkbox" hidden id={this.props.props.id} onChange={this.props.props.onChange}>
                </input>            
            </>
        );
    }
}

