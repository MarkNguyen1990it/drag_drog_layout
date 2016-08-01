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
            			<h2 className="sidebar__heading" data-reactid=".0.1.2.0.0.0">Quick Start</h2>
            			<ul data-reactid=".0.1.2.0.0.1">
            				<li className="" data-reactid=".0.1.2.0.0.1.0">
            					<a href="#" data-reactid=".0.1.2.0.0.1.0.0">
            						<span className="menu-link-text" data-reactid=".0.1.2.0.0.1.0.0.0">Breaking News</span>
            					</a>
            				</li>
            				<li className="" data-reactid=".0.1.2.0.0.1.1">
            					<a href="#" data-reactid=".0.1.2.0.0.1.1.0">
            						<span className="menu-link-text" data-reactid=".0.1.2.0.0.1.1.0.0">Story</span>
            					</a>
            				</li>
            				<li className="" data-reactid=".0.1.2.0.0.1.2">
            					<a href="#" data-reactid=".0.1.2.0.0.1.2.0">
            						<span className="menu-link-text" data-reactid=".0.1.2.0.0.1.2.0.0">Video Clip</span>
            					</a>
            				</li>
            			</ul>
            		</li>
            		<li className="sidebar__menu sidebar-menu" data-reactid=".0.1.2.0.1">
            			<h2 className="sidebar__heading" data-reactid=".0.1.2.0.1.0">Story</h2>
            			<ul data-reactid=".0.1.2.0.1.1">
            				<li className="" data-reactid=".0.1.2.0.1.1.0">
            					<a href="/#" data-reactid=".0.1.2.0.1.1.0.0">
            						<span className="menu-link-text" data-reactid=".0.1.2.0.1.1.0.0.0">Category</span>
            					</a>
            				</li>
            				<li className="" data-reactid=".0.1.2.0.1.1.1">
            					<a href="/#" data-reactid=".0.1.2.0.1.1.1.0">
            						<span className="menu-link-text" data-reactid=".0.1.2.0.1.1.1.0.0">Video</span>
            						<span className="badge badge-defautl" data-reactid=".0.1.2.0.1.1.1.0.1">5</span>
            					</a>
            				</li>
            				<li className="" data-reactid=".0.1.2.0.1.1.2">
            					<a href="#" data-reactid=".0.1.2.0.1.1.2.0">
            						<span className="menu-link-text" data-reactid=".0.1.2.0.1.1.2.0.0">Link+ </span>
            					</a>
            				</li>
            				<li className="" data-reactid=".0.1.2.0.1.1.3">
            					<a href="#" data-reactid=".0.1.2.0.1.1.3.0">
            						<span className="menu-link-text" data-reactid=".0.1.2.0.1.1.3.0.0">Direct Email</span>
            					</a>
            				</li>
            			</ul>
            		</li>
            		<li className="sidebar__menu sidebar-menu" data-reactid=".0.1.2.0.2">
            			<h2 className="sidebar__heading" data-reactid=".0.1.2.0.2.0">Features</h2>
            			<ul data-reactid=".0.1.2.0.2.1">
            				<li className="" data-reactid=".0.1.2.0.2.1.0">
            					<a href="#" data-reactid=".0.1.2.0.2.1.0.0">
            						<span className="menu-link-text" data-reactid=".0.1.2.0.2.1.0.0.0">Ad Media</span>
            						<span className="badge badge-defautl" data-reactid=".0.1.2.0.2.1.0.0.1">3</span>
            					</a>
            				</li>
            				<li className="" data-reactid=".0.1.2.0.2.1.1">
            					<a href="#" data-reactid=".0.1.2.0.2.1.1.0">
            						<span className="menu-link-text" data-reactid=".0.1.2.0.2.1.1.0.0">Image Library</span>
            					</a>
            				</li>
            				<li className="" data-reactid=".0.1.2.0.2.1.2">
            					<a href="#" data-reactid=".0.1.2.0.2.1.2.0">
            						<span className="menu-link-text" data-reactid=".0.1.2.0.2.1.2.0.0">Weather </span>
            					</a>
            				</li>
            				<li className="" data-reactid=".0.1.2.0.2.1.3">
            					<a href="#" data-reactid=".0.1.2.0.2.1.3.0">
            						<span className="menu-link-text" data-reactid=".0.1.2.0.2.1.3.0.0">Forms</span>
            					</a>
            				</li>
            				<li className="" data-reactid=".0.1.2.0.2.1.4">
            					<a href="#" data-reactid=".0.1.2.0.2.1.4.0">
            						<span className="menu-link-text" data-reactid=".0.1.2.0.2.1.4.0.0">Widgets</span>
            					</a>
            				</li>
            				<li className="" data-reactid=".0.1.2.0.2.1.5">
            					<a href="#" data-reactid=".0.1.2.0.2.1.5.0">
            						<span className="menu-link-text" data-reactid=".0.1.2.0.2.1.5.0.0">Utility Blocks</span>
            					</a>
            				</li>
            			</ul>
            		</li>
            		<li className="sidebar__menu sidebar-menu" data-reactid=".0.1.2.0.3">
            			<h2 className="sidebar__heading" data-reactid=".0.1.2.0.3.0">Admin</h2>
            			<ul data-reactid=".0.1.2.0.3.1">
            				<li className="" data-reactid=".0.1.2.0.3.1.0">
            					<a href="#" data-reactid=".0.1.2.0.3.1.0.0">
            						<span className="menu-link-text" data-reactid=".0.1.2.0.3.1.0.0.0">Reporting</span>
            					</a>
            				</li>
            				<li className="" data-reactid=".0.1.2.0.3.1.1">
            					<a href="#" data-reactid=".0.1.2.0.3.1.1.0">
            						<span className="menu-link-text" data-reactid=".0.1.2.0.3.1.1.0.0">Rulples</span>
            					</a>
            				</li>
            			</ul>
            		</li>
            		<li className="sidebar__menu sidebar-menu" data-reactid=".0.1.2.0.4">
            			<h2 className="sidebar__heading" data-reactid=".0.1.2.0.4.0">Help</h2>
            			<ul data-reactid=".0.1.2.0.4.1">
            				<li className="" data-reactid=".0.1.2.0.4.1.0">
            					<a href="#" data-reactid=".0.1.2.0.4.1.0.0">
            						<span className="menu-link-text" data-reactid=".0.1.2.0.4.1.0.0.0">ACT Chat</span>
            					</a>
            				</li>
            				<li className="" data-reactid=".0.1.2.0.4.1.1">
            					<a href="#" data-reactid=".0.1.2.0.4.1.1.0">
            						<span className="menu-link-text" data-reactid=".0.1.2.0.4.1.1.0.0">Technical Help</span>
            					</a>
            				</li>
            				<li className="" data-reactid=".0.1.2.0.4.1.2">
            					<a href="#" data-reactid=".0.1.2.0.4.1.2.0">
            						<span className="menu-link-text" data-reactid=".0.1.2.0.4.1.2.0.0">FAQ</span>
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
