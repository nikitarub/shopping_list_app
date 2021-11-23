import * as React from "react"

import './style.css'
import CheckboxSVG from './checkbox.svg'
import CheckboxClickedSVG from './checkboxClicked.svg'
import CheckboxYellowClickedSVG from './checkboxYellowClicked.svg'


export default class Checkbox extends React.Component {
    constructor(props) {
        super(props);
        console.log("Checkbox: ", this.props);
        this.state = {
            isFavorite: false,
        }

    }j

    componentDidMount = () => {
        console.log("checkboxSVG: ", CheckboxSVG)
        console.log('Checkbox mounted')
        if (this.props.isFavorite == 'true'){
            console.log('Checkbox is favorite: ', this.props.isFavorite);
            this.setState({ isFavorite: true })
        }
    }

    svgOnClick = () => {
        let svg = document.getElementById('CheckboxSVG_'+this.props.props.id);
        if (this.state.isFavorite){
            console.log('Checkbox is favorite: ', CheckboxYellowClickedSVG);
            svg.src = CheckboxYellowClickedSVG;
        } else {
            svg.src = CheckboxClickedSVG;
        }
        
        
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

