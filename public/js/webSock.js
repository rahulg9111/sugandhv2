let loader = $("#loader");
var globalData = {
	currentPage: 1,
	previousPage: 0,
	nextPage: 1
};

$(function(){
    var socket = io.connect('/');

    socket.on('new_random',(data)=>{
    	prependRow(data);
    })

    init(globalData);

    var prev = null;

	$("#date,#word,#location,#timestamp").click(function(){
		loader.show();
		let field = $(this).attr('id');

		if(prev == field){
			init({type: -1,field: field,page: 1,nextPage: 1});
			prev = null;
			globalData['type'] = -1;
		}
		else{
			init({type: 1,field: field,page: 1,nextPage: 1});
			globalData['type'] = 1;
			prev = field;			
		}

		globalData['sort'] = true;
		globalData['field'] = field;
	})
})

function appendRow(data){
	$("#tableBody").
		append(`<tr>
			<td>${data.word}</td>
			<td>${data.location}</td>
			<td>${data.date}</td>
			<td>${new Date(data.timestamp).toLocaleString()}</td>
		</tr>`);
}

function prependRow(data){
	$("#tableBody").
		prepend(`<tr>
			<td>${data.word}</td>
			<td>${data.percent}</td>
			<td>${data.date}</td>
			<td>${new Date(data.timestamp).toLocaleString()}</td>
		</tr>`);
}

function init(params){
	let data = params ? params : null;

	$('#tableBody').html('');

	$.ajax({
	type: "GET",
	url : "/api/word",
	data: data,
	success: function(response){
			let res = JSON.parse(response);

			if(res){
				res['data'].forEach(o => {
					appendRow(o);
				})

				let prev = res['prev'] ? false : true;
				let next = res['next'] ? false : true;
				let nextActive = next ? '' : 'active';
				let prevActive = prev ? '' : 'active';

				let removePrev = !prev ? '' : 'active';
				let removeNext = !next ? '' : 'active';

				$("#nextPag").attr('disabled',next).addClass(nextActive).removeClass(removeNext);
				$("#prevPag").attr('disabled',prev).addClass(prevActive).removeClass(removePrev);
			
				globalData['previousPage'] = res['prev'];
				globalData['nextPage'] = res['nextPage'];
				globalData['currentPage'] = res['currentPage'];

				$("#totalCount").html(`Total Count: ${res['rowCount']}`)
				$("#currentPage").html(res['data'].length ? res['currentPage'] : 0);
				$("#nextPage").html(Math.ceil(res['rowCount']/20));
			}
		},
		error: function(err){

		},
		complete: function(){
			loader.hide();
		}
	})
}

function paginate(event){
	event.preventDefault();
	loader.show();
	globalData['page'] = 1;
	init(globalData)
}

function prevPaginate(event){
	event.preventDefault();
	loader.show();
	globalData['page'] = -1;
	console.log(globalData);
	init(globalData);
}