import * as React from "react"

import './style.css'

import ButtonSVG from '../buttonSVG'


export default class DropdownMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}

    }

    render() {
        return (
            <>
                <div className={"dropdown-menu-block"}>
                    {this.props.menuList.map((item) =>
                        <div className={"menu-item"} onClick={item.onClick}> 
                            <p 
                            className={"menu-text"} 
                            style={{'color': item.color}}
                            onClick={item.onClick} >
                                {item.name}
                            </p>    
                            {
                                item.button != null 
                                ? 
                                    <ButtonSVG props={{'id': ''}} svg={item.button}></ButtonSVG>
                                :
                                <></> 
                            }

                        </div>         
                    )}
                
                </div>
                
            </>
        );
    }
}

