<template>
  <Form :model="form" label-position="top">
    <FormItem label="Source Name">
      <Input v-model="form.sourceName" placeholder="Source Name"></Input>
    </FormItem>
    <FormItem label="Source Password">
      <Input v-model="form.sourcePassword" placeholder="Source Password"></Input>
    </FormItem>
    <FormItem label="User Name">
      <Input v-model="form.userName" placeholder="User Name"></Input>
    </FormItem>
    <FormItem label="User Password">
      <Input v-model="form.userPassword" placeholder="User Password"></Input>
    </FormItem>
    <FormItem label="Site ID">
      <Input v-model="form.siteID" placeholder="Site ID" type="number"></Input>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="save">Save</Button>
      <!-- <Button type="ghost" style="margin-left: 8px">Cancel</Button> -->
    </FormItem>
  </Form>
</template>
<script lang="ts">
  import Vue from 'vue'
  
  export default Vue.extend({
    props: {},
    data() {
      let data = {
        form: {
          sourceName: '',
          password: '',
          userName: '',
          userPassword: '',
          siteID: null
        }
      };
      // chrome.storage.sync.get('settings', (data) => {
      //   console.info(data);
      //   Object.assign(this.$data.form, data.settings);
      // });
      // console.info(this);
      return data;
    },
    async mounted() {
      await this.$store.dispatch('init');
      this.$data.form = Object.assign({}, this.$store.state.settings);
    },
    methods: {
      save() {
        let data = this.$data.form;
        data.siteIDs = [data.siteID];
        this.$store.commit('setSettings', data);
        (<any> this).$Message.info('Saved!');
      }
    }
  })
</script>
