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
            inputText: ''
        }
    }

    componentDidMount = () => {
        console.log('EditableChecklist mounted')
        this.setCheckboxes()
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

    addFavoritesToList = () => {
        console.log("lol");
        window.location.href = "/"
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
                    <HeaderMenu name={"My favorites"}/>
                    {/* <h2 className={'list-title'}>Current list</h2> */}
                    <div className={"list"} onClick={this.checklistChange}>
                        <Checklist isFavorite={'true'} props={this.state.checkboxes} hintMessage={'Create new item'}/>
                        <InputForm orange={'true'} onTextChange={this.inputChange} onAddClick={this.productInputed}></InputForm>
                    </div>
                    
                    <div className={"button-floating-add-all"} id={'add_all_button'} hidden={"True"}>
                        <ButtonSVG props={button_data} svg={ButtonFloatingYellowAddSVG} onClick={this.addFavoritesToList}/>
                    </div>
                </div>            
            </>
        );
    }
}
