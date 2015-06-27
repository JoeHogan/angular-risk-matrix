(function(){

	var riskMatrix = angular.module('riskMatrix', [])

	.directive('riskMatrix', ['$compile',function($compile) {
		return {
			restrict: 'E',
			scope: {
				items: '=data',
				likelihood: '=likelihood',
				impact: '=impact',
				template: '=?template'
			},
			link: function(scope, element, attrs) {
				var createMatrix = function(template){
					var rm = $compile(template)(scope);
					element.empty();
					element.append(rm);
					rm.css('height',rm[0].clientWidth+'px'); //make a square
					var col = 0;
					for(var i = 0; i < 25; i++){
						(function(j){
							var row = j%5;
							var risk = 'low';
							if((col == 1 && row < 3) || (col == 2 && row < 4) || j == 18 || j == 24){
								risk = 'medium';
							}
							if((col == 3 && row < 3) || (col == 4 && row < 4) || j == 10){
								risk = 'high';
							}
							rm.append('<div class="risk-box col-'+col+' row-'+row+' '+risk+'-risk"></div>');
							if(row == 4) col++;
						})(i);
					}
				};
				if(attrs.template){
					scope.$watch('template', function(){
						if(scope.template){
							createMatrix('<div class="risk-matrix"><div class="left-label">Likelihood</div><div class="bottom-label">Impact</div><div style="position:absolute;width:100%;height:100%;"><div risk-matrix-item ng-repeat="item in items" class="risk-matrix-item" style="position:absolute;">'+scope.template+'</div></div></div>');
						}
					});
				}
				else{
					createMatrix('<div class="risk-matrix"><div class="left-label">Likelihood</div><div class="bottom-label">Impact</div><div style="position:absolute;width:100%;height:100%;"><div risk-matrix-item ng-repeat="item in items" class="risk-matrix-item" style="position:absolute;"><div class="closed"><span ng-bind="item.Id"></span></div><div class="open"><div ng-bind="\'Likelihood: \'+item.RiskLikelihood"></div><div ng-bind="\'Impact: \'+item.RiskImpact"></div></div></div></div></div>');
				}
			}
		};
	}])
	
	.directive('riskMatrixItem', ['$timeout',function($timeout) {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				element.css({left:((Math.random()*90)+5)+'%', bottom:((Math.random()*90)+5)+'%'});
				scope.$watch('item',function(){
					$timeout(
						function(){
							element.css({left:(((scope.impact.indexOf(scope.item.RiskImpact))*20)+(Math.random()*10)+5)+'%', bottom:(((scope.likelihood.indexOf(scope.item.RiskLikelihood))*20)+(Math.random()*10)+5)+'%'});
						},
					500);
				},true);
			}
		};
	}]);
	
})();
