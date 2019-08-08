$(function(){
    var socket = io.connect('/');

	$(".fa-refresh").click(()=>{
		$("#random").val('');
	})

	$("#throw").on('click',function(e){
		e.preventDefault();

		let value = $("#random").val();
		value = $.trim(value);
		let token = value ? value.split(' ') : null;

		if(!token || !token.length){
			alert('Please Enter Some String');
			return;
		}
		else{
			let num = randomNumber(token.length);
			let rand = {
				word: token[num],
				date: new Date().toDateString(),
				percent: Math.floor(((num+1)/(token.length))*100),
				timestamp: new Date()
			}

			$.ajax({
				type: "POST",
				url : "/api/word",
				data: rand,
				success: function(response){
					emitSock(socket,rand);
					console.log('Emitted Successfully!');
				},
				error: function(err){
					alert('Some Unknown Error Occurred');
				},
				complete: function(){
					// emit
				}
			})
		}
	})

	$("#gotoWebSock").click(()=>{
		window.open("/webSock.html","_blank")
	})
})

function randomNumber(max) {  
    return Math.floor(Math.random() * (max)); 
}

function emitSock(socket,params){
	socket.emit('random',params)
}