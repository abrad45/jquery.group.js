# jquery.group.js #

This jQuery plugin allows you to group items that match a selector into groups: essentially this is like jQuery's .wrapAll() function, but with determined sizes. It can be used to [cycle](http://jquery.malsup.com/cycle/ "jQuery Cycle Plugin") through groups of items, or to create columns out of a set of elements.

## Basic Usage ##

For instance, given this HTML structure:

```html
<div id="primary-content">
	<p></p>
	<p></p>
	<p></p>
	<p></p>
	<p></p>
</div>
```

if you type:

```js
$('#primary-content').find('p').group();
```

the result will be: 

```html
<div id="primary-content">
	<div class="group">
		<p></p>
		<p></p>
	</div>
	<div class="group">
		<p></p>
		<p></p>
	</div>
	<div class="group">
		<p></p>
	</div>
</div>
```

All children of 'p' tags will remain unaffected, and all siblings of the items being grouped which appear between the first and last items being grouped will appear "around" the div.group items. This behavior is demonstrated below.

## Setting Options ##

Though `div` and `group` are the plugin's default wrapping item and class, respectively, both can be customized:

```js
$('#primary-content').find('p').group('span', '.set', '#item_', 3);
```

You can pass parameters to jquery.group.js in any order: since each string has a different prefix, the plugin can parse them appropriately (thanks to [Sean Catchpole's idTabs](http://www.sunsean.com/idTabs/) for inspiration, here). The above, if run on our `#primary-content` from above, will result in the following:

```html
<div id="primary-content">
	<span class="set" id="item_1">
		<p></p>
		<p></p>
		<p></p>
	</span>
	<span class="set" id="item_2">
		<p></p>
		<p></p>
	</span>
</div>
```

## Treatment of Intermingled, Nonselected Elements ##

If you run the plugin on items which are not sequential or don't share a parent, the plugin will not group them out of their original containers. Any siblings of selected items (like the `span` below are ignored). For instance. if you've got this HTML structure:

```html
<div id="primary-content">
	<p></p>
	<p></p>
	<span></span>
	<p></p>
	<p></p>
	<p></p>
</div>
<div id="secondary-content">
	<p></p>
	<p></p>
	<p></p>
</div>
```

and run this jQuery:

```js
$('#primary-content, #secondary-content').find('p').group();
```
	
the result will be:

```html
<div id="primary-content">
	<div class="group">
		<p></p>
		<p></p>
	</div>
	<span></span>
	<div class="group">
		<p></p>
		<p></p>
	</div>
	<div class="group">
		<p></p>
	</div>
</div>
<div id="secondary-content">
	<div class="group">
		<p></p>
		<p></p>
	</div>
	<div class="group">
		<p></p>
	</div>
</div>
```

## Keeping Lists W3C Compliant ##

Additionally, to prevent the need to manually declare a `wrap_elem` of `ul` and go through a bunch of work to wrap those in LI's (since `ul > ul > li` is [not syntactically correct](http://www.w3.org/TR/html401/struct/lists.html)) `wrap_elem` is ignored if the first item provided is an `li`. Given the following HTML:

```html
<ul>
	<li>One</li>
	<li>Two</li>
	<li>Three</li>
	<li>Four</li>
	<li>Five</li>
	<li>Six</li>
	<li>Seven</li>
</ul>
```
	
this jQuery:

```js
$('li').group(3, 'span');
```
	
will produce this output:

```html
<ul class="group">
	<li>One</li>
	<li>Two</li>
	<li>Three</li>
</ul>
<ul class="group">
	<li>Four</li>
	<li>Five</li>
	<li>Six</li>
</ul>
<ul class="group">
	<li>Seven</li>
</ul>
```

_As you can see, the provided `wrap_elem` is totally ignored._

## Using `.length` to create columns ##

You can now (as of version 1.0.3 released on 9 March 2012) pass in a size attribute which is not a perfect integer. This is useful when creating columns of items. For instance:

```html
<div class="columns">
	<p></p>
	<p></p>
	<p></p>
	<p></p>
	<p></p>
</div>
```

we want to make two columns of paragraphs. We can do that with:

```js
$paras = $('.columns').find('p');
$paras.group({
	'size': $paras.length/2,
	'elem_class': 'col',
	'id_prefix': 'col_'
});
```

which will produce the following:

```html
<div class="columns">
	<div class="col" id="col_0">
		<p></p>
		<p></p>
		<p></p>
	</div>
	<div class="col" id="col_1">
		<p></p>
		<p></p>
	</div>
</div>
```

The number length is divided by dictates how many columns you're attempting to achieve, but in some cases, this may not be possible. The plugin parses the value passed in as `size` to `parseInt(Math.ceil(size))`. For instance, if `$('.foo').length //=> 9` and you want to make four columns of `.foo`'s, 9/4 = 2.25; `parseInt(Math.ceil(2.25)) //=> 3` so three columns will be created, not four. To circumvent this, you could pass the plugin `'size' : Math.floor($('.foo').length/4)` to ensure `size` was set to two. This rounding behavior was chosen to keep from requiring the user to round themselves, but still allows the flexibility to round manually.

## All Settings ##

```js
var settings = {
	'size': 2,
	'elem': 'div',
	'elem_class': 'group',
	'id_prefix': '',
	'classing': false
}
```

The plugin tries to be intelligent about how you pass it data. For instance, if you set `settings.size = 'your mother';` that will be converted to the default, and floating point numbers will be rounded up to the nearest integer (see above). Also, if the element, class or ID you pass in is not valid according to the HTML spec, we'll use the defaults displayed directly above. Always try to pass in clean settings, but we'll try to help keep your code clean for you.