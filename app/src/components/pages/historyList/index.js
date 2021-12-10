import * as React from "react"
// import classnames from 'classnames'

import style from './style.css'


import Checklist from '../../organisms/checklist'
import Button from '../../atoms/button'
import Input from '../../atoms/input'
import HeaderMenu from '../../molecules/headerMenu'
import BottomNav from '../../atoms/bottomNav'

import {getCookie, setCookie, checkAuth} from '../../../tools/auth'
import fetchModule from '../../../tools/fetch';

export default class HistoryList extends React.Component {
    constructor() {
        super();
        this.state = {
            checkboxes_favorite: null,
            checkboxes_history: null,
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

    getFavoriteData = async () => {
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


    getHistoryData = async () => {
        const current_list_id = getCookie("current_list_id");
        const user_id = getCookie("userID");
        
        console.log("current_list_id: ", current_list_id);
        // fetch
        try {
            console.log("getting list items ")
            const response = await fetchModule.doGet({path: '/users/'+user_id+'/history'});
            if ((response.status >= 200) && (response.status < 400)) {
                let json = await response.json();
                console.log("list: ", json);
                return json;
            } else {
                console.error(response.status); 
                return {}
            }
        } catch (error) {
            console.error(error); 
            return {}
        }
    }

    setCheckboxes = async () => {
        // get items from list here

        let list_data = await this.getFavoriteData();

        let checkboxes_favorite = [];
        
        if (Object.keys(list_data).length !== 0){
            list_data['items'].forEach(element => {
                let checkbox = {
                    'item_id': element.fave_id,
                    'id': element.fave_id,
                    'name': element.name,
                    "useReturnCheckbox": true,
                    'favorite' : true
                }
                checkboxes_favorite.push(checkbox);
            });
        }

        list_data = await this.getHistoryData();

        let checkboxes_history = [];

        console.log("list_data: ", list_data);

        if (Object.keys(list_data).length !== 0){
            list_data['items'].forEach(element => {
                let checkbox = {
                    'item_id': element.fave_id,
                    'id': element.fave_id,
                    'name': element.name,
                    "useReturnCheckbox": true,
                }
                if (element.fave_id != null){
                    checkbox['favorite'] = true
                }
                checkboxes_history.push(checkbox);
            });
        }

        this.setState(state => ({...state, 
            checkboxes_favorite: checkboxes_favorite,
            checkboxes_history: checkboxes_history
        }));
    }

    // setCheckboxes = () => {
        
    //     this.setState(state => ({...state, checkboxes_favorite: 
    //     [
    //         {
    //             "id":2,
    //             "name": "potato",
    //             "favorite": true,
    //             "useReturnCheckbox": true,


    //         },
    //         {
    //             "id":3,
    //             "name": "apples",
    //             "favorite": true,
    //             "useReturnCheckbox": true,
    //         },
    //         {
    //             "id":1,
    //             "name": "milk",
    //             "favorite": true,
    //             "useReturnCheckbox": true,
    //         }
    //     ], 
    //         checkboxes_history: [
    //             {
    //                 "id":4,
    //                 "name": "water",
    //                 "useReturnCheckbox": true,
    //             },
    //             {
    //                 "id":5,
    //                 "name": "sushi",
    //                 "useReturnCheckbox": true,
    //             },
    //             {
    //                 "id":6,
    //                 "name": "bread",
    //                 "useReturnCheckbox": true,
    //             }
    //         ]
    //     }));
    // }

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

    favouriteChoose = async (value, flag) => {
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
            });
            
        }
        if (fav_choose.length === 0){
            document.getElementById("add_all_button").hidden = "True";            
        }
        console.log("fav_choose: ", fav_choose);
        this.setState(state => ({...state, favourite_choices: fav_choose}))
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
                                <Checklist favouriteChoose={this.favouriteChoose} isFavorite={'true'} useReturnCheckbox={true} props={this.state.checkboxes_favorite} hintMessage={'There are no bought items on your favorites list yet. '}/>
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
