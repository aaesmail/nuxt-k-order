<template>
  <v-container fluid>
    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :page.sync="page"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar class="my-4">
          <v-card-title class="mr-10">Orders</v-card-title>
          <!-- <v-checkbox
            class="ma-8"
            v-model="deliveredOrders"
            label="show delivered"
          ></v-checkbox> -->

          <v-select
            v-model="deliveredOrders"
            flat
            solo-inverted
            hide-details
            :items="['Not Delivered', 'Delivered', 'All']"
            prepend-inner-icon="mdi-magnify"
            label="Orders"
          ></v-select>
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
              <v-simple-table dark>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th
                        class="text-left"
                        v-for="(key, index) in headers"
                        :key="index"
                      >
                        {{ key }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="menu_item in item.menuItems"
                      :key="menu_item.name"
                    >
                      <td
                        class="text-left"
                        v-for="(key, index) in headers.slice(0, 2)"
                        :key="index"
                      >
                        {{
                          menu_item.menuItem[key.toLowerCase().split(' ')[0]]
                        }}
                      </td>

                      <td class="text-left">
                        {{ menu_item.quantity }}
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
              <v-divider></v-divider>
              <!--  -->
              <v-list dense>
                <v-list-item>
                  <v-list-item-content>
                    Customer Name
                  </v-list-item-content>

                  <v-list-item-content>
                    {{ item.user.name }}
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    Customer Phone
                  </v-list-item-content>

                  <v-list-item-content>
                    {{ item.user.phone }}
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    Customer Address
                  </v-list-item-content>

                  <v-list-item-content>
                    {{ item.user.address }}
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    Total
                  </v-list-item-content>

                  <v-list-item-content>
                    {{ item.totalPrice }} EGP
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    Recieved At
                  </v-list-item-content>

                  <v-list-item-content>
                    {{ new Date(item.date).toLocaleString() }}
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              <v-divider></v-divider>
              <v-col class="text-right">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <!-- Activation dialog -->
                    <v-btn
                      class="ma-2"
                      outlined
                      large
                      fab
                      v-bind="attrs"
                      v-on="on"
                      color="green"
                      :disabled="item.delivered"
                      @click="openDialog(item)"
                    >
                      <v-icon>mdi-check</v-icon>
                    </v-btn>
                  </template>
                  <span>Confirm Delivered</span>
                </v-tooltip>
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

    <!-- START confirm order  -->

    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="text-h5">Confirm Delivered</span>
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Cancel
            </v-btn>
            <v-btn color="blue darken-1" text @click="deliveredSelectedOrder">
              Confirm
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- END confirm order  -->
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
      deliveredOrders: 'Not Delivered',
      valid: false,
      selectedItemId: 0,
      dialog: false,
      itemsPerPageArray: [4, 8, 12],
      search: '',
      filter: {},
      page: 1,
      itemsPerPage: 4,
      headers: ['Name', 'Price (per 1)', 'Quantity'],
      keys: [
        'Date',
        'Customer Name',
        'Customer Phone',
        'Customer Address',
        'Total',
      ],

      items: [],
    }
  },
  watch: {
    deliveredOrders() {
      this.initialize()
    },
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage)
    },
  },

  created() {
    this.initialize()
    setInterval(this.initialize, 1000 * 60 * 5)
  },

  methods: {
    initialize() {
      const status = { 'Not Delivered': 'false', Delivered: 'true', All: 'all' }
      restaurant
        .get_incoming_orders(
          localStorage.getItem('restaurant-token'),
          status[this.deliveredOrders]
        )
        .then(res => {
          this.items = res.data.orders
        })
        .catch(error => console.log(error))
    },

    openDialog(item) {
      this.selectedItemId = item._id
      this.dialog = true
    },
    deliveredSelectedOrder() {
      restaurant
        .set_order_delivered(
          localStorage.getItem('restaurant-token'),
          this.selectedItemId
        )
        .then(res => {
          this.dialog = false
          this.initialize()
        })
        .catch(err => console.log('Error, please try again!', err))
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
  },
}
</script>
