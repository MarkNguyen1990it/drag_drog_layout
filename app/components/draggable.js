var React = require('react');
var Container = require('./cms-dashboard/main');
var MyDraggable = React.createClass({
  render: function() {
    return (

        <div className="wp layout is-section-false focus-content has-no-sidebar">
          <header id="header" className="masterbar"></header>
          <div className="container-fluid">
            <div id="primary" className="page-content-wrapper">
              <Container key="Container" />
            </div>
            <div id="secondary" className="page-sidebar-wrapper" data-reactid=".0.1.2">
            	<ul className="sidebar wpcom-sidebar main-sidebar" data-reactid=".0.1.2.0">
            		<li className="sidebar__menu sidebar-menu" data-reactid=".0.1.2.0.0">
            			<h2 className="sidebar__heading" data-reactid=".0.1.2.0.0.0">Menu 1</h2>
            			<ul data-reactid=".0.1.2.0.0.1">
            				<li className="" data-reactid=".0.1.2.0.0.1.0">
            					<a href="#" data-reactid=".0.1.2.0.0.1.0.0">
            						<span className="menu-link-text" data-reactid=".0.1.2.0.0.1.0.0.0">Menu Item 1.1</span>
            					</a>
            				</li>
            				<li className="" data-reactid=".0.1.2.0.0.1.1">
            					<a href="#" data-reactid=".0.1.2.0.0.1.1.0">
            						<span className="menu-link-text" data-reactid=".0.1.2.0.0.1.1.0.0">Menu Item 1.2</span>
            					</a>
            				</li>
            				<li className="" data-reactid=".0.1.2.0.0.1.2">
            					<a href="#" data-reactid=".0.1.2.0.0.1.2.0">
            						<span className="menu-link-text" data-reactid=".0.1.2.0.0.1.2.0.0">Menu Item 1.3</span>
            					</a>
            				</li>
            			</ul>
            		</li>
                <li className="sidebar__menu sidebar-menu" data-reactid=".0.1.2.0.0">
                  <h2 className="sidebar__heading" data-reactid=".0.1.2.0.0.0">Menu 2</h2>
                  <ul data-reactid=".0.1.2.0.0.1">
                    <li className="" data-reactid=".0.1.2.0.0.1.0">
                      <a href="#" data-reactid=".0.1.2.0.0.1.0.0">
                        <span className="menu-link-text" data-reactid=".0.1.2.0.0.1.0.0.0">Menu Item 2.1</span>
                      </a>
                    </li>
                    <li className="" data-reactid=".0.1.2.0.0.1.1">
                      <a href="#" data-reactid=".0.1.2.0.0.1.1.0">
                        <span className="menu-link-text" data-reactid=".0.1.2.0.0.1.1.0.0">Menu Item 2.2</span>
                      </a>
                    </li>
                    <li className="" data-reactid=".0.1.2.0.0.1.2">
                      <a href="#" data-reactid=".0.1.2.0.0.1.2.0">
                        <span className="menu-link-text" data-reactid=".0.1.2.0.0.1.2.0.0">Menu Item 2.3</span>
                      </a>
                    </li>
                  </ul>
                </li>
            	</ul>
            </div>
          </div>
        </div>


    )
  }
});
module.exports = MyDraggable;
