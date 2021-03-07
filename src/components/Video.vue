<template>
  <div class="main_item">
    <div class="itemLeft">
      <span class="nomust">视频:</span>
    </div>
    <div class="itemRight">
      <el-upload
        action
        v-model="vedioUrl.file"
        :multiple="false"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :on-error="uploadError"
        :before-upload="beforeAvatarUpload2"
        accept="video/mp4"
        class="avatar-uploader"
      >
        <video v-if="vedioUrl.url" :src="vedioUrl.url" class="avatar" controls="controls"></video>
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
  </div>
</template>

<script>
export default {
name: "Video",
  methods: {
    // 图片上传成功提示，视频上传也用这个方法，以下不重复写
    handleAvatarSuccess(res, file, fileList) {
      this.$message({
        center: true,
        message: '图片上传成功',
        type: 'success',
      })
    },
    //视频上传也用这个方法，以下不重复写
    uploadError() {
      // ?不需要，上传失败操作
    },
    //上传前回调
    beforeAvatarUpload(file) {
      // ++
      console.log(file)
      this.imageUrl.file = file
      this.imagePreview(this.imageUrl.file, 1)
      return false
    },
    //**重点**，上传的文件转化为base64格式，用于展示，视频也是调用这个方法
    imagePreview(file, v) {
      var self = this
      //定义一个文件阅读器
      var reader = new FileReader()
      //文件装载后将其显示在图片预览里
      reader.onload = function (e) {
        //将bade64位图片保存至数组里供上面图片显示
        if (v == 1) {
          self.imageUrl.url = e.target.result
        } else {
          self.vedioUrl.url = e.target.result
        }
      }
      reader.readAsDataURL(file)
    },
    beforeAvatarUpload2(file) {
      console.log(file)
      this.vedioUrl.file = file
      this.imagePreview(this.vedioUrl.file, 2)
      return false
    },
  }
}


</script>

<style scoped>

</style>
