$(document).ready(function(){
	let count = 0;
	let corrects_list = [];
	let incorrects_list = [];
	let text = $("#text").text();
	let text_array = text.split(" ");
	let typed = [];
	let current_word = text_array[count];
	$("#current_word, #to-type").text(current_word);

	let text1;
	let text2 = text_array.slice(count+1, text_array.length).join(" ");
	$("#text2").text(text2);

	$('#text-box').animate({scrollTop: 0});

	let seconds = 0;
	let timer_on = false;
	let executed = false;
	
	function displayCount() {
		if (seconds >= 10){
			$("#timer").text(`${seconds}`);
		} else {
			$("#timer").text(`0${seconds}`);
		}
	}

	function myTimer() {
		if (timer_on == true){
			seconds++;
		}
		displayCount();
	}
	
	$("#input-field").on("keypress", function(e){
		if (count != text_array.length){
			if (!executed){
				timer_on = true;
				let timer = setInterval(myTimer, 1000);
				executed = true;
			}

			if (e.which == 32){
				e.preventDefault();

				let myElement = document.getElementById("current_word");
				let topPos = myElement.offsetTop;
				document.getElementById('text-box').scrollTop = topPos;
 
				if (count == text_array.length-1){
					let letter_count = corrects_list.join(" ").length;
					let correct_words = letter_count/5;
					let correct_words_per_minute = Math.floor((60/seconds)*correct_words);

					$("#result").text(`${Math.floor(correct_words)} correct out of ${count+1}.`);
					$("#wpm").text(`${correct_words_per_minute} words per minute!`);

					$("#correct_words_per_minute").text(`${correct_words_per_minute} words per minute.`);

					$("#text-box").hide();

					timer_on = false;
					clearInterval(myTimer);

					if ($("#user-auth").text() == 'yes'){
						$("#score-input").val(correct_words_per_minute);
						$("#save-score").show();
						$("#save-score").click(function(){
							$("#score-form").submit();
						})
					}
				} 

				count++;

				text1 = text_array.slice(0, count).join(" ");
				text2 = text_array.slice(count+1, text_array.length).join(" ");
				current_word = text_array[count-1];
				word = text_array[count];

				$("#text1").text(text1);
				$("#current_word, #to-type").text(word);
				$("#text2").text(text2);

				let userword = $(this).val();
				$(this).val('');
				typed.push(userword);
				$("#typed").text("You typed: " + typed.join(" "));

				if (userword == current_word){
					$("#input-field").css('border-bottom', '4px solid #28a745');
					corrects_list.push(userword)
					$("#corrects").text(`Correct words: ${corrects_list.join(", ")}`);
					
				}else {
					$("#input-field").css('border-bottom', '4px solid #dc3545');
					incorrects_list.push(userword)
					$("#incorrects").text(`Incorrect words: ${incorrects_list.join(", ")}`);
				}
			}
		}
	});

	$("#results-tab").on("click", function(){
		$(this).addClass("active");
		$("#main-tab").removeClass("active");
		$("#profile-tab").removeClass("active");

		$("#results").show(500);
		$("#main").hide();
		$("#profile").hide();
	});

	$("#main-tab").on("click", function(){
		$(this).addClass("active");
		$("#results-tab").removeClass("active");
		$("#profile-tab").removeClass("active");

		$("#main").show(500);
		$("#results").hide();
		$("#profile").hide();
	});

	$("#profile-tab").on("click", function(){
		$(this).addClass("active");
		$("#main-tab").removeClass("active");
		$("#results-tab").removeClass("active");

		$("#profile").show(500);
		$("#main").hide();
		$("#results").hide();
	});
});