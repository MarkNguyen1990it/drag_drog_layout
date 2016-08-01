var React = require('react');



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

var limitRow=3;
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
          // add componentType ( Add widget)
          componentType : "",
          // data widget config
          widgetConfig : JSON.parse(JSON.stringify(widgetConfigDefault)),
          // drag irem
          dragItem : JSON.parse(JSON.stringify(dragItemDefault)),
          // check same line
          checkSameLine : false,
          designSwitch:false,
          contextMenu :  JSON.parse(JSON.stringify(contextMenuDefault)),
          backUpWidgets : []
        };
    },

    componentWillMount: function(){

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
      }
      return focusHighlights;
    },

    // add Widget (ADD)
    onDragStartWidget: function(componentType,event){
      event.dataTransfer.effectAllowed = 'move';
      // setData() is necessary for starting the drag in firefox
      event.dataTransfer.setData('text', 'dummy');
      this.setState({componentType:componentType,dragItem:JSON.parse(JSON.stringify(dragItemDefault)),checkSameLine:false});

    },

    // add Widget (ADD)
    onDragChangeBeginWidget: function(indexRow,indexCol,event){
      event.dataTransfer.effectAllowed = 'move';
      // setData() is necessary for starting the drag in firefox
      event.dataTransfer.setData('text', 'dummy');
      var widgetConfig=this.state.widgetConfig;
      var dragItem={};
      var data = widgetConfig.widgets[indexRow][indexCol];
      dragItem["indexRow"]=indexRow;
      dragItem["indexCol"]=indexCol;
      dragItem["data"]=JSON.parse(JSON.stringify(data));
      if(this.state.designSwitch){
        this.setState({componentType:"",dragItem:dragItem,focusHighlights:JSON.parse(JSON.stringify(focusHighlightDefault))});
      }
    },

    // over Widget (ADD-CHANGE)
    onDragOverWidget : function(focusWidgets,indexRow,indexCol,event){
      event.preventDefault();
      // Over when ADD
      var dragItem=this.state.dragItem;
      if(this.state.componentType){
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
      // if(this.state.componentType){
        if(this.state.focusWidgets===focusWidgets ){
          this.setState({focusWidgets:""});
        }
      // }
    },

    // drag end widget (ADD)
    onDragEndWidget : function(event){
      event.preventDefault();
      this.setState({dragItem : JSON.parse(JSON.stringify(dragItemDefault)),componentType:"",focusHighlights:JSON.parse(JSON.stringify(focusHighlightDefault))});
    },

    // drop end widget (ADD-CHANGE)
    onDropEndWidget : function(componentType,indexRow,indexCol,action,focusWidgets,event){
      event.preventDefault();
      var widgetConfig=this.state.widgetConfig;
      var dragItem=this.state.dragItem;
      if(this.state.componentType){
        var widgets=
          {
              "col": "12",
              "componentType": this.state.componentType,
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
          this.setState({widgetConfig:widgetConfig,focusWidgets:""});
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
          this.setState({widgetConfig:widgetConfig,focusWidgets:"",contextMenu:JSON.parse(JSON.stringify(contextMenuDefault))});
        }
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
            this.setState({widgetConfig:widgetConfig,focusWidgets:"",contextMenu:JSON.parse(JSON.stringify(contextMenuDefault))});
          }
        }
      }
      console.log(JSON.stringify(this.state.widgetConfig,null,2));
    },
    // set Highlight draggable area
    onDragOverHighlights:function(indexRow,indexCol,event){
      event.preventDefault();
      var focusHighlights=this.state.focusHighlights;
      var dragItem=this.state.dragItem;
      // Highlights (ADD)
      if(this.state.componentType){
        if(focusHighlights.indexRow===indexRow && focusHighlights.indexCol===indexCol){
          return;
        }else{
          focusHighlights.indexRow=indexRow;
          focusHighlights.indexCol=indexCol;
          focusHighlights.list.push(indexRow);
          if(indexRow>0){
            focusHighlights.list.push(indexRow-1);
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
      // if(this.state.componentType ){
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
      this.setState({widgetConfig:widgetConfig,focusWidgets:"",contextMenu:JSON.parse(JSON.stringify(contextMenuDefault))});
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
      this.setState({
        contextMenu:JSON.parse(JSON.stringify(contextMenuDefault)),
        checkSameLine : false,
        designSwitch:false,
        isOpen: false,
        finishFocusHighlights:false,
        widgetConfig : widgetConfig
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

    render() {
      return (
        <div className="dashboard-page dashboard-new-layout">
          <div id="page-title">
            <h1 className="page-header">Dashboard</h1>
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
          <div className="quick-action-tool">
                <a href="#"><i className="fa fa-plus"></i> New story</a>
                <a href="#"><i className="fa fa-plus"></i> Upload media</a>
                <a href="#"><i className="fa fa-plus"></i> Add profile </a>
            </div>
          {!(this.state.widgetConfig && this.state.widgetConfig.widgets && this.state.widgetConfig.widgets.length) &&
            <div className={'main-content '+ (this.state.isOpen ? 'isOpenTool' : '')}
              onDragOver={this.onDragOverWidget.bind(this,"addWidgets",null,null)}
              onDragLeave={this.onDragLeaveWidget.bind(this,"addWidgets")}
              onDrop={this.onDropEndWidget.bind(this,"snapshots",null,null,"","")}>
                <div className={"box__input-addWidget" + (this.state.focusWidgets==="addWidgets" ? ' choose ' : ' no-choose ')} >
                    <span> + ADD  WIDGET</span>
                </div>
            </div>
          }
          {(this.state.widgetConfig && this.state.widgetConfig.widgets && this.state.widgetConfig.widgets.length > 0) &&
            <div className={ 'main-content ' + (this.state.isOpen ? 'isOpenTool' : '')
             + (this.state.designSwitch ? ' switch-on' : '') }>
              {
                this.state.widgetConfig.widgets.map((row, indexRow) => {
                  return (
                    <div>
                      <div className="row" key={indexRow}>
                        { ( (row.length < limitRow)  || (this.state.checkSameLine && row.length <= limitRow) )&&
                          <div className={"point-focus point-focus-begin"+ (this.state.focusWidgets===(indexRow+".0.before") ? ' choose ' : ' no-choose ')
                              + (this.state.focusHighlights.list.indexOf(indexRow+"."+"0"+".before")>=0  ? ' highlight ' : '') }
                              key={indexRow+"."+"0"+".before"}
                              onDragLeave={this.onDragLeaveWidget.bind(this,indexRow+".0.before")}
                              onDragOver={this.onDragOverWidget.bind(this,indexRow+".0.before",indexRow,0)}
                              onDrop={this.onDropEndWidget.bind(this,"snapshots",indexRow,0,"before",indexRow+".0.before")}
                          ></div>
                        }
                        {(() => {
                          var colWidgets=row.length-1;
                          var rowWidgets=[];
                          if(colWidgets>=1 && ( (row.length < limitRow) || (this.state.checkSameLine && row.length <= limitRow) ) ){
                            for (var col = 0; col < colWidgets; col++) {
                              var left= ((100/row.length)*(col+1))+"%";
                              rowWidgets.push(
                                <div style={{'left': left}} className={"point-focus-end-col-"+col+" point-focus-end-col "+(this.state.focusWidgets===(indexRow+"."+col+".after") ? ' choose ' : ' no-choose ')
                                    + (this.state.focusHighlights.list.indexOf(indexRow+"."+col+".after")>=0  ? ' highlight ' : '') }
                                    key={indexRow+"."+col+".after"}
                                    onDragLeave={this.onDragLeaveWidget.bind(this,indexRow+"."+col+".after")}
                                    onDragOver={this.onDragOverWidget.bind(this,indexRow+"."+col+".after",indexRow,col)}
                                    onDrop={this.onDropEndWidget.bind(this,"snapshots",indexRow,col,"after",indexRow+"."+col+".after")}></div>

                              );
                            }
                          }
                          return rowWidgets;
                        })()}
                        {
                          row.map((widget, indexCol) => {
                            return (
                                <div className={"col-md-"+widget.col }
                                  key={indexRow+"."+indexCol} draggable={this.state.designSwitch}
                                  onDragOver={this.onDragOverHighlights.bind(this,indexRow,indexCol)}
                                  onDragLeave={this.onDragLeaveHighlights.bind(this,indexRow,indexCol)}
                                  onDragStart={this.onDragChangeBeginWidget.bind(this,indexRow,indexCol)}
                                  onDragEnd={this.onDragEndWidget}>
                                  <div className={"widget "}>
                                    <a href="#" className="ic-remove" onClick={this.onRemoveWidget.bind(this,indexRow,indexCol)}><span>Remove widget</span></a>
                                    <div className="widget-heading clearfix">
                                        <div className={"widget-control "+
                                              (this.state.designSwitch ? " display_none" : " " )
                                              }>
                                              <div className="icon-settings">
                                                <span><i className="fa fa-cog" onClick={this.setContextMenu.bind(this,indexRow,indexCol)} ></i></span>
                                                <ul className={ "cbp-tm-submenu"
                                                  + ((!this.state.designSwitch && this.state.contextMenu.check && this.state.contextMenu.indexRow === indexRow && this.state.contextMenu.indexCol === indexCol) ? " display_block " : " ") } >
                                                  <li><a href="#" className="ic-edit">Edit <i className="fa fa-pencil"></i></a></li>
                                                  <li><a href="#" className="ic-delete" onClick={this.onRemoveWidget.bind(this,indexRow,indexCol)}>Delete widget <i className="fa fa-trash"></i></a></li>
                                                </ul>
                                              </div>
                                        </div>
                                        <h2 className="widget-title">{widget.componentType}</h2>
                                    </div>
                                    <div className="widget-content"></div>
                                  </div>
                                </div>
                            );
                          })
                        }
                        { ((row.length < limitRow) || (this.state.checkSameLine && row.length <= limitRow)) &&
                          <div className={"point-focus point-focus-end"+(this.state.focusWidgets===(indexRow+"."+(row.length-1)+".after") ? ' choose ' : ' no-choose ')
                              + (this.state.focusHighlights.list.indexOf(indexRow+"."+(row.length-1)+".after")>=0  ? ' highlight ' : '') }
                              key={indexRow+"."+(row.length-1)+".after"}
                              onDragLeave={this.onDragLeaveWidget.bind(this,indexRow+"."+(row.length-1)+".after")}
                              onDragOver={this.onDragOverWidget.bind(this,indexRow+"."+(row.length-1)+".after",indexRow,(row.length-1))}
                              onDrop={this.onDropEndWidget.bind(this,"snapshots",indexRow,(row.length-1),"after",indexRow+"."+(row.length-1)+".after")}></div>
                        }

                      </div>
                      <div className={"row point-bottom" + (this.state.focusWidgets===(indexRow+".bottom") ? ' choose ' : ' no-choose ')
                        + (this.state.focusHighlights.list.indexOf(indexRow)>=0  ? ' highlight ' : '') }
                        key={indexRow+"."+".bottom"}
                        onDragLeave={this.onDragLeaveWidget.bind(this,indexRow+".bottom")}
                        onDragOver={this.onDragOverWidget.bind(this,indexRow+".bottom",indexRow,null)}
                        onDrop={this.onDropEndWidget.bind(this,"snapshots",indexRow,null,"",indexRow+".bottom")}>
                      </div>
                    </div>
                  );
                })
              }
            </div>
          }

          <div className={ 'moduleCategories ' + (this.state.isOpen ? 'isOpenTool' : ' hidden')}>
            <div className="item-moduleCategorie">
              <h3>Quick view</h3>
              <div
                className={this.state.componentType==="snapshots" ? "component choose" : "component no-choose" }  draggable='true'
                onDragStart={this.onDragStartWidget.bind(this,"snapshots")}
                onDragEnd={this.onDragEndWidget}>Snapshots</div>
            </div>
            <div className="item-moduleCategorie">
              <h3>Producer Tools</h3>
              <div
                className={this.state.componentType==="mostPopular" ? "component choose" : "component no-choose" }  draggable='true'
                onDragStart={this.onDragStartWidget.bind(this,"mostPopular")}
                onDragEnd={this.onDragEndWidget}>
              Most Popular</div>
              <div
                className={this.state.componentType==="editorList" ? "component choose" : "component no-choose" }  draggable='true'
                onDragStart={this.onDragStartWidget.bind(this,"editorList")}
                onDragEnd={this.onDragEndWidget}
              >Editor List</div>
            </div>
            <div className="item-moduleCategorie">
              <h3>Analytics</h3>
              <div
                className={this.state.componentType==="googleAnalytics" ? "component choose" : "component no-choose" }  draggable='true'
                onDragStart={this.onDragStartWidget.bind(this,"googleAnalytics")}
                onDragEnd={this.onDragEndWidget}
              >Google analytics</div>
              <div
                className={this.state.componentType==="chartbeat" ? "component choose" : "component no-choose" }  draggable='true'
                onDragStart={this.onDragStartWidget.bind(this,"chartbeat")}
                onDragEnd={this.onDragEndWidget}
              >Chartbeat</div>
              <div
                className={this.state.componentType==="sharablee" ? "component choose" : "component no-choose" }  draggable='true'
                onDragStart={this.onDragStartWidget.bind(this,"sharablee")}
                onDragEnd={this.onDragEndWidget}
              >sharablee</div>
            </div>
            <div className="item-moduleCategorie">
              <h3>Weather</h3>
              <div
                className={this.state.componentType==="weatherOverview" ? "component choose" : "component no-choose" }  draggable='true'
                onDragStart={this.onDragStartWidget.bind(this,"weatherOverview")}
                onDragEnd={this.onDragEndWidget}
              >Weather Overview</div>
            </div>
          </div>
      </div>
      );
    }
});

module.exports = MainDnD;
