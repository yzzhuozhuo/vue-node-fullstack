<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-input v-model="val"></el-input>
    <h1>{{ val }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      val: ''
    }
  },
}
</script>