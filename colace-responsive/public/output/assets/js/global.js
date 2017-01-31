$(document).ready(function(){
	
//Secondary Navigation
	$("#navigation li.subnav").hover(function(){
		clearTimeout($(this).data('timeout'));
		$("#header").addClass("shownav");
		$(this).find("ul.secondary").stop(true,true).fadeIn(100);
	}, function(){ 
		var t = setTimeout(function() {
			$("ul.secondary").stop(true,true).fadeOut(100, function() { 
				$("#header").removeClass("shownav"); 
			});
		}, 600);
		$(this).data('timeout', t);
	});
	$("#navigation li a.effect").hover(function(){
		$("#header").removeClass("shownav");
		$("ul.secondary").stop(true,true).fadeOut(100);
	});

//Share Modal
	$("a[rel=modal]").click(function(e){
        e.preventDefault();
        var id = $(this).attr('href'),
			idH = $(id).height() + 80,
			winH = $(window).height(),
			docH = $(document).height(),
			docW = $(window).width();
        $("#mask").css({"width": docW, "height": docH}).fadeTo(400, 0.6);
        $(id).fadeIn(600);
		if (idH > winH) { 
			$("#share").css({"position":"absolute"});
		}
	});
	$("a.modal-close, div.modal a.cancel, div.modal a.close").click(function(){
		$('#mask, div.modal').hide();
	});
	//THIS IS FOR DEMONSTRAION ONLY REMOVE WHEN FORM IS IMPLEMENTED
	$("#share input[type=submit]").click(function(){
		$(this).parent("div.form").hide().next("div.thanks").fadeIn(200);
	});
	
//Share Links
	var pageTitle = $("h1").eq(0).text();   /*  grabs the title via h1 tag */
    var pageURL = window.location.href;  /*  grabs the page url */
	
	$("#main .sidebar .share a.twitter").attr("href", "http://twitter.com/share?text=ColaceCapsules.com - "+pageTitle);
	$("#main .sidebar .share a.facebook").attr("href", "http://www.facebook.com/sharer.php?u="+pageURL);
	$("#share textarea").append(pageURL);

//Exit Confirmation
	$("a[rel=external]").click(function (e) {
		var targetURL = $(this).attr("href");
		//var targetURL = e.target;
		e.preventDefault();
		confirm_modal("", function () {
			window.open(targetURL);
		});
	});

//Footer
	var $footerExpand = $("#footer").find(".content.expand"),
		$footerBoxes = $("#footer").find(".product-boxes"),
		$homeContent = $("#home #main .content p"),
		origH = $footerExpand.height();
		expandH = 290,
		footerSpeed = 400,
		footerSpeedSlow = 200;
	$("#footer a.expand-toggle").click(function(){
		$footerExpand.animate({height:expandH}, footerSpeed).find(".original").hide().next(".new").fadeIn(footerSpeed);
		$footerBoxes.animate({top:"-260px"}, footerSpeed).find("img.peri").animate({left:0}, footerSpeed);
		$homeContent.fadeOut(400);
		return false;
	});
	$("#footer a.expand-close").click(function(){
		$footerExpand.animate({height:origH}, footerSpeed).find(".new").hide().prev(".original").fadeIn(footerSpeed);;
		$footerBoxes.animate({top:"-190px"}, footerSpeed).find("img.peri").animate({left:"-60px"}, footerSpeed);
		$homeContent.fadeIn(300);
		return false;
	});
	
//Forms
	//show default select value
	$("div.select-style").each(function () {
        $this = $(this);
        var thisText = $this.find("select option:selected").text();
        $this.append("<span>" + thisText + "</span>");
    });
	//change select value
    $("div.select-style select").change(function(){
        $this = $(this);
        var thisText = $this.val();
        $this.next("span").text(thisText);
    });
	//tell a friend
	$("#main .content span.refer").click(function(){
		var $check = $(this),
			$refer = $("#main .content div.refer");
		if ($check.hasClass("checked")) {
			$refer.slideUp(200);
			$refer.find("input").attr("value", "");
			$check.removeClass("checked");
		} else {
			$refer.slideDown(400);
			$check.addClass("checked");
		}
	});
	
//Random Sidebar Quote
	//var randomQuote = Math.floor(Math.random() * $("#main .sidebar .bubble .quote").length);
	//$("#main .sidebar .bubble .quote").eq(randomQuote).show();
	
//Community
	var sortQuote = $("#main .content div.bubble").get().sort(function(){ 
	  return Math.round(Math.random())-0.5;
	});
	if ($("body").hasClass('community')) {
		$(sortQuote).appendTo(sortQuote[0].parentNode).filter(":lt(4)").show();
		quoteClasses();
	}
	$("#main .content a.showmore.bubbles").click(function(){
		if ($(this).hasClass("active")){ 
			$("#main .content div.bubble").hide();
			$("#main .content div.bubble:lt(4)").fadeIn(200, function(){ sidebarHeight(); });
			$(this).text("SHOW MORE +").removeClass("active");
		} else {
			$("#main .content div.bubble:gt(3)").fadeIn(400);
			$(this).text("SHOW LESS -").addClass("active");
			sidebarHeight();
		}
		return false;
	});
	
//Recipes
	$("#recipes a.recipe").each(function(){
		var recipeName = $(this).attr("title");
		$(this).find("div").append("<span>"+recipeName+"<img src='/assets/img/global/white-arrow.png' /></span>");
	});
	$("#recipes a.recipe").hover(function(){
		$recipeAnim = $(this).find("img.thumb");
		if (!$(this).hasClass("active")) {
			$recipeAnim.stop(true,true).fadeTo(400, 0.4).next("span").animate({'opacity':1}, 400);
		}
	}, function(){if (
		!$(this).hasClass("active")) {
			$recipeAnim.fadeTo(400, 1).next("span").animate({'opacity':0}, 200);
		}
			
	});
	$("#recipes.index a.recipe:lt(8)").show();
	
	//Show More
	$("#main .content a.showmore.recipes").click(function(){
		if ($(this).hasClass("active")){ 
			$("#main .content a.recipe").hide();
			$("#main .content a.recipe:lt(8)").fadeIn(200, function(){ sidebarHeight(); });
			$(this).text("SHOW MORE +").removeClass("active");
		} else {
			$("#main .content a.recipe:gt(7)").fadeIn(400);
			$(this).text("SHOW LESS -").addClass("active");
			sidebarHeight();
		}
		return false;
	});
	//Carousel
	var pathname = window.location.pathname,
		$recipes = $("#recipes.carousel"),
		recipeW = $recipes.find("a.recipe:first").width(),
		recipeTotal = $recipes.find("a.recipe").size(),
		containerW = recipeTotal * recipeW,
		lastRow = (recipeTotal - 5);
	$recipes.find("a.recipe").each(function(){ //set active recipe
		if ($(this).attr("href") == pathname) {
			$(this).addClass('current active');
		}
	});
	var currentRecipe = $recipes.find("a.current").index();
	if (currentRecipe <= 1) {
		$recipes.find("a.prev").addClass("inactive");
		$recipes.find("a.current").removeClass("current")
		$recipes.find("a:nth-child(2)").addClass("current");
	} else if (currentRecipe > (lastRow+1)) {
		$recipes.find("a.next").addClass("inactive");
		newCurrent = lastRow + 3;
		$recipes.find("a.current").removeClass("current")
		$recipes.find("a:nth-child("+newCurrent+")").addClass("current");
	}
	if (currentRecipe > lastRow + 1) {
		var moveLeft = -((recipeW * (lastRow + 1)));
	} else if (currentRecipe == 0) {
		var moveLeft = 0;
	} else {
		var moveLeft = -((recipeW * currentRecipe) - recipeW);
	}
	$recipes.find(".recipe-container").width(containerW).animate({"left":moveLeft}, 200);
	//carousel directional nav
	$recipes.find("a.next").click(function(){ //next button
		if (!$(this).hasClass("inactive")) {
			var $active = $recipes.find("a.current"),
				$next = $active.next();
				currentRecipe = $next.index();
			if (currentRecipe < (lastRow+3)) {
				$recipes.find(".recipe-container").animate({"left":"-="+recipeW},200);
			}
			if (currentRecipe != recipeTotal) {
				$active.removeClass("current");
				$next.addClass("current");
				$recipes.find("a.prev").removeClass("inactive");
			}
			if (currentRecipe == (lastRow + 2)) {
				$recipes.find("a.next").addClass("inactive");
			}
		}
	});
	$recipes.find("a.prev").click(function(){ //prev button
		var $active = $recipes.find("a.current"),
			$prev = $active.prev();
			currentRecipe = $prev.index();
		if (currentRecipe <=1) {
			$recipes.find("a.prev").addClass("inactive");
		}
		if (currentRecipe > 0) {
			$recipes.find(".recipe-container").animate({"left":"+="+recipeW},200);
			$active.removeClass("current");
			$prev.addClass("current");
		}
		if (currentRecipe > (lastRow-2)) {
			$recipes.find("a.next").removeClass("inactive");
		}
		return false;
	});
	
	sidebarHeight();
});

