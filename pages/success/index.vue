<template>
  <div>
    <b-card no-body class="mt-5" style="margin:10px;padding:10px;">
      <Success />
    </b-card>
  </div>
</template>

<script>
import Success from "~/components/Success";
export default {
  components: {
    Success
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
