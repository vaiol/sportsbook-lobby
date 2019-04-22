<template>
  <v-container>
    <v-layout v-bind="binding" justify-end>
      <v-flex>
        <v-select
          v-model="filter.sports"
          :items="sportItems"
          item-text="text"
          item-value="value"
          chips
          label="Sports"
          multiple
          solo
        ></v-select>
      </v-flex>
      <v-flex>
        <v-select
          v-model="filter.tags"
          :items="tagItems"
          item-text="text"
          item-value="value"
          chips
          label="Tags"
          multiple
          solo
        ></v-select>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <v-subheader class="pl-0">Minimum odds</v-subheader>
        <v-slider
          v-model="filter.minOdds"
          max="30"
          thumb-label
        ></v-slider>
      </v-flex>
    </v-layout>
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
      tags: [],
      filter: {
        tags: [],
        sports: [],
        minOdds: 0
      }
    };
  },
  methods: {
    async getEvents(query) {
      this.events = EventsModel.list(query);
    },
    async getSports() {
      this.sports = EventsModel.sports();
    },
    async getTags() {
      this.tags = EventsModel.tags();
    }
  },
  computed: {
    sportItems() {
      return this.sports.map(sport => ({
        text: sport.replace("_", " "),
        value: sport
      }));
    },
    tagItems() {
      return this.tags.map(tag => ({
        text: tag.replace("_", " "),
        value: tag
      }));
    },
    binding() {
      return this.$vuetify.breakpoint.xsOnly ? { column: true } : {};
    }
  },
  watch: {
    filter: {
      handler(value) {
        this.getEvents(value);
      },
      deep: true
    }
  },
  async mounted() {
    await this.getEvents();
    await this.getSports();
    await this.getTags();
  }
};
</script>
