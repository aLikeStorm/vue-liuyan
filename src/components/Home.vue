<template>
  <el-container>
    <el-header>
      <FHeader></FHeader>
    </el-header>
    <el-main>
      <div>
        <div class="mt-5 ml-20 mr-20 mb-5 flex justify-center items-center">

          <el-select v-model="findInfo.type" slot="prepend" placeholder="根据分类查询" class="mr-2 select_button">
            <el-option label="作者" value="0"></el-option>
            <el-option label="关键字" value="1"></el-option>
          </el-select>

          <el-select v-model="findInfo.sort" slot="prepend" placeholder="排列规则" class=" mr-2 select_button">
            <el-option label="回复数量" value="0"></el-option>
            <el-option label="浏览数量" value="1"></el-option>
            <el-option label="更新时间" value="2"></el-option>
          </el-select>
          <el-input placeholder="请输入查询信息" v-model="findInfo.info" style="width:350px" class="mr-2"></el-input>
          <el-button @click="findAll" slot="append" icon="el-icon-search"></el-button>


        </div>

        <div>
          <el-table :data="messageList" style="width: 100%">
            <el-table-column prop="topic" label="主题" width="170"></el-table-column>
            <el-table-column prop="username" label="作者" width="170"></el-table-column>
            <el-table-column prop="replyNum" label="回复数" width="170"></el-table-column>
            <el-table-column prop="views" label="浏览数" width="170"></el-table-column>
            <el-table-column prop="lastReplyName" label="最后回复人" width="170"></el-table-column>
            <el-table-column prop="lastUpdateTime" label="最后回复时间" width="170"></el-table-column>
            <el-table-column label="操作" align="center" min-width="100">
              <template slot-scope="scope">
                <el-button type="text" @click="getDetail(scope.row.mid)">查看详情</el-button>
                <el-button type="danger" @click="deleteMessage(scope.row.mid)">删除留言</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <el-form ref="form" :model="messageFrom" label-width="80px" class="mt-5">
          <el-form-item label="留言主题">
            <el-input v-model="messageFrom.topic"></el-input>
          </el-form-item>
          <el-form-item label="留言内容">
            <el-input v-model="messageFrom.message"></el-input>
          </el-form-item>
          <el-form-item class="flex justify-center items-center">
            <el-button type="primary" @click="onSubmit">提交留言</el-button>
            <el-button @click="reset">取消</el-button>
          </el-form-item>
        </el-form>
        <!-- <el-button type="primary" @click="logout">登出</el-button> -->
      </div>
      <div class="flex justify-center items-center flex-col mt-5">
        <div class="text-bold text-2xl text-blue-400 mb-5">公告</div>
        <div class="announcement">
           <marquee behavior="scroll" direction="right">
            <span class="text-blue-400">{{ announcement }}</span>
            
          </marquee>
        </div>
       
      </div>
    </el-main>
  </el-container>
  
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  data() {
    return {
      findInfo: {
        type: "1",
        sort: "1",
        info:null
      },
      announcement:"无网络",
      messageList: [],
      messageFrom: { topic: "", message: "" }
    }
  },
  created() {
    this.findAll();
    this.getAnnouncement()
  },
  methods: {
    async findAll() {
      const { data: res } = await this.$http.post('/message/findAll', this.findInfo)
      if (!res.success) return this.$message.error(res.errorMsg);
      this.messageList = res.data;
      this.findInfo.sort = 0;
      this.findInfo.type = 0;
      this.findInfo.info = null;
    },
    async getAnnouncement() {
      const { data: res } = await this.$http.get('/user/announcement')
      if (!res.success) return this.$message.error(res.errorMsg);
      this.announcement = res.data;
    },
    async onSubmit() {
      if (this.messageFrom.message == null || this.messageFrom.message == ""||
        this.messageFrom.topic == null || this.messageFrom.topic == "") {
        return this.$message.error("主题或内容不能为空")
      }
      var token = sessionStorage.getItem("token");
      if (token == null) {
        return this.$message.error("游客无法添加留言");
      }
      const { data: res } = await this.$http.post('/message/add', this.messageFrom)
      if (!res.success) return this.$message.error(res.errorMsg);
      this.$message.success("添加留言成功");
      this.findAll();
      this.reset();
    },

    async deleteMessage(mid) {
      var token = sessionStorage.getItem("token");
      if (token == null) {
        this.$message.error("游客无法删除留言");
      }
      const { data: res } = await this.$http.get('/message/delete/' + mid)
      if (!res.success) return this.$message.error(res.errorMsg);
      this.$message.success("删除留言成功");
      this.findAll();
    },

    getDetail(mid) {
      localStorage.setItem("mid", mid);
      this.$router.push('/detail');
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

<style scoped>
.el-select .el-input {
  width: 130px;
}

.select_button {
  width: 100px;
}

.announcement{
  background-color: #faf9f9;
  padding: 10px;
  overflow: hidden; /* 隐藏超出容器范围的内容 */
  width:50%;
}


marquee {
  width: 100%; /* 确保跑马灯占满父容器宽度 */
}

</style>