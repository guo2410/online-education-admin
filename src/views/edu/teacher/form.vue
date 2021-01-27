<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name" />
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number
          v-model="teacher.sort"
          controls-position="right"
          min="0"
        />
      </el-form-item>

      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <el-option :value="1" label="高级讲师" />

          <el-option :value="2" label="首席讲师" />
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career" />
      </el-form-item>

      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea" />
      </el-form-item>

      <el-form-item label="讲师头像">
        <!-- 头衔缩略图 -->
        <pan-thumb :image="teacher.avatar" />
        <!-- 文件上传按钮 -->
        <el-button
          type="primary"
          icon="el-icon-upload"
          @click="imagecropperShow = true"
          >更换头像
        </el-button>
        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="BASE_API + '/admin/oss/file/upload'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"
        />
      </el-form-item>

      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import teacher from "@/api/edu/teacher";
import ImageCropper from "@/components/ImageCropper";
import PanThumb from "@/components/PanThumb";
const defaultForm = {
  name: "",
  sort: 0,
  level: "",
  career: "",
  intro: "",
  avatar: process.env.OSS_PATH + "/avatar/default.jpg",
};
export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
      teacher: defaultForm,
      saveBtnDisabled: false,
      BASE_API: process.env.BASE_API, // 接口API地址
      imagecropperShow: false, // 是否显示上传组件
      imagecropperKey: 0, // 上传组件id
    };
  },
  watch: {
    $route(to, from) {
      console.log("watch $route");
      this.init();
    },
  },
  created() {
    this.init();
  },
  methods: {
    close() {
      this.imagecropperShow = false;
       this.imagecropperKey = this.imagecropperKey + 1
    },
    cropSuccess(data) {
      this.teacher.avatar = data.url
      this.imagecropperShow = false;
       this.imagecropperKey = this.imagecropperKey + 1
    },
    init() {
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id;
        this.fetchDataById(id);
      } else {
        this.teacher = { ...defaultForm };
      }
    },
    saveOrUpdate() {
      this.saveBtnDisabled = true;
      if (!this.teacher.id) {
        this.saveData();
      } else {
        this.updateData();
      }
    },
    saveData() {
      teacher
        .save(this.teacher)
        .then((Response) => {
          return this.$message({
            type: "success",
            message: "保存成功!",
          });
        })
        .then((response) => {
          this.$router.push({ path: "/edu/teacher" });
        })
        .catch((response) => {
          this.$message({
            type: "error",
            message: "保存失败!",
          });
        });
    },
    fetchDataById(id) {
      teacher
        .getById(id)
        .then((response) => {
          this.teacher = response.data.item;
        })
        .catch((response) => {
          this.$message({
            type: "error",
            message: "获取数据失败!",
          });
        });
    },
    updateData() {
      this.saveBtnDisabled = true;
      teacher
        .updateById(this.teacher.id, this.teacher)
        .then((response) => {
          this.$message({
            type: "success",
            message: "修改成功!",
          });
        })
        .then((resposne) => {
          this.$router.push({ path: "/edu/teacher" });
        })
        .catch((response) => {
          // console.log(response)

          this.$message({
            type: "error",

            message: "保存失败",
          });
        });
    },
  },
};
</script>