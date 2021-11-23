import * as React from "react"

import './style.css'


import CheckboxSVG from '../../atoms/checkbox/checkbox.svg'
import CheckboxClickedBasicSVG from '../../atoms/checkbox/checkboxClicked.svg'
import CheckboxClickedReturnSVG from '../../atoms/checkbox/checkboxClickedReturn.svg'
import CheckboxYellowClickedSVG from '../../atoms/checkbox/checkboxYellowClicked.svg'

import Checkbox from '../../atoms/checkbox'
import Button from '../../atoms/button'
import ButtonSVG from '../../atoms/buttonSVG'
import ButtonFavoriteSVG from '../../atoms/buttonSVG/buttonFavorite.svg'
import ButtonFavoriteEnabledSVG from '../../atoms/buttonSVG/buttonFavoriteEnabled.svg'
import ButtonDeleteSVG from '../../atoms/buttonSVG/buttonDelete.svg'



export default class CheckboxItem extends React.Component {
    constructor(props) {
        super(props);

        
        this.state = {
            checkbox: null,
            checkboxChecked: false,
            checkboxDeleting: false,
            checkboxFavorite: false,
            useReturnCheckbox: false,
            noFavoriteButton: false,
            isFavorite: false,
            click_count: 0,
        }

    }

    componentDidMount = () => {
        console.log('Checkbox mounted')
        this.setState({checkbox: this.props.props})
        if (this.props.props.favorite != undefined){
            if (this.state.checkboxFavorite !== this.props.props.favorite){
                this.setState({checkboxFavorite: this.props.props.favorite})
            }
        }
        if (this.props.props.useReturnCheckbox != undefined){
            if (this.state.useReturnCheckbox !== this.props.props.useReturnCheckbox){
                this.setState({useReturnCheckbox: this.props.props.useReturnCheckbox})
            }
        }
        if (this.props.props.noFavoriteButton != undefined){
            if (this.state.noFavoriteButton !== this.props.props.noFavoriteButton){
                this.setState({noFavoriteButton: this.props.props.noFavoriteButton})
            }
        }

        if (this.props.isFavorite != undefined){
            console.log('Checkbox is fav')
            if (this.state.isFavorite !== this.props.isFavorite){
                this.setState({isFavorite: this.props.isFavorite})
            }
        }
        
    }


    componentDidUpdate = () => {
        if (this.state.checkbox !== this.props.props){
            this.setState({checkbox: this.props.props})
        }
        if (this.props.props.favorite != undefined){
            if (this.state.checkboxFavorite !== this.props.props.favorite){
                this.setState({checkboxFavorite: this.props.props.favorite})
            }
        }
        if (this.props.props.useReturnCheckbox != undefined){
            if (this.state.useReturnCheckbox !== this.props.props.useReturnCheckbox){
                this.setState({useReturnCheckbox: this.props.props.useReturnCheckbox})
            }
        }
        if (this.props.props.noFavoriteButton != undefined){
            if (this.state.noFavoriteButton !== this.props.props.noFavoriteButton){
                this.setState({noFavoriteButton: this.props.props.noFavoriteButton})
            }
        }

        if (this.state.noFavoriteButton == true){
            let favoriteButton = document.getElementById('checkboxFavoriteButton_'+this.state.checkbox.id);
            favoriteButton.hidden = 'True'
        }
        
    }

    dropCheckbox = (id) => {
        if (this.state.checkboxChecked === true || this.state.checkboxDeleting === true){
            let checkboxItem = document.getElementById('checkboxItem_'+id);
            let checkboxInput = document.getElementById('checkboxInput_'+id);
            let checkboxDeleteButton = document.getElementById('checkboxDeleteButton_'+id);
            let checkboxFavoriteButton = document.getElementById('checkboxFavoriteButton_'+id);
            let checkboxBox = document.getElementById('checkboxBox_'+id);
            

            if (checkboxInput !== null) {checkboxInput.remove();}
            if (checkboxItem !== null) {checkboxItem.remove();}
            if (checkboxDeleteButton !== null) {checkboxDeleteButton.remove();}
            if (checkboxFavoriteButton !== null) {checkboxFavoriteButton.remove();}
            if (checkboxBox !== null) {checkboxBox.remove();}
            clearTimeout(this.state.timerID);
            clearTimeout(this.state.timerIDSlider);
        }
    }

    startOpenListTimer = () => {
        window.open('/', '_self');
    }