function quoteClasses() {
	$("#main .content div.bubble:nth-child(even)").addClass("right");
	$("#main .content div.bubble").not(".right").filter(":odd").addClass("lightblue");
	$("#main .content div.bubble.right").filter(":even").addClass("darkblue");
	sidebarHeight();
}
function sidebarHeight() {
	var contentH = $("#main .content").innerHeight();
	$("#main .sidebar").height(contentH); 
}

function confirm_modal(message, callback) {
	$('#confirm').modal({
		closeHTML:"",
		position: ["35%",],
		overlayId:'confirm-overlay',
		containerId:'confirm-container', 
		onShow: function (dialog) {
			$('.proceed', dialog.data[0]).click(function () {
				if ($.isFunction(callback)) {
					callback.apply();
				}
				$.modal.close();
			});
		}
	});
}

/* Modernizr 2.6.2 (Custom Build) | MIT & BSD */
;window.Modernizr=function(a,b,c){function z(a){j.cssText=a}function A(a,b){return z(m.join(a+";")+(b||""))}function B(a,b){return typeof a===b}function C(a,b){return!!~(""+a).indexOf(b)}function D(a,b){for(var d in a){var e=a[d];if(!C(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function E(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:B(f,"function")?f.bind(d||b):f}return!1}function F(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+o.join(d+" ")+d).split(" ");return B(b,"string")||B(b,"undefined")?D(e,b):(e=(a+" "+p.join(d+" ")+d).split(" "),E(e,b,c))}var d="2.6.2",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n="Webkit Moz O ms",o=n.split(" "),p=n.toLowerCase().split(" "),q={},r={},s={},t=[],u=t.slice,v,w=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},x={}.hasOwnProperty,y;!B(x,"undefined")&&!B(x.call,"undefined")?y=function(a,b){return x.call(a,b)}:y=function(a,b){return b in a&&B(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=u.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(u.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(u.call(arguments)))};return e}),q.csstransforms3d=function(){var a=!!F("perspective");return a&&"webkitPerspective"in g.style&&w("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(b,c){a=b.offsetLeft===9&&b.offsetHeight===3}),a};for(var G in q)y(q,G)&&(v=G.toLowerCase(),e[v]=q[G](),t.push((e[v]?"":"no-")+v));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)y(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},z(""),i=k=null,function(a,b){function k(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function l(){var a=r.elements;return typeof a=="string"?a.split(" "):a}function m(a){var b=i[a[g]];return b||(b={},h++,a[g]=h,i[h]=b),b}function n(a,c,f){c||(c=b);if(j)return c.createElement(a);f||(f=m(c));var g;return f.cache[a]?g=f.cache[a].cloneNode():e.test(a)?g=(f.cache[a]=f.createElem(a)).cloneNode():g=f.createElem(a),g.canHaveChildren&&!d.test(a)?f.frag.appendChild(g):g}function o(a,c){a||(a=b);if(j)return a.createDocumentFragment();c=c||m(a);var d=c.frag.cloneNode(),e=0,f=l(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function p(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return r.shivMethods?n(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+l().join().replace(/\w+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(r,b.frag)}function q(a){a||(a=b);var c=m(a);return r.shivCSS&&!f&&!c.hasCSS&&(c.hasCSS=!!k(a,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),j||p(a,c),a}var c=a.html5||{},d=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,e=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,f,g="_html5shiv",h=0,i={},j;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",f="hidden"in a,j=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){f=!0,j=!0}})();var r={elements:c.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:c.shivCSS!==!1,supportsUnknownElements:j,shivMethods:c.shivMethods!==!1,type:"default",shivDocument:q,createElement:n,createDocumentFragment:o};a.html5=r,q(b)}(this,b),e._version=d,e._prefixes=m,e._domPrefixes=p,e._cssomPrefixes=o,e.testProp=function(a){return D([a])},e.testAllProps=F,e.testStyles=w,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+t.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("index.html").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};

