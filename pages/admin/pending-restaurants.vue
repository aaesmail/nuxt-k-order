<template>
  <management-table
    :headers="headers"
    :title="'Pending Restaurants'"
    :extra_info="extra_info"
    :selected_btn="{ title: 'Confirm Selected', action: confirm }"
    :initialize="initialize"
  />
</template>

<script>
import admin from '~/api/admin'
export default {
  layout: 'admin',
  middleware: 'login_admin_only',

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
      ],
    },
  }),

  methods: {
    initialize(current_obj) {
      admin
        .pending_restaurants(localStorage.getItem('admin-token'))
        .then(res => (current_obj.restaurants = res.data.restaurants))
        .catch(err =>
          console.log('Failed getting pending restaurants, please try again!')
        )
    },

    confirm(current_obj) {
      current_obj.dialogConfirm = false
      const list = current_obj.selected.map(r => ({
        id: r.id,
        confirm_status: true,
      }))
      admin
        .set_restaurants_confirm_status(
          localStorage.getItem('admin-token'),
          list
        )
        .then(res => current_obj.initialize(current_obj))
        .catch(err => console.log('Failed, please try again!'))
    },
  },
}
</script>
