<template>
  <div id="main">
    <Loading v-if="showLoading" />
    <b-row v-if="paymentData">
      <!-- left side -->
      <b-col cols="12" lg="6" md="6" sm="12">
        Transaction: {{ paymentData.cart }}
        <br />
        Created At:
        {{ formatDate(paymentData.create_time) }} <br />Payer's Email:
        {{ paymentData.payer.payer_info.email }}
        <br />
        Payer's Name: {{ paymentData.payer.payer_info.first_name }}
        {{ paymentData.payer.payer_info.last_name }} <br />
        Transaction Status: {{ paymentData.state }}
        <br />
        Mode of Payment: {{ paymentData.payer.payment_method }}
      </b-col>
      <!-- right side -->
      <b-col cols="12" lg="6" md="6" sm="12">
        Updated At:
        {{ formatDate(paymentData.update_time) }}
        <br />
        <b><ins>TRANSACTION</ins></b>
        <br />
        Description: {{ paymentData.transactions[0].description }}
        <br />
        Currency: {{ paymentData.transactions[0].amount.currency }}
        <br />
        And more .. see console
      </b-col>
    </b-row>
    <br />
    <b-button id="go-home" size="sm" @click="goHome">Go back</b-button>
  </div>
</template>

<script>
import Loading from "~/components/Loading.vue";
import axios from "axios";
import moment from "moment";

export default {
  data() {
    return {
      showLoading: false,
      payerId: null,
      paymentId: null,
      paymentData: null
    };
  },
  components: { Loading },
  async created() {
    this.payerId = this.$route.query.PayerID;
    this.paymentId = this.$route.query.paymentId;
    await this.processPayment();
  },
  methods: {
    goHome() {
      this.$router.push(`/`);
    },
    formatDate(date) {
      return moment(date).format(`MMM DD, YYYY hh:mm:ss A`);
    },
    async processPayment() {
      try {
        this.showLoading = true; // for loading
        const res = await axios({
          method: "POST",
          url: `${this.$axios.defaults.baseURL}/paypal/success`,
          data: {
            payerId: this.payerId,
            paymentId: this.paymentId,
            total: localStorage.total
          }
        });

        // remove total from local storage
        localStorage.removeItem("total");

        this.showLoading = false; // for loading
        const data = res.data;
        console.log(data);
        this.paymentData = data; // display this to UI
      } catch (e) {
        this.showLoading = false; // for loading
        console.log("Error on process payment: ", e);
        if (e.response.data) {
          let err = e.response.data;
          this.showMessage(err, "danger", "Error");
        }
      }
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
  }
};
</script>

<style scoped></style>
