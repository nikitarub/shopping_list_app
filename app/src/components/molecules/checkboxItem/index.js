import * as React from "react"

import './style.css'

import Checkbox from '../../atoms/checkbox'
import Button from '../../atoms/button'


export default class CheckboxItem extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            checkbox: null,
            checkboxChecked: false,
            checkboxDeleting: false,
            checkboxFavorite: false,
        }

    }

    componentDidMount = () => {
        console.log('Checkbox mounted')
        this.setState({checkbox: this.props.props})
    }

    componentDidUpdate = () => {
        if (this.state.checkbox !== this.props.props){
            this.setState({checkbox: this.props.props})
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

    startItemSlider = (id) => {
        let checkboxItem = document.getElementById('checkboxItem_'+id);
        let checkboxDeleteButton = document.getElementById('checkboxDeleteButton_'+id);
        let checkboxFavoriteButton = document.getElementById('checkboxFavoriteButton_'+id);
        if (checkboxItem !== null) {
            checkboxDeleteButton.hidden = "True"
            checkboxFavoriteButton.hidden = "True"
            checkboxItem.className = "checkbox-item--checked";
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

    checkboxChanged = (e) => {
        let checkboxText = document.getElementById('checkboxText_'+this.state.checkbox.id);
        let checkboxInput = document.getElementById('checkboxInput_'+this.state.checkbox.id);
        console.log("checkboxChanged: ", e);
        if (e.target.nodeName === "LABEL"){
            if (checkboxInput.checked === false && !this.state.checkboxDeleting){
                checkboxInput.checked = true;
            } else {
                checkboxInput.checked = false;
                this.stopItemAnimation(this.state.checkbox.id);
            }
            
        }
        if (checkboxInput.checked && !this.state.checkboxDeleting){
            checkboxInput.className = "checkbox-input--checked";
            checkboxText.className = "checkbox-text--checked";
            checkboxInput.checked = "True";
            const timerIDSlider = setTimeout(this.startItemSlider, 1000, this.state.checkbox.id);
            const timerID = setTimeout(this.dropCheckbox, 2000, this.state.checkbox.id);
            this.setState(state => ({...state, 
                timerID: timerID, 
                timerIDSlider: timerIDSlider,
                checkboxChecked: true,
            }));
        } else {
            this.stopItemAnimation(this.state.checkbox.id);
        }

        if (this.state.checkboxDeleting){
            this.stopItemAnimation(this.state.checkbox.id);
        }
    }


    deleteButtonOnClick = (e) => {
        console.log("Delete button clicked");
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

    favoriteButtonOnClick = (e) => {
        console.log("Favorite button clicked");
        let favoriteButton = document.getElementById('checkboxFavoriteButton_'+this.state.checkbox.id);
        
        if (!this.state.checkboxFavorite){
            favoriteButton.className = "favorite-button-enabled";
            this.setState(state => ({...state, 
                checkboxFavorite: true,
            }));
        } else {
            favoriteButton.className = "favorite-button";
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
            "id": 'checkboxInput_'+checkboxID
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
        
        return (
            <>
                <div>
                    {
                        this.state.checkbox != null 
                            ? 
                        // <div className={"checkbox-item"} id={'checkboxItem_'+this.state.checkbox.id} onClick={this.checkboxChanged}>
                        <div className={"checkbox-box"} id={'checkboxBox_'+this.state.checkbox.id}>
                            <div className={"checkbox-item"} id={'checkboxItem_'+this.state.checkbox.id} onClick={this.checkboxChanged}>
                                <Checkbox props={checkboxProps}/> 
                                <label className={"checkbox-text"} id={'checkboxText_'+this.state.checkbox.id}>{this.state.checkbox.name}</label>
                            </div>
                            <Button props={favorite_button_data} onClick={this.favoriteButtonOnClick}/>
                            <Button props={delete_button_data} onClick={this.deleteButtonOnClick}/>
                        </div>
                            :
                        <p>{'Загрузка'}</p>
                    }
                </div>            
            </>
        );
    }
}


