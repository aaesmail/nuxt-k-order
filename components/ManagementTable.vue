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
          <v-toolbar-title>{{ title }}</v-toolbar-title>
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
                {{ selected_btn.title }}
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ selected_btn.title }}</span>
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
                <v-btn
                  color="blue darken-1"
                  text
                  @click="selected_btn.action(current_obj)"
                >
                  Confirm
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogInfo" max-width="500px" v-if="extra_info">
            <v-card>
              <v-card-title>
                <span class="headline"
                  >{{ currentRestaurant.name }} {{ extra_info.title }}</span
                >
              </v-card-title>

              <v-data-table
                :headers="extra_info.headers"
                :items="currentRestaurant[extra_info.key]"
                hide-default-header
                hide-default-footer
                class="elevation-1"
              ></v-data-table>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeInfo">Ok</v-btn>
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
export default {
  layout: 'admin',
  props: {
    headers: Array,
    extra_info: Object,
    selected_btn: Object,
    initialize: Function,
    title: String,
  },
  computed: {
    current_obj() {
      return this
    },
  },
  data() {
    return {
      currentRestaurant: {},
      selected: [],
      search: '',
      dialogConfirm: false,
      dialogInfo: false,
      restaurants: [],
    }
  },

  created() {
    this.initialize(this)
    const obj = this
    setInterval(() => obj.initialize(obj), 1000 * 10 * 5)
  },

  methods: {
    showInfo(item) {
      this.currentRestaurant = item
      this.dialogInfo = true
      console.log('MAM')
    },

    closeConfirm() {
      this.dialogConfirm = false
    },

    closeInfo() {
      this.dialogInfo = false
    },
  },
}
</script>
