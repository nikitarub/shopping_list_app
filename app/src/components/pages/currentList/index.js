import * as React from "react"
// import classnames from 'classnames'

import style from './style.css'


import Checklist from '../../organisms/checklist'
import Button from '../../atoms/button'
import HeaderMenu from '../../molecules/headerMenu'
import BottomNav from '../../atoms/bottomNav'

import InputForm from '../../organisms/inputForm'

export default class CurrentList extends React.Component {
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
                "name": "potato"
            },
            {
                "id":3,
                "name": "apples"
            },
            {
                "id":1,
                "name": "milk"
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

    productInputed = (value) => {
        console.log("productInputed: ", value);
        this.setState(state => ({...state, inputText:value}))
        setTimeout(this.buttonOnClick, 100, undefined);

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
                    <HeaderMenu name={"Current List"} isHome={'true'}/>
                    {/* <h2 className={'list-title'}>Current list</h2> */}
                    <div className={"list"} onClick={this.checklistChange}>
                        <Checklist props={this.state.checkboxes} hintMessage={'Create new item'}/>
                        <InputForm onTextChange={this.inputChange} onAddClick={this.productInputed}></InputForm>
                    </div>
                    <BottomNav currentIsActive={true}></BottomNav>
                </div>            
            </>
        );
    }
}
