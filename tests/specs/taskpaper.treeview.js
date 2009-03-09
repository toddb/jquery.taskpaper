describe('I need to be able to populate the taskpaper treeview', {
  
  before_all: function(){
    value_of_item = function (item_type, text){
      var item = $('#todo').find('li:first-child')[0]     
      value_of(item.nodeName).should_be('LI') 
      value_of($(item.firstChild).hasClass('icon-'+item_type)).should_be_true
      value_of($(item.lastChild).attr('contenteditable')).should_be_true
      value_of($(item.lastChild).hasClass(item_type)).should_be_true
      value_of($(item.lastChild).html()).should_be(text)      
    }    
  },
  
  before_each: function() {
    item = new taskpaperItem();   
    root = $('<ul id="todo">').insertAfter('#main')  	
	},
	
	after_each: function(){
    $('#todo').remove()
	},
	
  // 'should load up the project in the tree': function(){
  //     item.text = 'Project:'
  //     item.type = 'project'
  //     
  //     parent = $().taskpaper.treeview.createNode( { 
  //               item: item, 
  //               appendTo: root 
  //               });
  // 
  //               
  //     value_of_item(item.type, item.text)
  // },

	'should load up the task in the tree': function(){
    item.text = '- task'
    item.type = 'task'
    
    parent = $().taskpaper.treeview.createNode( { 
              item: item, 
              appendTo: root 
              });
              
    value_of_item(item.type, item.text)

 	},

	'should load up the note in the tree': function(){
    item.text = 'a note'
    item.type = 'note'
    
    parent = $().taskpaper.treeview.createNode( { 
              item: item, 
              appendTo: root 
              });
              
    value_of_item(item.type, item.text)
	},
	
	'should parse a @done tag and format with a strikethrough': function(){
    item.text = '- task @done'
    item.type = 'task'

    parent = $().taskpaper.treeview.createNode( { 
              item: item, 
              appendTo: root 
              });
    
    value_of_item(item.type, '- <del>task</del> <a class="done" href="#">@done</a>')
 	},
	
	'should parse a tag in an item and add a tag handler': function(){
    item.text = '- task @email'
    item.type = 'task'
    parent = $().taskpaper.treeview.createNode( { 
               item: item, 
               appendTo: root 
               });

    value_of_item(item.type, '- task <a class="email" href="#">@email</a>')
	},

})