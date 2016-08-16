var React = require('react');
var ReactDnd = require('react-dnd');
var flow = require('lodash/flow');
var DragDropContext = require('react-dnd').DragDropContext;
var HTML5Backend = require('react-dnd-html5-backend');
var DragSource = ReactDnd.DragSource;
var DropTarget = ReactDnd.DropTarget;

var divSource = {
  beginDrag: function (props) {

    props.onDragStartWidget(props.type,null);
    return {
      type : props.type
    };
    // console.log('Drag Item Index: ' + props.index);
    // props.onDragStartWidget(this,this.props.type);
  },
  endDrag(props, monitor) {
        props.onDragEndWidget(null);
  }
};

function collectDrag(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

var Widget  = React.createClass({


  render() {
    var connectDragSource = this.props.connectDragSource;
    var isDragging = this.props.isDragging;

    return connectDragSource(
      <div
        className={this.props.widgetType===this.props.type ? "component choose" : "component no-choose"
        + (this.props.widgetTypeAdded[this.props.type] ? " hidden" : " " )}
      >{this.props.name}</div>
    );
  }
});

module.exports = DragSource("layout", divSource, collectDrag)(Widget);
