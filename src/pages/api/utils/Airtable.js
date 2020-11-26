const Airtable = require('airtable');
const GHSlugger = require('github-slugger');

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

const slugger = new GHSlugger();

const table = base(process.env.AIRTABLE_TABLE_NAME);
const podcastTable = base(process.env.AIRTABLE_TABLE_TWO_NAME);

const minifyRecords = (records) => {
  return records.map((record) => getMinifiedRecord(record));
};

const getMinifiedRecord = (record) => {
  return {
    id: record.id,
    slug: slugger.slug(record.fields['name']),
    fields: record.fields,
  };
};

const minifyPodcasts = (records) => {
  return records.map((record) => getMinifiedPodcasts(record));
};

const getMinifiedPodcasts = (record) => {
  return {
    id: record.id,
    slug: slugger.slug(record.fields['name']),
    name: record.fields['name'],
    description: record.fields['description'],
    url: record.fields['url'],
    rss: record.fields['rss'],
    image: record.fields.image[0]?.thumbnails?.large?.url,
    category: record.fields['category'],
    tags: record.fields['tags'],
  };
};

export {
  table,
  podcastTable,
  getMinifiedRecord,
  minifyRecords,
  minifyPodcasts,
  getMinifiedPodcasts,
};
