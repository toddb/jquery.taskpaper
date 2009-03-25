describe('control quick-entry : ', {
 	
 	before_each: function(){
    $('<ul id="todo">').appendTo('#main')
    $('<span id="quick-entry">').appendTo('#main')
		$('#todo').taskpaper({ url: 'data/simple.taskpaper'	})
 	  $('.quick-entry').click()
 	},
	
	after_each: function(){
      $('#main').empty()
	},

  'should show a window' : function() {
    value_of($('.qe-panel').is(":visible")).should_be_true()
  },
  
  'should have a title' : function() {
    panel = $('.qe-panel')
    value_of($('.qe-panel-title', panel).is(':visible')).should_be_true()
  },
  
  'should have an OK button' : function() {
    panel = $('.qe-panel')
    value_of($('#ok', panel).is(':visible')).should_be_true()    
  },

  'should have an Cancel button' : function() {
    panel = $('.qe-panel')
    value_of($('#cancel', panel).is(':visible')).should_be_true()    
  },
  
  'should have text in the window' : function() {
    panel = $('.qe-panel')
    value_of($('#taskpaper', panel).val()).should_be($('#todo').serialize())
  },
  
  // 'should not update the taskpaper treeview on cancel' : function() {
  //    panel = $('.qe-panel')
  //    $('#taskpaper', panel).val('Personal:')
  //    $('#cancel', panel).click()
  //    value_of($('#todo').serialize()).should_be('Personal:\n - @email Fred McDowell re: lunch @due(2008-12-22)');
  //  },
   
  'should update the taskpaper treeview on new text' : function() {
    panel = $('.qe-panel')
    $('#taskpaper', panel).val('Personal:')
    $('#ok', panel).click()
    value_of($('#todo').serialize()).should_be('Personal:');   
  },

});