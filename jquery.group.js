	/*******************************
	********************************
	********* jQuery Group Plugin **
	********************************
	*********** Alexander Bradley **
	*******************************/

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
						options.elem_class = a.substr(1) 
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
		var count = 0;
		var id_suffix = 0;
		var settings = {
			'size': 2,
			'elem': 'span',
			'elem_class': 'group',
			'id_prefix': '',
			'classing': false
		}
			
		var s = $.extend({},settings,options); 
		$this = this;
		
		// s.size === 1 loops infinitely
		if(s.size === 1) {
			log('Just use .wrap(), man!');
			return this;
		}

		while(count < $this.length) {
			$tmp = $this.eq(count);
					
			while($tmp.length < s.size) {
			    if($this.eq(count).length && ($tmp.last().parent()[0] === $this.eq(count).parent()[0])) {
			        $tmp = $tmp.add($this.eq(count++));
			    } else {
			        break;
			    }
			}
			
			$tmp.wrapAll($('<' + s.elem +  '>', { 
				class: s.elem_class,
				id: (s.id_prefix.length ? s.id_prefix + id_suffix++ : '')
			}));
		}
	}
})(jQuery);