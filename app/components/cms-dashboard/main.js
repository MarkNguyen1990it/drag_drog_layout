var React = require('react');
var _= require('lodash');
var AddWidget = require('./Addwidget/main');
var DragDropContext = require('react-dnd').DragDropContext;
var HTML5Backend = require('react-dnd-html5-backend');
var DropBox = require('./DropBox/main');
var FocusPoint= require('./FocusPoint/main');



var focusHighlightDefault={
  indexCol:"",
  indexRow:"",
  list:[]
};

var widgetConfigDefault={
    affiliateId: "0",
    widgets: [

    ],
    userId : "userId"
};

var limitRow=4;
var dragItemDefault = {
  indexRow :"",
  indexCol :"",
  data:{},
}

var contextMenuDefault = {
  indexRow :"",
  indexCol :"",
  check : false,
}




var MainDnD = React.createClass({

    getInitialState: function() {
        return {
          checkFinished : false,
          focusWidgets  :  "",
          focusHighlights : JSON.parse(JSON.stringify(focusHighlightDefault)),
          // check when sort able widget
          finishFocusHighlights:false,
          // check open add widget
          isOpen: false,
          // add widgetType ( Add widget)
          widgetType : "",
          // data widget config
          widgetConfig : JSON.parse(JSON.stringify(widgetConfigDefault)),
          // drag irem
          dragItem : JSON.parse(JSON.stringify(dragItemDefault)),
          // check same line
          checkSameLine : false,
          designSwitch:false,
          contextMenu :  JSON.parse(JSON.stringify(contextMenuDefault)),
          backUpWidgets : [],
          // list widgetTypes added
          widgetTypeAdded : {}
        };
    },

    componentWillMount: function(){

    },

    setWidgetTypeAdded : function(widgetConfig){
      var widgetTypeAdded=this.state.widgetTypeAdded;
      if(widgetTypeAdded){
        Object.keys(widgetTypeAdded).map(function(key){
          widgetTypeAdded[key]=false;
        });
      }
      widgetConfig.widgets.map(function(rowWidgets, indexRow){
         var numCol=12/(rowWidgets.length);
         rowWidgets.map(function(widget, indexCol){
           widgetTypeAdded[widget.widgetType]=true;
         });
      });
      return widgetTypeAdded;
    },

    isOpenTool: function(e) {
      e.preventDefault();
      this.setState( { isOpen: !this.state.isOpen ,designSwitch : false } );
    },
    isDesignSwitch: function(e) {
      e.preventDefault();
      var designSwitch=!this.state.designSwitch;
      var widgetConfig=this.state.widgetConfig;
      if(designSwitch){
        var backUpWidgets=JSON.parse(JSON.stringify(widgetConfig.widgets));
        this.setState( { designSwitch: designSwitch ,isOpen : false , backUpWidgets : backUpWidgets } );
      }else{
        this.setState( { designSwitch: designSwitch ,isOpen : false} );
      }

    },



    saveCMSDashBoard : function(divs){

    },

    showUXNotice: function(status,message){

  	},

    // check number
    checkNumber : function(value){
      var check=false;
      if(value!=null && value!=undefined){
        check=true;
      }
      return check;
    },

    // check number
    checkDistanceCol : function(value1,value2){
      var distance=Math.abs(value1-value2);
      return distance;
    },

    // check number
    checkDistanceRow : function(value1,value2){
      var distance=Math.abs(value1-value2);
      return distance;
    },

    calChangeHighlights : function(dragItem,indexRow,indexCol){
      var focusHighlights = JSON.parse(JSON.stringify(focusHighlightDefault));
      if(!this.state.designSwitch){
        return focusHighlights;
      }
      if (dragItem.indexRow === indexRow) {
        focusHighlights.indexRow = indexRow;
        focusHighlights.indexCol = indexCol;
        if(indexRow===0 && dragItem.data.col != 12){
          focusHighlights.list.push(-1);
          focusHighlights.list.push(-1+".bottom");
        }
        if (indexRow > 0 && dragItem.data.col != 12) {
            focusHighlights.list.push(indexRow - 1);
            focusHighlights.list.push((indexRow - 1)+".bottom");
        }
        if (dragItem.data.col != 12) {
            focusHighlights.list.push(indexRow);
            focusHighlights.list.push((indexRow)+".bottom");
        }
        if (dragItem.indexCol !== indexCol) {
            focusHighlights.list.push(indexRow + "." + indexCol + ".before");
            if (dragItem.indexCol < indexCol || this.checkDistanceCol(indexCol, dragItem.indexCol) > 1) {
                focusHighlights.list.push(indexRow + "." + indexCol + ".after");
            }
        }
        if (indexCol > 0 && (dragItem.indexCol > indexCol || this.checkDistanceCol(dragItem.indexCol, indexCol) > 1)) {
            focusHighlights.list.push(indexRow + "." + (indexCol - 1) + ".after");
        }
      }else{
        focusHighlights.indexRow=indexRow;
        focusHighlights.indexCol=indexCol;
        if(dragItem.data.col != 12 || (dragItem.indexRow < indexRow || this.checkDistanceRow(dragItem.indexRow, indexRow) > 1)){
          focusHighlights.list.push(indexRow);
          focusHighlights.list.push(indexRow+".bottom");
        }
        if(indexRow>0 && (dragItem.data.col != 12 || (this.checkDistanceCol(dragItem.indexRow, indexRow-1) >= 1) )){
          focusHighlights.list.push(indexRow-1);
          focusHighlights.list.push((indexRow-1)+".bottom");
        }
        if(this.checkNumber(indexCol)){
          focusHighlights.list.push(indexRow+"."+indexCol+".before");
          focusHighlights.list.push(indexRow+"."+indexCol+".after");
        }
        if(indexCol>0){
          focusHighlights.list.push(indexRow+"."+(indexCol-1)+".after");
        }

        if(indexRow===0){
          focusHighlights.list.push(-1);
          focusHighlights.list.push(-1+".bottom");
        }

      }
      return focusHighlights;
    },

    // add Widget (ADD)
    onDragStartWidget: function(widgetType,event){
      if(event){
        event.dataTransfer.effectAllowed = 'move';
        // setData() is necessary for starting the drag in firefox
        event.dataTransfer.setData('text', 'dummy');
      }
      this.setState({widgetType:widgetType,dragItem:JSON.parse(JSON.stringify(dragItemDefault)),checkSameLine:false});

    },

    // add Widget (ADD)
    onDragChangeBeginWidget: function(indexRow,indexCol,event){
      if(this.state.designSwitch){
      event.dataTransfer.effectAllowed = 'move';



      // setData() is necessary for starting the drag in firefox
      event.dataTransfer.setData('text', 'dummy');

      var div = document.getElementsByClassName("_"+indexRow+"_"+indexCol+"_div_")[0].cloneNode(true);
      document.getElementsByClassName("main-content-hidden")[0].appendChild(div);
      event.dataTransfer.setDragImage(div, 0, 0);


      var widgetConfig=this.state.widgetConfig;
      var dragItem={};
      var data = widgetConfig.widgets[indexRow][indexCol];
      dragItem["indexRow"]=indexRow;
      dragItem["indexCol"]=indexCol;
      dragItem["data"]=JSON.parse(JSON.stringify(data));

        this.setState({widgetType:"",dragItem:dragItem,focusHighlights:JSON.parse(JSON.stringify(focusHighlightDefault))});
      }
    },

    // over Widget (ADD-CHANGE)
    onDragOverWidget : function(focusWidgets,indexRow,indexCol,event){
      event.preventDefault();
      // Over when ADD
      var dragItem=this.state.dragItem;
      if(this.state.widgetType){
        if(this.state.focusWidgets || this.state.focusWidgets!==focusWidgets ){
          this.setState({focusWidgets:focusWidgets,focusHighlights:JSON.parse(JSON.stringify(focusHighlightDefault))});
        }
      // Over when change
      }else if(dragItem && this.checkNumber(dragItem.indexRow)){
        var focusHighlights=this.calChangeHighlights(dragItem,indexRow,indexCol);
        if(focusHighlights.list && focusHighlights.list.length > 0){
          if(focusHighlights.list.indexOf(focusWidgets)>-1){
            this.setState({focusWidgets:focusWidgets,focusHighlights:JSON.parse(JSON.stringify(focusHighlightDefault))});
          }
        }
      }
    },

    // leave widget (ADD-CHANGE)
    onDragLeaveWidget: function(focusWidgets,event){
      event.preventDefault();
      // if(this.state.widgetType){
        if(this.state.focusWidgets===focusWidgets ){
          this.setState({focusWidgets:""});
        }
      // }
    },

    // drag end widget (ADD)
    onDragEndWidget : function(event){
      if(event){
        event.preventDefault();
      }
      this.setState({dragItem : JSON.parse(JSON.stringify(dragItemDefault)),widgetType:"",focusHighlights:JSON.parse(JSON.stringify(focusHighlightDefault))});

      var myNode = document.getElementsByClassName("main-content-hidden")[0];
      while (myNode.firstChild) {
          myNode.removeChild(myNode.firstChild);
      }

    },

    // drop end widget (ADD-CHANGE)
    onDropEndWidget : function(widgetType,indexRow,indexCol,action,focusWidgets,event){
      if(event){
        event.preventDefault();
      }
      var widgetConfig=this.state.widgetConfig;
      var dragItem=this.state.dragItem;
      if(widgetType){
        var widgets=
          {
              "col": "12",
              "widgetType": widgetType,
              "moduleItem": []
          }
        ;
        // add row
        if(!this.checkNumber(indexCol)){
          if(!this.checkNumber(indexRow)){
            widgetConfig.widgets.push([widgets]);
          }else{
            var index=indexRow+1;
            widgetConfig.widgets.splice(index, 0, [widgets]);
          }
        // add col & row
        }else{
          var rowWidgets=JSON.parse(JSON.stringify(widgetConfig.widgets[indexRow]));
          if(action==="before"){
            rowWidgets.splice(indexCol, 0, widgets);
          }else if(action==="after"){
            rowWidgets.splice((indexCol+1), 0, widgets);
          }
          var numCol=12/(rowWidgets.length);
          rowWidgets.map(function(item,index){
            rowWidgets[index]["col"]=numCol+"";
          });
          widgetConfig.widgets[indexRow]=rowWidgets;
        }
        var widgetTypeAdded=this.setWidgetTypeAdded(widgetConfig);
        this.setState({dragItem : JSON.parse(JSON.stringify(dragItemDefault)),widgetConfig:widgetConfig,focusWidgets:"",contextMenu:JSON.parse(JSON.stringify(contextMenuDefault)),widgetTypeAdded:widgetTypeAdded});
      }else if(dragItem && this.checkNumber(dragItem.indexRow)){
        var focusHighlights=this.calChangeHighlights(dragItem,indexRow,indexCol);
        if(focusHighlights.list && focusHighlights.list.length > 0){
          if(focusHighlights.list.indexOf(focusWidgets)>-1){
            var rowDragItem= JSON.parse(JSON.stringify(widgetConfig.widgets[dragItem.indexRow]));

            if(dragItem.indexRow==indexRow){
              var widgets=rowDragItem[dragItem.indexCol];
              if(!this.checkNumber(indexCol)){
                  var index=indexRow+1;
                  widgetConfig.widgets.splice(index, 0, [widgets]);
                  rowDragItem.splice(dragItem.indexCol, 1);
                  if(!rowDragItem || rowDragItem.length==0){
                    widgetConfig.widgets.splice(dragItem.indexRow,1);
                  }else{
                    widgetConfig.widgets[dragItem.indexRow]=rowDragItem;
                  }
                // add col & row
              }else{
                if(action==="before"){
                  rowDragItem.splice(indexCol, 0, widgets);
                }else if(action==="after"){
                  rowDragItem.splice((indexCol+1), 0, widgets);
                }
                if(dragItem.indexCol > indexCol){
                  rowDragItem.splice(dragItem.indexCol+1, 1);
                }else{
                  rowDragItem.splice(dragItem.indexCol, 1);
                }
                widgetConfig.widgets[dragItem.indexRow]=rowDragItem;
              }
              widgetConfig.widgets.map(function(rowWidgets, indexRow){
                 var numCol=12/(rowWidgets.length);
                 rowWidgets.map(function(widget, indexCol){
                   rowWidgets[indexCol]["col"]=numCol+"";
                 });
              });
            // move not one row
            }else if(dragItem.indexRow!=indexRow){
              var rowDragItem= JSON.parse(JSON.stringify(widgetConfig.widgets[dragItem.indexRow]));
              var rowDrogItem= JSON.parse(JSON.stringify(widgetConfig.widgets[indexRow]));
              var widgets=rowDragItem[dragItem.indexCol];
              if(!this.checkNumber(indexCol)){
                  var index=indexRow+1;
                  if(dragItem.data.col==12){
                    widgetConfig.widgets.splice(index, 0, [widgets]);
                    if(dragItem.indexRow > indexRow){
                      widgetConfig.widgets.splice(dragItem.indexRow+1,1);
                    }else{
                      widgetConfig.widgets.splice(dragItem.indexRow,1);
                    }
                  }else{
                    rowDragItem.splice(dragItem.indexCol, 1);
                    widgetConfig.widgets[dragItem.indexRow]=rowDragItem;
                    widgetConfig.widgets.splice(index, 0, [widgets]);
                    if(!rowDragItem || rowDragItem.length==0){
                      if(dragItem.indexRow > indexRow){
                        widgetConfig.widgets.splice(dragItem.indexRow+1,1);
                      }else{
                        widgetConfig.widgets.splice(dragItem.indexRow,1);
                      }
                    }
                  }
                // add col & row
              }else{
                if(action==="before"){
                  rowDrogItem.splice(indexCol, 0, widgets);
                  rowDragItem.splice(dragItem.indexCol,1);
                }else if(action==="after"){
                  rowDrogItem.splice((indexCol+1), 0, widgets);
                  rowDragItem.splice(dragItem.indexCol,1);
                }
                widgetConfig.widgets[indexRow]=rowDrogItem;
                if(!rowDragItem || rowDragItem.length==0){
                  widgetConfig.widgets.splice(dragItem.indexRow,1);
                }else{
                  widgetConfig.widgets[dragItem.indexRow]=rowDragItem;
                }

              }
              widgetConfig.widgets.map(function(rowWidgets, indexRow){
                 var numCol=12/(rowWidgets.length);
                 rowWidgets.map(function(widget, indexCol){
                   rowWidgets[indexCol]["col"]=numCol+"";
                 });
              });
            }
            var widgetTypeAdded=this.setWidgetTypeAdded(widgetConfig);
            this.setState({dragItem : JSON.parse(JSON.stringify(dragItemDefault)),widgetConfig:widgetConfig,focusWidgets:"",contextMenu:JSON.parse(JSON.stringify(contextMenuDefault)),widgetTypeAdded:widgetTypeAdded});
          }
        }
      }
    },
    // set Highlight draggable area
    onDragOverHighlights:function(indexRow,indexCol,event){
      event.preventDefault();
      var focusHighlights=this.state.focusHighlights;
      var dragItem=this.state.dragItem;
      // Highlights (ADD)
      if(this.state.widgetType){
        if(focusHighlights.indexRow===indexRow && focusHighlights.indexCol===indexCol){
          return;
        }else{
          focusHighlights.indexRow=indexRow;
          focusHighlights.indexCol=indexCol;
          focusHighlights.list.push(indexRow+".bottom");
          if(indexRow>0){
            focusHighlights.list.push((indexRow-1)+".bottom");
          }
          if(indexRow===0){
            focusHighlights.list.push(-1+".bottom");
          }
          if(this.checkNumber(indexCol)){
            focusHighlights.list.push(indexRow+"."+indexCol+".before");
            focusHighlights.list.push(indexRow+"."+indexCol+".after");
          }
          if(indexCol>0){
            focusHighlights.list.push(indexRow+"."+(indexCol-1)+".after");
          }
          this.setState({focusHighlights:focusHighlights});
        }
      // Highlights (CHANGE)
      }else if(dragItem && this.checkNumber(dragItem.indexRow)){
        if(focusHighlights.indexRow===indexRow && focusHighlights.indexCol===indexCol && this.state.finishFocusHighlights){
          return;
        }else{
          // one
            focusHighlights=this.calChangeHighlights(dragItem,indexRow,indexCol);
            var checkSameLine=false;
            if(dragItem.indexRow==indexRow){
              checkSameLine=true;
            }
            this.setState({focusHighlights:focusHighlights,finishFocusHighlights:true,checkSameLine:checkSameLine});
        }
      }
    },
    // remove Highlight draggable area
    onDragLeaveHighlights:function(indexRow,indexCol){
      event.preventDefault();
      var focusHighlights=this.state.focusHighlights;
      var dragItem=this.state.dragItem;
      // if(this.state.widgetType ){
      if(focusHighlights.indexRow===indexRow && focusHighlights.indexCol===indexCol){
        this.setState({focusHighlights:JSON.parse(JSON.stringify(focusHighlightDefault)),finishFocusHighlights:false});
      }
      // }else if(dragItem && this.checkNumber(dragItem.indexRow)){
      //
      // }
    },

    // drag end widget (ADD)
    onRemoveWidget : function(indexRow,indexCol,event){
      var widgetConfig=this.state.widgetConfig;
      var rowWidgets= JSON.parse(JSON.stringify(widgetConfig.widgets[indexRow]));
      rowWidgets.splice(indexCol,1);
      var numCol=12/(rowWidgets.length);
      rowWidgets.map(function(item,index){
        rowWidgets[index]["col"]=numCol+"";
      });
      widgetConfig.widgets[indexRow]=rowWidgets;
      if(!rowWidgets || rowWidgets.length==0){
        widgetConfig.widgets.splice(indexRow,1);
      }
      var widgetTypeAdded=this.setWidgetTypeAdded(widgetConfig);
      this.setState({widgetConfig:widgetConfig,focusWidgets:"",contextMenu:JSON.parse(JSON.stringify(contextMenuDefault)),widgetTypeAdded:widgetTypeAdded});
    },

    setContextMenu : function(indexRow,indexCol,event){
     var contextMenu=this.state.contextMenu;
     if(contextMenu.indexRow===indexRow && contextMenu.indexCol===indexCol){
       this.setState({contextMenu:JSON.parse(JSON.stringify(contextMenuDefault))});
     }else{
       contextMenu.indexRow=indexRow;
       contextMenu.indexCol=indexCol;
       contextMenu.check =true;
       this.setState({contextMenu:contextMenu});
     }

    },

    onCancelWidgets : function(){
      var widgetConfig=this.state.widgetConfig;
      widgetConfig.widgets=JSON.parse(JSON.stringify(this.state.backUpWidgets));
      var widgetTypeAdded=this.setWidgetTypeAdded(widgetConfig);
      this.setState({
        contextMenu:JSON.parse(JSON.stringify(contextMenuDefault)),
        checkSameLine : false,
        designSwitch:false,
        isOpen: false,
        finishFocusHighlights:false,
        widgetConfig : widgetConfig,
        widgetTypeAdded:widgetTypeAdded
      });
    },

    onDoneWidgets : function(){
      this.setState({
        contextMenu:JSON.parse(JSON.stringify(contextMenuDefault)),
        checkSameLine : false,
        designSwitch:false,
        isOpen: false,
        finishFocusHighlights:false,
        backUpWidgets:[]
      });
    },

    renderModule : function(name,type){
        // + (this.state.widgetTypeAdded[type] ? " hidden" : " " )
      return (
        <div
          className={this.state.widgetType===type ? "component choose" : "component no-choose"}  draggable='true'
          onDragStart={this.onDragStartWidget.bind(this,type)}
          onDragEnd={this.onDragEndWidget}
        >{name}</div>
      );
    },

    render() {
      return (
        <div className="dashboard-page dashboard-new-layout">
          <div id="page-title">
            <h1 className="page-header">
              Layout
            </h1>
            <h1 className="page-header">
              Support drag & drog 4 component in one row
            </h1>
            <div className="dashTools">
              {! this.state.designSwitch && (
                  <span>
                    <a href="#" className="ic-modDrag" onClick={this.isDesignSwitch}><span>Edit layout</span></a>
                    <a href="#"  className={(this.state.isOpen ? 'isActive' : '')} onClick={this.isOpenTool} ><i className="fa fa-plus"></i></a>
                  </span>
                )}
                { (this.state.designSwitch) && (
                  <span   className="switch-on">
                    <a href="#" className="btn-default"  onClick={this.onCancelWidgets}>Cancle</a>
                    <a href="#" className="btn-default btn-pink"  onClick={this.onDoneWidgets}>Done</a>
                  </span>
                )}
            </div>
          </div>
          {!(this.state.widgetConfig && this.state.widgetConfig.widgets && this.state.widgetConfig.widgets.length) &&
            <DropBox isOpen={this.state.isOpen} onDropEndWidget={this.onDropEndWidget}></DropBox>
          }
          {(this.state.widgetConfig && this.state.widgetConfig.widgets && this.state.widgetConfig.widgets.length > 0) &&
            <div className={ 'main-content ' + (this.state.isOpen ? 'isOpenTool' : '')
             + (this.state.designSwitch ? ' switch-on' : '') }>
               {
                 <FocusPoint className="row point-bottom  " key={"-1.bottom_FocusPoint"}  indexRow={-1}
                   action="bottom" focusHighlights={this.state.focusHighlights}
                   onDropEndWidget={this.onDropEndWidget}>
                 </FocusPoint>
               }
              {
                this.state.widgetConfig.widgets.map((row, indexRow) => {
                  return (
                    <div>
                      <div className="row" key={indexRow}>
                        { ( (row.length < limitRow)  || (this.state.checkSameLine && row.length <= limitRow) )&&
                          <FocusPoint className="point-focus point-focus-begin " key={indexRow+"."+"0"+".before_FocusPoint"}  indexRow={indexRow} indexCol={0} action="before"
                            onDropEndWidget={this.onDropEndWidget} focusHighlights={this.state.focusHighlights}>
                          </FocusPoint>
                        }
                        {(() => {
                          var colWidgets=row.length-1;
                          var rowWidgets=[];
                          if(colWidgets>=1 && ( (row.length < limitRow) || (this.state.checkSameLine && row.length <= limitRow) ) ){
                            for (var col = 0; col < colWidgets; col++) {
                              var left= ((100/row.length)*(col+1))+"%";
                              rowWidgets.push(
                                <FocusPoint className="point-focus-end-col " key={indexRow+"."+col+".after_FocusPoint"}  indexRow={indexRow} indexCol={col} action="after" left={left}
                                  onDropEndWidget={this.onDropEndWidget} focusHighlights={this.state.focusHighlights}>
                                </FocusPoint>
                              );
                            }
                          }
                          return rowWidgets;
                        })()}
                        {
                          row.map((widget, indexCol) => {
                            return (
                                <div className={"col-md-"+widget.col + "  "+"_"+indexRow+"_"+indexCol+"_div_  "+
                                   (this.state.dragItem && this.state.dragItem.indexRow === indexRow && this.state.dragItem.indexCol === indexCol ? " ondrag " : "")}
                                  key={indexRow+"."+indexCol} draggable={this.state.designSwitch}
                                  onDragOver={this.onDragOverHighlights.bind(this,indexRow,indexCol)}
                                  onDragLeave={this.onDragLeaveHighlights.bind(this,indexRow,indexCol)}
                                  onDragStart={this.onDragChangeBeginWidget.bind(this,indexRow,indexCol)}
                                  onDragEnd={this.onDragEndWidget}>
                                  <div className={"widget "}>
                                    <a href="#" className="ic-remove" onClick={this.onRemoveWidget.bind(this,indexRow,indexCol)}><span>Remove widget</span></a>
                                    <div className="widget-heading clearfix">
                                        <div className={"widget-control "+
                                              (this.state.designSwitch ? " hidden" : " " )
                                              }>
                                              <div className="icon-settings">
                                                <span><i className="fa fa-cog" onClick={this.setContextMenu.bind(this,indexRow,indexCol)} ></i></span>
                                                <ul className={ "cbp-tm-submenu"
                                                  + ((!this.state.designSwitch && this.state.contextMenu.check && this.state.contextMenu.indexRow === indexRow && this.state.contextMenu.indexCol === indexCol) ? " visible " : " ") } >
                                                  <li><a href="#" className="ic-delete" onClick={this.onRemoveWidget.bind(this,indexRow,indexCol)}>Delete widget <i className="fa fa-trash"></i></a></li>
                                                </ul>
                                              </div>
                                        </div>
                                        <h2 className="widget-title">{widget.widgetType}</h2>
                                    </div>
                                    <div className="widget-content">
                                    </div>
                                  </div>
                                </div>
                            );
                          })
                        }
                        { ((row.length < limitRow) || (this.state.checkSameLine && row.length <= limitRow)) &&
                            <FocusPoint className="point-focus point-focus-end  " key={indexRow+"."+row.length-1+".after_FocusPoint"}  indexRow={indexRow} indexCol={row.length-1} action="after"
                              onDropEndWidget={this.onDropEndWidget} focusHighlights={this.state.focusHighlights}>
                            </FocusPoint>
                        }

                      </div>
                      <FocusPoint className="row point-bottom  " key={indexRow+"."+row.length-1+".bottom_FocusPoint"}  indexRow={indexRow}
                        action="bottom"
                        onDropEndWidget={this.onDropEndWidget} focusHighlights={this.state.focusHighlights}>
                      </FocusPoint>
                    </div>
                  );
                })
              }
            </div>
          }
          { this.state.isOpen &&
            <AddWidget isOpen={this.state.isOpen }
              onDragStartWidget={this.onDragStartWidget}
              onDragEndWidget={this.onDragEndWidget}
              widgetTypeAdded={this.state.widgetTypeAdded} widgetType={this.state.widgetType} >
            </AddWidget>
          }

          <div className="main-content main-content-hidden" style={{'left': '-999999px', 'position':'relative'}}>
          </div>
      </div>
      );
    }
});

module.exports = DragDropContext(HTML5Backend)(MainDnD);
