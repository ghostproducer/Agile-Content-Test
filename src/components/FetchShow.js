import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './FetchShow.scss';
import close from '../images/close-search-w.svg';

import TvShowTitle from './TvShowTitle';
import MenuSeasons from './MenuSeasons';
import MenuBottom from './MenuBottom';

class FetchShow extends React.Component {
  static propTypes = {
    tvShow: PropTypes.string.isRequired,
    episodespath: PropTypes.string.isRequired
  }

  state = {
    tvshow: {},
    loading: 0,
    error: null
  }

  componentDidMount() {

    axios.get(this.props.tvShow)
      .then(res => {
        let tvshow = this.state.tvshow;
        tvshow.summary = res.data;

        /*
            ATENÇÃO : PARA TESTES APENAS

            as linhas logo a seguir foram criadas para complementar informações
            que faltam na API fornecida para o teste
        */
        if(!tvshow.summary.Nominated) {
          tvshow.summary.Nominated = 75;
        }
        if(!tvshow.summary.Age) {
          tvshow.summary.Age = 14;
        }
        if(!tvshow.summary.Country) {
          tvshow.summary.Country = 'EUA';
        }
        if(tvshow.summary.Cast.length < 6) {
          tvshow.summary.Cast.push(
            {
                "ID": "PER-04",
                "Name": "Keanu Reeves",
                "Char": "Neo"
            },
            {
                "ID": "PER-05",
                "Name": "Carrie-Anne Moss",
                "Char": "Trinity"
            },
            {
                "ID": "PER-06",
                "Name": "Gloria Foster",
                "Char": "Oracle"
            },
            {
                "ID": "PER-07",
                "Name": "Hugo Weaving",
                "Char": "Agente Smith"
            }
            ,
            {
                "ID": "PER-08",
                "Name": "Joe Pantoliano",
                "Char": "Cypher"
            },
            {
                "ID": "PER-09",
                "Name": "Matt Doran",
                "Char": "Mouse"
            }
          )
        }
        /*
            FIM : PARA TESTES APENAS
        */

        this.setState({
          tvshow,
          loading: this.state.loading + 1,
          error: null
        });
      })
      .catch(err => {
        this.setState({
          loading: 0,
          error: err
        });
      });

    axios.get(this.props.episodespath)
      .then(res => {
        let dataEpisodes = [];
        let seasonsNums = [];
        for(let i = 0; i < res.data.length ;i++) {
          if(!res.data[i] || !res.data[i].SeasonNumber) {
            continue;
          }
          const season = res.data[i].SeasonNumber;
          if(!dataEpisodes[season]) {
            dataEpisodes[season] = [];
          }
          dataEpisodes[season].push(res.data[i]);
          if(seasonsNums.indexOf(season) === -1) {
            seasonsNums.push(season);
          }
          seasonsNums.sort();
        }
        let tvshow = this.state.tvshow;
        tvshow.episodes = dataEpisodes;
        tvshow.seasonsNums = seasonsNums;
        this.setState({
          tvshow,
          loading: this.state.loading + 1,
          error: null
        });
      })
      .catch(err => {
        this.setState({
          loading: 0,
          error: err
        });
      });
  }

  renderLoading() {
    return <div className="fecthShowLoading"> Loading...</div>;
  }

  renderError() {
    return ( <
      div >
      Something went wrong: {
        this.state.error.message
      }
      </div>
    );
  }

  renderPosts() {
    const { error, tvshow } = this.state;
    if (error) {
      return this.renderError();
    }
    return (
      <div className="fecthShow">
        <div className="background-image" style={{backgroundImage: `url(${tvshow.summary.Images.Background})`}}></div>
        <div className="background-shadow"></div>
        <div className="content">
          <img className="close" src={close} alt="Fechar" title="Fechar" />
          <TvShowTitle summary={tvshow.summary} />
          <MenuSeasons episodes={tvshow.episodes} seasonsnums={tvshow.seasonsNums} />
          <MenuBottom summary={tvshow.summary} />
        </div>
      </div>
    )
  }

  render() {
    const { loading } = this.state;
    return (
      <div> {loading < 2 ? this.renderLoading() : this.renderPosts()}</div>
    );
  }
}

export default FetchShow;
