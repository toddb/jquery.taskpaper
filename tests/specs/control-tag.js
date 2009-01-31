describe('I need to select tasks via tags drop down', {
  
  before_all: function() {
    $('<ul id="todo">').appendTo('#main')
		$('#todo').taskpaper({ url: 'data/sample.taskpaper'	})
	},
	
	after_all: function(){
    $('#main').empty()
	},
	
	'should return list of unique tags from lines (excludes "(xxxx)")': function(){
	  value_of($('#todo').tagslist().length).should_be(5)	  
	},
	
	'should return 31 main items': function(){
	  value_of($('#todo').items().size()).should_be(31)	  
    value_of($('#todo').items().parents('li:visible').size()).should_be(31)
	},
	
	'should only show projects which have tagged lines': function(){
	  $('#todo').selectTags('#main')
	  value_of($('#main').find('>select').is(":visible")).should_be(true)
	  value_of($('#main').find('>select>option').size()).should_be(5)
	},

	'should show only tagged lines with @online':function(){
	  $('#todo').filtertag('online')
    value_of($('#todo').items().parents('li:visible').size()).should_be(10)
 	},
	
	'should show only tagged lines with @due':function(){
	  $('#todo').filtertag('due')
    value_of($('#todo').items().parents('li:visible').size()).should_be(10)
 	},
	
	'should show only tagged lines with @done':function(){
	  $('#todo').filtertag('done')
    value_of($('#todo').items().parents('li:visible').size()).should_be(4)
 	},
 	
	'should show only tagged lines with @done':function(){
	  $('#todo').filtertag('email')
    value_of($('#todo').items().parents('li:visible').size()).should_be(11)
 	},
	
})