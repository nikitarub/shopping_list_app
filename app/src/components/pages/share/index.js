import * as React from "react"
// import classnames from 'classnames'

import './style.css'


import Checklist from '../../organisms/checklist'
import Button from '../../atoms/button'
import Input from '../../atoms/input'
import HeaderMenu from '../../molecules/headerMenu'

import {getCookie, setCookie, checkAuth} from '../../../tools/auth'
import fetchModule from '../../../tools/fetch';


function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
  
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
  
    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }
  
    document.body.removeChild(textArea);
  }
function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(text);
      return;
    }
    navigator.clipboard.writeText(text).then(function() {
      console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
      console.error('Async: Could not copy text: ', err);
    });
  }


export default class Share extends React.Component {
    constructor() {
        super();
        this.state = {
            // http://localhost:3000
            the_link: 'https://shopping.dyakov.space/share?share_id=',
            qr_prefix: "https://api.qrserver.com/v1/create-qr-code/?data="
        }
    }

    componentDidMount = async () => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        console.log("urlParams: ", urlParams);
        if (urlParams.has('share_id')){
            // если есть, то достаем и добавляем список пользователю -> открываем этот список 
            const share_id = urlParams.get('share_id');
            this.setState(state => ({...state, 
                share_id: share_id
            }));
            await this.acceptSharedList(share_id);
        } else {
            console.log("Here");
            // создаем шэринг: 
            let res = await this.createShareId();
            let share_id = res.share_id;
            let the_link = this.state.the_link;
            the_link = the_link + share_id;
            let qr = this.state.qr_prefix;
            qr = qr + the_link;
            this.setState(state => ({...state, 
                share_id: share_id,
                the_link: the_link,
                qr: qr
            }));
        }
    }

    acceptSharedList = async (share_id) => {
        console.log("accepting shared list");
        // accept request
        console.log("share_id: ", share_id);
        let res = await this.acceptListRequest(share_id);
        const list_id = res.list_id;
        setCookie('current_list_id', list_id);
        window.open('/', '_self');
    }


    acceptListRequest = async (share_id) => {
        const user_id = getCookie("userID");

        try {
            console.log("accepting list ");
            const response = await fetchModule.doGet({path: '/users/'+user_id+'/share/'+share_id});
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

    createShareId = async () => {
        console.log("creating share id");
        // берем из кук текущий id и понеслась
        const current_list_id = getCookie("current_list_id");
        const user_id = getCookie("userID");
        
        try {
            console.log("getting list items ");
            const item_data = {
                "type": "rw"
            }
            const response = await fetchModule.doPost({path: '/users/'+user_id+'/lists/'+current_list_id+'/share', body:item_data});
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

    copyToClipboard = () => {
        copyTextToClipboard(this.state.the_link);
    }

    callShareAPI = () => {
        const shareData = {
            // title: 'Shopping list',
            // text: 'Shared shopping list',
            url: this.state.the_link
        }
        if (navigator.canShare) {
            navigator.share(shareData)
            .then(() => console.log('Share was successful.'))
            .catch((error) => console.log('Sharing failed', error));
            } else {
            console.log(`Your system doesn't support sharing files.`);
        }
    }
    
    render() {

        const button_props = {
            name: 'Copy To Clipboard'
        }

        const native_share_button_props = {
            name: 'Share'
        }
        return (
            <>
                <div>
                    <HeaderMenu name={"Share"}/>
                    {/* <h2 className={'list-title'}>Current list</h2> */}
                    
                    <div className={"share-main"}>
                        <img id={"qr_code"} src={this.state.qr} />
                    </div>
                        
                    <div className={"link-share"} >
                        <a href={this.state.the_link}>{this.state.the_link}</a>
                    </div>
                    

                    <div className={"share-main"}>
                        <div>
                        <h2>Share the link with your friend by clipboard</h2>
                            <div className={"share-main"}>
                            <Button props={button_props} onClick={this.copyToClipboard}></Button>
                            </div>
                        </div>
                    </div>

                    <div className={"share-main"}>
                        <div>
                            <h2>Or simply use</h2>
                            <div>
                                <Button props={native_share_button_props} onClick={this.callShareAPI}></Button>
                            </div>
                        </div>
                    </div>
                    
                    
                    
                </div>            
            </>
        );
    }
}


// {
//   "share_id": "e551c943-c17a-4216-960d-f19d769e97ab",
//   "link": "https://shopping.dyakov.space/e551c943-c17a-4216-960d-f19d769e97ab",
//   "qr": "https://api.qrserver.com/v1/create-qr-code/?data=https://shopping.dyakov.space/e551c943-c17a-4216-960d-f19d769e97ab",
//   "type": "rw",
//   "user_id": "b7e4ce46-8cbf-439f-853c-75f569d9e9f6",
//   "list_id": "4830fb85-e550-439d-a15d-3f942a60ab71"
// }