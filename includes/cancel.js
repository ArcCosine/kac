// ==UserScript==
// @name      keyaction canceler
// @namespace http://looxu.blogspot.com/
// @include   http://www.tumblr.com/*
// @include   http://www.pixiv.net/member_illust.php?mode=manga*
// @include   http://mail.google.com/*
// @include   https://mail.google.com/*
// @include	  http://www.google.com/reader/*
// @include	  https://www.google.com/reader/*
// @include   https://www.google.com/calendar/*
// @include   https://github.com/*
// @include	  http://twitter.com/*
// @include	  https://twitter.com/*
// @author    Arc Cosine
// @version   2.2
// ==/UserScript==
(function(win,doc){

	//You can add more domain and key.
	//Cancel Opera's Action Key
	var PressConf = {
		'www.tumblr.com': 'JK',
		'www.pixiv.net': 'JK',
		'mail.google.com' : 'G',
		'www.google.com' : 'G',
		'twitter.com'    : '.'
	};

	//You can add more domain and key.
	//Cancel Web site's Action Key
	var DefActionConf = {
		'www.google.com' : '12',
		'github.com': 'G'
	};

	function actionCancel(data, conf ){
		var eve = data.eve.event || data.eve;

		if( /INPUT|TEXTAREA/.test(data.tag) ) return;
		var keyList = conf[window.location.host];
		var key = String.fromCharCode(data.key).toUpperCase();
		if( typeof keyList  === "undefined" || typeof key === "undefined" ){ return ; }
		if( keyList.indexOf(key) < 0 ){ return; }
		if( eve.ctrlKey || eve.altKey ){ return; } //if press Ctrlkey  or Altkey then ignore event
		data.eve.preventDefault();
	};

	win.addEventListener('keypress', function(e){
		var data = {
			'eve' : e,
			'tag' : e.target.tagName,
			'key' : e.which
		}
		actionCancel(data, PressConf);
   	},false );

	for( var host in DefActionConf ){
		if( window.location.hostname.indexOf(host) != -1 ) {
			win.opera.addEventListener('BeforeEventListener.keydown',function (e) {
				var data = {
					'eve' : e,
					'tag' : e.event.target.tagName,
					'key' : e.event.keyCode
				}
				actionCancel(data, DefActionConf);
			},false);
		}
	}

})(window,document);
