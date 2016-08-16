var React = require('react');
var Widget = require('./Widget');



var AddWidget = React.createClass({

  // add Widget (ADD)
  onDragStartWidget: function(widgetType,event){
    if(this.props.onDragStartWidget){
      this.props.onDragStartWidget(widgetType,event);
    }
  },

  // drag end widget (ADD)
  onDragEndWidget : function(event){
    if(this.props.onDragEndWidget){
      this.props.onDragEndWidget(event);
    }
  },

  renderModule : function(name,type){
      // + (this.state.widgetTypeAdded[type] ? " hidden" : " " )
    return (
      <Widget
        name={name}
        type={type}
        onDragStartWidget={this.onDragStartWidget}
        onDragEndWidget={this.onDragEndWidget}
        widgetTypeAdded={this.props.widgetTypeAdded} widgetType={this.props.widgetType}
      ></Widget>
    );
  },

  render() {
    return (
      <div className={ 'moduleCategories ' + (this.props.isOpen ? 'isOpenTool' : ' hidden')}>
        <div className="item-moduleCategorie">
          <h3>Group 1</h3>
            {this.renderModule("component1.1","component1.1")}
            {this.renderModule("component1.2","component1.2")}
        </div>
        <div className="item-moduleCategorie">
          <h3>Group 2</h3>
            {this.renderModule("component2.1","component2.1")}
            {this.renderModule("component2.2","component2.2")}
        </div>
        <div className="item-moduleCategorie">
          <h3>Group 3</h3>
            {this.renderModule("component3.1","component3.1")}
            {this.renderModule("component3.2","component3.2")}
            {this.renderModule("component3.3","component3.3")}
        </div>
      </div>
    );
  }
});





module.exports = AddWidget;
