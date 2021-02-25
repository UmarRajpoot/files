import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles"; // style Instance
// Components for material design
///  use https://material-ui.com/
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/ArrowDownwardOutlined";
import Button from "@material-ui/core/Button";
// Getting txt file from src/context/
import file from "../content/text2.txt";
// MindElixir library use
import MindElixir, { E } from "mind-elixir";
// use for SVG Download
import painter from "mind-elixir/dist/painter";

// Styles for material Design
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  text: {
    color: "white",
  },
}));

const Home = () => {
  const classes = useStyles(); // styles object

  // console.log(MindElixir.nodeData);

  // options use for initial node
  let options = {
    el: "#map",
    direction: MindElixir.RIGHT,
    data: MindElixir.new("Node"),
    draggable: true, // default true
    contextMenu: true, // default true
    toolBar: true, // default true
    nodeMenu: true, // default true
    keypress: true, // default true
    before: {
      addChild() {
        return true; // true and false
      },
    },
  };

  // use for when web start like (component on mount)
  useEffect(() => {
    value();
    let mind = new MindElixir(options);
    mind.init();
  }, []);

  // Fetching txt file content
  const value = async () => {
    await fetch(file)
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        const value = data.split("\n"); // take file content line by line
        value.forEach(async (element) => {
          // iterate each of content
          let trimvalue = element.trim(); // remove void spaces start and end
          let splittrim = trimvalue.split("-"); // split each text with (-) sign
          // Decision making with the (+) sign in each text
          if (
            splittrim[0] !== "+" &&
            splittrim[0] !== "++" &&
            splittrim[0] !== "+++" &&
            splittrim[0] !== "++++"
          ) {
            // Root content here
            let value = splittrim[0];
          } else {
            if (splittrim[0] === "+" && splittrim[0].length === 1) {
              // for root child
              // console.log("root of child", splittrim[1]);
            } else if (splittrim[0] === "++" && splittrim[0].length === 2) {
              // root => child => child
              // console.log("child of child", splittrim[1]);
            } else if (splittrim[0] === "+++" && splittrim[0].length === 3) {
              // root => child => child => child
              // console.log("child of child of child", splittrim[1]);
            } else if (splittrim[0] === "++++" && splittrim[0].length === 4) {
              // root => child => child => child => child
              // console.log("child of child of child", splittrim[1]);
            }
            // console.log(splittrim[0]);
          }
        });
      });
  };
  // make library object and use initial options and saving it into SVG File
  let mind = new MindElixir(options);
  const downloadtoSVG = () => {
    painter.exportSvg();
  };

  return (
    <div>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit" style={{ flex: 1 }}>
              MindElixir
            </Typography>
            <Button
              startIcon={<MenuIcon />}
              variant="text"
              color="inherit"
              onClick={() => downloadtoSVG()}
            >
              SVG Download
            </Button>
          </Toolbar>
        </AppBar>
      </div>
      <div id="map" style={{ height: "90vh", width: "100%" }} />
    </div>
  );
};

export default Home;
