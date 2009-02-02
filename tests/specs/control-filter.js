describe('I need to filter from a text box', {
  
  before_all: function() {
    $('<ul id="todo">').appendTo('#main')
		$('#todo').taskpaper({ url: 'data/sample.taskpaper'	})
 	},
	
	after_all: function(){
      $('#main').empty()
	},
	
	'should show projects and items when I have a filter for projects eg project="Gen-i"': function(){
	},

	'should return items and its projects when I have a filter for tags eg "@done"': function(){
	},

 	'should return any items and its projects when I have a filter eg done, invoices,': function(){
	},
	
	'should show all items when the filter is empty': function(){
	  
	},
	
	'should empty the filter when clear is clicked': function(){
	  
	},
	
	'should return 31 main items': function(){
	  value_of($('#todo').items().size()).should_be(31)	  
    value_of($('#todo').items().parents('li:visible').size()).should_be(31)
	},
	
	'should show an empty text field with clear button': function(){
	  $('#todo').textFilter('#main')
	  value_of($('#main').find('input#query').is(":visible")).should_be(true)
	  value_of($('#main').find('input#query').siblings('button').is(":visible")).should_be(true)
	},
	
})