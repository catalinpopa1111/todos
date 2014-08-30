var tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

function show(){
	
		var s = [];
		var c = [];
		var r = [];
	$(tasks).each(function (i,v) {
		
		if(v.starred && v.completed){
			c.push(v);
		}
		else if(v.starred){
			s.push(v);
		} else if (v.completed) {
			c.push(v);
		} else  {
			r.push(v);
		}

	});
	$(r).each(function(i,v) { s.push(v)});
	$(c).each(function(i,v) { s.push(v)});
	tasks = s;

	$('#total-tasks').text( s.length + ' tasks');
	$('#completed-tasks').text(c.length + ' completed');

	$(tasks).each(function (i,v) {


	var t = $('<div></div>').addClass('task').data('index', i);

	if ( v.completed )
		t.addClass('done');
	
	var checkbox = $('<input />').attr({
		'type'	: 	'checkbox',
		'name'	: 	'checkbox',
		'id'	: 	'checkbox_' + i,
		'class'	: 	'check'
	});

	if ( v.completed )
		checkbox.prop('checked', 'checked');

	checkbox.appendTo(t);

	var l = $('<label></label>').attr('for', 'checkbox_' + i);
	$('<span></span>').appendTo(l);
	l.appendTo(t);

	var p = $('<p></p>').text(v.body);
	p.appendTo(t);

	var s = $('<div></div>').addClass('important');
	var color = '';
	if(v.starred){
		color = 'red';
	}
	else{
		color = 'white';
	}
	var i = $('<img />').attr('src', 'img/star_' + color + '.png');
	i.appendTo(s);
	s.appendTo(t);

	var c = $('<div></div>').addClass('clearfix');
	c.appendTo(t);

	t.appendTo($('.tasks'));
	localStorage.setItem( 'tasks', JSON.stringify( tasks ) );
});

};
show();

$('#add').submit(function(e) {
	e.preventDefault();
	var obj = {
		body: 		$('#newTask').val(),
		completed: 	false,
		starred: 	false
	}
	tasks.push(obj);
	$('#newTask').val('');

	$('.tasks').html('');

	show();
});

$(document).on('click', '.check', function () {
	var $this = $(this).parent();

	if($this.hasClass('done')){
		$this.removeClass('done');

		tasks[ $this.data('index') ].completed = false;
	}else {

	$this.addClass('done');
	tasks[ $this.data('index') ].completed = true;

	
}
	$('.tasks').html('');
	show();
});
var color = 'white';
$(document).on('click', '.important', function() {
	
	var img  = $(this).find('img');
	window.c = img;
	if(c.attr('src') === 'img/star_white.png'){
		img.attr('src', 'img/star_red.png');
		color = 'red';
		tasks[ $(this).parent().data('index') ].starred = true;
		
	}
	else{
		img.attr('src', 'img/star_white.png');
		color = 'white';
		tasks[ $(this).parent().data('index') ].starred = false;
		
	}
		
	$('.tasks').html('');
	show();
});