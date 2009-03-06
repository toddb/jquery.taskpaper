describe('I need to be able to populate the taskpaper treeview', {
  
  before_each: function() {
    item = new taskpaperItem();   
    root = $('<ul id="todo">').insertAfter('#main')  	
	},
	
	after_each: function(){
    $('#todo').remove()
	},
	
	'should load up the project in the tree': function(){
    item.text = 'Project:'
    item.type = 'project'
    
    parent = $().taskpaper.treeview.createNode( { 
              item: item, 
              appendTo: root 
              });
              
    // value_of($('#todo').html()).should_be('<li><span contenteditable="true" class="project">Project:</span><ul></ul></li>')
    value_of($('#todo').find(':first-child')[0].nodeName).should_be('LI')
    value_of($('#todo').find(':first-child')[1].nodeName).should_be('SPAN')
    value_of($($('#todo').find(':first-child')[1]).attr('contenteditable')).should_be_true

    value_of($($('#todo').find(':first-child')[1]).hasClass('project')).should_be_true
    value_of($($('#todo').find(':first-child')[1]).text()).should_be('Project:')
	},

	'should load up the task in the tree': function(){
    item.text = '- task'
    item.type = 'task'
    
    parent = $().taskpaper.treeview.createNode( { 
              item: item, 
              appendTo: root 
              });
              
    // value_of($('#todo').html()).should_be('<li><span contenteditable="true" class="task">- task</span></li>')
    value_of($('#todo').find(':first-child')[0].nodeName).should_be('LI')
    value_of($('#todo').find(':first-child')[1].nodeName).should_be('SPAN')
    value_of($($('#todo').find(':first-child')[1]).attr('contenteditable')).should_be_true

    value_of($($('#todo').find(':first-child')[1]).hasClass('task')).should_be_true
    value_of($($('#todo').find(':first-child')[1]).text()).should_be('- task')
	},

	'should load up the task in the tree': function(){
    item.text = 'a note'
    item.type = 'note'
    
    parent = $().taskpaper.treeview.createNode( { 
              item: item, 
              appendTo: root 
              });
              
    // value_of($('#todo').html()).should_be('<li><span contenteditable="true" class="note">a note</span></li>')
    value_of($('#todo').find(':first-child')[0].nodeName).should_be('LI')
    value_of($('#todo').find(':first-child')[1].nodeName).should_be('SPAN')
    value_of($($('#todo').find(':first-child')[1]).attr('contenteditable')).should_be_true

    value_of($($('#todo').find(':first-child')[1]).hasClass('note')).should_be_true
    value_of($($('#todo').find(':first-child')[1]).text()).should_be('a note')
	},
	
	'should parse a @done tag and format with a strikethrough': function(){
    item.text = '- task @done'
    item.type = 'task'

    parent = $().taskpaper.treeview.createNode( { 
              item: item, 
              appendTo: root 
              });
              
    // value_of($('#todo').html()).should_be('<li><span contenteditable="true" class="task">- <del>task</del> <a class="done">@done</a></span></li>')   
    value_of($('#todo').find(':first-child')[0].nodeName).should_be('LI')
    value_of($('#todo').find(':first-child')[1].nodeName).should_be('SPAN')
    value_of($($('#todo').find(':first-child')[1]).attr('contenteditable')).should_be_true

    value_of($($('#todo').find(':first-child')[1]).hasClass('task')).should_be_true
    value_of($($('#todo').find(':first-child')[1]).text()).should_be('- task @done')
    value_of($($('#todo').find(':first-child')[1]).html()).should_be('- <del>task</del> <a class="done" href="#">@done</a>')
	},
	
	'should parse a tag in an item and add a tag handler': function(){
    item.text = '- task @email'
    item.type = 'task'
    parent = $().taskpaper.treeview.createNode( { 
               item: item, 
               appendTo: root 
               });

     // value_of($('#todo').html()).should_be('<li><span contenteditable="true" class="task">- task <a class="email">@email</a></span></li>')     
     value_of($('#todo').find(':first-child')[0].nodeName).should_be('LI')
     value_of($('#todo').find(':first-child')[1].nodeName).should_be('SPAN')
     value_of($($('#todo').find(':first-child')[1]).attr('contenteditable')).should_be_true

     value_of($($('#todo').find(':first-child')[1]).hasClass('task')).should_be_true
     value_of($($('#todo').find(':first-child')[1]).text()).should_be('- task @email')
     value_of($($('#todo').find(':first-child')[1]).html()).should_be('- task <a class="email" href="#">@email</a>')
	},

})