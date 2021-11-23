import * as React from "react"
// import classnames from 'classnames'

import style from './style.css'


import Checklist from '../../organisms/checklist'
import Button from '../../atoms/button'
import Input from '../../atoms/input'
import HeaderMenu from '../../molecules/headerMenu'
import BottomNav from '../../atoms/bottomNav'


export default class HistoryList extends React.Component {
    constructor() {
        super();
        this.state = {
            checkboxes_favorite: null,
            checkboxes_history: null,
            inputText: ''
        }
    }

    componentDidMount = () => {
        console.log('EditableChecklist mounted')
        this.setCheckboxes()
    }

    setCheckboxes = () => {
        
        this.setState(state => ({...state, checkboxes_favorite: 
        [
            {
                "id":2,
                "name": "potato",
                "favorite": true,
                "useReturnCheckbox": true,


            },
            {
                "id":3,
                "name": "apples",
                "favorite": true,
                "useReturnCheckbox": true,
            },
            {
                "id":1,
                "name": "milk",
                "favorite": true,
                "useReturnCheckbox": true,
            }
        ], 
            checkboxes_history: [
                {
                    "id":4,
                    "name": "water",
                    "useReturnCheckbox": true,
                },
                {
                    "id":5,
                    "name": "sushi",
                    "useReturnCheckbox": true,
                },
                {
                    "id":6,
                    "name": "bread",
                    "useReturnCheckbox": true,
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
                    <HeaderMenu name={"History"}/>
                    <div className={"list"}>
                        <div>
                            <p>Favorite</p>
                            <hr/>
                            <div onClick={this.checklistChange}>
                                <Checklist useReturnCheckbox={true} props={this.state.checkboxes_favorite} hintMessage={'There are no bought items on your favorites list yet. '}/>
                            </div>
                        </div>
                        

                        <div>
                            <p>History</p>
                            <hr/>
                            <div onClick={this.checklistChange}>
                                <Checklist props={this.state.checkboxes_history} hintMessage={'There are no already purchased items'}/>
                            </div>
                        </div>
                    </div>
                </div>   
                <BottomNav currentIsActive={false}></BottomNav>         
            </>
        );
    }
}
