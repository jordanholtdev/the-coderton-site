const PodcastPage = ({ podcast }) => (
  <pre>
    <h1>{podcast.fields.name}</h1>
  </pre>
);

export async function getStaticPaths() {
  const { podcastTable, minifyRecords } = require('./../api/utils/Airtable');
  try {
    // Fetch data from external API
    const { map } = require('lodash');
    const podcasts = await podcastTable.select({}).firstPage();
    const initialPodcasts = minifyRecords(podcasts);
    const slugs = map(initialPodcasts, 'slug');
    const paths = slugs.map((slug) => ({ params: { slug } }));
    console.log(paths);
    return { paths, fallback: false };
  } catch (error) {
    console.error(error);
    return {
      props: {
        error: 'Something went wrong',
      },
    };
  }
}

export async function getStaticProps({ params }) {
  const { podcastTable, minifyRecords } = require('./../api/utils/Airtable');

  const { slug } = params;
  try {
    // Fetch data from external API
    const { find } = require('lodash');
    const initialPodcasts = await podcastTable.select({}).firstPage();
    const podcasts = minifyRecords(initialPodcasts);
    const podcast = find(podcasts, { slug });

    console.log(podcasts);
    return { props: { podcast } };
  } catch (error) {
    console.error(error);
    return {
      props: {
        error: 'Something went wrong',
      },
    };
  }
}

export default PodcastPage;
