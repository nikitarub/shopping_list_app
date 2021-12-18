import * as React from "react"

import style from './style.css'


import Checklist from '../../organisms/checklist'
import Button from '../../atoms/button'
import HeaderMenu from '../../molecules/headerMenu'
import BottomNav from '../../atoms/bottomNav'

import InputForm from '../../organisms/inputForm'

import {getCookie, setCookie, checkAuth} from '../../../tools/auth'
import fetchModule from '../../../tools/fetch';


export default class CurrentList extends React.Component {
    constructor() {
        super();
        this.state = {
            checkboxes: null,
            inputText: '', 
            listName: "Current List"
        }
    }

    componentDidMount = () => {
        console.log('EditableChecklist mounted')
        this.setCheckboxes()
        checkAuth();
    }

    getListData = async () => {
        const current_list_id = getCookie("current_list_id");
        const user_id = getCookie("userID");
        
        console.log("userID: ", user_id);
        console.log("current_list_id: ", current_list_id);
        // fetch
        try {
            console.log("getting list items ");
            const response = await fetchModule.doGet({path: '/users/'+user_id+'/lists/'+current_list_id});
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

    postNewItem = async (name) => {
        const current_list_id = getCookie("current_list_id");
        const user_id = getCookie("userID");
        
        console.log("current_list_id: ", current_list_id);
        // fetch
        try {
            console.log("getting list items ");
            const item_data = {
                'name': name
            }
            const response = await fetchModule.doPost({path: '/users/'+user_id+'/lists/'+current_list_id+'/items/', body:item_data});
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
        // get items from list here

        let list_data = await this.getListData();

        let checkboxes = [];
        let ids = [];

        if (Object.keys(list_data).length !== 0){
            this.state.listName = list_data['name']
            list_data['items'].forEach(element => {
                if (element['check'] !== true) {
                    if (!ids.includes(element.item_id)){
                        let checkbox = {
                            'item_id': element.item_id,
                            'id': element.item_id,
                            'name': element.name,
                        }
                        if (element.fave_id != null){
                            checkbox['favorite'] = true
                        }
                        checkboxes.push(checkbox);
                        ids.push(element.item_id);
                    }
                    
                }
                
            });
        }

        

        this.setState(state => ({...state, 
            checkboxes: checkboxes 
        }));
    }

    buttonOnClick = async (e) => {
        // post new item here 
        console.log("EDIT BUTTON CLICKED");
        const item_data = await this.postNewItem(this.state.inputText);
        
        let checkboxes = this.state.checkboxes;
        checkboxes.push({
            "id": item_data['item_id'],
            'item_id': item_data['item_id'],
            "name": item_data['name']
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

    boughtAll = async () => {
        // just derni ruch'ky 
        const current_list_id = getCookie("current_list_id");
        const user_id = getCookie("userID");
        
        console.log("current_list_id: ", current_list_id);
        // fetch
        try {
            console.log("getting list items ");
            const response = await fetchModule.doPost({path: '/users/'+user_id+'/lists/'+current_list_id+'/checkall'});
            if ((response.status >= 200) && (response.status < 400)) {
                let json = await response.json();
                console.log("list: ", json);
                
            } else {
                console.error(response.status); 
            }
        } catch (error) {
            console.error(error);
            
        }
        this.setCheckboxes();
    }

    deleteItem = async (item_id) => {
        const current_list_id = getCookie("current_list_id");
        const user_id = getCookie("userID");
        
        console.log("current_list_id: ", current_list_id);
        // fetch
        try {
            console.log("getting list items ");
            const response = await fetchModule.doDelete({path: '/users/'+user_id+'/lists/'+current_list_id+'/items/'+item_id});
            if ((response.status >= 200) && (response.status < 400)) {
                let json = await response.json();
                console.log("list: ", json);
                
            } else {
                console.error(response.status); 
            }
        } catch (error) {
            console.error(error);
            
        }
        this.setCheckboxes();
    }

    clearAll = async () => {
        // get all first, them drop'em all
        this.setCheckboxes();

        this.state.checkboxes.forEach(checkbox => {
            this.deleteItem(checkbox.id);
        })

        this.setCheckboxes();
    }

    
    
    render() {
        const button_data = {
            name: 'Add'
        }
        return (
            <>
                <div>
                    <HeaderMenu boughtAll={this.boughtAll} clearAll={this.clearAll} name={this.state.listName} isHome={'true'}/>
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
