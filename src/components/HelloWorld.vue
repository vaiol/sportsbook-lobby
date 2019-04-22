<template>
  <v-container>
    <div>
      <v-select
        v-model="sportSelected"
        :items="sportItems"
        item-text="text"
        item-value="value"
        chips
        label="Sports"
        multiple
        solo
      ></v-select>
    </div>
    <div v-for="event in events" :key="event.event.name">
      <Bet v-bind="event"></Bet>
    </div>
  </v-container>
</template>

<script>
import Bet from "@/components/Bet";
import EventsModel from "@/model/events";

export default {
  components: {
    Bet
  },
  data() {
    return {
      events: [],
      sports: [],
      sportSelected: []
    };
  },
  methods: {
    async getEvents(query) {
      this.events = EventsModel.list(query);
    },
    getSports() {
      this.sports = EventsModel.sports();
    }
  },
  computed: {
    sportItems() {
      return this.sports.map(sport => ({
        text: sport.replace("_", " "),
        value: sport
      }));
    }
  },
  watch: {
    sportSelected(value) {
      this.getEvents({ sports: value });
    }
  },
  mounted() {
    this.getEvents();
    this.getSports();
  }
};
</script>
