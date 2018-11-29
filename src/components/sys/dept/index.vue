<template>
  <div>
    <Input type="text" v-model="deptName" clearable />
  </div>
</template>
<script>
export default {
  name: 'CDept',
  data: function () {
    return {
      deptName: ''
    }
  }
}
</script>
