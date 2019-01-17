<template>
  <Footer> 2019-2029 &copy; {{website.title.footer}} </Footer >
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CFooter',
  computed: {
    ...mapGetters(['website'])
  }
}
</script>
