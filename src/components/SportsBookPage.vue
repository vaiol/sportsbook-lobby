<template>
  <v-container>
    <v-layout v-bind="binding" justify-end>
      <v-flex>
        <v-select
          v-model="query.sports"
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
          v-model="query.tags"
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
        <v-slider v-model="query.minOdds" max="30" thumb-label></v-slider>
      </v-flex>
    </v-layout>
    <div v-for="event in events" :key="event.event.name">
      <Event v-bind="event"></Event>
    </div>
    <div class="text-xs-center">
      <v-pagination
        v-model="page"
        :length="pagination.length"
        circle
      ></v-pagination>
    </div>
  </v-container>
</template>

<script>
import Event from "@/components/Event";
import EventsModel from "@/model/events";

export default {
  components: {
    Event
  },
  data() {
    return {
      events: [],
      sports: [],
      tags: [],
      query: {
        tags: [],
        sports: [],
        minOdds: 0
      },
      page: 1,
      pagination: {
        length: 1
      }
    };
  },
  methods: {
    async getEvents() {
      const res = EventsModel.list({ ...this.query, page: this.page });
      this.events = res.events;
      this.pagination = res.pagination;
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
    query: {
      handler() {
        this.page = 1;
        this.getEvents();
      },
      deep: true
    },
    page: {
      handler() {
        this.getEvents();
      }
    }
  },
  async mounted() {
    await this.getEvents();
    await this.getSports();
    await this.getTags();
  }
};
</script>
