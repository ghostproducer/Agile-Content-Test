import React from 'react';

import './MenuCast.scss';
import arrowminus from '../images/arrowminus.png';
import arrowplus from '../images/arrowplus.png';

class MenuCast extends React.Component {
  posXini = 60;
  boxWidth = 120;
  boxSep = 12;
  boxPadding = 8;
  firstItem = 0;
  intervalId = null;
  posAtual = this.posXini;
  posIni = this.posXini;
  posFim = this.posAtual;
  delta = -5;

  plusMinusClicked(n) {
    const firstItem =  this.firstItem + n;
    if(firstItem < 0 || firstItem + 5 >= this.fullCast.length) {
      return;
    }
    this.firstItem = firstItem;
    this.delta = Math.abs(this.delta) * (-n);
    this.posIni = this.posAtual;
    this.posFim = this.posXini - this.firstItem * (this.boxWidth + this.boxSep + this.boxPadding);
    this.componentDidMount();
  }

  timer() {
    const dist1 = Math.abs(this.posAtual - this.posIni);
    const dist2 = Math.abs(this.posAtual - this.posFim);
    this.posAtual = this.posAtual + this.delta / (dist1 < 20 || dist2 < 20 ? 2 : 1);
    if(
      (this.delta < 0 && this.posAtual >= this.posFim) ||
      (this.delta > 0 && this.posAtual <= this.posFim)) {
        this.refs.castBoxesRef.style.left = this.posAtual + 'px';
    } else {
      clearInterval(this.intervalId);
      this.refs.castLeftArrowRef.style.visibility = this.firstItem === 0 ? 'hidden' : 'visible';
      this.refs.castRightArrowRef.style.visibility = this.firstItem + 6 >= this.fullCast.length ? 'hidden' : 'visible';
      this.refs.castLeftArrowRef.style.cursor = this.firstItem === 0 ? 'default' : 'pointer';
      this.refs.castRightArrowRef.style.cursor = this.firstItem + 6 >= this.fullCast.length ? 'default' : 'pointer';
    }
  }

  componentDidMount() {
    this.intervalId = setInterval(this.timer.bind(this), 10);
  }

  render() {
    this.fullCast = this.props.summary.Cast;
    return (
      <div className="menuCast">
        <div className="leftArrow" onClick={() => this.plusMinusClicked(-1)}>
          <img src={arrowminus} ref="castLeftArrowRef" style={{visibility: 'hidden'}} alt="anterior" />
        </div>
        <div className="boxes" ref="castBoxesRef" style={{left: this.posXini + 'px',}}>
        {
          this.fullCast.map((actor, index) =>
            <div className="box" key={'MC' + index}
              style={
                {
                  width: this.boxWidth + 'px',
                  margin: '0 ' + (this.boxSep/2) + 'px',
                  padding: '0 ' + (this.boxPadding/2) + 'px'
                }
              }
            >
              <div>
                <div className="actor">{actor.Name}</div>
                <div className="character">{actor.Char}</div>
              </div>
            </div>
          )
        }
        </div>
        <div className="rightArrow" onClick={() => this.plusMinusClicked(1)}>
          <img src={arrowplus} ref="castRightArrowRef" alt="próximo" />
        </div>
        <div className="bottomMask"> </div>
      </div>
    )
  }
}

export default MenuCast;
