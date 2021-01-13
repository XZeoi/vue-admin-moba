<template>
  <div class="Equipment-edit">
    <h1>{{ id ? "编辑" : "新建" }}装备</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <!-- <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option v-for="item in parents" :key="item._id"
          :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item> -->

      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>

      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:3000/admin/api/upload"
          :show-file-list="false"
          :on-success="successUploaded"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  postEquipmentData,
  getEquipmentDataById,
  putEquipmentData,
  getEquipmentData,
} from "network/equipment.js";

export default {
  props: {
    id: {},
  },
  data() {
    return {
      model: {},
      // parents: []
    };
  },
  created() {
    this.id && this.fetch();
    // this.fetchParents()
  },
  methods: {
    //成功上传照片时触发
    successUploaded(res) {
      console.log('照片上传成功：', res)
      // P13
      this.$set(this.model, 'icon', res.url)
      // this.model.icon = res.url
    },
    async save() {
      let res;
      if (this.id) {
        res = await putEquipmentData(this.id, this.model);
      } else {
        res = await postEquipmentData(this.model);
      }

      this.$router.push("/equipments/list");
      this.$message.success("保存成功！");
    },
    async fetch() {
      console.log(this.id);

      const res = await getEquipmentDataById(this.id);
      console.log(res);
      this.model = res;
    },
    // async fetchParents() {
    //   const res = await getEquipmentData()
    //   console.log(res)
    //   this.parents = res
    // }
  },
};
</script>

<style scoped>
.Equipment-edit h1 {
  margin-left: 20px;
}

.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>