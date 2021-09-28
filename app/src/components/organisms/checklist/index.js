import * as React from "react"
// import classnames from 'classnames'

import style from './style.css'


import CheckboxItem from '../../molecules/checkboxItem'



export default class Checklist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkboxes : [],
        }
    }

    componentDidMount = () => {
        console.log('Checklist mounted')
        this.setState({checkboxes: this.props.props});
    }

    

    componentDidUpdate = () => {
        if (this.state.checkboxes !== this.props.props){
            this.setState({checkboxes: this.props.props});
        }
    }
    
    render() {        
        let checkboxes = this.state.checkboxes;
        if (checkboxes == null) {
            checkboxes = []
        }
        return (
            <>
                <div className={"checklist"}>
                    {
                    checkboxes.length !== 0
                        ? 
                    checkboxes.map((chbox) =>  
                        <CheckboxItem key={'checkbox_key_'+chbox.id} props={chbox}/>
                    )
                        :
                    <p>Загрузка</p>
                    }
                </div>            
            </>
        );
    }
}
