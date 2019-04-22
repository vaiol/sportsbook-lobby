<template>
  <v-layout class="white black--text elevation-3 pa-3 my-2 root" v-if="event && betOffers" v-bind="binding">
    <v-flex xs6 md7>
      <v-layout row justify-start>
        <v-flex xs2>
          <v-layout align-center justify-center column>
            <span class="font-weight-thin mb-2">{{ event.start | dateFormat }}</span>
            <span>{{ event.start | timeFormat }}</span>
          </v-layout>
        </v-flex>
        <v-divider class="black mr-2" vertical></v-divider>
        <v-flex xs10>
          <v-layout column align-start>
            <div class="font-weight-light mb-2">
              <div
                v-for="(item, index) in categories"
                :key="item.text"
                class="d-inline categories"
              >
                <span>{{ item.text }}</span>
                <span v-if="index !== categoriesLast"> / </span>
              </div>
            </div>
            <span>{{ event.sport | sportName }}</span>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-divider class="black my-3"></v-divider>
    <v-flex xs6 md5>
      <v-layout column>
        <v-layout justify-space-between class="font-weight-medium">
          <span class="ml-2">{{ event.homeName }}</span>
          <span> - </span>
          <span class="mr-2">{{ event.awayName }}</span>
        </v-layout>
        <v-layout justify-space-between v-for="item in betOffers" :key="item.id">
          <v-btn
            round
            small
            color="primary"
            dark
            v-for="bet in item.outcomes"
            :key="bet.id"
            class="mx-0 pa-0"
          >
            {{ bet.oddsFractional | oddsFormat }}
          </v-btn>
        </v-layout>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import moment from "moment";

export default {
  name: "Bet",
  props: {
    event: Object,
    betOffers: Array
  },
  data() {
    return {};
  },
  filters: {
    dateFormat: value => moment(value).format("DD.MM"),
    timeFormat: value => moment(value).format("HH:mm"),
    sportName: value => value.replace("_", " "),
    oddsFormat: value => {
      try {
        return (1 + eval(value)).toFixed(2);
      } catch (e) {
        return value;
      }
    }
  },
  computed: {
    categories() {
      return this.event.path.map(item => ({ text: item.name, href: "" }));
    },
    categoriesLast() {
      return this.categories.length - 1;
    },
    binding() {
      return this.$vuetify.breakpoint.xsOnly ? { column: true } : {};
    }
  }
};
</script>

<style scoped>
.categories {
  font-size: 10px;
}
.root {
  border-radius: 10px;
}
</style>
