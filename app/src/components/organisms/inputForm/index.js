import * as React from "react"
// import classnames from 'classnames'

import style from './style.css'

import ButtonSVG from '../../atoms/buttonSVG'
import ProductAddView from '../../molecules/productAddView'

import buttonFloatingBlueSVG from '../../atoms/buttonSVG/buttonFloatingBlue.svg'
import buttonFavoriteSVG from '../../atoms/buttonSVG/buttonFavoriteEnabledSmall.svg'
import buttonFloatingYellowSVG from '../../atoms/buttonSVG/buttonFloatingYellow.svg'


export default class InputForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOn: false,
        }
    }

    componentDidMount = () => {
    }


    componentDidUpdate = () => {
    
    }

    onAddButtonOpenClick = () => {   
        this.on();
    }

    on = () => {
        document.getElementById("inputFormPlacement").style.display = "block";
        document.getElementById("item-list-input").focus();
    }
    
    render() {   
        let add_button = buttonFloatingBlueSVG;
        if (this.props.orange == 'true'){
            add_button = buttonFloatingYellowSVG;
        }
        return (
            <>
                <ProductAddView isListForm={this.props.isListForm} onAddClick={this.props.onAddClick}></ProductAddView>
                <div className={"button-floating"}>
                    <ButtonSVG props={{'id': 'add_button'}} svg={add_button} onClick={this.onAddButtonOpenClick} ></ButtonSVG>
                </div>
                
            </>
        );
    }
}
