import React from 'react';

import provider from '../images/logo-telecine.svg';
import MenuGeneral from './MenuGeneral';
import MenuCast from './MenuCast';

import './MenuBottom.scss';

class MenuBottom extends React.Component {
  state = {
    menuItemAtual: 0
  }

  menuItems =  [{
      title: 'GERAL',
      className: 'selectGeral',
      classNameSel: 'selectedGeral'
    },
    {
      title: 'ELENCO',
      className: 'selectElenco',
      classNameSel: 'selectedElenco'
    },
    {
      title: 'PRINCIPAIS PRÊMIOS',
      className: 'selectPremios',
      classNameSel: 'selectedPremios'
    }];

  menuClicked(index) {
    if(index === 2) {
      // TMP: desativa click em "Principais Premios"
      return;
    }
    for(let i = 0; i < this.menuItems.length; i++) {
      this.refs['BM' + i].className =
        'rTableCell select ' +  this.menuItems[i].className + ' ' +
          (i === index ? this.menuItems[i].classNameSel : 'unselected');
    }
    this.setState({
      menuItemAtual: index
    });
  }

  render() {
    return (
      <div className="menuBottom">
        <div className="rTable">
          <div className="rTableRow">
            {
              this.menuItems.map((menuItem, index) =>
                <div className={'rTableCell select ' + menuItem.className + ' ' +
                  (index === 0 ? menuItem.classNameSel : "unselected")} ref={'BM' + index} key={'BM' + index}>
                  <div className="txt" onClick={() =>
                    this.menuClicked(index)}>{menuItem.title}</div>
                </div>
              )
            }
            <div className="rTableCell unselected" style={{width: '95%'}}>
              <div className="providerDiv">
                <img src={provider} alt="TeleCine" />
              </div>
            </div>
          </div>
        </div>
        <div className="nav">
          {
            (this.state.menuItemAtual === 0) ?
              <MenuGeneral synopsis={this.props.summary.Synopsis}/>
            :
            (this.state.menuItemAtual === 1) ?
              <MenuCast {...this.props}/>
            :
            (this.state.menuItemAtual === 2) ?
              <span>  </span>
            :
             ''
          }
        </div>
      </div>
    );
  }
}

export default MenuBottom;
