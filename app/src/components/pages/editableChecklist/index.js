import * as React from "react"
// import classnames from 'classnames'

import style from './style.css'


import Checklist from '../../organisms/checklist'
import Button from '../../atoms/button'
import Input from '../../atoms/input'

export default class EditableChecklist extends React.Component {
    constructor() {
        super();
        this.state = {
            checkboxes: [],
            inputText: ''
        }
    }

    componentDidMount = () => {
        console.log('EditableChecklist mounted')
        this.setCheckboxes()
    }

    setCheckboxes = () => {
        
        this.setState(state => ({...state, checkboxes: [
            {
                "id":1,
                "name": "hi"
            },
            {
                "id":2,
                "name": "potato"
            },
            {
                "id":3,
                "name": "4567890"
            },
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
    
    
    render() {
        const button_data = {
            name: 'Add'
        }
        return (
            <>
                <div className={"list"}>
                    <h2 className={'list-title'}>Current list</h2>
                    <Checklist props={this.state.checkboxes}/>
                    <Input id={"item-list-input"} onChange={this.inputChange}/>
                    <Button props={button_data} onClick={this.buttonOnClick}/>
                </div>            
            </>
        );
    }
}
