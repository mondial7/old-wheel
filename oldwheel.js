
var OldWheel = ( function(){

	"use strict";

	var _OldWheel = {

		helpers : {}

	};

	/* XHR - Ajax Requests */

    // http get request to server with callback
    _OldWheel.get = function(data, callback){

        data.method = "get";

        _OldWheel.http(data,callback);

    }

    // http post request to server with callback
    // content_type is optional
    _OldWheel.post = function(data, callback, content_type){
        
        // If content_type is define add info to data object
        if(typeof content_type !== "undefined"){
            data.type = content_type;
        }

        data.method = "post";

        _OldWheel.http(data, callback);

    }

    _OldWheel.http = function(data, callback){

        var xmlhttp = new XMLHttpRequest();
        
        xmlhttp.onreadystatechange = function() {
        
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                // Debug: print result on console
                //console.log(xmlhttp.responseText);
                // Execute callback function
                callback(xmlhttp.responseText);
            }
        
        };
        
        xmlhttp.open(data.method, data.url, true);

        if(data.method === "post"){
        
            if(typeof data.type !== "undefined" && data.type === "json"){
            
                xmlhttp.setRequestHeader("Content-type", "application/json");
            
            } else if(typeof data.type !== "undefined" && data.type !== ""){
            
                xmlhttp.setRequestHeader("Content-type", data.type);
            
            } else {

                xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");        
            
            }
        
        }
        
        xmlhttp.send(data.parameters);
    
    }

    /* Layout utility */

	_OldWheel.hide = function( elem, opt ){

		opt.action = "hide";

		changeVisibility(elem, opt);

	}

	_OldWheel.show = function( elem, opt ){

		opt.action = "show";

		changeVisibility(elem, opt);

	}

	// Change visibility of the given dom element
	// Elem is required and other parameters are optional
	var changeVisibility = function ( elem, opt ){

		// Define className
		if (typeof opt.action === "undefined" || 
			action === "show") {

			_className1 = "visible";
			_className2 = "hidden";
		
		} else {
		
			_className1 = "hidden";
			_className2 = "visible";
		
		}

		// Define style
		if (typeof opt.extra_style === "undefined") {

			_style_hide = "display:none";
			_style_show = "display:block";
		
		} else {
		
			_style_hide = opt.extra_style.hide;
			_style_show = opt.extra_style.show;
		
		}

		if (typeof opt.use_style !== "undefined" &
			opt.use_style === true) {

			if (opt.action === "hide") {
				
				elem.setAttribute("style", _style_hide);

			} else {

				elem.setAttribute("style", _style_show);

			}

		} else {

			elem.classList.add( _className1 );
			elem.classList.remove( _className2 );

		}

	};


    /* General Helpers functions */

	// helper to set multiple attributes on a node
	_OldWheel.setAttributes = function(element, attributes) {

	    for(var key in attributes) {
	        element.setAttribute(key, attributes[key]);
	    }
	
	}

	// Smooth scroll
	_OldWheel.scrollTo = function(id, time, extra_offset) {
	    
	    // Set default transition time
	    if(typeof time === "undefined" || time == null){
	        time = 400;
	    }
	    
	    // Set default offset from top
	    // Useful in case of fixed header
	    if(typeof extra_offset === "undefined" || extra_offset == null){
	        extra_offset = 0;
	    }
	    
	    var target = document.getElementById(id),
	        to = target.offsetTop - extra_offset;
	    
	    _OldWheel.animateScroll(document.body, "scrollTop", "", window.pageYOffset, to, time, true);

	}

	_OldWheel.animateScroll = function(elem, style, unit, from, to, time, prop) {
	    
	    if( !elem) return;

	    var start = new Date().getTime(),
	        timer = setInterval(function() {
	            var step = Math.min(1,(new Date().getTime()-start)/time);
	            if (prop) {
	                elem[style] = (from+step*(to-from))+unit;
	            } else {
	                elem.style[style] = (from+step*(to-from))+unit;
	            }
	            if( step == 1) clearInterval(timer);
	        },25);

	    elem.style[style] = from+unit;

	}

	// Shuffle a one dimension array
	_OldWheel.shuffle = function(array){

		var currentIndex = array.length, temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	}


	/* Rare Helpers functions */

	// Prevent page loading for anchors link
	// Useful when using <base> tag
    _OldWheel.lockAnchors = function(){

	    var anchors = document.getElementsByTagName("a"),
	    	link;

	    for (var i = 0; i < anchors.length; i++) {
	        
	        link = anchors[i].getAttribute("href");

	        if ( link && link.charAt(0) == "#" ) {

	            anchors[i].addEventListener("click", function(e){
	                
	                e.preventDefault();
	                window.location.hash = link;

	            });

	        }
	    }

    }


    /* Windows events listeners */

    /*
	window.addEventListener("load", function(){  

		//

	});
	*/

	/* Publish the object */

	return _OldWheel;

})();