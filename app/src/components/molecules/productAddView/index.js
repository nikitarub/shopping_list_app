import * as React from "react"

import './style.css'

import Input from '../../atoms/input'
import ItemInputCard from '../../atoms/itemInputCard'

export default class ProductAddView extends React.Component {
    constructor(props) {
        super(props);
        console.log("productView", this.props);
        this.state = {
            inputText: 'Product name...',
            title: 'New product'
        }
    }

    componentDidMount = () => {
        console.log("this.props.isListForm: ", this.props.isListForm);
        if (this.props.isListForm){
            this.setState({
                inputText: 'List name...',
                title: "New list"
            })
        } else {
            this.setState({
                inputText: 'Product name...',
                title: "New product"
            })
        }
    }
   
    off = () => {
        document.getElementById("inputFormPlacement").style.display = "none";
        
    }

    inputChange = (e) => {
        const input = document.getElementById('item-list-input');
        if (input.value == ''){
            if (this.props.isListForm){
                this.setState({
                    inputText: 'List name...',
                    title: "New list"
                })
            } else {
                this.setState({
                    inputText: 'Product name...',
                    title: "New product"
                })
            }
            
        } else {
            this.setState(state => ({...state, inputText:input.value}));
        }
    }

    onCardClick = () => {
        if ((this.state.inputText == 'Product name...') || (this.state.inputText == '')){
            this.off();
        } else {
            this.props.onAddClick(this.state.inputText);
            document.getElementById('item-list-input').value = '';
            this.off();
        }
    }
    
    render() {
        return (
            // isListForm={this.props.isListForm}
            <>
                <div id="inputFormPlacement">
                    <div className={"close-overlay-area"} onClick={this.off}></div>
                    <div id="text">
                        <ItemInputCard onCardClick={this.onCardClick} text={this.state.inputText} title={this.state.title}></ItemInputCard>
                    </div>
                    <Input id={"item-list-input"} onChange={this.inputChange}/>
                </div>
            </>
        );
    }
}