    startItemSlider = (id) => {
        let checkboxItem = document.getElementById('checkboxItem_'+id);
        let checkboxDeleteButton = document.getElementById('checkboxDeleteButton_'+id);
        let checkboxFavoriteButton = document.getElementById('checkboxFavoriteButton_'+id);
        if (checkboxItem !== null) {
            checkboxDeleteButton.hidden = "True"
            checkboxFavoriteButton.hidden = "True"
            if (this.state.useReturnCheckbox){
                checkboxItem.className = "checkbox-item--checked-return";
            } else {
                checkboxItem.className = "checkbox-item--checked";
            }
            
        }
        
    }

    stopItemAnimation = (id) => {
        if (this.state.checkboxChecked || this.state.checkboxDeleting){
            let checkboxText = document.getElementById('checkboxText_'+id);
            let checkboxItem = document.getElementById('checkboxItem_'+id);
            let checkboxDeleteButton = document.getElementById('checkboxDeleteButton_'+id);
            let checkboxFavoriteButton = document.getElementById('checkboxFavoriteButton_'+id);
            let checkboxInput = document.getElementById('checkboxInput_'+this.state.checkbox.id);
            
            checkboxText.className = "checkbox-text";
            checkboxItem.className = "checkbox-item";
            checkboxInput.checked = "";
            checkboxDeleteButton.hidden = ""
            checkboxFavoriteButton.hidden = ""
            clearTimeout(this.state.timerID);
            clearTimeout(this.state.timerIDSlider);
            this.setState(state => ({...state, 
                checkboxChecked: false,
                checkboxDeleting: false
            }));
        }
    }

    svgSwitch = (svgValue, id) => {
        let svg = document.getElementById(id);
        svg.src = svgValue;
    }

    checkboxChanged = (e) => {
        let checkboxText = document.getElementById('checkboxText_'+this.state.checkbox.id);
        let checkboxInput = document.getElementById('checkboxInput_'+this.state.checkbox.id);
        console.log("checkboxChanged: ", e);
        if (e.target.nodeName === "LABEL" || e.target.nodeName === "IMG"){
            if (checkboxInput.checked === false && !this.state.checkboxDeleting){
                checkboxInput.checked = true;

                if (this.state.isFavorite){
                    console.log("Checkbox is fav_2")
                    document.getElementById('add_all_button').hidden = "";
                    this.svgSwitch(CheckboxYellowClickedSVG, 'CheckboxSVG_checkboxInput_'+this.state.checkbox.id); 
                }
                else if (this.state.useReturnCheckbox){
                    this.svgSwitch(CheckboxClickedReturnSVG, 'CheckboxSVG_checkboxInput_'+this.state.checkbox.id);
                } else {
                    this.svgSwitch(CheckboxClickedBasicSVG, 'CheckboxSVG_checkboxInput_'+this.state.checkbox.id);                
                }
            } else {
                checkboxInput.checked = false;
                this.svgSwitch(CheckboxSVG, 'CheckboxSVG_checkboxInput_'+this.state.checkbox.id);
                this.stopItemAnimation(this.state.checkbox.id);
                this.setState({click_count: this.state.click_count - 1});
                console.log("Checkbox cnt 1: ", this.state.click_count);
                if ((this.state.click_count == 0) && this.state.isFavorite){
                    document.getElementById('add_button').hidden = "";
                }                    
            }
            
        }
        if (checkboxInput.checked && !this.state.checkboxDeleting){
            if (this.state.useReturnCheckbox){
                checkboxInput.className = "checkbox-input--checked-return";
                checkboxText.className = "checkbox-input--checked-return";
            }
            else if (this.state.isFavorite){
                checkboxInput.className = "checkbox-input--checked";
                this.setState({click_count: this.state.click_count + 1})
                console.log("Checkbox cnt 0: ", this.state.click_count);
                document.getElementById('add_button').hidden = "True";
            }
            else if (this.state.noFavoriteButton){
                checkboxInput.className = "checkbox-input--checked";
            } else {
                checkboxInput.className = "checkbox-input--checked";
                checkboxText.className = "checkbox-text--checked";
            }
            checkboxInput.checked = "True";
            if (this.state.isFavorite){
                console.log("Doing nothing");
            }
            else if (this.state.noFavoriteButton){
                const timerID = setTimeout(this.startOpenListTimer, 1000, this.state.checkbox.id);
                this.setState(state => ({...state, 
                    timerID: timerID, 
                    checkboxChecked: true,
                }));
            } else {
                const timerIDSlider = setTimeout(this.startItemSlider, 1000, this.state.checkbox.id);
                const timerID = setTimeout(this.dropCheckbox, 2000, this.state.checkbox.id);
                this.setState(state => ({...state, 
                    timerID: timerID, 
                    timerIDSlider: timerIDSlider,
                    checkboxChecked: true,
                }));
            }
        } else {
            this.stopItemAnimation(this.state.checkbox.id);
        }

        if (this.state.checkboxDeleting){
            this.stopItemAnimation(this.state.checkbox.id);
        }
    }


