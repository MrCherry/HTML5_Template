$(init);

function init()
{
	initLog();
	initPlugins();
	//initAnalytics();
	
}


/*-------------------- LOG FUNCTION --------------------*/

function initLog()
{
	// usage: log('inside coolFunc', this, arguments);
	// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
	window.log = function f(){ log.history = log.history || []; log.history.push(arguments); if(this.console) { var args = arguments, newarr; args.callee = args.callee.caller; newarr = [].slice.call(args); if (typeof console.log === 'object') log.apply.call(console.log, console, newarr); else console.log.apply(console, newarr);}};
	
	// make it safe to use console.log always
	(function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());){a[d]=a[d]||b;}})
	(function(){try{console.log();return window.console;}catch(a){return (window.console={});}}());
}


/*-------------------- PLUGINS INITIALIZATION --------------------*/

function initPlugins()
{
	
}


/*-------------------- GOOGLE ANALYTICS --------------------*/

function initAnalytics()
{
	var _gaq=[['_setAccount','UA-XXXXXXXX-X'],['_trackPageview']];

	(function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
	g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
	s.parentNode.insertBefore(g,s)}(document,'script'));
}


/*-------------------- MISC FUNCTIONS --------------------*/ 

jQuery.fn.center = function()
{
	this.css("position","absolute");
	this.css("top", (($(window).height() - this.outerHeight()) / 2) + $(window).scrollTop() + "px");
	this.css("left", (($(window).width() - this.outerWidth()) / 2) + $(window).scrollLeft() + "px");
	return this;
}

