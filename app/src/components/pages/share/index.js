import * as React from "react"
// import classnames from 'classnames'

import './style.css'


import Checklist from '../../organisms/checklist'
import Button from '../../atoms/button'
import Input from '../../atoms/input'
import HeaderMenu from '../../molecules/headerMenu'

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
            the_link: 'https://shopping.dyakov.space/'
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
                    <div className={"link-share"} >
                        <a href="#">https://shopping.dyakov.space/</a>
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
