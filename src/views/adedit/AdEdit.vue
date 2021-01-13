<template>
  <div class="ad-edit">
    <h1>{{ id ? '编辑': '新建' }}广告位</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { postAdData, getAdDataById, putAdData, getAdData } from "network/ad.js";

export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {}
    }
  },
  created() {
    this.id && this.fetch()
  },
  methods: {
    async save() {
      let res 
      if(this.id) {
        res = await putAdData(this.id, this.model)
      } else {
        res = await postAdData(this.model)
      }

      this.$router.push('/ads/list')
      this.$message.success("保存成功！")
    },
    async fetch() {
      console.log(this.id)

      const res = await getAdDataById(this.id)
      console.log(res)
      this.model = res
    }
  }
}
</script>

<style scoped>
.ad-edit h1 {
  margin-left: 20px;
}
</style>