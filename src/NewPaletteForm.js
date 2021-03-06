import React, { Component } from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import DraggableColorList from './DraggableColorList';
import { arrayMove } from 'react-sortable-hoc';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';

const drawerWidth = 400;

const styles = (theme) => ({
  root: {
    display: 'flex',
  },

  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    height: '100vh',
  },
  drawerPaper: {
    width: drawerWidth,
    display: 'flex',
    alignItems: 'center',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    height: 'calc(100vh - 64px)',
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  container: {
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90%',
  },
  buttons: { width: '100%' },
  button: { width: '50%' },
});

export class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20,
  };
  constructor(props) {
    super(props);
    this.state = {
      open: true,

      colors: this.props.palettes[0].colors,
      // colors: [{ color: 'blue', name: 'blue' }],
    };

    this.addNewColor = this.addNewColor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeColor = this.removeColor.bind(this);
    this.clearColors = this.clearColors.bind(this);
    this.addRandomColor = this.addRandomColor.bind(this);
  }

  //   const theme = useTheme();

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(newPaletteName) {
    // works with both palettes and colors
    let newName = newPaletteName;
    const newPalette = {
      paletteName: newName,
      id: newName.toLowerCase().replace(/ /g, '_'),
      colors: this.state.colors,
    };
    this.props.savePalette(newPalette);
    // redirect
    this.props.history.push('/');
  }

  removeColor(colorName) {
    this.setState({
      colors: this.state.colors.filter((color) => color.name !== colorName),
    });
  }

  // comes from 'react-sortable-hoc'
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ colors }) => ({
      colors: arrayMove(colors, oldIndex, newIndex),
    }));
  };

  clearColors() {
    this.setState({
      colors: [],
    });
  }

  addNewColor(newColor) {
    this.setState({
      colors: [...this.state.colors, newColor],
      newColorName: '',
    });
  }

  addRandomColor() {
    // pick random color from existing palettes
    const allColors = this.props.palettes
      .map(
        (p) =>
          //  'flat' means flat([x]) => x
          p.colors
      )
      .flat();
    // console.log(allColors);
    var rand = Math.floor(Math.random() * allColors.length);
    const randomColor = allColors[rand];
    console.log(randomColor);
    this.setState({ colors: [...this.state.colors, randomColor] });
    // console.log(this.state.colors);
  }

  render() {
    const { classes, maxColors, palettes } = this.props;
    const { open, colors } = this.state;
    const paletteIsFull = colors.length >= maxColors;
    return (
      <div className={classes.root}>
        <PaletteFormNav
          open={open}
          handleSubmit={this.handleSubmit}
          // classes={classes}
          palettes={palettes}
          handleDrawerOpen={this.handleDrawerOpen}
        />
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {<ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <div className={classes.container}>
            <Typography variant="h4" gutterBottom>
              Design your Palette
            </Typography>
            <div className={classes.buttons}>
              <Button
                className={classes.button}
                variant="contained"
                color="secondary"
                onClick={this.clearColors}
              >
                Clear Colors
              </Button>
              <Button
                className={classes.button}
                disabled={paletteIsFull}
                variant="contained"
                color="primary"
                onClick={this.addRandomColor}
              >
                Random Color
              </Button>
            </div>
            <ColorPickerForm
              paletteIsFull={paletteIsFull}
              addNewColor={this.addNewColor}
              colors={colors}
            />
          </div>
        </Drawer>

        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <DraggableColorList
            colors={colors}
            removeColor={this.removeColor}
            axis="xy"
            onSortEnd={this.onSortEnd}
          />
          {/* {this.state.colors.map((color) => (
            
            <DraggableColorBox
              key={color.name}
              color={color.color}
              name={color.name}
              handleClick={() => this.removeColor(color.name)}
            />
          ))} */}
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
