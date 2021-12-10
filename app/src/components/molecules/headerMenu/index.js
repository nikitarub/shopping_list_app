import * as React from "react"

import './style.css'

import ButtonMenu from '../../atoms/buttonMenu'
import ButtonSVG from "../../atoms/buttonSVG"
import Header from '../../atoms/header'
import DropdownMenu from '../../atoms/dropdownMenu'

// buttons
import buttonDeleteRedSVG from '../../atoms/buttonSVG/buttonDeleteRed.svg'
import buttonFavoriteSVG from '../../atoms/buttonSVG/buttonFavoriteEnabledSmall.svg'
import buttonShareSmallSVG from '../../atoms/buttonSVG/buttonShareSmall.svg'
import buttonBoughtAllSmallSVG from '../../atoms/buttonSVG/buttonBoughtAllSmall.svg'
import buttonBackSVG from '../../atoms/buttonSVG/buttonBack.svg'
import buttonListOfListSVG from '../../atoms/buttonSVG/buttonListOfList.svg'

import {getCookie, setCookie, checkAuth} from '../../../tools/auth'




export default class HeaderMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: null,
            has_history: false,
            isHome: this.props.isHome,
            isStart: this.props.isStart,
            menu: []
        }

    }

    componentDidMount = () => {
        checkAuth();
        this.menuSwitch();
        this.setState({name: this.props.name})
        console.log("isHome: ", this.state.isHome);
        console.log("window.history.length: ", window.history.length);
        if (this.state.has_history == false) {
            if (window.history.length > 1){
                this.setState({has_history: true})
            }
        }

        if (this.props.isHome){
            this.setState({isHome : true});
        }
        if (this.props.isStart){
            this.setState({isStart : true});
        }
        console.log("isHome_2: ", this.props.isHome == true);
    }

    componentDidUpdate = () => {
        if (this.state.name !== this.props.name) {
            this.setState({name: this.props.name})
        }
        if (this.state.isHome !== true) {
            if (this.props.isHome == "true"){
                this.setState({isHome: true})
            }
            
        }
        if (this.state.has_history == false) {
            if (window.history.length > 1){
                this.setState({has_history: true})
            } 
        }
    }

    goBackwards = () => {
        window.history.back()
    }

    navigateToShare = () => {
        console.log("Sharing");
        window.open('/share', '_self');
    }

    navigateToFavorites = () => {
        console.log("Sharing");
        window.open('/favorites', '_self');
    }
    

    navigateToLists = () => {
        console.log("Lists");
        window.open('/lists', '_self');
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


    menuSwitch = () => {
        let menu = []

        if (window.location.pathname == "/"){
            menu = [
                {
                    name: 'I bought all',
                    color: '#5CA8EF',
                    button: buttonBoughtAllSmallSVG,
                    onClick: this.props.boughtAll
                },
                {
                    name: 'My favorites',
                    color: '#FFC107',
                    button: buttonFavoriteSVG,
                    onClick: this.navigateToFavorites
                },
                {
                    name: 'Clear all',
                    color: '#FB0A0A',
                    button: buttonDeleteRedSVG,
                    onClick: this.props.clearAll
                },
                {
                    name: 'Share the list',
                    color: 'black',
                    button: buttonShareSmallSVG,
                    onClick: this.navigateToShare
                }
            ]
        } else if (window.location.pathname == "/history"){
            menu = [
                {
                    name: 'My favorites',
                    color: '#FFC107',
                    button: buttonFavoriteSVG,
                    onClick: this.navigateToFavorites
                }
            ]
        } else if (window.location.pathname == "/favorites"){
            menu = [
                {
                    name: 'Clear all',
                    color: '#FB0A0A',
                    button: buttonDeleteRedSVG,
                    onClick: this.props.clearAll
                },
            ]
        }
        
        

        this.setState({ menu: menu})
    }
    
    render() {
        const submenu_button_data = {
            name: 'Sub Menu'
        }

        

        return (
            <>
                <div>
                    {
                        this.state.name != null 
                            ? 
                        <div>
                            <div className={'menu-dropdown'} id={'menu-dropdown'} hidden={'True'}>
                                <DropdownMenu name={'Menu dropdown'} menuList={this.state.menu}/>
                            </div>
                            <div className={"header-menu"}>
                                {
                                    (this.state.has_history == true) && (this.state.isHome != true) && (this.state.isStart != true)
                                    ?
                                    <div className={'back-button'} onClick={this.goBackwards}>
                                        <ButtonSVG props={{'id': 'back_button'}} svg={buttonBackSVG} ></ButtonSVG>
                                        <h3 style={{"color":"white"}}>Back</h3>
                                    </div>
                                    :
                                    <></>
                                }
                                {
                                    (this.state.isHome == true) && (this.state.isStart != true)
                                    ?
                                    <div className={'back-button'} onClick={this.navigateToLists}>
                                        <ButtonSVG props={{'id': 'back_list_of_list'}} svg={buttonListOfListSVG} ></ButtonSVG>
                                    </div>
                                    :
                                    <></>
                                }
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


