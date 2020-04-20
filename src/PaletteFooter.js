import React from 'react';
import { withStyles } from '@material-ui/styles';
import styles from './styles/PaletteFooterStyles';

function PaletteFooter(props) {
  const { paletteName, emoji, classes } = props;
  console.log(emoji);

  return (
    <footer className={classes.PaletteFooter}>
      {paletteName}
      <span className={classes.emoji}>
        <p>
          {/* {emoji} */}
          <img style={{ width: '20px' }} src={emoji} />
        </p>
      </span>
    </footer>
  );
}

export default withStyles(styles)(PaletteFooter);
