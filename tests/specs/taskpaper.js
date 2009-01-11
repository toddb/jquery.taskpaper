describe('I need to be able to populate the treeview', {
  
  before: function() {
    $('<ul id="todo">').insertAfter('#main')

		$('#todo').taskpaper({
        	url: 'data/simple.taskpaper'
    	})
	},
	
	after: function(){
     $('#todo').remove()
	},
	
	'should load up the tree': function(){
	  value_of($("#todo").css("display")).should_be('block')	  
	},
	
	'should load up the tree and add taskpaper as the css class': function(){
	  value_of($('#todo').hasClass('taskpaper')).should_be(true)
	}

  // 'should be able read two items but with only one project': function(){
  //    value_of($('ul#todo > li').size()).should_be('1')
  //    value_of($('ul#todo > li > span.project').size()).should_be('1')
  // },
  // 
  // 'should be able read two items but with only one task': function(){
  //    value_of($('ul#todo > li > ul > li').size()).should_be('1')
  //    value_of($('ul#todo > li > ul > li > span.task').size()).should_be('1')
  // },
	
})