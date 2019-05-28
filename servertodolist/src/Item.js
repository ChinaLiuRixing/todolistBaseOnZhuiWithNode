import React from 'react';
import { Button,Card,Input,Icon} from 'zhui';
import './App.css';

class Item extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          isEditing: false,
          input:"",
          datanow:this.props.data
      };
    }
    inputEdit=e=>{
      this.setState({
        datanow:e.target.value
      })
    }
    updatenow=(uid,now)=>{
      this.setState({
        isEditing:false
      })
      this.props.update(uid,now)
    }
    render() {
      const  {data,deleteone,index,uid,update} = this.props;
      const  {inputEdit,updatenow} = this;
      const  {isEditing,datanow} = this.state;
      return (
          <div className="item">
          {
            !isEditing? 
            <Card width={140}>
                <p onDoubleClick={()=>this.setState({isEditing:true})}>{data}<Icon color="#ffffff" type="edit"/></p>
                
                <Button onClick={()=>deleteone(uid)} theme="meihong">删除</Button>
            </Card>: <Card width={140}>
                <Input
                    onChange={inputEdit}
                    data-id={uid}
                    value={datanow}
                    className="edit"
                    width={120}
                />
                <Button onClick={()=>updatenow(uid,datanow)} theme="meihong">确定</Button>
            </Card>
          }
          </div>
      )
    }
  }
   
  
  
export default Item;