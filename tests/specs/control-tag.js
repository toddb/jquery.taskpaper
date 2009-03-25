describe('I need to select tasks via tags drop down', {
  
  before_all: function() {
    $('<ul id="todo">').appendTo('#main')
		$('#todo').taskpaper({ url: 'data/sample.taskpaper'	})
	},
	
	after_all: function(){
    $('#main').empty()
	},
	
	'should return list of unique tags from lines (excludes "(xxxx)")': function(){
	  value_of($('#todo').tagslist().length).should_be(7)	  
	},
	
	'should return 31 main items': function(){
	  value_of($('#todo').items().size()).should_be(31)	  
    value_of($('#todo').items().parents('li:visible').size()).should_be(31)
	},
	
	'should only show projects which have tagged lines': function(){
	  $('<span id="tasks"/>').appendTo('#main')
    $('#todo').selectTags('#tasks')
	  value_of($('#tasks').find('>select').is(":visible")).should_be(true)
	  value_of($('#tasks').find('>select>option').size()).should_be(8)
	},

	'should show only tagged lines with @online':function(){
	  $('#todo').hideAll()
	  $('#todo').filtertag('online')
    value_of($('#todo').items().parents('li:visible').size()).should_be(10)
 	},
	
	'should show only tagged lines with @due':function(){
	  $('#todo').hideAll()
	  $('#todo').filtertag('due')
    value_of($('#todo').items().parents('li:visible').size()).should_be(10)
 	},
	
	'should show only tagged lines with @done':function(){
	  $('#todo').hideAll()
	  $('#todo').filtertag('done')
    value_of($('#todo').items().parents('li:visible').size()).should_be(4)
 	},
 	
	'should show only tagged lines with @done':function(){
	  $('#todo').hideAll()
	  $('#todo').filtertag('email')
    value_of($('#todo').items().parents('li:visible').size()).should_be(11)
 	},
	
})