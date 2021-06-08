<template>
  <v-container fluid>
    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :page.sync="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar class="my-4">
          <!--  -->

          <!-- START Add/Edit menu item  -->

          <v-row justify="center">
            <v-dialog v-model="editDialog" persistent max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <!-- Activation Tooltip add/edit dialog -->
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <!-- Activation btn add/edit dialog -->
                    <v-btn
                      color="green"
                      fab
                      outlined
                      v-bind="attrs"
                      v-on="on"
                      @click="editDialog = true"
                    >
                      <v-icon>mdi-plus-thick</v-icon>
                    </v-btn>
                  </template>
                  <span>Add new menu item</span>
                </v-tooltip>
              </template>
              <v-card>
                <v-form v-model="valid">
                  <v-card-title>
                    <span class="text-h5">{{ selectedItem.title }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="6">
                          <v-btn
                            class="ma-2"
                            outlined
                            x-small
                            fab
                            color="red"
                            :disabled="selectedItem.ingredients_count < 1"
                            @click="selectedItem.ingredients_count -= 1"
                          >
                            <v-icon>mdi-minus</v-icon>
                          </v-btn>
                          {{ selectedItem.ingredients_count }} ingredients
                          <v-btn
                            class="ma-2"
                            outlined
                            x-small
                            fab
                            color="green"
                            @click="selectedItem.ingredients_count += 1"
                          >
                            <v-icon>mdi-plus</v-icon>
                          </v-btn>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-for="(i, idx) in selectedItem.ingredients"
                            :key="idx"
                            :label="`ingredient ${idx + 1}`"
                            v-model="selectedItem.ingredients[idx]"
                            :rules="[required(`ingredient ${idx + 1}`)]"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12">
                          <v-text-field
                            label="Title"
                            v-model="selectedItem.name"
                            :rules="[required('title')]"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="selectedItem.description"
                            label="Description"
                            :rules="[required('description')]"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="selectedItem.price"
                            label="Price"
                            type="number"
                            :rules="[required('price'), positiveNumber()]"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-checkbox
                            v-model="selectedItem.availableForSale"
                            label="Available"
                          ></v-checkbox>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="resetSelectedItem"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      :disabled="!valid"
                      text
                      @click="AddSelectedItem"
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-form>
              </v-card>
            </v-dialog>
          </v-row>

          <!-- END Add/Edit menu item  -->
          <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Search"
          ></v-text-field>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            <v-select
              v-model="sortBy"
              flat
              solo-inverted
              hide-details
              :items="keys"
              prepend-inner-icon="mdi-magnify"
              label="Sort by"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn-toggle v-model="sortDesc" mandatory>
              <v-btn large depressed :value="false">
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn large depressed :value="true">
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.name"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card>
              <v-card-title class="subheading font-weight-bold">
                {{ item.name }}
              </v-card-title>

              <v-divider></v-divider>

              <v-list dense>
                <v-list-item v-for="(key, index) in filteredKeys" :key="index">
                  <v-list-item-content
                    :class="{ 'blue--text': sortBy === key }"
                  >
                    {{ key }}:
                  </v-list-item-content>
                  <v-list-item-content
                    class="align-end"
                    :class="{ 'blue--text': sortBy === key }"
                  >
                    {{ item[key.toLowerCase()] }}
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              <v-divider></v-divider>
              <v-col class="text-right">
                <v-btn
                  class="ma-2"
                  outlined
                  large
                  fab
                  color="red"
                  @click="openDialog(item, 'delete')"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
                <v-btn
                  class="ma-2"
                  outlined
                  large
                  fab
                  color="indigo"
                  @click="openDialog(item, 'edit')"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-col>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row class="mt-2" align="center" justify="center">
          <span class="grey--text">Items per page</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                text
                color="primary"
                class="ml-2"
                v-bind="attrs"
                v-on="on"
              >
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <span
            class="mr-4
            grey--text"
          >
            Page {{ page }} of {{ numberOfPages }}
          </span>
          <v-btn
            fab
            dark
            color="blue darken-3"
            class="mr-1"
            @click="formerPage"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab dark color="blue darken-3" class="ml-1" @click="nextPage">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>

    <!-- START delete menu item  -->

    <v-row justify="center">
      <v-dialog v-model="deleteDialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="text-h5">Delete</span>
          </v-card-title>
          <v-card-text>
            <v-card-text
              >Permanently Delete {{ selectedItem.name }}?</v-card-text
            >
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="resetSelectedItem">
              Cancel
            </v-btn>
            <v-btn color="blue darken-1" text @click="deleteSelectedItem">
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- END delete menu item  -->
  </v-container>
</template>

<script>
import restaurant from '~/api/restaurant'
import validations from '@/utils/validations'

export default {
  layout: 'restaurant',
  middleware: 'login_restaurant_only',
  data() {
    return {
      ...validations,
      valid: false,
      selectedItem: {
        ingredients: [],
        ingredients_count: 0,
        description: '',
        name: '',
        availableForSale: true,
        id: -1,
        price: 0,
        title: 'New Item',
      },
      editDialog: false,
      deleteDialog: false,
      itemsPerPageArray: [4, 8, 12],
      search: '',
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: 'name',
      keys: ['Name', 'Description', 'Ingredients', 'Price', 'Available'],
      items: [],
    }
  },
  watch: {
    'selectedItem.ingredients_count'(newValue, oldValue) {
      if (newValue < 0) return
      const difference = newValue - oldValue
      if (difference > 0)
        while (this.selectedItem.ingredients.length < newValue)
          this.selectedItem.ingredients.push('')
      else
        this.selectedItem.ingredients = this.selectedItem.ingredients.slice(
          0,
          newValue
        )
    },
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage)
    },
    filteredKeys() {
      return this.keys.filter(key => key !== 'Name')
    },
  },
  created() {
    this.initialize()
  },
  methods: {
    openDialog(item, edit_delete) {
      const ing = item.ingredients.split(', ').filter(el => el != '')
      this.selectedItem = {
        ingredients: ing,
        ingredients_count: ing.length,
        description: item.description,
        name: item.name,
        availableForSale: item.available == '✅',
        id: item._id || item.id,
        price: item.price,
        title: item.name,
      }
      this.editDialog = edit_delete === 'edit'
      this.deleteDialog = edit_delete === 'delete'
    },
    resetSelectedItem() {
      this.selectedItem = {
        ingredients: [],
        ingredients_count: 0,
        description: '',
        name: '',
        availableForSale: true,
        id: -1,
        price: 0,
        title: 'New Item',
      }
      this.editDialog = false
      this.deleteDialog = false
    },
    async AddSelectedItem() {
      let call = restaurant.update_menu_item
      if (this.selectedItem.id == -1) call = restaurant.add_menu_item

      try {
        await call(localStorage.getItem('restaurant-token'), this.selectedItem)
        this.initialize()
      } catch (error) {
        alert('Error, please try again!')
      }
      this.resetSelectedItem()
    },

    async deleteSelectedItem() {
      try {
        await restaurant.delete_menu_item(
          localStorage.getItem('restaurant-token'),
          this.selectedItem.id
        )
        this.initialize()
      } catch (error) {
        alert('Error, please try again!')
      }
      this.resetSelectedItem()
    },

    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number
    },
    async initialize() {
      try {
        this.items = (
          await restaurant.get_menu_items(
            localStorage.getItem('restaurant-token')
          )
        ).data.menu_items
        this.items.forEach(i => {
          i.ingredients = i.ingredients.join(', ')
          i.available = i.availableForSale ? '✅' : '❌'
        })
      } catch (error) {
        console.log(error)
        // alert('Error in fetching data!')
      }
    },
  },
}
</script>
