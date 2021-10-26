import * as React from "react"

import './style.css'

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}

    }

    render() {
        return (
            <>
                <div className={"dropdown-menu-block"}>
                    {this.props.menuList.map((item) => 
                        <p className={"menu-text"} onClick={item.onClick} >{item.name}</p>             
                    )}
                
                </div>
                
            </>
        );
    }
}

