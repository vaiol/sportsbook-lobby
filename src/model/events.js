import data from "@/assets/sport-events.json";

/**
 * This file should be rewritten when backend will available.
 * HTTP request should be here!
 */
export default {
  list({ sports, tags, minOdds, page = 1, pageSize = 10 } = {}) {
    // return full list of events with query and pagination
    // query:
    let events = data.events;
    if (sports && Array.isArray(sports) && sports.length) {
      events = events.filter(event => sports.includes(event.event.sport));
    }
    if (tags && Array.isArray(tags) && tags.length) {
      events = events.filter(event =>
        tags.some(r => event.event.tags.includes(r))
      );
    }
    if (minOdds) {
      events = events.filter(event =>
        event.betOffers.some(bet =>
          bet.outcomes.some(odds => 1 + odds.oddsAmerican / 100 >= minOdds)
        )
      );
    }
    // pagination:
    const skip = (page - 1) * pageSize;
    events = events.slice(skip, skip + pageSize);
    return {
      events,
      pagination: {
        length: Math.ceil(events.length / pageSize)
      }
    };
  },
  sports() {
    // return unique list of all sports
    return Array.from(new Set(data.events.map(event => event.event.sport)));
  },
  tags() {
    // return unique list of all tags
    const tags = [];
    const tags2D = data.events.map(event => event.event.tags);
    for (const row of tags2D) {
      for (const e of row) {
        tags.push(e);
      }
    }
    return Array.from(new Set(tags));
  }
};
