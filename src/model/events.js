import data from "@/assets/sport-events.json";

let cacheList = data.events;

export default {
  list({ sports, tags, minOdds } = {}) {
    // return full list of events
    let array = data.events;
    if (sports && Array.isArray(sports) && sports.length) {
      array = array.filter(event => sports.includes(event.event.sport));
    }
    if (tags && Array.isArray(tags) && tags.length) {
      array = array.filter(event =>
        tags.some(r => event.event.tags.includes(r))
      );
    }
    if (minOdds) {
      array = array.filter(event =>
        event.betOffers.some(bet =>
          bet.outcomes.some(odds => 1 + odds.oddsAmerican / 100 >= minOdds)
        )
      );
    }
    cacheList = array;
    return array;
  },
  sports() {
    // return unique list of all sports
    return Array.from(new Set(cacheList.map(event => event.event.sport)));
  },
  tags() {
    // return unique list of all tags
    const tags = [];
    const tags2D = cacheList.map(event => event.event.tags);
    for (const row of tags2D) for (const e of row) tags.push(e);
    return Array.from(new Set(tags));
  }
};
