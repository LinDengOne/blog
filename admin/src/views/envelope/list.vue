<template>
  <div class="phrase">
      <h2 class="tit">
          说说列表({{ total }})
          <span @click="newEnvelope" class="add">
              <span class="el-icon-plus">新建说说</span>
          </span>
      </h2>

    <el-table :data="data" style="width: 100%"  height="calc(800px - 240px)">
            
            <el-table-column label="Title">
                <template slot-scope="scope">
                    <p>{{ scope.row.content }}</p>
                </template>
            </el-table-column>

            <el-table-column label="Date" width=140>
                <template slot-scope="scope">
                    <span>{{ $getDate(scope.row.time) }}</span>
                </template>
            </el-table-column>

            <el-table-column label="options" width=100>
                <template slot-scope="scope">
                    <el-tooltip 
                        effect="dark" 
                        placement="top"
                        v-for="(item, index) in list"
                        :content="item.text"
                        :key="index"
                    >
                        <i :class="item.icon" @click="option(scope.row, index)"></i>
                    </el-tooltip>
                </template>
            </el-table-column>

        </el-table>
      
  </div>
</template>

<script>
export default {
    data() {
        return {
            data: [],
            total: 0,
            page: 1,
            list: [
                {
                    text:''
                }
            ]

        }
    },

}
</script>

<style>

</style>