<template>
  <v-app>
    <v-main class="black500">
      <!--  <cabecalho></cabecalho> -->
      <router-view class="pa-0"></router-view>
    </v-main>
  </v-app>
</template>

<script>
/* import cabecalho from "@/components/cabecalho.vue" */
export default {
  name: "App",

  components: {
    /*   cabecalho */
  },

  data: () => ({
    //
  }),
};
</script>

<style >
.toasted {
  font-family: Verdana, Geneva, Tahoma, sans-serif !important;
  padding: 0px 10px !important;
}
.toasted .mdi {
  font-size: 35px !important;
}

.hideY {
  overflow-y: hidden !important;
}
.hideX {
  overflow-x: hidden !important;
}
.showY {
  overflow-y: auto !important;
}
.showY {
  overflow-x: auto !important;
}
html,
body {
  height: 100%;
  overflow: hidden;
}
.whiteb {
  background: #ecf1ff !important;
  background-color: #ecf1ff !important;
}
.white100 {
  background: #ecf1ff !important;
  background-color: #ecf1ff !important;
}
.black100 {
  background: #b2b3b6 !important;
  background-color: #b2b3b6 !important;
}
.black200 {
  background: #66676a !important;
  background-color: #66676a !important;
}
.black300 {
  background: #515151 !important;
  background-color: #515151 !important;
}
.black400 {
  background: #1e1f21 !important;
  background-color: #1e1f21 !important;
}
.black500 {
  background: #131414 !important;
  background-color: #131414 !important;
}
.black600 {
  background: #0c0c0d !important;
  background-color: #0c0c0d !important;
}
.black100t,
.black100t .v-input__control .v-text-field__slot input,
.black100t .v-input__control .v-text-field__slot .v-label,
.black100t div .v-input__icon i,
.black100t .v-input__control .v-text-field__slot,
.black100t .v-input__control div div div div input,
.black100t .v-select__selection.v-select__selection--comma,
.black100t .v-input__control div div label {
  color: #c7c7c7 !important;
}
.black200t,
.black200t .v-input__control .v-text-field__slot input,
.black200t .v-input__control .v-text-field__slot .v-label,
.black200t div .v-input__icon i,
.black200t .v-input__control .v-text-field__slot,
.black200t .v-input__control div div div div input,
.black200t .v-select__selection.v-select__selection--comma,
.black200t .v-input__control div div label {
  color: #66676a !important;
}
.black300t,
.black300t .v-input__control .v-text-field__slot input,
.black300t .v-input__control .v-text-field__slot .v-label,
.black300t div .v-input__icon i,
.black300t .v-input__control .v-text-field__slot,
.black300t .v-input__control div div div div input,
.black300t .v-select__selection.v-select__selection--comma,
.black300t .v-input__control div div label {
  color: #515151 !important;
}
.black400t,
.black400t .v-input__control .v-text-field__slot input,
.black400t .v-input__control .v-text-field__slot .v-label,
.black400t div .v-input__icon i,
.black400t .v-input__control .v-text-field__slot,
.black400t .v-input__control div div div div input,
.black400t .v-select__selection.v-select__selection--comma,
.black400t .v-input__control div div label {
  color: #1e1f21 !important;
}
.black500t,
.black500t .v-input__control .v-text-field__slot input,
.black500t .v-input__control .v-text-field__slot .v-label,
.black500t div .v-input__icon i,
.black500t .v-input__control .v-text-field__slot,
.black500t .v-input__control div div div div input,
.black500t .v-select__selection.v-select__selection--comma,
.black500t .v-input__control div div label {
  color: #131414 !important;
}
.black600t,
.black600t .v-input__control .v-text-field__slot input,
.black600t .v-input__control .v-text-field__slot .v-label,
.black600t div .v-input__icon i,
.black600t .v-input__control .v-text-field__slot,
.black600t .v-input__control div div div div input,
.black600t .v-select__selection.v-select__selection--comma,
.black600t .v-input__control div div label {
  color: #0c0c0d !important;
}
.bblack600,
.bblack600 .v-input__control .v-text-field__slot input,
.bblack600 .v-input__control .v-text-field__slot .v-label,
.bblack600 div .v-input__icon i,
.bblack600 .v-input__control .v-text-field__slot,
.bblack600 .v-input__control div div div div input,
.bblack600 .v-select__selection.v-select__selection--comma,
.bblack600 .v-input__control div div label {
  border-color: #0c0c0d !important;
  border-width: 4px !important;
}

