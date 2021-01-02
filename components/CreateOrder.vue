<template>
  <div class="component-margin">
    <Loading v-if="showLoading" />
    <div id="main">
      <!-- filters -->
      <b-row class="mb-3">
        <b-col cols="5" lg="5" md="5" sm="5" class="mb-2">
          <b-input-group>
            <b-form-input
              size="sm"
              maxlength="10"
              type="search"
              placeholder="Search Items"
              id="search-all"
              v-model="filter"
              autocomplete="off"
            ></b-form-input>
            <b-input-group-append>
              <b-button
                id="clear-search"
                size="sm"
                :disabled="!filter"
                @click="filter = ''"
                >Clear</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </b-col>
        <b-col cols="5" lg="5" md="5" sm="5" class="mb-2">
          <!-- dummy column -->
        </b-col>
        <b-col cols="2" lg="2" md="2" sm="3" class="items">
          <b-input-group prepend="Items" size="sm">
            <b-form-select style="z-index:0" size="sm" v-model="perPage">
              <option v-for="value in values" :key="value" :value="value">{{
                value
              }}</option>
              <option :value="filterItems.length">All</option>
            </b-form-select>
          </b-input-group>
        </b-col>

        <!-- add item button -->
        <b-col lg="12" md="8" sm="8" class="mb-3 mt-2">
          <b-button
            id="add-item"
            variant="success"
            size="sm"
            class="main-button"
            @click="showAddModal"
          >
            <font-awesome-icon
              style="color:white"
              icon="plus"
              small
              class="icon"
            />Add Items
          </b-button>
        </b-col>

        <!-- type description -->
        <b-col lg="2" md="8" sm="8" class="mb-3 mt-2">
          Description:
        </b-col>
        <b-col lg="8" md="8" sm="8" class="mb-3 mt-2">
          <b-form-input
            id="input-desc"
            class="mb-1"
            size="sm"
            v-model="desc"
            maxlength="100"
            autocomplete="off"
          ></b-form-input>
        </b-col>
        <b-col lg="2" md="8" sm="8" class="mb-3 mt-2">
          <b-button
            id="create-payment"
            variant="success"
            size="sm"
            class="main-button"
            @click="createPayment"
          >
            <font-awesome-icon
              style="color:white"
              icon="money-bill-wave"
              small
              class="icon"
            />&nbsp;Create Payment
          </b-button>
        </b-col>
      </b-row>
      <!-- end filters -->

      <!-- table -->
      <b-table
        class="mt-2"
        ref="display-items-table"
        id="display-items-table"
        :borderless="false"
        :items="filterItems"
        :filter="filter"
        :fields="fields"
        :busy="isBusy"
        selectedVariant="primary"
        responsive
        show-empty
        :per-page="perPage"
        :current-page="currentPage"
        sort-by="sku"
      >
        <template v-slot:table-busy>
          <div class="text-center text-secondary my-2">
            <b-spinner small class="align-middle"></b-spinner>
            <strong>&nbsp;Loading...</strong>
          </div>
        </template>
        <template v-slot:table-caption>{{ bottomLabel }}</template>

        <template v-slot:cell(actions)="row">
          <b-button
            id="remove-item"
            size="sm"
            class="mr-1 table-button"
            v-b-tooltip.hover
            @click="removeItem(row)"
            title="Remove"
          >
            <font-awesome-icon
              style="color:white"
              icon="trash"
              small
              class="icon"
            />
          </b-button>
        </template>
      </b-table>
      <!-- end table -->

      <!-- pagination -->
      <div class="mt-5">
        <b-pagination
          v-if="filterItems.length !== 0"
          id="pagination"
          align="center"
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          class="my-0"
          size="sm"
          pills
        ></b-pagination>
      </div>
      <!-- end pagination -->

      <!-- add modal -->
      <b-modal
        header-bg-variant="success"
        header-text-variant="light"
        title="Add Item"
        @hidden="clearAdd"
        @hide="clearAdd"
        v-model="isAdd"
        v-if="toAdd"
        no-close-on-backdrop
      >
        <b-card class="card-shadow">
          <!-- name -->
          <b-form-group>
            <label class="mb-1">Item Name</label>
            <b-form-input
              id="input-name"
              v-model="toAdd.name"
              class="mb-1"
              autocomplete="off"
            ></b-form-input>
          </b-form-group>
          <!-- price -->
          <b-form-group>
            <label class="mb-1">Price</label>
            <b-form-input
              id="input-price"
              v-model="toAdd.price"
              class="mb-1"
              type="number"
              step="0.01"
              autocomplete="off"
            ></b-form-input>
          </b-form-group>
          <!-- qty -->
          <b-form-group>
            <label class="mb-1">Quantity</label>
            <b-form-input
              id="input-quantity"
              v-model="toAdd.quantity"
              class="mb-1"
              type="number"
              autocomplete="off"
            ></b-form-input>
          </b-form-group>
        </b-card>
        <template v-slot:modal-footer="{}">
          <b-button
            size="sm"
            variant="success"
            @click="addItem"
            class="main-button function-button"
            >Add</b-button
          >
          <b-button
            size="sm"
            class="main-button function-button"
            style="border: 0px;"
            @click="clearAdd"
            >Cancel</b-button
          >
        </template>
      </b-modal>
      <!-- end add modal -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import Loading from "~/components/Loading.vue";

