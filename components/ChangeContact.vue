<template>
  <v-container>
    <v-text-field
      v-model="address"
      :autofocus="true"
      label="Address"
    ></v-text-field>
    <v-text-field v-model="phone" label="Phone Number"></v-text-field>
    <v-btn @click="change">
      Update
    </v-btn>
  </v-container>
</template>

<script>
export default {
  emits: ['done'],
  data() {
    return {
      address: '',
      phone: '',
    }
  },
  methods: {
    change() {
      this.$emit('done')
    },
  },
}
</script>
