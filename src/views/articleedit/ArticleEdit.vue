<template>
  <div class="article-edit">
    <h1>{{ id ? "编辑" : "新建" }}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item of categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>

      <el-form-item label="详情">
        <vue-editor v-model="model.body" 
        useCustomImageHandler 
        @image-added="handleImageAdded"></vue-editor>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  postArticleData,
  getArticleDataById,
  putArticleData,
} from "network/article.js";

import { getCategoryData } from "network/category.js";

import { uploadImg } from "network/imgUpload.js"

// 富文本编辑器引入
import { VueEditor } from "vue2-editor";

export default {
  components: {
    VueEditor
  },
  props: {
    id: {},
  },
  data() {
    return {
      model: {},
      categories: [],
    };
  },
  created() {
    this.id && this.fetch();
    this.fetchCategories();
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await putArticleData(this.id, this.model);
      } else {
        res = await postArticleData(this.model);
      }

      this.$router.push("/articles/list");
      this.$message.success("保存成功！");
    },
    async fetch() {
      console.log(this.id);

      const res = await getArticleDataById(this.id);
      console.log(res);
      // this.model = res;
      this.model = Object.assign({}, this.model, res);

    },
    async fetchCategories() {
      const res = await getCategoryData();
      console.log(res);
      this.categories = res;
    },
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
 
      const formData = new FormData();
      formData.append("file", file);

      const res = await uploadImg(formData)

      Editor.insertEmbed(cursorLocation, "image", res.url);
      resetUploader();
    }
  },
};
</script>

<style scoped>
.article-edit h1 {
  margin-left: 20px;
}
</style>