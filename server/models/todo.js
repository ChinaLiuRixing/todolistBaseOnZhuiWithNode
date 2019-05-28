var mongoose = require("mongoose");  //  顶会议用户组件
var Schema = mongoose.Schema;    //  创建模型
var todoSchema = new Schema({   //新建实体对象
  name:  String,  
});
exports.Todo = mongoose.model('Todo', todoSchema);  