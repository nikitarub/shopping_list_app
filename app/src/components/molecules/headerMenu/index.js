import * as React from "react"

import './style.css'

import ButtonMenu from '../../atoms/buttonMenu'
import Header from '../../atoms/header'
import DropdownMenu from '../../atoms/dropdownMenu'

export default class HeaderMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: null
        }

    }

    componentDidMount = () => {
        this.setState({name: this.props.name})
    }

    componentDidUpdate = () => {
        if (this.state.name !== this.props.name) {
            this.setState({name: this.props.name})
        }
    }

    navigateToShare = () => {
        console.log("Sharing");
        window.open('/share', '_self');
    }

    navigateToLogin = () => {
        console.log("Log in stub");
    }

    onMenuButtonClick = () => {
        console.log("onMenuButtonClick");
        let menu = document.getElementById('menu-dropdown');
        if (menu.hidden == ''){
            menu.hidden = 'True'
        } else {
            menu.hidden = ''
        }
    }
    
    render() {
        const submenu_button_data = {
            name: 'Sub Menu'
        }

        const menu =[
            {
                name: 'log in',
                onClick: this.navigateToLogin
            }, 
            {
                name: 'share',
                onClick: this.navigateToShare
            }
        ]

        return (
            <>
                <div>
                    {
                        this.state.name != null 
                            ? 
                        <div>
                            <div className={'menu-dropdown'} id={'menu-dropdown'} hidden={'True'}>
                                <DropdownMenu name={'Menu dropdown'} menuList={menu}/>
                            </div>
                            <div className={"header-menu"}>
                                <div className={"header-title"}>
                                    <Header name={this.state.name}/>
                                </div>
                                <ButtonMenu props={submenu_button_data} onClick={this.onMenuButtonClick}/>
                            </div>
                        </div>
                            :
                        <Header name={"Загрузка"}/>
                    }
                </div>            
            </>
        );
    }
}


