# angular-risk-matrix
A simple Risk Matrix chart for AngularJS

### Installation

Include the JS and CSS files for the plugin:

```
<link href="css/angular-risk-matrix.min.css" rel="stylesheet">
<script src="js/angular-risk-matrix.min.js"></script>
```

Add the module dependency in your AngularJS app:

```
angular.module('myModule', ['angular-risk-matrix']);
```

### Usage

#### Basic

```
<risk-matrix data="data.risks" likelihood="data.likelihoodValues" impact="data.impactValues"></risk-matrix>
```

#### Attributes

##### Required

###### data

An array of your risk data objects with the following property structure (at a minimum):

````
$scope.data.risks = [
	{
		Id: 1,
		RiskLikelihood: 'High',
		RiskImpact: 'Low'
	},
	{
		Id: 2,
		RiskLikelihood: 'Medium',
		RiskImpact: 'High'
	},
	{
		Id: 3,
		RiskLikelihood: 'Low',
		RiskImpact: 'Very High'
	},
	{
		Id: 4,
		RiskLikelihood: 'Very High',
		RiskImpact: 'Very High'
	}
];
````

###### likelihood

An array of 5 likelihood values from low to high corresponding with your data, for example:

```
$scope.data.likelihoodValues = [
	'Very Low','Low','Medium','High','Very High'
];
```
You can change these values to correspond with the five values you are using to quantify likelihood.

###### impact

An array of 5 impact values from low to high corresponding with your data, for example:

```
$scope.data.impactValues = [
	'Very Low','Low','Medium','High','Very High'
];
```
You can change these values to correspond with the five values you are using to quantify impact.

##### Optional

###### template

You can optionally define your own template string which will be compiled. The template controlls the format of the html when the risk is hovered over.

Use 'item' to refer to the current risk item:

```
$scope.data.riskTemplate = '<div class="closed"><span ng-bind="item.Id"></span></div><div class="open"><div class="title" ng-bind="item.Title"></div><div ng-bind="\'Likelihood: \'+item.RiskLikelihood"></div><div ng-bind="\'Impact: \'+item.RiskImpact"></div><div ng-bind="\'Priority: \'+item.Priority"></div></div>';
```

