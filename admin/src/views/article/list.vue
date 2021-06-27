<template>
   <div class="article">
       <h2 class="tit">
           文章列表（{{total}}）
           <span @click="newArticle" class="add" >
               <span class="el-icon-plus">新文章</span>
           </span>
       </h2>

       <el-table :data="data">
            <el-table-column label="Title">
                <template slot-scope="scope">
                    <p>{{ scope.row.title }}</p>
                </template> 
            </el-table-column>
            <el-table-column label="Date" width=140 class="hidden">
                <template v-slot="scope">
                    <span>{{ scope.row.time }}</span>
                </template>
            </el-table-column>
            <el-table-column label="options" width=100>
                <template slot-scope="scope">
                    <el-tooltip 
                        class="item" 
                        effect="dark" 
                        :content="item.text" 
                        placement="top"
                        v-for="(item, index) in options"
                        :key="index"
                    >
                        <i :class="item.icon" @click="option(scope.row, index)"></i>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
        background
        :page-size="10"
        :pager-count="5"
        :total="total"
        :current-page="page"
        @current-change="load"
        layout="prev, pager, next"
        v-if="total > 0"
    >
    </el-pagination>
   </div>
</template>

<script>
export default {
    data() {
        return {
            data: [],
            options: [
                {
                    icon: 'el-icon-view',
                    text: 'View Article'
                },
                {
                    icon: 'el-icon-edit',
                    text: 'Edit Article'
                },
                {
                    icon: 'el-icon-delete',
                    text: 'Delete'
                }
            ],
            page: 1,
            total: 0
        }
    },
    created() {
        this.load()
        
    },
    methods: {
        newArticle(){
            this.$router.push('/article/detail')
        },
        load(page){
            this.$http.get('/article', {
                params: { page }
            }).then(res => {
                ['data', 'total', 'page'].map(i => this[i] = res.data.body[i])
                //console.log(this.page);
                //console.log(this.total);
                //console.log(this.data);
            })
        },
        option(data, index) {
            const o = {
                0: () => {
                    window.open(`${window.location.origin}/article/${data._id}`)
                },
                1: () => {
                    this.$router.push({ 
                        name: 'detail', 
                        query: { 
                            id: data._id 
                        }
                    })
                },
                2: () => {
                    this.$confirm('删除该文章, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$http.delete(`article/${data._id}`)
                            .then(res => {
                                if (res.data.status === 1) {
                                    this.load()
                                    this.$message.success('删除成功！')
                                } else {
                                    this.$message.error(res.data.body.message)
                                }
                            })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        })
                    })
                }
            }
            o[index]()
        }
    },
}
</script>

<style lang="scss" scoped>
    .article{
    height: 100%;
    display: flex;
    flex-direction: column;
    .header{
        h1{
            border-left: 2px solid #0084ff;
            padding-left: 16px;
            font-size: 18px;
            font-weight: 400;
            margin: 20px 0 30px;
            color: #0084ff;
        }
        .info{
            display: flex;
            margin: 15px 0;
            div{
                margin-right: 10px;
            }
        }
    }
    .article-list{
        width: 100%;
        thead tr{
            height: 40px;
        }
        tbody{
            tr{
                height: 50px;
            }
        }
    }
    i[class*=el-icon-]{
        cursor: pointer;
        margin: 2px;
        padding: 2px;
        font-size: 14px;
        color: #cfcfcf;
        transition: all .2s;
        &:hover{
            color: #0e8bff;
        }
        &.el-icon-delete:hover{
            color: red;
        }
    }
    ::v-deep 
        .el-table__body-wrapper{
            height: calc(100% - 80px);
            overflow: auto;
        &::-webkit-scrollbar-track {
            background: #fff;
        }
        &::-webkit-scrollbar-thumb {
            background: #eef7ff;
        }
        &::-webkit-scrollbar {
            width: 6px;
        }
    }
}
</style>