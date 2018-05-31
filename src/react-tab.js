import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

const TabLists = ({tabArray , showFun ,showIndex })=> {
    if (!Array.isArray(tabArray)){
        return null 
    }
    return (
        <ul className="titles">
            {
                tabArray.map((data ,index)=>
                <li key={`tab${index}`} 
                className={showIndex == (index+1) ? "on" : ''} 
                onClick={() => showFun(index+1)}>{data}
                </li>

                )
            }
        </ul>
    )
}
export default class ReactTab extends React.Component {
    static defaultProps = {
        tabHeaders: ['tab1' ,'tab2' ,'tab3' ,],
        tabComponents: [<button>content of Tab1</button>,'content of Tab2', 'content of Tab3'],

    }
    constructor(props) {
        super(props);
        this.state = {
            showPop: -1
        };
    }
    showPopFun =(val)=> {
        if (this.state.showPop == -1 ){
            this.setState({showPop: val})
        }else if(this.state.showPop != -1 && this.state.showPop == val){
            this.setState({showPop: -1})
        }else{
            this.setState({showPop: val})
        }

    }
    render() {
        const {tabComponents ,tabHeaders , ...props} = this.props ;
        return (
            <div className='tabs-component'>
                <div className="tabs">
                    <TabLists tabArray={tabHeaders}
                    showIndex={this.state.showPop}
                    showFun={this.showPopFun} />

                    {
                        this.state.showPop != -1 &&
                        <div className='popParent'>
                        { tabComponents[this.state.showPop-1] }
                        </div>
                    }
                    
                </div>
                {
                    this.state.showPop != -1 &&
                    <div className='mask' onClick={()=> this.showPopFun(-1)}></div>
                }
               
            </div>
        );
    }
}
ReactTab.propTypes = {
    tabHeaders: PropTypes.array.isRequired,
    tabComponents: PropTypes.array.isRequired,
  }