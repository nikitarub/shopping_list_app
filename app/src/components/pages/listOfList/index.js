import * as React from "react"
// import classnames from 'classnames'

import style from './style.css'


import Checklist from '../../organisms/checklist'
import Button from '../../atoms/button'
import Input from '../../atoms/input'
import HeaderMenu from '../../molecules/headerMenu'
import InputForm from '../../organisms/inputForm'

import {getCookie, setCookie, checkAuth} from '../../../tools/auth'
import fetchModule from '../../../tools/fetch';


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

    getLists = async () => {
        const current_list_id = getCookie("current_list_id");
        const user_id = getCookie("userID");
        
        console.log("current_list_id: ", current_list_id);
        // fetch
        try {
            console.log("getting list items ");
            const response = await fetchModule.doGet({path: '/users/'+user_id});
            if ((response.status >= 200) && (response.status < 400)) {
                let json = await response.json();
                console.log("list: ", json);
                return json;
            } else {
                throw response.status; 
            }
        } catch (error) {
            throw error;
        }
    }

    postNewList = async (name) => {
        const current_list_id = getCookie("current_list_id");
        const user_id = getCookie("userID");
        
        console.log("current_list_id: ", current_list_id);
        // fetch
        try {
            console.log("getting list items ");
            const item_data = {
                'name': name
            }
            const response = await fetchModule.doPost({path: '/users/'+user_id+'/lists/', body:item_data});
            if ((response.status >= 200) && (response.status < 400)) {
                let json = await response.json();
                console.log("list: ", json);
                return json;
            } else {
                throw response.status; 
            }
        } catch (error) {
            throw error;
        }
    }

    setCheckboxes = async () => {
        let list_data = await this.getLists();

        let checkboxes = [];

        if (Object.keys(list_data).length !== 0){
            list_data['lists'].forEach(element => {
                let checkbox = {
                    'list_id': element.list_id,
                    'id': element.list_id,
                    'name': element.name,
                    "noFavoriteButton" : true,
                }
                checkboxes.push(checkbox);
            });
        }

        this.setState(state => ({...state, 
            checkboxes: checkboxes 
        }));

    }

    buttonOnClick = async (e) => {
        console.log("EDIT BUTTON CLICKED");
        let checkboxes = this.state.checkboxes;
        const item_data = await this.postNewList(this.state.inputText);
        checkboxes.push({
            "id": item_data['list_id'],
            'list_id': item_data['list_id'],
            "name": item_data['name'],
            "noFavoriteButton" : true,
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

    productInputed = (value) => {
        console.log("productInputed: ", value);
        this.setState(state => ({...state, inputText:value}))
        setTimeout(this.buttonOnClick, 100, undefined);

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
                        <InputForm isListForm={true} onTextChange={this.inputChange} onAddClick={this.productInputed}></InputForm>
                    </div>
                    
                </div>            
            </>
        );
    }
}
