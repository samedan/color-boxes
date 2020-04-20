import React, { Component } from 'react';
import ColorBox from './ColorBox';
import { withStyles } from '@material-ui/styles';
// import './Palette.css';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import styles from './styles/PalettsStyles';

class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = { level: 500, format: 'hex' };
    this.changeLevel = this.changeLevel.bind(this);
    this.changeColorFormat = this.changeColorFormat.bind(this);
  }

  changeLevel(newLevel) {
    this.setState({ level: newLevel });
    console.log(newLevel);
  }
  changeColorFormat(val) {
    this.setState({ format: val });
  }

  render() {
    const { colors, paletteName, emoji } = this.props.palette;
    const { classes } = this.props;
    //   const {} = this.state
    const colorBoxes = colors[this.state.level].map((color) => (
      <ColorBox
        key={color.id}
        background={color[this.state.format]}
        name={color.name}
        id={color.id}
        paletteId={this.props.palette.id}
        moreUrl={`/palette/${this.props.palette.id}/${color.id}`}
        showingFullPalette={true}
      />
    ));
    return (
      <div className={classes.Palette}>
        <Navbar
          handleColorFormat={this.changeColorFormat}
          level={this.state.level}
          changeLevel={this.changeLevel}
          showingAllColors
        />

        <div className={classes.colors}>{colorBoxes}</div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default withStyles(styles)(Palette);
