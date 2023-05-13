<template>
<div>
留言：{{messageDetail}} <br/><br/>
  回复：{{replyList}}
  <el-form ref="form" :model="messageFrom" label-width="80px">
    <el-form-item label="留言主题">
      <el-input v-model="messageFrom.topic"></el-input>
    </el-form-item>
    <el-form-item label="留言内容">
      <el-input v-model="messageFrom.message"></el-input>
    </el-form-item>
    <el-radio v-model="isEmail" label="1">邮件通知</el-radio>
    <el-radio v-model="isEmail" label="0">不使用邮件通知</el-radio>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交留言</el-button>
      <el-button @click="reset">取消</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Detail",
  data() {
    return{
      mid:null,
      messageDetail:{},
      replyList:[],
      messageFrom:{topic:"",message:""},
      isEmail:2,
    }
  },
  created() {
    this.findDetailMessage()
  },
  methods:{
    async findDetailMessage() {
      this.mid = localStorage.getItem("mid")
      const {data:res} = await this.$http.get('/message/findMessageDetail/'+this.mid)
      if (!res.success) return this.$message.error(res.errorMsg);
      this.messageDetail = res.data.message
      this.replyList = res.data.replyList
    },
    async onSubmit() {
      const {data:res} = await this.$http.post("/message//addReply/"+this.mid+"/"+this.isEmail,this.messageFrom)
      if (!res.success) return this.$message.error(res.errorMsg);
      this.$message.success("添加留言成功");
      this.findDetailMessage();
    },

    async deleteMessage(mid) {
      var token = sessionStorage.getItem("token");
      if (token == null) {
        this.$message.error("游客无法删除留言");
      }
      const {data:res} = await this.$http.get('/message/delete/'+mid)
      if (!res.success) return this.$message.error(res.errorMsg);
      this.$message.success("删除留言成功");
      this.findDetailMessage();
    },

    reset() {
      this.messageFrom.message = null;
      this.messageFrom.topic = null;
    }
  }
}
</script>

<style scoped>

</style>