//modal for exit window
;(function($){var ie6=$.browser.msie&&parseInt($.browser.version)==6&&typeof window['XMLHttpRequest']!="object",ieQuirks=null,w=[];$.modal=function(data,options){return $.modal.impl.init(data,options);};$.modal.close=function(){$.modal.impl.close();};$.fn.modal=function(options){return $.modal.impl.init(this,options);};$.modal.defaults={appendTo:'body',focus:true,opacity:50,overlayId:'simplemodal-overlay',overlayCss:{},containerId:'simplemodal-container',containerCss:{},dataId:'simplemodal-data',dataCss:{},minHeight:200,minWidth:300,maxHeight:null,maxWidth:null,autoResize:false,zIndex:90000,close:true,closeHTML:'<a class="modalCloseImg" title="Close"></a>',closeClass:'simplemodal-close',escClose:true,overlayClose:false,position:null,persist:false,onOpen:null,onShow:null,onClose:null};$.modal.impl={opts:null,dialog:{},init:function(data,options){if(this.dialog.data){return false;}ieQuirks=$.browser.msie&&!$.boxModel;this.opts=$.extend({},$.modal.defaults,options);this.zIndex=this.opts.zIndex;this.occb=false;if(typeof data=='object'){data=data instanceof jQuery?data:$(data);if(data.parent().parent().size()>0){this.dialog.parentNode=data.parent();if(!this.opts.persist){this.dialog.orig=data.clone(true);}}}else if(typeof data=='string'||typeof data=='number'){data=$('<div></div>').html(data);}else{alert('SimpleModal Error: Unsupported data type: '+typeof data);return false;}this.create(data);data=null;this.open();if($.isFunction(this.opts.onShow)){this.opts.onShow.apply(this,[this.dialog]);}return this;},create:function(data){w=this.getDimensions();if(ie6){this.dialog.iframe=$('<iframe src="javascript:false;"></iframe>').css($.extend(this.opts.iframeCss,{display:'none',opacity:0,position:'fixed',height:w[0],width:w[1],zIndex:this.opts.zIndex,top:0,left:0})).appendTo(this.opts.appendTo);}this.dialog.overlay=$('<div></div>').attr('id',this.opts.overlayId).addClass('simplemodal-overlay').css($.extend(this.opts.overlayCss,{display:'none',opacity:this.opts.opacity/100,height:w[0],width:w[1],position:'fixed',left:0,top:0,zIndex:this.opts.zIndex+1})).appendTo(this.opts.appendTo);this.dialog.container=$('<div></div>').attr('id',this.opts.containerId).addClass('simplemodal-container').css($.extend(this.opts.containerCss,{display:'none',position:'fixed',zIndex:this.opts.zIndex+2})).append(this.opts.close&&this.opts.closeHTML?$(this.opts.closeHTML).addClass(this.opts.closeClass):'').appendTo(this.opts.appendTo);this.dialog.wrap=$('<div></div>').attr('tabIndex',-1).addClass('simplemodal-wrap').css({height:'100%',outline:0,width:'100%'}).appendTo(this.dialog.container);this.dialog.data=data.attr('id',data.attr('id')||this.opts.dataId).addClass('simplemodal-data').css($.extend(this.opts.dataCss,{display:'none'})).appendTo('body');data=null;this.setContainerDimensions();this.dialog.data.appendTo(this.dialog.wrap);if(ie6||ieQuirks){this.fixIE();}},bindEvents:function(){var self=this;$('.'+self.opts.closeClass).bind('click.simplemodal',function(e){e.preventDefault();self.close();});if(self.opts.close&&self.opts.overlayClose){self.dialog.overlay.bind('click.simplemodal',function(e){e.preventDefault();self.close();});}$(document).bind('keydown.simplemodal',function(e){if(self.opts.focus&&e.keyCode==9){self.watchTab(e);}else if((self.opts.close&&self.opts.escClose)&&e.keyCode==27){e.preventDefault();self.close();}});$(window).bind('resize.simplemodal',function(){w=self.getDimensions();self.opts.autoResize?self.setContainerDimensions():self.setPosition();if(ie6||ieQuirks){self.fixIE();}else{self.dialog.iframe&&self.dialog.iframe.css({height:w[0],width:w[1]});self.dialog.overlay.css({height:w[0],width:w[1]});}});},unbindEvents:function(){$('.'+this.opts.closeClass).unbind('click.simplemodal');$(document).unbind('keydown.simplemodal');$(window).unbind('resize.simplemodal');this.dialog.overlay.unbind('click.simplemodal');},fixIE:function(){var p=this.opts.position;$.each([this.dialog.iframe||null,this.dialog.overlay,this.dialog.container],function(i,el){if(el){var bch='document.body.clientHeight',bcw='document.body.clientWidth',bsh='document.body.scrollHeight',bsl='document.body.scrollLeft',bst='document.body.scrollTop',bsw='document.body.scrollWidth',ch='document.documentElement.clientHeight',cw='document.documentElement.clientWidth',sl='document.documentElement.scrollLeft',st='document.documentElement.scrollTop',s=el[0].style;s.position='absolute';if(i<2){s.removeExpression('height');s.removeExpression('width');s.setExpression('height',''+bsh+' > '+bch+' ? '+bsh+' : '+bch+' + "px"');s.setExpression('width',''+bsw+' > '+bcw+' ? '+bsw+' : '+bcw+' + "px"');}else{var te,le;if(p&&p.constructor==Array){var top=p[0]?typeof p[0]=='number'?p[0].toString():p[0].replace(/px/,''):el.css('top').replace(/px/,'');te=top.indexOf('%')==-1?top+' + (t = '+st+' ? '+st+' : '+bst+') + "px"':parseInt(top.replace(/%/,''))+' * (('+ch+' || '+bch+') / 100) + (t = '+st+' ? '+st+' : '+bst+') + "px"';if(p[1]){var left=typeof p[1]=='number'?p[1].toString():p[1].replace(/px/,'');le=left.indexOf('%')==-1?left+' + (t = '+sl+' ? '+sl+' : '+bsl+') + "px"':parseInt(left.replace(/%/,''))+' * (('+cw+' || '+bcw+') / 100) + (t = '+sl+' ? '+sl+' : '+bsl+') + "px"';}}else{te='('+ch+' || '+bch+') / 2 - (this.offsetHeight / 2) + (t = '+st+' ? '+st+' : '+bst+') + "px"';le='('+cw+' || '+bcw+') / 2 - (this.offsetWidth / 2) + (t = '+sl+' ? '+sl+' : '+bsl+') + "px"';}s.removeExpression('top');s.removeExpression('left');s.setExpression('top',te);s.setExpression('left',le);}}});},focus:function(pos){var self=this,p=pos||'first';var input=$(':input:enabled:visible:'+p,self.dialog.wrap);input.length>0?input.focus():self.dialog.wrap.focus();},getDimensions:function(){var el=$(window);var h=$.browser.opera&&$.browser.version>'9.5'&&$.fn.jquery<='1.2.6'?document.documentElement['clientHeight']:$.browser.opera&&$.browser.version<'9.5'&&$.fn.jquery>'1.2.6'?window.innerHeight:el.height();return[h,el.width()];},getVal:function(v){return v=='auto'?0:parseInt(v.replace(/px/,''));},setContainerDimensions:function(){var ch=this.getVal(this.dialog.container.css('height')),cw=this.getVal(this.dialog.container.css('width')),dh=this.dialog.data.height(),dw=this.dialog.data.width();var mh=this.opts.maxHeight&&this.opts.maxHeight<w[0]?this.opts.maxHeight:w[0],mw=this.opts.maxWidth&&this.opts.maxWidth<w[1]?this.opts.maxWidth:w[1];if(!ch){if(!dh){ch=this.opts.minHeight;}else{if(dh>mh){ch=mh;}else if(dh<this.opts.minHeight){ch=this.opts.minHeight;}else{ch=dh;}}}else{ch=ch>mh?mh:ch;}if(!cw){if(!dw){cw=this.opts.minWidth;}else{if(dw>mw){cw=mw;}else if(dw<this.opts.minWidth){cw=this.opts.minWidth;}else{cw=dw;}}}else{cw=cw>mw?mw:cw;}this.dialog.container.css({height:ch,width:cw});if(dh>ch||dw>cw){this.dialog.wrap.css({overflow:'auto'});}this.setPosition();},setPosition:function(){var top,left,hc=(w[0]/2)-((this.dialog.container.height()||this.dialog.data.height())/2),vc=(w[1]/2)-((this.dialog.container.width()||this.dialog.data.width())/2);if(this.opts.position&&Object.prototype.toString.call(this.opts.position)==="[object Array]"){top=this.opts.position[0]||hc;left=this.opts.position[1]||vc;}else{top=hc;left=vc;}this.dialog.container.css({left:left,top:top});},watchTab:function(e){var self=this;if($(e.target).parents('.simplemodal-container').length>0){self.inputs=$(':input:enabled:visible:first, :input:enabled:visible:last',self.dialog.data);if(!e.shiftKey&&e.target==self.inputs[self.inputs.length-1]||e.shiftKey&&e.target==self.inputs[0]||self.inputs.length==0){e.preventDefault();var pos=e.shiftKey?'last':'first';setTimeout(function(){self.focus(pos);},10);}}else{e.preventDefault();setTimeout(function(){self.focus();},10);}},open:function(){this.dialog.iframe&&this.dialog.iframe.show();if($.isFunction(this.opts.onOpen)){this.opts.onOpen.apply(this,[this.dialog]);}else{this.dialog.overlay.show();this.dialog.container.show();this.dialog.data.show();}this.focus();this.bindEvents();},close:function(){if(!this.dialog.data){return false;}this.unbindEvents();if($.isFunction(this.opts.onClose)&&!this.occb){this.occb=true;this.opts.onClose.apply(this,[this.dialog]);}else{if(this.dialog.parentNode){if(this.opts.persist){this.dialog.data.hide().appendTo(this.dialog.parentNode);}else{this.dialog.data.hide().remove();this.dialog.orig.appendTo(this.dialog.parentNode);}}else{this.dialog.data.hide().remove();}this.dialog.container.hide().remove();this.dialog.overlay.hide().remove();this.dialog.iframe&&this.dialog.iframe.hide().remove();this.dialog={};}}};})(jQuery);