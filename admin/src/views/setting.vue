<template>
  <div class="content">
     <h2 class="tit">
         个人信息设置
       </h2>
        <el-form class="form" ref="form" :model="form" label-width="80px">
            <el-form-item lable="头像">
                <el-upload
                class="avatar-uploader"
                :headers="token"
                :on-error="uploadError"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="form.avatar" :src="form.avatar" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="form.userName"></el-input>
            </el-form-item>
            <el-form-item label="生日">
                <el-date-picker
                v-model="form.birthday"
                type="date"
                placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item >
                <el-button type="primary" @click="onSubmit">保存</el-button>
            </el-form-item>
        </el-form>
  </div>
</template>

<script>
export default {
    data() {
        return {
            imageUrl: '',
            token: {
                authorization: "bearer " + localStorage.getItem('token')
            },
            form: {
                name: '',
                birth: '',
                avatar: '',
                _id: ''
            }
                }
    },

}
</script>

<style lang="scss" scoped>
   ::v-deep .el-form-item__content {
    display: flex;
  }
  .form {
    margin-top: 40px;
  }

  ::v-deep .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  ::v-deep .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  ::v-deep .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  ::v-deep .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>