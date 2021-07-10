const mongoose = require('mongoose');

const schema = new mongoose.Schema ({
    id: Number,                 //id
    article_id: String,         //文章id
    name: String,               //昵称
    email: String,              //邮箱
    image: Number,              //头像
    content: String,            //内容
    time: String,               //时间
    stasus: {                   //状态 未读
        type: Number,
        default: 1
    },
    type: {                     // 1评论  2回复 3二级回复
        type: Number,
        default: 1
    },
    parent_id: {type:String,
    default:'x'},       //一级评论ID
    reply_name: {type:String,
    default:'x'},          //回复对象
    reply_email: String,         //回复邮箱

    admin: Boolean          
})
module.exports = mongoose.model('Comment',schema)