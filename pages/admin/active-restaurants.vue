<template>
  <v-card>
    <v-card-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <v-data-table
      :headers="headers"
      :items="restaurants"
      :search="search"
      sort-by="name"
      class="elevation-1"
      v-model="selected"
      item-key="id"
      show-select
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Active Restaurants</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialogConfirm" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
                :disabled="!selected.length"
              >
                Confirm Selected
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Confirm Restaurants</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row v-for="restaurant in selected" :key="restaurant.name">
                    {{ restaurant.name }}
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeConfirm">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="confirm">
                  Confirm
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogInfo" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">{{ currentRestaurant.name }}</span>
              </v-card-title>

              <v-data-table
                :headers="contactsHeaders"
                :items="currentRestaurant.contacts"
                hide-default-header
                hide-default-footer
                class="elevation-1"
              ></v-data-table>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeInfo"
                  >Ok</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="showInfo(item)">
          mdi-information-outline
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import admin from '~/api/admin';
export default {
  layout: 'admin',
  data: () => ({
    currentRestaurant: {},
    selected: [],
    search: '',
    dialogConfirm: false,
    dialogInfo: false,
    headers: [
      {
        text: 'Name',
        align: 'start',
        value: 'name',
      },
      { text: 'Email', value: 'email', sortable: false },
      { text: 'Branches', value: 'actions', sortable: false },
    ],

    contactsHeaders: [
      { text: 'Address', align: 'start', value: 'address', sortable: false },
      { text: 'Phone', value: 'phone', sortable: false },
    ],

    restaurants: [],
  }),

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      admin.pending_restaurants(localStorage.getItem('admin-token')).then(res =>
          this.restaurants = res.data.restaurants
      ).catch(err => alert('Failed getting pemding restaurants, please try again!'))
    },

    showInfo(item) {
      this.currentRestaurant = { name: item.name, contacts: [] }
      for (let index = 0; index < item.addresses.length; index++) {
        this.currentRestaurant.contacts.push({
          phone: item.phones[index],
          address: item.addresses[index],
        })
      }
      this.dialogInfo = true
    },

    closeConfirm() {
      this.dialogConfirm = false
    },

    closeInfo() {
      this.dialogInfo = false
    },

    confirm() {
      this.dialogConfirm = false
    //   todo
    },
  },
}
</script>
