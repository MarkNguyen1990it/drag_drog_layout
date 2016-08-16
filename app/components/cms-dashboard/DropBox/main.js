var React = require('react');
var DropTarget = require('react-dnd').DropTarget;

// Drag sources and drop targets only interact
// if they have the same string type.
// You want to keep types in a separate file with
// the rest of your app's constants.
// var Types = {
//   CHESSPIECE: 'div'
// };

/**
 * Specifies the drop target contract.
 * All methods are optional.
 */
var dropBoxTarget = {
  canDrop: function (props, monitor) {
    // console.log("canDrop");
    // You can disallow drop based on props or item
    var item = monitor.getItem();
    return {};
  },

  hover: function (props, monitor, component) {
    // console.log("hover");
    // This is fired very often and lets you perform side effects
    // in response to the hover. You can't handle enter and leave
    // here—if you need them, put monitor.isOver() into collect() so you
    // can just use componentWillReceiveProps() to handle enter/leave.

    // You can access the coordinates if you need them
    var clientOffset = monitor.getClientOffset();
    // var componentRect = findDOMNode(component).getBoundingClientRect();

    // You can check whether we're over a nested drop target
    var isJustOverThisOne = monitor.isOver({ shallow: true });

    // You will receive hover() even for items for which canDrop() is false
    var canDrop = monitor.canDrop();
  },

  drop: function (props, monitor, component) {
    // console.log("drop");
    if (monitor.didDrop()) {
      // If you want, you can check whether some nested
      // target already handled drop
      return;
    }

    // Obtain the dragged item
    var item = monitor.getItem();
    if(item && item.type){
      props.onDropEndWidget(item.type,"snapshots",null,null,"","",null,null)
    }
    return { moved: true };
  }
};

/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  };
}

var DropBox = React.createClass({
  componentWillReceiveProps: function (nextProps) {
    if (!this.props.isOver && nextProps.isOver) {

    }

    if (this.props.isOver && !nextProps.isOver) {
      // You can use this as leave handler
    }

    if (this.props.isOverCurrent && !nextProps.isOverCurrent) {
      // You can be more specific and track enter/leave
      // shallowly, not including nested targets
    }
  },

  render: function () {
    // Your component receives its own props as usual
    var position = this.props.position;

    // These props are injected by React DnD,
    // as defined by your `collect` function above:
    var isOver = this.props.isOver;
    var canDrop = this.props.canDrop;
    var connectDropTarget = this.props.connectDropTarget;


    return connectDropTarget(
      <div className={'main-content '+ (this.props.isOpen ? 'isOpenTool' : '')}>
          <div className={"box__input-addWidget" + (isOver && canDrop ? ' choose ' : ' no-choose ')} >
              <span> + Add  Widget</span>
          </div>
      </div>
    );
  }
});

module.exports = DropTarget("layout", dropBoxTarget, collect)(DropBox)
