import * as React from "react"
// import classnames from 'classnames'

import './style.css'


import Checklist from '../../organisms/checklist'
import Button from '../../atoms/button'
import Input from '../../atoms/input'
import HeaderMenu from '../../molecules/headerMenu'

import {setCookie, checkAuth, auth} from '../../../tools/auth'
import fetchModule from '../../../tools/fetch';


export default class Start extends React.Component {
    constructor() {
        super();
        this.state = {
        }
    }

    componentDidMount = () => {
        checkAuth();
    }

    createUser = async () => {
        try {
            console.log("creating user");
            const response = await fetchModule.doPost({path: '/users/'});
            if ((response.status >= 200) && (response.status < 400)) {
                let json = await response.json();
                console.log("response: ", json);
                const user_id = json['user_id'];
                const list_id = json['lists'][0]['list_id'];
                setCookie('current_list_id', list_id);
                auth(user_id);
            } else {
                let json = await response.json();
                console.log("err response: ", json);
                alert("Failed to launch");
                throw response.status;
            }
        } catch (error) {
            throw error;
        }
        
    }
    
    render() {

        const button_props = {
            name: 'Start shopping list'
        }

        return (
            <>
                <div>
                    <HeaderMenu name={"Shopping list"} isStart={'true'}/>
                    {/* <h2 className={'list-title'}>Current list</h2> */}
                    

                    <div className={"start-main"}>
                        <div>
                        <h2>Hi! Let's go shopping!</h2>
                            <div className={"share-main"}>
                            <Button props={button_props} onClick={this.createUser}></Button>
                            </div>
                        </div>
                    </div>
                </div>            
            </>
        );
    }
}
