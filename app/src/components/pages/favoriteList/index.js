import * as React from "react"
// import classnames from 'classnames'

import style from './style.css'


import Checklist from '../../organisms/checklist'
import Button from '../../atoms/button'
import HeaderMenu from '../../molecules/headerMenu'
import BottomNav from '../../atoms/bottomNav'

import InputForm from '../../organisms/inputForm'

import ButtonSVG from '../../atoms/buttonSVG'
import ButtonFloatingYellowAddSVG from '../../atoms/buttonSVG/buttonFloatingYellowAdd.svg'

import {getCookie, setCookie, checkAuth} from '../../../tools/auth'
import fetchModule from '../../../tools/fetch';


export default class FavoriteList extends React.Component {
    constructor() {
        super();
        this.state = {
            checkboxes: null,
            inputText: '',
            favourite_choices: [],
        }
    }

    componentDidMount = () => {
        console.log('EditableChecklist mounted')
        this.setCheckboxes()
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

    getListData = async () => {
        const current_list_id = getCookie("current_list_id");
        const user_id = getCookie("userID");
        
        console.log("current_list_id: ", current_list_id);
        // fetch
        try {
            console.log("getting list items ")
            const response = await fetchModule.doGet({path: '/users/'+user_id+'/favourites'});
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

        if (Object.keys(list_data).length !== 0){
            list_data['items'].forEach(element => {
                let checkbox = {
                    'item_id': element.fave_id,
                    'fave_id': element.fave_id,
                    'id': element.fave_id,
                    'name': element.name,
                }
                if (element.fave_id != null){
                    checkbox['favorite'] = true
                }
                checkboxes.push(checkbox);
            });
        }

        this.setState(state => ({...state, 
            checkboxes: checkboxes 
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


    favouriteChoose = (value, flag) => {
        let fav_choose = this.state.favourite_choices;
        if (flag === 1) {
            fav_choose.push(value);
        } else if (flag === -1) {
            let tmp = [];
            fav_choose.forEach(element => { 
                if (element.id !== value.id){
                    tmp.push(element);
                }
            });
            fav_choose = tmp;
            
        } else if (flag === 0){
            // add items
            fav_choose.forEach(element => {
                this.postNewItem(element.name);
            })
            
        }
        if (fav_choose.length === 0){
            document.getElementById("add_all_button").hidden = "True";
            document.getElementById("add_button").hidden = "";
            
        }
        console.log("fav_choose: ", fav_choose);
        this.setState(state => ({...state, favourite_choices: fav_choose}))
    }

    deleteFavoriteItem = async (fave_id) => {
        const current_list_id = getCookie("current_list_id");
        const user_id = getCookie("userID");
        
        console.log("current_list_id: ", current_list_id);
        // fetch
        // b7e4ce46-8cbf-439f-853c-75f569d9e9f6/favourites/1bc02684-9202-4fb8-8078-ce42df2edd99
        try {
            console.log("getting list items ");
            const response = await fetchModule.doDelete({path: '/users/'+user_id+'/favourites/'+fave_id});
            if ((response.status >= 200) && (response.status < 400)) {
                let json = await response.json();
                console.log("list: ", json);
                return json;
            } else {
                alert("Failed to unfavourite item, please try again later.")
                console.error(response.status);
                return {} 
            }
        } catch (error) {
            alert("Failed to unfavourite item, please try again later.")
            console.error(error);
            return {}
        }
    }
    clearAll = async () => {
        // get all first, them drop'em all
        this.setCheckboxes();

        this.state.checkboxes.forEach(checkbox => {
            this.deleteFavoriteItem(checkbox.id);
        })

        this.setCheckboxes();
    }
    
    
    render() {

        const button_data = {
            name: "Add"
        }
        
        return (
            <>
                <div>
                    <HeaderMenu clearAll={this.clearAll} name={"My favorites"}/>
                    {/* <h2 className={'list-title'}>Current list</h2> */}
                    <div className={"list"} onClick={this.checklistChange}>
                        <Checklist favouriteChoose={this.favouriteChoose} isFavorite={'true'} props={this.state.checkboxes} hintMessage={'Create new item'}/>
                        <InputForm orange={'true'} onTextChange={this.inputChange} onAddClick={this.productInputed}></InputForm>
                    </div>
                </div>   
                       
            </>
        );
    }
}
