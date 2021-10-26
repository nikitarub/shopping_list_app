import * as React from "react"
// import classnames from 'classnames'

import style from './style.css'


import Checklist from '../../organisms/checklist'
import Button from '../../atoms/button'
import Input from '../../atoms/input'
import HeaderMenu from '../../molecules/headerMenu'

export default class ListOfList extends React.Component {
    constructor() {
        super();
        this.state = {
            checkboxes: null,
            inputText: ''
        }
    }

    componentDidMount = () => {
        console.log('EditableChecklist mounted')
        this.setCheckboxes()
    }

    setCheckboxes = () => {
        
        this.setState(state => ({...state, checkboxes: 
        [
            {
                "id":2,
                "name": "My list",
                "noFavoriteButton" : true,
            },
            {
                "id":3,
                "name": "Family weekend shopping",
                "noFavoriteButton" : true,
            },
            {
                "id":1,
                "name": "B-day list",
                "noFavoriteButton" : true,
            }
        ]
        }));
    }

    buttonOnClick = (e) => {
        console.log("EDIT BUTTON CLICKED");
        let checkboxes = this.state.checkboxes;
        checkboxes.push({
            "id": Math.random(),
            "name": this.state.inputText
        })
        this.setState(state => ({...state, checkboxes: checkboxes}));
        const input = document.getElementById('item-list-input');
        input.value = ""
    }

    inputChange = (e) => {
        const input = document.getElementById('item-list-input');
        this.setState(state => ({...state, inputText:input.value}))
    }

    checklistChange = (e) => {
        // console.log("======= checklistChange: ", e);
    }
    
    
    render() {
        const button_data = {
            name: 'Add'
        }
        return (
            <>
                <div>
                    <HeaderMenu name={"My lists"}/>
                    {/* <h2 className={'list-title'}>Current list</h2> */}
                    <div className={"list"} onClick={this.checklistChange}>
                        <Checklist props={this.state.checkboxes} hintMessage={'Create new item'}/>
                        <Input id={"item-list-input"} onChange={this.inputChange}/>
                        <Button props={button_data} onClick={this.buttonOnClick}/>
                    </div>
                    
                </div>            
            </>
        );
    }
}
