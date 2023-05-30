<template>
  <el-container>
    <el-header>
      <FHeader></FHeader>
    </el-header>
    <el-main>
        <div>
          <el-card class="el-card-m">
            <span class="el-card-m-content">主题： {{ messageDetail.topic }}</span>
            <br/>
            <span class="el-card-m-content">{{ messageDetail.message }}</span>
            <br/>
            <span class="el-card-m-nick-name">{{ messageDetail.username }} 提交于 {{ messageDetail.createdate }}</span>

          </el-card>
        </div>

        <el-timeline infinite-scroll-disabled="disabled">
          <div v-if="replyList != null">
            <el-timeline-item
                v-for="(item, index) in replyList"
                :key="index"
                placement="top"
            >
              <el-card class="el-card-m">
                <span class="el-card-m-content">主题： {{ item.topic }}</span>
                <br/>
                <span class="el-card-m-content">内容： {{ item.message }}</span>
                <div />
                <span class="el-card-m-nick-name">{{ item.username }} 提交于 {{ item.createdate }}</span>
              </el-card>
            </el-timeline-item>
          </div>
          <div v-else>
            <el-timeline-item placement="top">
              <el-card class="el-card-m">
                <p class="el-card-m-nick-name">  没有任何留言</p>
              </el-card>
            </el-timeline-item>
          </div>
        </el-timeline>

      <hr class=" mb-5 border-t-1 border-black">

      <el-form ref="form" :model="messageFrom" label-width="80px">
        <el-form-item label="回复主题">
          <el-input v-model="messageFrom.topic"></el-input>
        </el-form-item>
        <el-form-item label="回复内容">
          <el-input v-model="messageFrom.message"></el-input>
        </el-form-item>
        <el-radio v-model="isEmail" label="1">邮件通知</el-radio>
        <el-radio v-model="isEmail" label="0">不使用邮件通知</el-radio>
        <el-form-item class="mt-5 flex justify-center items-center">
          <el-button type="primary" @click="onSubmit">提交留言</el-button>
          <el-button @click="reset">取消</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Detail",
  data() {
    return {
      mid: null,
      messageDetail: {},
      replyList: [],
      messageFrom: { topic: "", message: "" },
      isEmail: 2,
    }
  },
  created() {
    this.findDetailMessage()
  },
  methods: {
    async findDetailMessage() {
      this.mid = localStorage.getItem("mid")
      const { data: res } = await this.$http.get('/message/findMessageDetail/' + this.mid)
      if (!res.success) return this.$message.error(res.errorMsg);
      this.messageDetail = res.data.message
      this.replyList = res.data.replyList
    },
    async onSubmit() {
      if (this.messageFrom.message == null || this.messageFrom.message == ""||
          this.messageFrom.topic == null || this.messageFrom.topic == "") {
        return this.$message.error("主题或内容不能为空")
      }
      const { data: res } = await this.$http.post("/message//addReply/" + this.mid + "/" + this.isEmail, this.messageFrom)
      if (!res.success) return this.$message.error(res.errorMsg);
      this.$message.success("添加留言成功");
      this.findDetailMessage();
    },

    async deleteMessage(mid) {
      var token = sessionStorage.getItem("token");
      if (token == null) {
        this.$message.error("游客无法删除留言");
      }
      const { data: res } = await this.$http.get('/message/delete/' + mid)
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

<script setup>
import FHeader from './FHeader.vue';
</script>
<style lang="stylus" scoped>
</style>