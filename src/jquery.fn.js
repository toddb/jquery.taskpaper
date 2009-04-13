;(function($) {

	$.extend($, {
	  
	  selection: function() {
      if (window.getSelection) {
      	return window.getSelection();
      }
      else if (document.selection) { // should come last; Opera!
      	return document.selection.createRange();
      }
		},
	  
	})
})(jQuery);