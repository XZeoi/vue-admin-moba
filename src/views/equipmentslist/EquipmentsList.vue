<template>
  <div class="Equipment-list">
    <h1>装备列表</h1>
    <el-table :data="items" border>
      <el-table-column prop="_id" label="id" width="220"></el-table-column>
      <!-- <el-table-column prop="parent.name" label="上级分类"></el-table-column> -->
      <el-table-column prop="name" label="装备名称"></el-table-column>
      <el-table-column prop="icon" label="图标">
        <template v-slot="scope">
          <img :src="scope.row.icon" alt="" style="height:3rem;">
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180px">
        <template v-slot="scope">
          <el-button type="primary" size="small" 
          @click="$router.push(`/equipments/edit/${scope.row._id}`)">编辑</el-button>
          <el-button type="danger" size="small"
          @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getEquipmentData, deleteEquipmentDataById } from "network/equipment.js";

export default {
  data() {
    return {
      items: []
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      // const { data : res} = await getEquipmentData()
      const res  = await getEquipmentData()
      this.items = res
      // console.log(res)
    },
    async remove(row) {
      this.$confirm(`是否确定要删除分类"${row.name}"`, '提示', {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(async () => {
        const res = await deleteEquipmentDataById(row._id)
        this.$message.success('删除成功！')
        this.fetch()
      })
      .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
  }
}
</script>

<style scoped>
.Equipment-list {
  width: 100%;
  margin: 20px;
}
</style>