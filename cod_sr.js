var prompts = [
{
	prompt: 'Consider ca exista o putere supranaturala',
	weight: 1,
	class: 'group0'
},
{
	prompt: 'Sunt unele lucruri pe care stiinta nu le poate explica',
	weight: 1,
	class: 'group1'
},
{
	prompt: 'Am avut experiente pe care nu le pot explica folosind ratiunea',
	weight: 1,
	class: 'group2'
},
{
	prompt: 'Simt ca daca fac bine in jurul meu la randul meu o sa primesc la fel',
	weight: 1,
	class: 'group3'
},
{
	prompt: 'Cred in existenta raiului si a iadului',
	weight: 1,
	class: 'group4'
},
{
	prompt: 'Consider ca este important sa ai o religie',
	weight: 1,
	class: 'group5'
},
{
	prompt: 'Ma consider o persoana superstitioasa',
	weight: 1,
	class: 'group6'
},
{
	prompt: 'Consider ca exista viata dupa moarte',
	weight: 1,
	class: 'group7'
},
{
	prompt: 'Prefer ratiunea in locul intuitiei',
	weight: -1,
	class: 'group8'
},
{
	prompt: 'Valorile morale provin si sunt impinse de catre religii',
	weight: -1,
	class: 'group9'
},
{
	prompt: 'Consider religia ca ceva care apartine trecutului',
	weight: -1,
	class: 'group10'
},
{
	prompt: 'Traditiile unui popor nu se transmit majoritar prin religie',
	weight: -1,
	class: 'group11'
},
{
	prompt: 'Am citit sau consider sa citesc un articol sau o carte despre spiritualitate',
	weight: 1,
	class: 'group12'
},
{
	prompt: 'Religia si spiritualitatea reprezinta pentru mine acelasi lucru',
	weight: -1,
	class: 'group13'
},
{
	prompt: 'Consider ca traiesc pentru a indeplini ce-mi spune religia',
	weight: 1,
	class: 'group14'
},
{
	prompt: 'In opinia mea, superstitiile sunt puerile si nu se aplica niciodata in viata de zi cu zi',
	weight: -1,
	class: 'group15'
}
]
var prompt_values = [
{
	value: 'Total de acord', 
	class: 'btn-default btn-strongly-agree',
	weight: 5
},
{
	value: 'De acord',
	class: 'btn-default btn-agree',
	weight: 3,
}, 
{
	value: 'Neutru', 
	class: 'btn-default',
	weight: 0
},
{
	value: 'Impotriva',
	class: 'btn-default btn-disagree',
	weight: -3
},
{ 
	value: 'Total impotriva',
	class: 'btn-default btn-strongly-disagree',
	weight: -5
}
]
function createPromptItems() {
	for (var i = 0; i < prompts.length; i++) {
		var prompt_li = document.createElement('li');
		var prompt_p = document.createElement('p');
		var prompt_text = document.createTextNode(prompts[i].prompt);
		prompt_li.setAttribute('class', 'list-group-item prompt');
		prompt_p.appendChild(prompt_text);
		prompt_li.appendChild(prompt_p);
		document.getElementById('quiz').appendChild(prompt_li);
	}
}
function createValueButtons() {
	for (var li_index = 0; li_index < prompts.length; li_index++) {
		var group = document.createElement('div');
		group.className = 'btn-group btn-group-justified';
		for (var i = 0; i < prompt_values.length; i++) {
			var btn_group = document.createElement('div');
			btn_group.className = 'btn-group';
			var button = document.createElement('button');
			var button_text = document.createTextNode(prompt_values[i].value);
			button.className = 'group' + li_index + ' value-btn btn ' + prompt_values[i].class;
			button.appendChild(button_text);
			btn_group.appendChild(button);
			group.appendChild(btn_group);
			document.getElementsByClassName('prompt')[li_index].appendChild(group);
		}
	}
}
createPromptItems();
createValueButtons();
var total = 0;
function findPromptWeight(prompts, group) {
	var weight = 0;
	for (var i = 0; i < prompts.length; i++) {
		if (prompts[i].class === group) {
			weight = prompts[i].weight;
		}
	}
	return weight;
}
function findValueWeight(values, value) {
	var weight = 0;
	for (var i = 0; i < values.length; i++) {
		if (values[i].value === value) {
			weight = values[i].weight;
		}
	}
	return weight;
}
$('.value-btn').mousedown(function () {
	var classList = $(this).attr('class');
	var classArr = classList.split(" ");
	var this_group = classArr[0];
	if($(this).hasClass('active')) {
		$(this).removeClass('active');
		total -= (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $(this).text()));
	} else {
		total -= (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $('.'+this_group+'.active').text()));
		$('.'+this_group).removeClass('active');
		$(this).addClass('active');
		total += (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $(this).text()));
	}
	console.log(total);
})
$('#submit-btn').click(function () {
	$('.results').removeClass('hide');
	$('.results').addClass('show');
	if(total < 0) {
		document.getElementById('results').innerHTML = '<b>Esti ateu/atee</b><br><br>\
        Oamenii care nu sunt spirituali, care sunt atei, prefera ratiunea in fata intuitiei. \<br><br>\
        Incercati sa gasiti o explicatie stiintifica pentru orice ce se intampla in lumea asta';
	} else if(total > 0) {
		document.getElementById('results').innerHTML = '<b>Esti spiritual</b><br><br>\
		Spiritualitatea sau religia ta au o importanta mare pentru tine.\
<br><br>\
Pui mare accent pe valorile morale transmise de religia ta, si sustii existenta unei puteri supranaturale sau al unui ajutor divin.';
	} else {
		document.getElementById('results').innerHTML = '<b>Esti agnostic</b><br><br>\
		Chiar daca nu esti total religios, tot valorifici cateva detalii ale spiritualitatii, cum ar fi superstitiile.\
<br><br>\
Daca sunteti intrebati de religia voastra, sunt sanse mari ca dumneavoastra sa spuneti ca nu sunteti religios sau doar ca nu sunteti practicant/practicanta'
	}
	$('#quiz').addClass('hide');
	$('#submit-btn').addClass('hide');
	$('#retake-btn').removeClass('hide');
})
$('#retake-btn').click(function () {
	$('#quiz').removeClass('hide');
	$('#submit-btn').removeClass('hide');
	$('#retake-btn').addClass('hide');
	$('.results').addClass('hide');
	$('.results').removeClass('show');
})
