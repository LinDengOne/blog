<template>
    <div class="welcome">
        <h2><span class="el-icon-magic-stick">愿所有的美好如约而至，愿所有的黑暗都能看到希望。</span></h2>
         <p class="time">
            <span>{{ time.year || '请珍惜时间' }}</span>
            <span>{{ time.date || '一寸光阴一寸金' }}</span>
        </p>

        <el-card class="info el-card">
            <h4>Hello,你好，我是谁！</h4>
            <div>
                <p>重新认识、审视、定义一下自己吧。</p>
                <ul>
                    <li
                        v-for="(item,index) in textList"
                        :key="index"
                    >
                        <span :class="item.icon"></span>
                        {{ item.text }}
                    </li>
                </ul>
            </div>
        </el-card>
    </div>
    
</template>

<script>
export default {
    data() {
        return {
            time: {},
            timer: null,
            textList: [
                {
                    icon: 'el-icon-ice-drink',
                    text: '现在的你，是个怎样的人？'
                },
                {
                    icon: 'el-icon-lollipop',
                    text: '你希望以后成为怎样的人？'
                },
                {
                    icon: 'el-icon-lollipop',
                    text: '你心中的未来是怎样的？'
                },
                {
                    icon: 'el-icon-lollipop',
                    text: '最想做的一件事是什么？'
                },
                {
                    icon: 'el-icon-lollipop',
                    text: '你现在的生活，开心吗？'
                },
                {
                    icon: 'el-icon-hot-water',
                    text: '心如止水，淡中得味！'
                }
            ],
        }
    },
}
</script>

<style lang="scss" scoped>
.welcome{
    //background-color: #bfc;
    color: #3b4b5a;
    margin: 0 -20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    h2{
        width: 100%;
        font-size: 16px;
        font-weight: 400;
        margin: 10px 0 30px;
        letter-spacing: 1px;//设置间距
        color: #0e8bff;
        span{
            color: #0e8bff;
            font-size: 16px;
        }
    }
    .time{
        position: absolute;
        right: 0;
        top: 30px;
        color: #fff;
        background-color: #ff8a8a;
        border-radius: 4px;
        padding: 4px;
        display: flex;
        text-align: right;
        flex-direction: column;
        span:first-child{
            font-size: 12px;
            margin-bottom: 2px;
        }
    }
    .el-card{
        width: calc(50% - 15px);
        display: inline-block;
        height: 300px;
        border-radius: 30px;
        background-color: #fff;
        position: relative;

        &.info{
            h4{
                font-size: 16px;
                color: #0e8bff;
                font-weight: 400;
                margin: 22px 0 10px;
                padding-left: 15px;
                &::after{
                    content: "\e6a4";
                    font-family: element-icons!important;
                    font-style: normal;
                    font-weight: 400;
                    //line-height: 1;
                    //font-variant: normal;
                    //text-transform: none;
                    //vertical-align: baseline;
                    //display: inline-block;
                    //-webkit-font-smoothing: antialiased;
                    //-moz-osx-font-smoothing: grayscale;
                    position: absolute;
                    left: 14px;
                    top: 10px;
                    font-size: 30px;
                    color: #7fc3ff;
                }
            }
            p{
                font-size: 13px;
                padding-left: 15px;
                color: #909399;
            }
            ul{ 
                margin: 10px 0;
                padding: 14px 15px 12px;
                border: 1px solid #7fc3ff;
                border-radius: 10px;
                li{
                    position: relative;
                    color: #5182b3;
                    line-height: 24px;
                    font-size: 13px;
                    letter-spacing: 1px;
                    span{
                        margin-right: 4px;
                    }
                }
                
                
            }
        }
    }
}
</style>