.blue100 {
  background: #4343fe;
  background-color: #4343fe;
}
.blue200 {
  background: #3434ba;
  background-color: #3434ba;
}
.blue100t,
.blue100t .v-input__control .v-text-field__slot input,
.blue100t .v-input__control .v-text-field__slot .v-label,
.blue100t div .v-input__icon i,
.blue100t .v-input__control .v-text-field__slot,
.blue100t .v-input__control div div div div input,
.blue100t .v-select__selection.v-select__selection--comma,
.blue100t .v-input__control div div label {
  color: #4343fe !important;
}
.blue200t,
.blue200t .v-input__control .v-text-field__slot input,
.blue200t .v-input__control .v-text-field__slot .v-label,
.blue200t div .v-input__icon i,
.blue200t .v-input__control .v-text-field__slot,
.blue200t .v-input__control div div div div input,
.blue200t .v-select__selection.v-select__selection--comma,
.blue200t .v-input__control div div label {
  color: #3434ba !important;
}

.red100 {
  background: #ff6059;
  background-color: #ff6059;
}
.red100t,
.red100t .v-input__control .v-text-field__slot input,
.red100t .v-input__control .v-text-field__slot .v-label,
.red100t div .v-input__icon i,
.red100t .v-input__control .v-text-field__slot,
.red100t .v-input__control div div div div input,
.red100t .v-select__selection.v-select__selection--comma,
.red100t .v-input__control div div label {
  color: #ff6059 !important;
}
.red100 {
  background: #ff6059;
  background-color: #ff6059 !important;
}
.red100t,
.red100t .v-input__control .v-text-field__slot input,
.red100t .v-input__control .v-text-field__slot .v-label,
.red100t div .v-input__icon i,
.red100t .v-input__control .v-text-field__slot,
.red100t .v-input__control div div div div input,
.red100t .v-select__selection.v-select__selection--comma,
.red100t .v-input__control div div label {
  color: #ff6059 !important;
}

.yellow100 {
  background: #fec32f;
  background-color: #fec32f;
}
.yellow100t,
.yellow100t .v-input__control .v-text-field__slot input,
.yellow100t .v-input__control .v-text-field__slot .v-label,
.yellow100t div .v-input__icon i,
.yellow100t .v-input__control .v-text-field__slot,
.yellow100t .v-input__control div div div div input,
.yellow100t .v-select__selection.v-select__selection--comma,
.yellow100t .v-input__control div div label {
  color: #fec32f !important;
}
.yellow100 {
  background: #fec32f;
  background-color: #fec32f !important;
}
.yellow100t,
.yellow100t .v-input__control .v-text-field__slot input,
.yellow100t .v-input__control .v-text-field__slot .v-label,
.yellow100t div .v-input__icon i,
.yellow100t .v-input__control .v-text-field__slot,
.yellow100t .v-input__control div div div div input,
.yellow100t .v-select__selection.v-select__selection--comma,
.yellow100t .v-input__control div div label {
  color: #fec32f !important;
}

.green100 {
  background: #2ad043;
  background-color: #2ad043;
}
.green100t,
.green100t .v-input__control .v-text-field__slot input,
.green100t .v-input__control .v-text-field__slot .v-label,
.green100t div .v-input__icon i,
.green100t .v-input__control .v-text-field__slot,
.green100t .v-input__control div div div div input,
.green100t .v-select__selection.v-select__selection--comma,
.green100t .v-input__control div div label {
  color: #2ad043 !important;
}
.green100 {
  background: #2ad043;
  background-color: #2ad043 !important;
}
.green100t,
.green100t .v-input__control .v-text-field__slot input,
.green100t .v-input__control .v-text-field__slot .v-label,
.green100t div .v-input__icon i,
.green100t .v-input__control .v-text-field__slot,
.green100t .v-input__control div div div div input,
.green100t .v-select__selection.v-select__selection--comma,
.green100t .v-input__control div div label {
  color: #2ad043 !important;
}
</style>
