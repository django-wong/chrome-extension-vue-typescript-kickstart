<template>
  <Modal v-model="visible" title="Where to store the data?">
    <Button type="primary" @click="$emit('local'); visible = false">Save To Computer</Button>
    <Button type="primary" @click="$emit('remote'); visible = false">Save To Remote</Button>
    <div slot="footer"></div>
  </Modal> 
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    data() {
      return {
        visible: false
      }
    },
    methods: {
      show() {
        this.visible = true;
      },
      hide() {
        this.visible = false;
      },
      toggle() {
        this.visible = !this.visible;
      }
    }
  })
</script>
