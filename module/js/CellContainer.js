import React from "react";
import PropTypes from "prop-types";
import { Cell } from "./Cell";
import { requireNativeComponent } from "react-native";
const NativeCellContainer = requireNativeComponent(
  "STTVCellContainerView",
  CellContainer
);

const ReloadCellAnimationType = {
  fade: 0,
  right: 1,
  left: 2,
  top: 3,
  bottom: 4,
  none: 5,
  middle: 6,
  automatic: 100
};

interface IndexPathType {
  section: number,
  row: number
}

class CellContainer extends React.Component {
  static propTypes = {
    heightForCell: PropTypes.func,
    renderCell: PropTypes.func,
    numberOfMostRows:PropTypes.number
  };
  constructor(props) {
    super(props);
    this.state = { rows: [] };
  }
  render() {
    return (
      <NativeCellContainer onCreateCell={this.onCreateCell.bind(this)}>
        {this.state.rows.map((item, index) => {
          return (
            <Cell
              key={index}
              row={item.section * 3 + item.row}
              numberOfMostRows={this.props.numberOfMostRows}
              style={{
                height: this.props.heightForCell(item.section, item.row)
              }}
              heightForCell={this.props.heightForCell}
              renderChildren={item =>
                this.props.renderCell(item.section, item.row)}
            />
          );
        })}
      </NativeCellContainer>
    );
  }

  onCreateCell(e) {
    let row = e.nativeEvent;
    let rows = this.state.rows;
    rows.push(row);
    this.setState({ rows: rows });
  }
}

export { CellContainer };
