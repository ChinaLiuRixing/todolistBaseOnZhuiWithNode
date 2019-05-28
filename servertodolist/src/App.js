import React from 'react';
// import logo from './logo.svg';
import { Button,Input } from 'zhui';
import Item from './Item'
import './App.css';

var url = "http://localhost:8081/";
class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          list: [],
          input:""
      };
    }
    componentWillMount(){
      fetch(url+"getlist").then(res=>res.json())
      .then(list=>this.setState({list}))
    }
    add=()=>{
        fetch(url+"add?name="+this.state.input)
        .then(this.setState({input:""}))
        .then(this.componentWillMount())
        
    }
    update=(uid,name)=>{
      console.log(uid,name)
      fetch(url+"update?oldname="+name+"&id="+uid)
      .then(this.componentWillMount())
    }
    enter=e=>e.keyCode===13?this.add():""
    inputValue=(e)=>{
        this.setState({
            input:e.target.value
        })
        
    }
    deleteOne=(id)=>{
      console.log(id)
      fetch(url+"del?id="+id).then(this.componentWillMount())
    }
    render() {
      const {list,input} = this.state;
      const {add,enter,inputValue,deleteOne,update} = this;
      return (
        <div>
          <div className="container">
            <div className="input">
            <Input
                placeholder="请输入分数"
                onChange={inputValue}
                value={input}
                onKeyUp={enter}
                theme="primary"
            />
            </div>
            <Button
                size="large"
                theme="success"
                onClick={add}
                >
                添加
            </Button>
          </div>
          <div className="list">
                {list.map((item,index)=><Item update={update} data={item.name} index={index} uid={item._id}  key={index} deleteone={deleteOne}></Item>)}
          </div>
        </div>
      )
    }
  }
   
  
export default App;