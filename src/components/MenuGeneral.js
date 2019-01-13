import React from 'react';

import addImg from '../images/add-gray-s.svg';
import avaliarImg from '../images/sad-gray-w.svg';
import salvarImg from '../images/rec-gray-s.svg';
import shareImg from '../images/share-gray-s.svg';

import './MenuGeneral.scss';

class MenuGeneral extends React.Component {
  render() {
    const synopsis = this.props.synopsis;
    return (
      <div className="menuGeneral">
      <div className="rTable">
        <div className="rTableRow">
          <div className="rTableCell iconTd">
            <img className="icons" src={addImg} alt="Meus links" /> <br />
            Meus Links
          </div>
          <div className="rTableCell iconTd">
            <img className="icons" src={avaliarImg} alt="Avaliar" /> <br />
            Avaliar
          </div>
          <div className="rTableCell iconTd">
            <img className="icons" src={salvarImg} alt="Salvar" /> <br />
            Salvar
          </div>
          <div className="rTableCell iconTd">
            <img className="icons" src={shareImg} alt="Compartilhar" /> <br />
            Compartilhar
          </div>
          <div className="rTableCell sinopse">
            SINOPSE
            <div className="sinopseTxt">{synopsis}</div>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

export default MenuGeneral;
