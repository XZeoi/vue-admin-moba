<template>
  <div class="category-edit">
    <h1>{{ id ? '编辑': '新建' }}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option v-for="item in parents" :key="item._id"
          :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>

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
import { postCategoryData, getCategoryDataById, putCategoryData, getCategoryData } from "network/category.js";

export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {},
      parents: []
    }
  },
  created() {
    this.id && this.fetch()
    this.fetchParents()
  },
  methods: {
    async save() {
      let res 
      if(this.id) {
        res = await putCategoryData(this.id, this.model)
      } else {
        res = await postCategoryData(this.model)
      }

      this.$router.push('/categories/list')
      this.$message.success("保存成功！")
    },
    async fetch() {
      console.log(this.id)

      const res = await getCategoryDataById(this.id)
      console.log(res)
      this.model = res
    },
    async fetchParents() {
      const res = await getCategoryData()
      console.log(res)
      this.parents = res
    }
  }
}
</script>

<style scoped>
.category-edit h1 {
  margin-left: 20px;
}
</style>