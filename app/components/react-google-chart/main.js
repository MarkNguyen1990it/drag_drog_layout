/**
 * External dependencies
 */
import React from 'react'
import {render} from 'react-dom';
var Chart = require('../react-google-chart');


var configGA = {
	filter: [{
    	ids: "ga:93244845",
    	startDate: "150daysAgo",
    	endDate: "yesterday",
    	metrics: "ga:users,ga:screenviews,ga:sessions"
    }, {
    	ids: "ga:93805513",
    	startDate: "150daysAgo",
    	endDate: "yesterday",
    	metrics: "ga:users,ga:screenviews,ga:sessions"
    }, {
    	ids: "ga:93209390",
    	startDate: "150daysAgo",
    	endDate: "yesterday",
    	metrics: "ga:users,ga:screenviews,ga:sessions"
    }],
  properties: ["Type", "KTVN Apps", "WRCB Apps", "WWTV Apps"],
	options: {
		isStacked: 'percent',
		legend: {
			position: 'bottom'
		},
		hAxis: {
			minValue: 0,
			ticks: [0, 1],
			baselineColor: 'none'
		},
		vAxis: {
			textPosition: 'in',
			baselineColor: 'none',
			textStyle: {
				textTransform: 'uppercase',
				color: '#FFF',
				auraColor: 'none',
				fontSize: 18
			}
		},
		colors: ['#2D8DAD', '#78EFF5', '#F04516', 'FA0768'],
		bar: {
			groupWidth: '80%'
		}
	}
};

var GABarChart = React.createClass( {
  displayName: 'DashboardV2-GABarChart',

  getInitialState: function(){

    return {

    };
  },



	setRow : function(row){
		this.setState({row:row});
	},

	render: function() {
		var height = 250+ "px";
		return (
			<div className="chart__box">
					<div className="chart-horizontal" >
						<Chart chartType = "ScatterChart" data = {[     ['Age', 'Weight'], [ 8,      12], [ 4,      5.5]]} options = {{}} graph_id = "ScatterChart"  width={"100%"} height={"400px"}  legend_toggle={true} />
					</div>
			</div>
		);
	}
} );

module.exports = GABarChart;
