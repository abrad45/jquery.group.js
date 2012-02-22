# jquery.group.js #
### by Alexander Bradley ###

## Introduction ##

This jQuery plugin allows you to group items that match a selector into groups: essentially this is like jQuery's .groupAll() function, but with determined sizes. It was designed to be used before cycling to enable convenient cycling of sets of elements.

## Usage ##

For instance, if you type:

    $('#primary-content').find('p').group(3);

then `#primary-content` with five children paragraphs will result in: 

	<div id="primary-content">
		<div class="group">
			<p></p>
			<p></p>
			<p></p>
		</div>
		<div class="group">
			<p></p>
			<p></p>
		</div>
	</div>

All children of 'p' tags will remain unaffected, and all siblings of the items being grouped which appear between the first and last items being grouped will appear around the div.group items. Though `div` and `group` are the plugin's default wrapping item and class, respectively, both can be customized:

	$('#primary-content').find('p').group('span', '.set', '#item_');

You can pass parameters to jquery.group.js in any order: since each string has a different prefix, the plugin can parse them appropriately (thanks to [Sean Catchpole's idTabs](http://www.sunsean.com/idTabs/) for inspiration, here). The above, if run on `#primary-content` with three paragraphs, will result in the following (the default size of the groups is 2):

	<div id="primary-content">
		<span class="set" id="item_1">
			<p></p>
			<p></p>
		</span>
		<span class="set" id="item_2">
			<p></p>
		</span>
	</div>

Finally. if you run the plugin on items which are not sequential or don't share a parent, by default, the plugin will not group them out of their original containers. For instance. if you've got this structure:

	<div id="primary-content">
		<p></p>
		<p></p>
		<span></span>
		<p></p>
	</div>
	<div id="secondary-content">
		<p></p>
		<p></p>
	</div>

and run this jQuery:

	$('#primary-content, #secondary-content').find('p').group(4);
	
the result will be:

	<div id="primary-content">
		<div class="group">
			<p></p>
			<p></p>
			<p></p>
		</div>
		<span></span>
	</div>
	<div id="secondary-content">
		<div class="group">
			<p></p>
			<p></p>
		</div>
	</div>
	
### All Settings ###

	var settings = {
		'size': 2,
		'elem': 'span',
		'elem_class': '.group',
		'id_prefix': '',
		'classing': false
	}