<template>
  <div id="loader">
    <div class="loader1 main">
      <div class="loading"></div>
    </div>
    <div class="loader2">
      <div class="load"></div>
    </div>
    <div class="loader3">
      <div class="logo"></div>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    var load = document.getElementById("loader");
    load.style.display = "block"; //use 'none' to hide
  }
};
</script>
<style scoped>
/* / FOR LOADING OVERLAY / */
html,
body {
  margin: 0;
  padding: 0;
}
.main {
  background: #00000052;
  height: 100vh;
  width: 100%;
  z-index: 20001;
}
.loader1,
.loader2,
.loader3 {
  position: fixed;
  z-index: 20000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-animation-name: fadeIn;
  -webkit-animation-duration: 0.4s;
  animation-name: fadeIn;
  animation-duration: 0.4s;
}
.bg {
  background: #ffffff4f;
  width: 100%;
  height: 100vh;
}
.loading {
  border: 4px solid #ffffff00;
  border-radius: 50%;
  border-top: 4px solid #39b2f8;
  width: 150px;
  height: 150px;
  animation: spin 1s linear infinite;

  /* border: 4px solid #ffffff00;
border-radius: 50%;
border-top: 4px solid #A6CE39;
width: 180px;
height: 180px;
animation: spin2 0.8s linear infinite; */
}
.load {
  border: 4px solid #ffffff00;
  border-radius: 50%;
  border-top: 4px solid #013b7c;
  width: 180px;
  height: 180px;
  animation: spin2 0.8s linear infinite;
}
.logo {
  background-image: url("/paypal.png");
  background-size: cover;
  margin: auto;
  width: 120px;
  height: 120px;
  /* animation: vrotate 2.3s linear infinite; */
}

/* / Safari / */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes spin2 {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin2 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@-webkit-keyframes vrotate {
  0% {
    opacity: 20%;
  }
  50% {
    opacity: 100%;
  }
  100% {
    opacity: 20%;
  }
}

@keyframes vrotate {
  0% {
    opacity: 20%;
  }
  50% {
    opacity: 100%;
  }
  100% {
    opacity: 20%;
  }
}
/* / UNTIL HERE LOADING OVERLAY / */
</style>
