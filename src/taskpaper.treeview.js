jQuery.fn.taskpaper.treeview = {}

;(function($) {

  $.extend($.fn.taskpaper.treeview, {
	  
    createNode: function(options){

      	options = jQuery.extend({
                          item: null,
                          appendTo: null   
                          }, options);

	      return this.item(options.item.text, options.item.type, options.appendTo)
    },
    
    item: function(text, type, appendTo){
      var content = this.editable_content(text, type).appendTo(appendTo)
      return (type == 'task' || type == 'note') ? content : $('<ul/>').appendTo(content)     
    },
    
    editable_content: function(text, type) {
      return $('<li/>')
  			.html(this.addTagHandler(this.removeDash(this.addStrikethroughOnDone(text))))
  			.wrapInner($('<span contenteditable="true">')
  			  .addClass(type))
  			  .prepend($('<span/>')
  			    .html('&nbsp;')
  			    .addClass('handle')
  			    .addClass('icon-'+type))
  			.dblclick(this.addDoneHandler())
    },
    
    removeDash: function(text) {
      return text.replace(/-\s(.*)/g, "$1")
    },
    
    addStrikethroughOnDone: function(text){
  	  return text.replace(/-\s(.*)\s(@done)(.*)/g, "<del>$1</del> $2$3")
  	},
  	
  	addTagHandler: function(text){
  	  return text.replace(/\s@(\w+)/g, " <a class='$1' href='#'>@$1</a>")
  	},
  	
  	addDoneHandler: function(){
  	  return function(){ $(this).unbind('dblclick').find('>span.task').wrapInner($('<del/>')).append(' <a class="done" href="#">@done</a>')}
  	},
  	      	 	
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
		  return this.find("li>span.project,li>span.task,li>span.note")
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
		
		selectTags: function(expr){
		  ret = $("<select/>")
		    .append($('<option selected/>')
		    .html('-- filter by tag @ --'))
		    .blur(function(){ $(this).find('option:first').attr('selected', 'true') })
		  tree = this
      $.each(this.tagslist(), function(){
        tag = this.valueOf()
        ret.append($('<option/>').html(tag).attr('value', tag).click(function(){ $('#query').val('@'+this.value).keyup() }))  
      })
		  return $(expr).html(ret)
		},
		
		selectProjects: function(expr){
		  ret = $("<select/>")
		    .append($('<option/>')
		    .html('-- filter by project @ --'))
		    .blur(function(){ $(this).find('option:first').attr('selected', 'true') })
		  tree = this
      $.each(this.projectslist(), function(){
        tag = this.valueOf()
        ret.append($('<option/>').html(tag.replace(/\s/, '&nbsp;')).attr('value', tag).click(function(){ $('#query').val('project="'+this.value.replace(/\s+(.*)/, "$1")+'"').keyup() }))  
      })
		  return $(expr).html(ret)
		},
		
		textFilter: function(elem){
		  ret = $('<label for="query"><span>Filter: </span></label>')
		  $('<input id="query" type="text" value="" name="q"/>').keyup(function(){ $(this).filterBox() }).appendTo(ret)
		  $('<button>').html('Cancel').click(function(){ $('input#query').val(''); $('#todo').showAll() }).appendTo(ret)
      return ret.appendTo(elem)
		},
		
		filterBox: function(){
      tree = $("."+CLASSES.taskpaper)
      
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
        $('.'+this.valueOf()).click(function(){ $('#query').val(this.text).keyup() })
      })		  
		},
		
		serialize: function(whitespace, eol) {
		  
		  var ws = whitespace || '\t'; eol = eol || "\n"
      var str = []
		  		  
		  function processProject(item, depth){
		    
		    function whitespace(count){ var spaces = ''; for (var i=0; i < count; i++) {spaces += ws}; return spaces }
  		  
		    if ($(item).is('.project,.note')) return str.push(whitespace(depth)+$.trim($(item).text()))
		    if ($(item).is('.task'))          return str.push(whitespace(depth)+$.trim('- '+$(item).text()))
		    if ($(item).is('ul')) depth += 1
        $(item).children().each(function(){
          processProject($(this), depth)
        })
		  }
		  
      this.children().each(function() {
        processProject(this, 0)
      });

      return str.join(eol);
		},
		
	})
	
	// classes used by the plugin
	// need to be styled via external stylesheet, see first example
	var CLASSES = $.fn.taskpaper.treeview.classes = {
		highlighted: "highlighted",
		taskpaper:   "taskpaper"
	};
	
})(jQuery);

Array.prototype.unique = function () {
  var hash = new Object();
  for (j = 0; j < this.length; j++) {hash[this[j]] = true}
  var array = new Array();
  for (value in hash) {array.push(value)};
  return array;
}


