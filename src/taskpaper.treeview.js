jQuery.fn.taskpaper.treeview = {}

;(function($) {

  $.extend($.fn.taskpaper.treeview, {
	  
    createNode: function(options){

      	options = jQuery.extend({
                          item: null,
                          appendTo: null   
                          }, options);

      	var ret = $('<li/>')
      			.html(parse(options.item.text))
      			.wrapInner($('<span>').addClass(options.item.type)).dblclick(function(){ $(this).find('>span.task').wrapInner($('<del/>')).append(' @done')})
      	 		.appendTo(options.appendTo)
	
      	// a task or note row does not expand so should not be enclosed in a <ul/>
      	if (options.item.type == 'task' || options.item.type == 'note') 
      		return ret;
      	return $('<ul/>').appendTo(ret)
	
      	function parse (text){
          re = /-\s(.*)\s(@done)(.*)/g;
      	  return text.replace(re, "- <del>$1</del> $2$3")
      	} 
    }
	})
})(jQuery);

;(function($) {

	$.extend($.fn, {
		tasks: function() {
			return this.find("li>span.task")
		},
		
		projects: function(){
		  return this.find("li>span.project")
		},
		
		items: function(){
		  return this.find("li>span")
		},
		
		tags: function(){
      return this.find("span:contains(@)")
  	},
		
		tag: function(tag){
		  return this.find("span:contains(@"+tag+")")
		},
		
		tagslist: function(){
		  var list = new Array();
		  var tags = this.tags().filter(function(){
        re = /(.*)\s@([\w]+)/g;
        list.push($(this).html().replace(re, "$2"))
        list = list.unique()
        return
        })
      return list
		},
		
		hidetasks: function() {
		  return this.tasks().filter(function(){$(this).hide()})
		},
		
		showtasks: function() {
		  return this.tasks().filter(function(){$(this).show()})
		},
		toggletasks: function() {
		  return this.tasks().filter(function(){ $(this).is(':visible') ? $(this).hide() : $(this).show() })
		},
		
		highlighttag: function(tag){
		  return this.tag(tag).filter(function(){ $(this).toggleClass(CLASSES.highlighted) })
		},
		
		selectTags: function(elem){
		  ret = $("<select/>")
		  tree = this
      $.each(this.tagslist(), function(){
        tag = this.valueOf()
        ret.append($('<option/>').html(tag).attr('value', tag).click(function(){ tree.highlighttag(this.value) }))  
      })
		  return ret.appendTo(elem)
		}
	})
	
	// classes used by the plugin
	// need to be styled via external stylesheet, see first example
	var CLASSES = $.fn.taskpaper.treeview.classes = {
		highlighted: "highlighted"
	};
	
})(jQuery);

Array.prototype.unique = function () {
  var hash = new Object();
  for (j = 0; j < this.length; j++) {hash[this[j]] = true}
  var array = new Array();
  for (value in hash) {array.push(value)};
  return array;
}
