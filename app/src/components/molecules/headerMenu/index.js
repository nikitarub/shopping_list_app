import * as React from "react"

import './style.css'

import ButtonMenu from '../../atoms/buttonMenu'
import Header from '../../atoms/header'


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
                        <div className={"header-menu"}>
                            <div className={"header-title"}>
                                <Header name={this.state.name}/>
                            </div>
                            <ButtonMenu props={submenu_button_data}/>
                        </div>
                            :
                        <Header name={"Загрузка"}/>
                    }
                </div>            
            </>
        );
    }
}


