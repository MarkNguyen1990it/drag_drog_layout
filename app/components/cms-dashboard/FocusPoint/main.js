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
var FocusPointTarget = {
    canDrop: function(props, monitor) {
        // console.log("canDrop");
        // You can disallow drop based on props or item
        var item = monitor.getItem();
        return {};
    },

    hover: function(props, monitor, component) {
        // console.log("hover");
        // This is fired very often and lets you perform side effects
        // in response to the hover. You can't handle enter and leave
        // here—if you need them, put monitor.isOver() into collect() so you
        // can just use componentWillReceiveProps() to handle enter/leave.

        // You can access the coordinates if you need them
        var clientOffset = monitor.getClientOffset();
        // var componentRect = findDOMNode(component).getBoundingClientRect();

        // You can check whether we're over a nested drop target
        var isJustOverThisOne = monitor.isOver({shallow: true});

        // You will receive hover() even for items for which canDrop() is false
        var canDrop = monitor.canDrop();
    },

    drop: function(props, monitor, component) {
        // console.log("drop");
        if (monitor.didDrop()) {
            // If you want, you can check whether some nested
            // target already handled drop
            return;
        }
        console.log(props);
        // Obtain the dragged item
        var item = monitor.getItem();
        if (item && item.type) {
            props.onDropEndWidget(item.type, props.indexRow, props.indexCol, props.action, props.indexRow + "." + props.indexCol + "." + props.action, null)
        }
        // You can do something with it
        // ChessActions.movePiece(item.fromPosition, props.position);

        // You can also do nothing and return a drop result,
        // which will be available as monitor.getDropResult()
        // in the drag source's endDrag() method
        return {moved: true};
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
        isOverCurrent: monitor.isOver({shallow: true}),
        canDrop: monitor.canDrop(),
        itemType: monitor.getItemType()
    };
}

var FocusPoint = React.createClass({
    componentWillReceiveProps: function(nextProps) {
        if (!this.props.isOver && nextProps.isOver) {}

        if (this.props.isOver && !nextProps.isOver) {
            // You can use this as leave handler
        }

        if (this.props.isOverCurrent && !nextProps.isOverCurrent) {
            // You can be more specific and track enter/leave
            // shallowly, not including nested targets
        }
    },

    render: function() {
        // Your component receives its own props as usual
        var position = this.props.position;

        // These props are injected by React DnD,
        // as defined by your `collect` function above:
        var isOver = this.props.isOver;
        var canDrop = this.props.canDrop;
        var connectDropTarget = this.props.connectDropTarget;

        var indexRow = this.props.indexRow;
        var indexCol = this.props.indexCol;
        var action = this.props.action;
        var left = "";
        if (this.props.left) {
            left = this.props.left;
        }
        var key = "";
        if (indexCol != null && indexCol != "undefined") {
            var key = indexRow + "." + indexCol + "." + action;
        } else {
            var key = indexRow + "." + action;
        }

        return connectDropTarget(
            <div key={key} style={{
                left
            }} className={this.props.className + " " + (isOver && canDrop
                ? ' choose '
                : ' no-choose ') + (this.props.focusHighlights.list.indexOf(key) >= 0
                ? ' highlight '
                : '')} key={key}></div>
        );
    }
});

module.exports = DropTarget("layout", FocusPointTarget, collect)(FocusPoint)
