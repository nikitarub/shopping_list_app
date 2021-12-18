import * as React from "react"
// import classnames from 'classnames'

import './style.css'


import CheckboxItem from '../../molecules/checkboxItem'

import Trolley from '../../atoms/buttonSVG/trolley.png'
import ButtonSVG from '../../atoms/buttonSVG'
import ButtonAddNew from '../../atoms/buttonSVG/buttonAddNew.svg'
 

export default class Checklist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkboxes : null,
            hintMessage : "Create new item",
        }
    }

    componentDidMount = () => {
        console.log('Checklist mounted')
        console.log("this.props.hintMessage: ", this.props.hintMessage);
        if (this.props.hintMessage){
            this.setState({hintMessage : this.props.hintMessage});
        }
        this.setState({checkboxes: this.props.props});
    }

    

    componentDidUpdate = () => {
        if (this.state.checkboxes !== this.props.props){
            this.setState({checkboxes: this.props.props});
        }
        if ((this.state.hintMessage !== this.props.hintMessage) && (this.props.hintMessage)){
            this.setState({hintMessage : this.props.hintMessage});
        }
        console.log(">????? UPD");
    }

    on = () => {
        document.getElementById("inputFormPlacement").style.display = "block";
        document.getElementById("item-list-input").focus();
    }
    
    render() {        
        let checkboxes = this.state.checkboxes;
        let button = {
            name: 'addnew'
        }
        let loading_message = <div className="no-items">
            {this.state.hintMessage}
        </div>
        if (window.location.pathname == "/"){
            loading_message = <div className="no-items">
                <img src={Trolley}/>
                <h2>No items on the list</h2>
                <ButtonSVG props={button} svg={ButtonAddNew} onClick={this.on}/>
            </div>
        }
        
        
        if (checkboxes === null) {
            checkboxes = []
            loading_message = "Loading"
        }
        return (
            <>
                <div className={"checklist"}>
                    {
                    checkboxes.length !== 0
                        ? 
                    checkboxes.map((chbox) =>  
                        <CheckboxItem favouriteChoose={this.props.favouriteChoose} isFavorite={this.props.isFavorite} key={'checkbox_key_'+chbox.id} props={chbox}/>
                    )
                        :
                    loading_message
                    }
                </div>            
            </>
        );
    }
}
