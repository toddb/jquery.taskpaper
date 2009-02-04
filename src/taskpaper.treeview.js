jQuery.fn.taskpaper.treeview = {}

;(function($) {

  $.extend($.fn.taskpaper.treeview, {
	  
    createNode: function(options){

      	options = jQuery.extend({
                          item: null,
                          appendTo: null   
                          }, options);

      	var ret = $('<li/>')
      			.html(addTagHandler(parse(options.item.text)))
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
      	
      	function addTagHandler(text){
          re = /\s@(\w+)/g;
      	  return text.replace(re, " <a class='$1'>@$1</a>")
          //           re = /-\s(.*)\s(@)(\w+)(.*)/g;
          // return text.replace(re, "- $1 <a class='$3'>$2$3</a>$4")
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

		projectslist: function(){
		  var list = new Array();
		  var projects = this.projects().filter(function(){
        re = /([\w]+):/g;
        list.push($(this).html().replace(re, "$1"))
        list = list.unique()
        return
        })
      return list
		},

		item: function(tag){
		  return this.find("span:contains("+tag+")")
		},
		
		items: function(){
		  return this.find("li>span")
		},
		
		tags: function(){
      return this.find("span>a:contains(@)")
  	},
		
		tag: function(tag){
		  return this.find("span>a:contains(@"+tag+")")
		},
		
		tagslist: function(){
		  var list = new Array();
		  var tags = this.tags().filter(function(){
        // re = /.*\s@([\w]+)[\(\w-\)]*/g;
        re = /@([\w]+)/g;
        list.push($(this).html().replace(re, "$1"))
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
		
		hideAll: function() {
		  return this.items().filter(function(){ $(this).parent().hide()})		  
		},

		showAll: function() {
		  return this.items().filter(function(){ $(this).parent().show()})		  
		},

		filteritem: function(tag){
		  return this.item(tag).filter(function(){ $(this).parents('li').show() })
		},
		
		filtertag: function(tag){
		  return this.tag(tag).filter(function(){ $(this).parents('li').show() })
		},
		
		filterproject: function(tag){
		  return this.find('li>span.project:contains(' + tag + ')').filter(function(){ $(this).parents('li').show().end().siblings('ul').children('li').show() })
		},
		
		selectTags: function(elem){
		  ret = $("<select/>")
		  tree = this
      $.each(this.tagslist(), function(){
        tag = this.valueOf()
        ret.append($('<option/>').html(tag).attr('value', tag).click(function(){ $('#query').val('@'+this.value).keyup() }))  
      })
		  return ret.appendTo(elem)
		},

		selectProjects: function(elem){
		  ret = $("<select/>")
		  tree = this
      $.each(this.projectslist(), function(){
        tag = this.valueOf()
        ret.append($('<option/>').html(tag.replace(/\s/, '&nbsp;')).attr('value', tag).click(function(){ $('#query').val('project="'+this.value.replace(/\s+(.*)/, "$1")+'"').keyup() }))  
      })
		  return ret.appendTo(elem)
		},
		
		textFilter: function(elem){
		  ret = $('<label for="query"><span>Filter: </span></label>')
		  $('<input id="query" type="text" value="" name="q"/>').keyup(function(){ $(this).filterBox() }).appendTo(ret)
		  $('<button>').html('Cancel').click(function(){ $('input#query').val(''); $('#todo').showAll() }).appendTo(ret)
      return ret.appendTo(elem)
		},
		
		filterBox: function(){
      tree = $('.taskpaper') // hhhmmm, not sure about this - not very relative
      
		  var empty = /$\s?^/
      if (empty.test(this.val())) return tree.showAll()

      tree.hideAll()
		  
		  var tag = /@([\w]+)/i
		  var project = /project\s?=\s?\"([\w-]+)\"/i
		  var phrase = /\'([\w\s]+)\'/ig
		  var word = /(\w+)\s/i
      var re = /@\w+|project\s?=\s?\"[\w-\s]+\"|\'[\w\s]+\'|([\w]+\s)/ig
     
      filter = this.val().match(re)
      if (filter != null) {
        $.each(filter, function(){
          if (tag.test(this)) tree.filtertag(this.replace(tag, "$1"))
          if (project.test(this)) tree.filterproject(this.replace(project, "$1"))
          if (phrase.test(this)) tree.filteritem(this.replace(phrase, "$1"))
          if (word.test(this)) tree.filteritem(this.replace(word, "$1"))
        })
      }
		},
		
		tagsHandler: function(){
      $.each(this.tagslist(), function(){
        console.warn(this.valueOf())
        $('.'+this.valueOf()).click(function(){ $('#query').val(this.text).keyup() })
      })		  
		},
		
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
