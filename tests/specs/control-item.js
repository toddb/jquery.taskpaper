describe('I need to be able to edit items', {
  
  before_all: function() {
    $('<ul id="todo">').appendTo('#main')
		$('#todo').taskpaper({ url: 'data/simple-item.taskpaper'	})
 	},
	
	after_all: function(){
      $('#main').empty()
	},
	
	'should update the tags list if a tag is entered': function(){
	},

	'should update the project list if a project is changed': function(){
	},
	
	'should create a project if a : is entered at the end of a list': function(){
	  projects = $('#todo').projects().size()	
		item = $('#todo').tasks().filter(':last').focus()
		
    item.toggleProject() // equivalent --> item.__keypress(58)
        
    value_of($('#todo').projects().size()).should_be(projects + 1)
	},
	
	'should create a new item if I press enter': function(){
	  tasks = $('#todo').tasks().size()	
		task = $('#todo').tasks().filter(':last').focus()
    task.__keypress(13)
        
		value_of($('#todo').tasks().size()).should_be(tasks + 1)
	},
	
	'should take the characters to the right of the cursor across to the next line when pressing enter': function(){
	  
	},
	
	'should create the next item as a task by default': function(){
	  tasks = $('#todo').tasks().size()
		task = $('#todo').tasks().filter(':last').focus()
    task.__keypress(13)
        
		value_of($('#todo').tasks().size()).should_be(tasks + 1)	
	},
	
	'should be able to reorder items': function(){
	  
	},
	
	'should be able to create a new project via ctl-p': function(){
	  
	},
	
	'should be able to convert a task to a project via ctl-p': function(){
	  
	},
	
	'should be able to move up and down items via the up and down arrows': function(){
	  
	},

  'should when pressing enter at the end of project add a task and keep the project above': function(){
    
  },
  	
})