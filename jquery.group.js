/* 
 * jQuery Group Plugin
 * Examples and Documentation at 
 * https://github.com/abrad45/jquery.group.js
 * Copyright (c) 2011-2012 Alexander Bradley
 * Version 1.0.0 (22 February 2012 20:49 EST)
 * Dual licensed under the MIT and GPL licenses.
 * Requires jQuery 1.4
 */


(function($){
	$.fn.group = function(args) {
		//Loop Arguments matching options 
		var options = {}; 
		for(var i = 0; i < arguments.length; ++i) { 
			var a = arguments[i]; 
			switch(a.constructor) { 
				case Object: 
					$.extend(options,a); 
					break; 
				case Boolean: 
					options.classing = a; 
					break; 
				case Number: 
					options.size = a; 
					break; 
				case String: 
					if(a.charAt(0) === '.') {
						options.elem_class = a.substr(1);
					} else if(a.charAt(0) === '#') {
						options.id_prefix = a.substr(1); 
					} else {
						options.elem = a;
					}
				break;
			} 
		} 
		
		function log() {
			window.console && console.log && console.log('[cycle] ' + Array.prototype.join.call(arguments,' '));
		}
		
		// count iterates through $this
		var $this = this;
		var count = 0;
		var id_suffix = 0;
		var $ret = $();
		var is_list = false;
		
		var settings = {
			'size': 2,
			'elem': 'div',
			'elem_class': 'group',
			'id_prefix': '',
			'classing': false
		}
		var s = $.extend({},settings,options); 
		var wrap_attrs = {
			class: s.elem_class
		};
		
		// we'll treat lists differently to ensure valid html structure
		if($this.first()[0].nodeName === 'LI') {
			is_list = true;
		}
		
		// s.size === 1 loops infinitely
		if(s.size === 1) {
			log('Just use .wrap(), man!');
			return this;
		}

		while(count < $this.length) {
			$tmp = $this.eq(count);
					
			while($tmp.length < s.size) {
				// here we check to make sure that the next element exists 
				// and that it shares a parent with the current element
			    if($this.eq(count).length && ($tmp.last().parent()[0] === $this.eq(count).parent()[0])) {
			        $tmp = $tmp.add($this.eq(count++));
			    } else {
			        break;
			    }
			}
			
			if(s.id_prefix.length) {
				wrap_attrs = $.extend(wrap_attrs, {id: s.id_prefix + id_suffix++})
			}
			
			if(!is_list) {
				$tmp = $tmp.wrapAll($('<' + s.elem +  '>', wrap_attrs));
				
				if($tmp.first()[0] === $tmp.last()[0]) {
					// not possible at this time. May be added in the future
					$tmp.first().addClass('only-child');
				} else {
					$tmp.first().addClass('first-child');
					$tmp.last().addClass('last-child');
				}
				
				$tmp = $tmp.parent();
			} else {
				$tmp = $tmp.wrapAll('<ul>');
				if($tmp.first()[0] === $tmp.last()[0]) {
					// not possible at this time. May be added in the future
					$tmp.first().addClass('only-child');
				} else {
					$tmp.first().addClass('first-child');
					$tmp.last().addClass('last-child');
				}
				
				$tmp = $tmp.parent().wrapAll($('<li>', wrap_attrs)).parent();
			}
		
			
			$ret = $ret.add($tmp);
		}
		
		return $ret;
	}
})(jQuery);