    deleteButtonOnClick = (e) => {
        let confirmation = false;
        if (this.state.noFavoriteButton){
            confirmation = window.confirm("Are use sure to delete " + this.state.checkbox.name + " list?")
        } else {
            confirmation = true
        }
        console.log("Delete button clicked");
        if (confirmation == true){
            let checkboxText = document.getElementById('checkboxText_'+this.state.checkbox.id);
            let checkboxInput = document.getElementById('checkboxInput_'+this.state.checkbox.id);

            if (!this.state.checkboxDeleting){
                console.log("DELETING ");
                checkboxInput.className = "checkbox-input--checked";
                checkboxText.className = "checkbox-text--checked";
                const timerIDSlider = setTimeout(this.startItemSlider, 1000, this.state.checkbox.id);
                const timerID = setTimeout(this.dropCheckbox, 2000, this.state.checkbox.id);
                this.setState(state => ({...state, 
                    timerID: timerID, 
                    timerIDSlider: timerIDSlider,
                    checkboxDeleting: true,
                }));
            } else {
                this.stopItemAnimation(this.state.checkbox.id);
            }
        }
    }

    favoriteButtonOnClick = (e) => {
        console.log("Favorite button clicked");
        let favoriteButton = document.getElementById('checkboxFavoriteButton_'+this.state.checkbox.id);
        
        if (!this.state.checkboxFavorite){
            favoriteButton.className = "favorite-button-enabled";
            favoriteButton.svg = ButtonFavoriteEnabledSVG;
            this.svgSwitch(ButtonFavoriteEnabledSVG, 'checkboxFavoriteButton_'+this.state.checkbox.id+'SVG');
            this.setState(state => ({...state, 
                checkboxFavorite: true,
            }));
        } else {
            this.svgSwitch(ButtonFavoriteSVG, 'checkboxFavoriteButton_'+this.state.checkbox.id+'SVG');
            favoriteButton.className = "favorite-button";
            favoriteButton.svg = ButtonFavoriteSVG;
            this.setState(state => ({...state, 
                checkboxFavorite: false,
            }));
        }
    }
    
    render() {
        let checkboxID = 0;
        if (this.state.checkbox !== null){
            checkboxID = this.state.checkbox.id;
        }
        const checkboxProps = {
            "id": 'checkboxInput_'+checkboxID,
            "isFavorite": this.props.isFavorite,
        }
        const delete_button_data = {
            id: 'checkboxDeleteButton_'+checkboxID,
            name: "delete",
            className: "delete-button"
        }

        const favorite_button_data = {
            id: 'checkboxFavoriteButton_'+checkboxID,
            name: "favorite",
            className: "favorite-button"
        }

        let defaultFavoriteButton = ButtonFavoriteSVG;
        if (this.state.checkboxFavorite == true){
            defaultFavoriteButton = ButtonFavoriteEnabledSVG;
        }
        
        return (
            <>
                <div>
                    {
                        this.state.checkbox != null 
                            ? 
                        // <div className={"checkbox-item"} id={'checkboxItem_'+this.state.checkbox.id} onClick={this.checkboxChanged}>
                        <div className={"checkbox-box"} id={'checkboxBox_'+this.state.checkbox.id}>
                            <div className={"checkbox-item"} id={'checkboxItem_'+this.state.checkbox.id} onClick={this.checkboxChanged}>
                                <Checkbox isFavorite={this.props.isFavorite} props={checkboxProps}/> 
                                <label className={"checkbox-text"} id={'checkboxText_'+this.state.checkbox.id}>{this.state.checkbox.name}</label>
                            </div>
                            
                            <ButtonSVG props={favorite_button_data} svg={defaultFavoriteButton} onClick={this.favoriteButtonOnClick}/>
                            <ButtonSVG props={delete_button_data} svg={ButtonDeleteSVG} onClick={this.deleteButtonOnClick}/>
                        </div>
                            :
                        <p>{'Загрузка'}</p>
                    }
                </div>            
            </>
        );
    }
}


