describe('I need to be able to manipulate the taskpaper sheet', {
  
  before_all: function() {
    $('<ul id="todo">').appendTo('#main')
		$('#todo').taskpaper({ url: 'data/sample.taskpaper'	})
	},
	
	after_all: function(){
      $('#main').empty()
	},

	'should load up the tree': function(){
	  value_of($("#todo").is(':visible')).should_be_true()  
	},
		
	'should look for tasks': function(){
	  value_of($("#todo").tasks().size()).should_be(20)
	},

	'should look for items': function(){
	  value_of($('#todo').items().size()).should_be(31)
	},

	'should look for projects': function(){
	  value_of($('#todo').projects().size()).should_be(10)
	},
	
	'should find any tags in lines': function(){
	  value_of($('#todo').tags().size()).should_be(21)
	  value_of($('#todo').tag('due').size()).should_be(5)
	  value_of($('#todo').tag('online').size()).should_be(6)
	},
	
	'should return list of unique tags from lines (excludes "(xxxx)")': function(){
	  value_of($('#todo').tagslist().length).should_be(7)	  
	},

	'should show only the projects': function(){
	  value_of($('#todo').projects().size()).should_be(10)
	},
	
	'should hide tasks': function(){
	  $('#todo').showtasks()
	  visible(true)	  
	  $('#todo').hidetasks()
	  visible(false)
	  	  
	  function visible(val){$('#todo').tasks().filter(function(){value_of($(this).is(':visible')).should_be(val)})}
	},

	'should show tasks': function(){
	  $('#todo').hidetasks()
	  visible(false)  
	  $('#todo').showtasks()
	  visible(true)
	  
	  function visible(val){$('#todo').tasks().filter(function(){value_of($(this).is(':visible')).should_be(val)})}
	},

	'should toggle tasks': function(){
	  $('#todo').showtasks()
	  visible(true)
	  $('#todo').toggletasks()
	  visible(false)
	  $('#todo').toggletasks()
	  visible(true)
	  
	  function visible(val){$('#todo').tasks().filter(function(){value_of($(this).is(':visible')).should_be(val)})}
	},
	
	'should highlight tags':function(){
	  highlighted(false)
	  $('#todo').highlighttag('online')
	  highlighted(true)
	  
	  function highlighted(val){ $('#todo').tag('online').filter(function(){ value_of($(this).hasClass($.fn.taskpaper.treeview.classes.highlighted)).should_be(val)}) }
	},
	
	'should create a select drop-down from tags and place after main': function(){
	  $('#todo').selectTags('#main')
	  value_of($('#main').find('>select').is(":visible")).should_be(true)
	  value_of($('#main').find('>select>option').size()).should_be(7)
	},
	
	'should hide all items': function(){
	  value_of($("#todo").projects().size()).should_be(10)
	  value_of($("#todo").projects().parent(':visible').size()).should_be(10)
	  
	  $('#todo').hideAll()

    value_of($("#todo").projects().parent(':hidden').size()).should_be(10)
    value_of($("#todo").projects().parent(':visible').size()).should_be(0)
  	},
})