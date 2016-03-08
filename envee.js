angular.module("envee", []).directive("enveeMultiBar",
	function() {
		return {
			restrict: "E",
			replace: true,
			scope: {
				data: "=",
				options: "=?",
				dispatch: "=?"
			},
			transclude: false,
			template: "<div><svg></svg></div>",
			link: function(scope, element) {
				var options = {
					reduceXTicks: true,
					rotateLabels: 0,
					showControls: true,
					showLegend: true,
					groupSpacing: 0.1,
					duration: 500,
					xFormat: d3.format(",f"),
					yFormat: d3.format(",.1f")
				};
				scope.dispatch = d3.dispatch("click");
				var render = function() {
					if (scope.options) {
						options = angular.extend(options, scope.options);
					}
					var chart = nv.models.multiBarChart();
					chart.options(options);
					chart.xAxis.tickFormat(options.xFormat);
					chart.yAxis.tickFormat(options.yFormat);
					d3.select(element[0].children[0]).datum(scope.data).call(chart);
					nv.utils.windowResize(chart.update);
					chart.multibar.dispatch.on("elementClick", function(e) {
						scope.dispatch.click(e);
					});
				};
				scope.$watch("data", function() {
					render();
				}, true);
			}
		}
	}
);





