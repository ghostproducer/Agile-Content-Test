import React from 'react';
import ReactDOM from 'react-dom';

import FetchShow from './components/FetchShow';

import './index.css';

const tvShow = 'https://sample-api-78c77.firebaseio.com/tv-shows/SHOW123.json';
const EpisodesPath = 'https://sample-api-78c77.firebaseio.com/episodes/SHOW123.json';

ReactDOM.render(
  <FetchShow tvShow={tvShow} episodespath={EpisodesPath} />,
  document.getElementById('root')
);
