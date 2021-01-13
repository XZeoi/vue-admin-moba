<template>
  <div class="Hero-edit">
    <div class="container">
      <h1>{{ id ? "编辑" : "新建" }}英雄</h1>
      <el-form label-width="120px" @submit.native.prevent="save">
        <el-tabs value="skills">
          <el-tab-pane label="基本信息" name="basic">
            <!-- <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option v-for="item in parents" :key="item._id"
          :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item> -->

            <el-form-item label="名称">
              <el-input v-model="model.name"></el-input>
            </el-form-item>

            <el-form-item label="称号">
              <el-input v-model="model.title"></el-input>
            </el-form-item>

            <el-form-item label="头像">
              <el-upload
                class="avatar-uploader"
                action="http://localhost:3000/admin/api/upload"
                :show-file-list="false"
                :on-success="successUploaded"
              >
                <img v-if="model.avatar" :src="model.avatar" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>

            <el-form-item label="类型">
              <el-select v-model="model.categories" multiple>
                <el-option
                  v-for="item of categories"
                  :key="item._id"
                  :label="item.name"
                  :value="item._id"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="难度">
              <el-rate
                style="margin-top: 0.6rem"
                :max="9"
                show-score
                v-model="model.scores.difficult"
              ></el-rate>
            </el-form-item>

            <el-form-item label="技能">
              <el-rate
                style="margin-top: 0.6rem"
                :max="9"
                show-score
                v-model="model.scores.skills"
              ></el-rate>
            </el-form-item>

            <el-form-item label="攻击">
              <el-rate
                style="margin-top: 0.6rem"
                :max="9"
                show-score
                v-model="model.scores.attack"
              ></el-rate>
            </el-form-item>

            <el-form-item label="生存">
              <el-rate
                style="margin-top: 0.6rem"
                :max="9"
                show-score
                v-model="model.scores.survive"
              ></el-rate>
            </el-form-item>

            <el-form-item label="顺风出装">
              <el-select v-model="model.items1" multiple>
                <el-option
                  v-for="item of equipments"
                  :key="item._id"
                  :label="item.name"
                  :value="item._id"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="逆风出装">
              <el-select v-model="model.items2" multiple>
                <el-option
                  v-for="item of equipments"
                  :key="item._id"
                  :label="item.name"
                  :value="item._id"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="使用技巧">
              <el-input type="textarea" v-model="model.usageTips"></el-input>
            </el-form-item>
          </el-tab-pane>

          <el-tab-pane label="技能" name="skills">
            <el-button @click="model.skills.push({})" size="small"
              ><i class="el-icon-plus"></i>添加技能</el-button
            >
            <el-row type="flex" style="flex-wrap: wrap">
              <el-col
                :md="24"
                v-for="(item, index) in model.skills"
                :key="index"
              >
                <el-card>
                  <el-form-item label="名称">
                    <el-input v-model="item.name"></el-input>
                  </el-form-item>

                  <el-form-item label="图标">
                    <el-upload
                      class="avatar-uploader"
                      action="http://localhost:3000/admin/api/upload"
                      :show-file-list="false"
                      :on-success="res => $set(item, 'icon',  res.url)"
                    >
                      <img
                        v-if="item.icon"
                        :src="item.icon"
                        class="avatar"
                      />
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>

                  <el-form-item label="描述">
                    <el-input type="textarea" v-model="item.description"></el-input>
                  </el-form-item>

                  <el-form-item label="提示">
                    <el-input type="textarea" v-model="item.tips"></el-input>
                  </el-form-item>

                  <el-form-item>
                    <el-button type="danger" size="small" @click="model.skills.splice(index, 1)">删除</el-button>
                  </el-form-item>
                </el-card>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>

        <el-form-item class="down-save">
          <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  postHeroData,
  getHeroDataById,
  putHeroData,
  getHeroData,
} from "network/hero.js";

import { getCategoryData } from "network/category.js";

import { getEquipmentData } from "network/equipment.js";

export default {
  props: {
    id: {},
  },
  data() {
    return {
      categories: [],
      equipments: [],
      model: {
        name: "",
        title: "",
        scores: {
          difficult: 0,
        },
        items1: [],
        items2: [],
        skills: [],
      },
      // parents: []
    };
  },
  created() {
    this.id && this.fetch();
    // this.fetchParents()

    // 英雄分类列表
    this.fetchCategory();

    // 装备列表
    this.fetchEquipment();
  },
  methods: {
    //成功上传照片时触发
    successUploaded(res) {
      console.log("照片上传成功：", res);
      // P13
      this.$set(this.model, "avatar", res.url);
      // this.model.icon = res.url
    },
    async save() {
      let res;
      if (this.id) {
        res = await putHeroData(this.id, this.model);
      } else {
        res = await postHeroData(this.model);
      }

      this.$router.push("/heroes/list");
      this.$message.success("保存成功！");
    },
    async fetch() {
      const res = await getHeroDataById(this.id);
      // this.model = res;
      this.model = Object.assign({}, this.model, res);
    },
    // async fetchParents() {
    //   const res = await getHeroData()
    //   console.log(res)
    //   this.parents = res
    // }
    async fetchCategory() {
      const res = await getCategoryData(this.id);
      this.categories = res;
      // console.log(res)
    },
    async fetchEquipment() {
      const res = await getEquipmentData(this.id);
      this.equipments = res;
      // console.log(res)
    },
  },
};
</script>

<style scoped>
.Hero-edit {
  width: 90%;
}
.Hero-edit .container {
  margin: 20px 20px;
  width: 100%;
}

.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width:5rem;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 5rem;
  height: 5rem;
  line-height: 5rem;
  text-align: center;
}
.avatar {
  width: 5rem;
  height: 5rem;
  display: block;
}

.down-save {
  margin: 20px 20px;
  padding-bottom: 30px;
}
</style>