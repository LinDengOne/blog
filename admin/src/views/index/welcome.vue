<template>
    <div class="welcome">
        <h2><span class="el-icon-magic-stick">愿所有的美好如约而至，愿所有的黑暗都能看到希望。</span></h2>
         <p class="time">
            <span>{{ time.year || '请珍惜时间' }}</span>
            <span>{{ time.date || '一寸光阴一寸金' }}</span>
        </p>

        <section class="info">
            <h4>Hello,你好，我是谁！</h4>
            <div>
                <p>重新认识、审视、定义一下自己吧。</p>
                <ul>
                    <li
                        v-for="(item,index) in textList"
                        :key="index"
                    >
                        <span class="item.icon"></span>
                        {{ item.text }}
                    </li>
                </ul>
            </div>
        </section>
    </div>
    
</template>

<script>
export default {

}
</script>

<style>

</style>