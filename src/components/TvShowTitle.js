import React from 'react';

import './TvShowTitle.scss'

class TvShowTitle extends React.Component {
  render() {
    const summary = this.props.summary;
    return (
      <div className="tvShowTitle">
        <div className="title">{summary.Title}</div>
        <div className="subtitle">
          <span>
            {summary.Nominated ? (summary.Nominated + '% INDICADO / ') : '' }
          </span>
          <span>
            {summary.Genres.map(genre => <span key={genre.Title}>{genre.Title} / </span>)}
          </span>
          <span>{summary.Year}</span>
          <span>
            {summary.Country ? (' / ' + summary.Country) : '' }
          </span>
          <span>
            {summary.Age ? (' / ' + summary.Age) : '' }
          </span>
        </div>
      </div>
    );
  }
}

export default TvShowTitle;
