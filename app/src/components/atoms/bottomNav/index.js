import * as React from "react"

import './style.css'

export default class BottomNav extends React.Component {
    constructor(props) {
        super(props);
        console.log("BottomNav", this.props);

    }
    
    navigateToCurrentList = () =>{
        window.open('/', '_self');
    }
      
    navigateToHistory = () =>{
        window.open('/history', '_self');
    }
      

    componentDidMount = () => {
        console.log('Button mounted')
    }
    
    render() {
        let curentClassName = "bottom-nav-item";
        let historyClassName = "bottom-nav-item";
        // this.props.currentIsActive
        if (this.props.currentIsActive){
            curentClassName = "bottom-nav-item-active";
        } else {
            historyClassName = "bottom-nav-item-active";
        }
        return (
            <div className={"bottom-nav"} id={"bottom-nav-bar"}>
                <div id={curentClassName} className={curentClassName} onClick={this.navigateToCurrentList}>
                    Current List
                </div>
                <div id={historyClassName} className={historyClassName} onClick={this.navigateToHistory}>
                    History
                </div>
            </div>
        );
    }
}
