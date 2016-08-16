var React = require('react');
var ReactDnd = require('react-dnd');
var flow = require('lodash/flow');
var DragDropContext = require('react-dnd').DragDropContext;
var HTML5Backend = require('react-dnd-html5-backend');
var flow = require('lodash/flow');
var DragSource = ReactDnd.DragSource;
var DropTarget = ReactDnd.DropTarget;

var contentWidgetSource = {
  beginDrag: function (props) {
    props.onDragChangeBeginWidget(props.indexRow,props.indexCol,props.widget.widgetType,props.widget.col,null);
    return {
      data: props.widget,
      indexRow:props.indexRow,
      indexCol:props.indexCol
    };
    // console.log('Drag Item Index: ' + props.index);
    // props.onDragStartWidget(this,this.props.type);
  },
  endDrag(props, monitor) {
      props.onDragEndWidget(null);
  }
};

var contentWidgetTarget = {
    canDrop: function(props, monitor) {
        // console.log("canDrop");
        // You can disallow drop based on props or item
        var item = monitor.getItem();
        return {};
    },

    hover: function(props, monitor, component) {
        props.onDragOverHighlights(props.indexRow,props.indexCol,null);

        // You can access the coordinates if you need them
        var clientOffset = monitor.getClientOffset();
        // var componentRect = findDOMNode(component).getBoundingClientRect();

        // You can check whether we're over a nested drop target
        var isJustOverThisOne = monitor.isOver({shallow: true});

        // You will receive hover() even for items for which canDrop() is false
        var canDrop = monitor.canDrop();

    },

    drop: function(props, monitor, component) {

    }
};

function collectDrag(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}


function collectDrop(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  }
}


var Widget  = React.createClass({

  onDragLeaveHighlights:function(indexRow,indexCol,event){
    this.props.onDragLeaveHighlights(indexRow,indexCol,event);
  },

  onDragChangeBeginWidget:function(indexRow,indexCol,widgetType,col,event){
    this.props.onDragChangeBeginWidget(indexRow,indexCol,widgetType,col,event);
  },


  onRemoveWidget:function(indexRow,indexCol,event){
    this.props.onRemoveWidget(indexRow,indexCol,event);
  },

  setContextMenu:function(indexRow,indexCol,event){
      this.props.setContextMenu(indexRow,indexCol,event);
  },

  showPopup:function(indexRow,indexCol,event){
      this.props.showPopup(indexRow,indexCol,event);
  },


  render() {
    var connectDragSource = this.props.connectDragSource;
    var connectDropTarget = this.props.connectDropTarget;
    var isDragging = this.props.isDragging;
    var widget=this.props.widget;
    var indexRow=this.props.indexRow;
    var indexCol=this.props.indexCol;

    return connectDragSource(connectDropTarget(
      <div className={"col-md-"+widget.col + "  "+"_"+indexRow+"_"+indexCol+"_div_  "+
          (this.props.dragItem && this.props.dragItem.indexRow === indexRow && this.props.dragItem.indexCol === indexCol ? " ondrag " : " ")}
          key={indexRow+"."+indexCol} draggable={this.props.designSwitch}
          onDragLeave={this.onDragLeaveHighlights.bind(this,indexRow,indexCol)}>
          <div className={"widget "}>
            <a href="#" className="ic-remove" onClick={this.onRemoveWidget.bind(this,indexRow,indexCol)}><span>Remove widget</span></a>
            <div className="widget-heading clearfix">
                <div className={"widget-control "+(this.props.designSwitch ? " hidden" : " " )}>
                      <div className="icon-settings">
                        <span><i className="fa fa-cog" onClick={this.setContextMenu.bind(this,indexRow,indexCol)} ></i></span>
                        <ul className={ "cbp-tm-submenu"
                          + ((!this.props.designSwitch && this.props.contextMenu.check && this.props.contextMenu.indexRow === indexRow && this.props.contextMenu.indexCol === indexCol) ? " visible " : " ") } >
                          <li><a href="#" className="ic-edit" onClick={this.showPopup.bind(this, indexRow, indexCol)}> Edit Style <i className="fa fa-pencil"></i></a></li>
                          <li><a href="#" className="ic-delete" onClick={this.onRemoveWidget.bind(this,indexRow,indexCol)}>Delete widget <i className="fa fa-trash"></i></a></li>
                        </ul>
                      </div>
                </div>
                <h2 className="widget-title">
                  {widget.widgetType}
                </h2>
            </div>
            <div className="widget-content">
            </div>
          </div>
        </div>
    ));
  }
});

module.exports = flow(
    DragSource("layout", contentWidgetSource, collectDrag),
    DropTarget("layout", contentWidgetTarget, collectDrop)
)(Widget);
