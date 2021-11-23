import * as React from "react"
// import classnames from 'classnames'

import style from './style.css'


import CheckboxItem from '../../molecules/checkboxItem'



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
    
    render() {        
        let checkboxes = this.state.checkboxes;
        let loading_message = this.state.hintMessage
        
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
                        <CheckboxItem isFavorite={this.props.isFavorite} key={'checkbox_key_'+chbox.id} props={chbox}/>
                    )
                        :
                    <p>{loading_message}</p>
                    }
                </div>            
            </>
        );
    }
}
