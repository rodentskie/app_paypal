<template>
  <div>
    <b-card no-body class="mt-5" style="margin:10px;padding:10px;">
      <b-tabs
        content-class="mt-3"
        class="tab-name"
        active-nav-item-class="font-weight-bold text-uppercase text-success"
      >
        <b-tab title="Create Order">
          <CreateOrder />
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import CreateOrder from "~/components/CreateOrder";
export default {
  components: {
    CreateOrder
  },
  head() {
    return {
      title: `Paypal Integration`,
      meta: [
        {
          hid: "Paypal Integration",
          name: "Paypal Integration",
          content: "NodeJS Paypal Integration."
        }
      ]
    };
  },
  data() {
    return {};
  }
};
</script>

<style></style>
