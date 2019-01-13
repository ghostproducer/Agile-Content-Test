import React from 'react';

import playlogo from '../images/play-small-player-w.svg';

import './MenuSeasons.scss';

class MenuSeasons extends React.Component {
  seasonsNums = [];
  dataEpisodes = [];
  state = {
    actualSeason: 1,
  }

  seasonClicked (season) {
    for(let i = 0; i < this.seasonsNums.length; i++) {
      this.refs['T' + this.seasonsNums[i]].className =
        'rTableCell select ' +
        (season === this.seasonsNums[i] ? 'selected' : 'unselected');
    }
    this.setState({
      actualSeason: season
    });
  }

  synopsysClicked (episode) {
    for(let i = 0; i < this.dataEpisodes.length; i++) {
      const este = this.dataEpisodes[i];
      let className = 'hide';
      if(episode === este.EpisodeNumber &&
         this.refs['E' + este.EpisodeNumber].className === 'hide') {
           className = 'show';
      }
      this.refs['E' + este.EpisodeNumber].className = className;
    }
  }

  render() {
    this.dataEpisodes = this.props.episodes[this.state.actualSeason];
    this.seasonsNums = this.props.seasonsnums;

    return (
      <div className="menuSeasons">
        <div className="main">
          <div className="rTable">
            <div className="rTableRow">
              {
                this.seasonsNums.map((season, index) =>
                  <div className={"rTableCell select " +
                    (index === 0 ? "selected" : "unselected")} key={'T' + season} ref={'T' + season}>
                    <div className="txt" onClick={() =>
                        this.seasonClicked(season)}>T{season}</div>
                  </div>
                )
              }
              <div className="rTableCell unselected" style={{width: '99%'}}></div>
            </div>
          </div>
          <div className="episodeTitles">
            {
              this.dataEpisodes.map((episode, index) => {
                return (
                  <div className="episodesList" key={'k' + this.state.actualSeason + '_' + episode.EpisodeNumber}>
                    <div style={{width: '100%', overflow: 'hidden'}}>
                      <div style={{float: 'left', paddingTop: '4px'}}>
                        {episode.EpisodeNumber}&nbsp;
                        <span className="episodeTitle" onClick={() => this.synopsysClicked(episode.EpisodeNumber)} title="Ver sinopse">{episode.Title}</span>
                      </div>
                      <div style={{textAlign: 'right'}}>
                        <img src={playlogo} className="playlogo" alt="play" title="Assistir" />
                      </div>
                    </div>
                    <div className="hide" ref={'E' + episode.EpisodeNumber}>
                      <img src={episode.Image} className="episodeImage" alt={episode.Title} />
                      <div className="synopsis">
                       {episode.Synopsis}
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default MenuSeasons;
