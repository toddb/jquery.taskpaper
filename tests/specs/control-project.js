describe('I need to select projects via drop down', {
  
  before_all: function() {
    $('<ul id="todo">').appendTo('#main')
		$('#todo').taskpaper({ url: 'data/sample.taskpaper'	})
 	},
	
	after_all: function(){
      $('#main').empty()
	},
	
	'should return list of unique projects from lines': function(){
	  value_of($('#todo').projectslist().length).should_be(10)	  
	},
	
	'should return 31 main items': function(){
	  value_of($('#todo').items().size()).should_be(31)	  
    value_of($('#todo').items().parents('li:visible').size()).should_be(31)
	},
	
	'should only show projects in a drop-down': function(){
	  $('<span id="projects"/>').appendTo('#main')
	  $('#todo').selectProjects('#projects')
	  value_of($('#projects').find('>select').is(":visible")).should_be(true)
	  value_of($('#projects').find('>select>option').size()).should_be(11)
	},

	'should show only selected project "Gen-i"':function(){
	  $('#todo').hideAll()
	  $('#todo').filterproject('Gen-i')
    value_of($('#todo').find('li:visible').size()).should_be(9)
 	},
 	
	'should show only selected project "Invoices"':function(){
	  $('#todo').hideAll()
	  $('#todo').filterproject('Invoices')
    value_of($('#todo').find('li:visible').size()).should_be(5)
 	},
	
})