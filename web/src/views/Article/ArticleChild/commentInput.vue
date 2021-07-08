<template>
  <div class="comment-form">
      <el-input 
      v-model.trim="form.name" placeholder="Name"
      maxlength="10" show-word-limit class="input-box"
      >
      </el-input>

      <textarea 
        class="textarea" 
        placeholder="What do you want to say..." 
        v-model="form.content"
      ></textarea>
      <Button
      :styles="{width: '80px',height: '40px' }"
      @onclick="comment"
      ></Button>
  </div>
</template>

<script>
import Button from '../../../components/Button'
export default {
    name: 'commentInput',
    components: {Button},
    props: ['id', 'title'],
    data() {
        return {
            form: {},
            isReply: false,
            rows: 4
        }
    },
    methods: {
        comment() {
            //console.log(this.id);
            const LoadingStartTime = new Date().getTime()
            //头像
            const info = JSON.parse(localStorage.getItem('comment'))
            if (!this.form['image'] || (info && info['name'] != this.form['name'])) {
                this.form.image = Math.floor(Math.random() * 10 + 1)
            }
            const content = this.form.content.trim().replace(/<script.*?>.*?<\/script>/ig, '')
            const other = {
                time: this.dateFormat(),
                article_id: this.id,
                content
            }
            
            const data = {
                ...this.replyObj,   // reply info
                ...this.form,       // form info
                ...other        
            }
            const params = {
                data,
                type: this.isReply ? 2 : 1,
            }
            this.$http.post('comment', params).then(res => {
                console.log(res);
            })
        },
        dateFormat(){
            const date = new Date();
            const opt = {
                "Y": date.getFullYear().toString(),     
                "M": (date.getMonth() + 1).toString(),  
                "D": date.getDate().toString(),         
                "H": date.getHours().toString(),        
                "m": date.getMinutes().toString(),      
            }
            for(let i in opt){
                opt[i] = opt[i].length == 1 ? opt[i].padStart(2, "0") : opt[i]
            }
            return `${opt.Y}/${opt.M}/${opt.D} ${opt.H}:${opt.m}`
        }
    
        
    },
}
</script>

<style lang="scss" scoped>
.comment-form{
    border: 1px solid var(--color-border-1);
    margin-bottom: 60px;
    border-radius: 6px;
    padding: 15px 12px;
    transition: all .3s;
    .input-box{
        width: 50%;
        height: 38px;
        font-size: 14px;
        //padding-left: 10px;
        transition: border .3s;
        // border: none;
        // outline: none;
        color: var(--color-text-1);  
        background: var(--color-bg-primary);
        border-bottom: 1px dashed var(----color-border-1);
        &:focus{
                    border-color: var(--color-border-3);
                }
        
    }
    .textarea{
        width: 100%;
        height: 200px;
        margin: 10px 0;
        color: var(--color-text-1);
         border: 1px dashed var(--color-border-1);
         -webkit-transition: all .3s;
        transition: all .3s;
        border-radius: 4px;
        font-size: 14px;
        padding: 15px;
        outline: none;
        resize: none;
        background: url('../../../assets/img/comment/plbj.png') no-repeat bottom right;
        &:focus{
             border-color: var(--color-border-3);
         }
        }

    }

</style>