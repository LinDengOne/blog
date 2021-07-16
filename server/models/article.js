const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    id: Number,                         //id
    title: String,                      //标题
    words: Number,                      //字数
    content: String,                    //内容
    describe: String,                   //简介
    contentHtml: String,                //源码
    time: String,                       //日期
    like: {                             //点赞
        type: Number,
        default: 0
    },
    read: {                             //阅读
        type: Number,
        default: 0
    },
    music: {                            // 音乐
        url: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        }
    },       
    image: {                            //封面
        url: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        }
    }

})
module.exports = mongoose.model('Article', schema)