export default {
  components: { Loading },
  data() {
    return {
      showLoading: false,
      //   for table
      filter: null,
      perPage: 5,
      values: ["5", "10", "25", "50", "100"],
      items: [],
      currentPage: 1,
      isBusy: false,
      fields: [
        {
          key: "sku",
          label: "SKU",
          sortable: true
        },
        {
          key: "name",
          label: "Item Name",
          sortable: true
        },
        {
          key: "price",
          label: "Price",
          sortable: true
        },
        {
          key: "currency",
          label: "Currency",
          sortable: true
        },
        {
          key: "quantity",
          label: "Quantity",
          sortable: true
        },
        {
          key: "actions",
          label: "Actions"
        }
      ],
      totalRows: null,
      //   end for table
      desc: null, // description of payment
      windowWidth: window.innerWidth,
      toAdd: null, // object to insert
      isAdd: false, // to trigger add modal
      toUpdate: null, // object to update
      isUpdate: false // to trigger update modal
    };
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.windowWidth = window.innerWidth;
    });
  },
  async created() {},
  methods: {
    async createPayment() {
      try {
        this.showLoading = true; // for loading
        const res = await axios({
          method: "POST",
          url: `${this.$axios.defaults.baseURL}/paypal/create`,
          data: {
            desc: this.desc,
            items: this.items
          }
        });
        // encrypt localStorage total amount
        let total = 0;
        for (let i = 0; i < this.items.length; i++) {
          const e = this.items[i];
          const qty = e.quantity ? parseInt(e.quantity) : 0;
          const price = e.price ? parseFloat(e.price) : 0;

          total = total + qty * price;
        }

        localStorage.total = await this.$store.dispatch(
          "Functions/encrypt",
          total,
          false
        );
        this.showLoading = false; // for loading
        const link = res.data;
        window.location.href = link; // open to paypal page
      } catch (e) {
        this.showLoading = false; // for loading
        console.log("Error on create payment: ", e);
        if (e.response.data) {
          let err = e.response.data;
          this.showMessage(err, "danger", "Error");
        }
      }
    },
    removeItem(row) {
      const data = row.item;
      const sku = data.sku; // to remove identifier coz unique
      for (let i = 0; i < this.items.length; i++) {
        const e = this.items[i];
        if (e.sku == sku) {
          this.items.splice(i, 1); // remove item
          break;
        }
      }
    },
    addItem() {
      // price validation
      if (this.toAdd.price <= 0)
        return this.showMessage(
          `Invalid price, please try again.`,
          "danger",
          "Error"
        );

      if (this.toAdd.quantity <= 0)
        return this.showMessage(
          `Invalid quantity, please try again.`,
          "danger",
          "Error"
        );

      this.items.push({
        name: this.toAdd.name,
        sku: this.toAdd.sku,
        price: this.toAdd.price,
        currency: this.toAdd.currency,
        quantity: this.toAdd.quantity
      });

      //   clear and close
      this.clearAdd();
    },
    clearAdd() {
      this.toAdd = null;
      this.isAdd = false;
    },
    showAddModal() {
      const len = this.items.length + 1;
      this.toAdd = {
        name: null,
        sku: `00${len}`,
        price: 0,
        currency: `USD`,
        quantity: 0
      };
      this.isAdd = true;
    },
    showMessage(msg, variant, title) {
      this.$bvToast.toast(`${msg}`, {
        title: title,
        toaster: "b-toaster-bottom-right",
        solid: true,
        variant: variant,
        appendToast: true
      });
    }
  },
  computed: {
    filterItems() {
      const items = this.items.filter(e => {
        if (this.filter) {
          const result =
            e.name.toLowerCase().match(this.filter) ||
            e.name.toUpperCase().match(this.filter) ||
            e.name.match(this.filter) ||
            e.sku.match(this.filter);
          return result;
        } else {
          return true;
        }
      });
      this.totalRows = items.length;

      return items;
    },
    bottomLabel() {
      let end = this.perPage * this.currentPage;
      let start = end - this.perPage + 1;

      if (end > this.filterItems.length) {
        end = this.filterItems.length;
      }
      if (this.filterItems.length === 0) {
        start = 0;
      }
      return `Showing ${start} to ${end} of ${this.filterItems.length} entries`;
    }
  }
};
</script>

<style scoped></style>
