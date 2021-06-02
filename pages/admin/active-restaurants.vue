<template>
  <management-table :headers="headers" :title="'Active Restaurants'" :extra_info="extra_info" :selected_btn="{title: 'Delete Selected', action: confirm}" :initialize="initialize" />
</template>

<script>
import admin from '~/api/admin';
export default {
  layout: 'admin',
  data: () => ({

    headers: [
      {
        text: 'Name',
        align: 'start',
        value: 'name',
      },
      { text: 'Email', value: 'email', sortable: false },
      { text: 'Branches', value: 'actions', sortable: false },
    ],
    extra_info: {
      title: 'Branches',
      key: 'branches',
      headers: [
        { text: 'Address', align: 'start', value: 'address', sortable: false },
        { text: 'Phone', value: 'phone', sortable: false },
      ]
    }
  }),


  methods: {
    initialize(current_obj) {
      admin.active_restaurants().then(res =>
          current_obj.restaurants = res.data.restaurants
      ).catch(err => alert('Failed getting restaurants, please try again!'))
    },

    confirm(current_obj) {
      this.dialogConfirm = false
    //   todo
    },
  },
}
</script>
