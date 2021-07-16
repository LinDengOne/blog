<template>
  <div class="article-new" >
      <section>
          <h2 class="tit">无人问津的心情，在黑纸白字间游荡！</h2>
          <el-input placeholder="标题" v-model="data.title" clearable></el-input>
      </section>

      <mavon-editor
        v-model="data.content"
        :subfield="false"
        @imgAdd="uploads"
        @imgDel="$imgDel"
        ref="markdown"
      />

      <section>
          <Date @getDate="getDate" :originalDate="data.time" />
          <el-input 
            v-model="data.describe" 
            placeholder="文章摘要"
            prefix-icon="el-icon-document"
            clearable
            ></el-input>
            <div class="upload-box" v-if="!isUpload">
                <el-upload
                    v-for="(item, index) in ['music', 'image']"
                    :key="index"
                    :show-file-list="false"
                    :http-request="uploadChange"
                    :name="item"
                    class="upload-item"
                    ref="upload"
                    action
                    drag
                >   
                    <template v-if="item == 'music'">
                        <i class="el-icon-headset"></i>
                        <div class="el-upload__text">{{ musicName }}</div>
                    </template>
                    <template v-else>
                    <img v-if="data.image.url" :src="data.image.url">
                        <template v-else>
                            <i class="el-icon-picture-outline-round"></i>
                            <div class="el-upload__text">封面图片 (680*440)</div>
                        </template>
                    </template>
                </el-upload>

            </div>

            <template v-else>
                <el-input placeholder="音乐地址" v-model="data.music.url" prefix-icon="el-icon-headset" clearable></el-input>
                <el-input placeholder="封面图片" v-model="data.image.url" prefix-icon="el-icon-picture-outline-round" clearable></el-input>
            </template>

            <el-switch v-model="isUpload" active-text="文件上传" inactive-text="输入链接"></el-switch>
            <!-- <el-switch v-model="data.hide" inactive-text="发布文章" active-text="隐藏文章"></el-switch> -->

      </section>
      <el-button type="primary" class="submit" @click="submit">SUBMIT</el-button>
  </div>
</template>

<script>
import Date from '../../components/date.vue'
export default {
    components: {
        Date,
    },
    data() {
        return {
            id: '',                     //文章id
            data:{
                title: '',              // 标题
                content: '',            // 内容
                contentHtml: '',        // 内容解析html
                describe: '',           // 文章摘要
                time: '',               // 时间
                image: {},              // 图片
                music: {},              // 音乐
            },
            markdownImage: [],          // 编辑器的图片集合
            isUpload: false,            // 是否上传 取反
        }
    },
    computed: {
        uploadType() {
            return this.$store.state.$data.info.base.upload_type
        },
    },
    created() {
        this.id = this.$route.query.id //获取id
        this.id && this.loadData(this.id)
    },
    methods: {
        loadData(id) {
            //console.log(this.id);
            this.$http.get(`article/${id}`)
                .then(res => {
                    if (res.data.status === 1) {
                        this.data = res.data.body
                        //console.log(data);
                    } else {
                        this.$message.error(res.data.body.message)
                    }
                })
        },
        //上传封面图片
        uploadChange(data) { 
            const form = this.$formData({
                'file': data.file,
                'type': 'base'
            })
            this.$set(this.data,data.filename,  {
                url: URL.createObjectURL(data.file),
                name: data.file.name,
                form
            })
            console.log(this.data);
        },
        //上传内容图片
        uploads(type,file) {
            const form = this.$formData({
                'file': file,
                'type': 'base'
            })
            
            this.markdownImage.push({
                index: type,
                form
            })
            console.log(this.markdownImage[0]);
        },
        $imgDel(index){
            this.markdownImage.splice(index,1)
        },
        async submit() {
            const markdown = this.$refs.markdown
            this.data.content = markdown.d_value 

            const map = {
                'title': '请输入标题',
                'content': '请输入内容',
                //'time': '请选择时间'
            }
            for (let i in map) {
                if (!this.data[i]) {
                    this.$message.error(`${map[i]}`)
                    return
                }
            }

            //上传内容去图片
            const conImgList = this.markdownImage
            for (let i = 0; i < conImgList.length; i++){
                const result = await this.$http.post('/upload',conImgList[i]['form'])
                const body = result.data.body
                if(result.data.status == 1) {
                    markdown.$img2Url(i + 1, body.url)
                } else {
                    this.$message.error(body.message)
                    break
                }
            }

            const textarea = {
                'contentHtml': markdown.d_render,
                'content': markdown.d_value,
                'words': markdown.d_value.length
            }
            for (let i in textarea) {
                this.data[i] = textarea[i]
            }
            //上传封面图
            if (!this.isUpload) {
                for (let i of ['image', 'music']) {
                    const data = this.data[i]
                if(data.form) {
                    const res = await this.$http.post('/upload',data.form)
                    if(res.data.status == 1){
                        data.url = res.data.body.url
                        console.log(data);
                        delete data.form
                    }  else {
                            this.$message.error(res.data.body.message)
                            this.fullscreenLoading = false
                            return
                        }
                    }
                }
            }
            const describe = this.data.describe
            //this.data
            const type = this.id ? `article/${this.data._id}` : 'article'
            const mesg = this.id ? '更新' : '发表'
            
            this.$http.post(type, { data: this.data })
            .then(res => {
                if (res.data.status == 1) {
                    this.$message.success(`${mesg}成功`)
                    this.$router.push('/article')
                    //this.$infoUpdate()
                }
            })
        },
        getDate(val){
            this.data.time = val
        },    
        
        

    },
}
</script>

<style lang="scss" scoped>
section{
    margin: 15px 0;
    .el-switch, .el-input{
        width: 100%;
        height: 38px;
        margin: 8px 0;
    }

}
.markdown-body{
    height: 65vh;
}
.submit{
    width: 200px;
    height: 40px;
    font-size: 14px;
}
.upload-box{
    display: flex;
    margin: 10px -7px 6px;
    .upload-item{
        width: 50%;
        max-width: 360px;
        margin: 0 7px;
        ::v-deep .el-upload{
            width: 100%;
            .el-upload-dragger{
                width: 100%;
                .el-icon-picture-outline-round,
                .el-icon-headset{
                    font-size: 46px;
                    color: #c0c4cc;
                    margin: 42px 0 14px;
                    line-height: 50px;
                    transition: all .3s;
                }
                .el-upload__text{
                    color: #98999c;
                    transition: all .3s;
                }
                &:hover{
                    .el-icon-picture-outline-round, 
                    .el-upload__text, 
                    .el-icon-headset{
                        color: #409EFF;
                    }
                }
            }
        }
    }
    img{
        width: 100%;
    }
}
@media screen and (max-width: 600px) {
    .markdown-body{
        height: 90vh !important;
        box-shadow: none !important;
    }
    section{
        margin: 10px 0;
        box-shadow: none;
    }
    .submit{
        width: 150px;
        height: 36px;
        margin: 0 0 20px;
        line-height: 36px;
        padding: 0;
    }
    .upload-box .upload-item ::v-deep .el-upload .el-upload-dragger{
        height: 130px;
        .el-icon-picture-outline-round, .el-icon-headset{
            font-size: 36px;
            margin: 22px 0 10px;
        }
    }
}
</style>
