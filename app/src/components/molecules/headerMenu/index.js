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




export default class HeaderMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: null,
            has_history: false,
            isHome: this.props.isHome
        }

    }

    componentDidMount = () => {
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
    
    render() {
        const submenu_button_data = {
            name: 'Sub Menu'
        }

        let menu =[
            {
                name: 'I bought all',
                color: '#5CA8EF',
                button: buttonBoughtAllSmallSVG,
                onClick: this.navigateToShare
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
                onClick: this.navigateToShare
            },
            {
                name: 'Share the list',
                color: 'black',
                button: buttonShareSmallSVG,
                onClick: this.navigateToShare
            },
            {
                name: 'Log in',
                color: 'black',
                onClick: this.navigateToLogin
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
                                {
                                    (this.state.has_history == true) && (this.state.isHome != true)
                                    ?
                                    <div className={'back-button'} onClick={this.goBackwards}>
                                        <ButtonSVG props={{'id': 'back_button'}} svg={buttonBackSVG} ></ButtonSVG>
                                        <h3 style={{"color":"white"}}>Back</h3>
                                    </div>
                                    :
                                    <></>
                                }
                                {
                                    (this.state.isHome == true)
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


