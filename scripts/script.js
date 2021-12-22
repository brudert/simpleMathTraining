const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
var ques;

function Question(){
	operators = ["+", "-", "×", "÷"]
	this.type = operators[Math.floor(Math.random() * 4)];
	this.num1 = (Math.floor(Math.random() * 19) + 1);
	this.num2 = Math.floor(Math.random() * 14);
	if(this.type == "÷"){
		buffer = this.num1;
		this.num1 = this.num1 * this.num2;
		this.num2 = buffer;
	}

	this.getDisplayString = function(){
		return this.num1 + " " + this.type + " " + this.num2;
	}
	this.getAnswer = function(){

		if(this.type == "+"){
			return this.num1 + this.num2;
		}
		if(this.type == "-"){
			return this.num1 - this.num2;
		}
		if(this.type == "÷"){
			return this.num1 / this.num2;
		}
		return this.num1 * this.num2;
	}
}

function switchModes(){
	document.body.classList.toggle("dark-theme");
}

function displayTrain(){
	if(train.style.opacity == "0"){
		tests.style.opacity = "0";
		menu.style.opacity = "0";
		window.setTimeout(function () {
			tests.style.display = "none";
			menu.style.display = "none";
			train.style.display = "block";

			window.setTimeout(function () {
				train.style.opacity = "1";

				initTrain();
			}, 10);
		}, 1000);
	}
}

function displayTest(){
	if(tests.style.opacity == "0"){
		train.style.opacity = "0";
		menu.style.opacity = "0";
		window.setTimeout(function () {
			tests.style.display = "none";
			menu.style.display = "none";
			tests.style.display = "block";

			window.setTimeout(function () {
				tests.style.opacity = "1";
			}, 10);
		}, 1000);
	}
}

function displayMenu(){
	if(menu.style.opacity == "0"){
		tests.style.opacity = "0";
		train.style.opacity = "0";
		window.setTimeout(function () {
			tests.style.display = "none";
			train.style.display = "none";
			menu.style.display = "block";

			window.setTimeout(function () {
				menu.style.opacity = "1";
			}, 10);
		}, 1000);
	}
}

function initTest(){

}

function newTrainQuestion(){
	if(document.getElementById("current-question").innerHTML != ""){
		var text = ques.getDisplayString() + " = ";
		if(document.getElementById("train-answer").value != ques.getAnswer()){
			text += "<s>" + document.getElementById("train-answer").value + "</s> " + ques.getAnswer();
		}
		else{
			text += document.getElementById("train-answer").value
		}
		document.getElementById("old-question").innerHTML = text;
	}
	document.getElementById("train-answer").value = "";
	ques = new Question();
	document.getElementById("current-question").innerHTML = ques.getDisplayString();
	document.getElementById("train-answer").value = "";
	document.getElementById("train-answer").focus();
	document.getElementById("train-answer").select();
}

function initTrain(){
	document.getElementById("old-question").innerHTML = "";
	document.getElementById("current-question").innerHTML = "";
	document.getElementById("submit-train").onclick = newTrainQuestion;

	newTrainQuestion()

}

function main(){

	train = document.getElementById("train");
	tests = document.getElementById("quizz");
	menu = document.getElementById("menu");

	dark = prefersDarkScheme.matches;
	if(dark){
		document.body.classList.toggle("notransition");
		document.body.classList.add("dark-theme");
		document.body.classList.toggle("notransition");
	}

	document.getElementById("display-icon").onclick = switchModes;
	document.getElementById("home-icon").onclick = displayMenu;

	document.getElementById("test-button").onclick = displayTest;
	document.getElementById("train-button").onclick = displayTrain;

	menu.style.opacity == "1";
	tests.style.opacity == "0";
	train.style.opacity == "0";
}
