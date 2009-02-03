describe('I need to filter from a text box', {
  
  before_all: function() {
    $('<ul id="todo">').appendTo('#main')
		$('#todo').taskpaper({ url: 'data/sample.taskpaper'	})
 	},
 	
 	before: function(){
 	  $('#todo').textFilter('#main')
 	},
 	
 	after: function(){
 	  $('#main label').empty()
 	},
	
	after_all: function(){
    $('#main').empty()
	},
	
  'should show projects and items when I have a filter for projects eg project="Gen-i"': function(){
    $('#query').val('project=\"Gen-i\"').keyup()
    value_of($('#todo').items().parents('li:visible').size()).should_be(9)
  },

	'should return items and its projects when I have a filter for tags eg "@done"': function(){
	  $('#query').val('@done').keyup()
    value_of($('#todo').items().parents('li:visible').size()).should_be(4)
	},

  'should return any items and its projects when I have a filter eg review credit': function(){
    $('#query').val('review').keyup()
    value_of($('#todo').items().parents('li:visible').size()).should_be(6)
    $('#query').val('review credit').keyup()
    value_of($('#todo').items().parents('li:visible').size()).should_be(3)
  },
  
  'should return any items and its projects when I have a filter with tags and words: done, invoices': function(){
    $('#query').val('@email').keyup()
    value_of($('#todo').items().parents('li:visible').size()).should_be(11)
    $('#query').val('@email network').keyup()
    value_of($('#todo').items().parents('li:visible').size()).should_be(5)
  },

  'should return any items and its projects when I have a filter with combined words using "Sam McDowell"': function(){
    $('#query').val('\'Sam McDowell\'').keyup()
    value_of($('#todo').items().parents('li:visible').size()).should_be(6)
  },

  'should show all items when the filter is empty from a cancel button': function(){
    $('#query').val('@done').keyup()
    value_of($('#todo').items().parents('li:visible').size()).should_be(4)
    $('button').click()
    value_of($('#todo').items().parents('li:visible').size()).should_be(31) 
  },
	
	'should empty the filter when clear is clicked': function(){
	  $('#query').val('@done')
	  value_of($('#query').val()).should_be('@done')
	  $('button').click()
	  value_of($('#query').val()).should_be('')	  
	},
	
  'should return 31 main items': function(){
    value_of($('#todo').items().size()).should_be(31)    
    value_of($('#todo').items().parents('li:visible').size()).should_be(31)
  },
	
	'should show an empty text field with clear button': function(){
	  value_of($('#main').find('input#query').is(":visible")).should_be(true)
	  value_of($('#main').find('input#query').siblings('button').is(":visible")).should_be(true)
	},
	
})