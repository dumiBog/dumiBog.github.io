var prompts = [
{
	prompt: 'Consider ca e dificil sa te introduci altora',
	weight: -1,
	class: 'group0'
},
{
	prompt: 'Ma pierd asa de mult prin ganduri incat nu mai sunt constient de imprejurimi',
	weight: -1,
	class: 'group1'
},
{
	prompt: 'De obicei nu incep conversatiile',
	weight: -1,
	class: 'group2'
},
{
	prompt: 'Prefer sa nu deranjez pe cei care sunt nervosi sau suparati',
	weight: -1,
	class: 'group3'
},
{
	prompt: 'Imi aleg persoanele apropiate cu grija',
	weight: -1,
	class: 'group4'
},
{
	prompt: 'Imi este dificil sa povestesc despre mine',
	weight: -1,
	class: 'group5'
},
{
	prompt: 'Ma ingrijorez prea mult de ce cred alte persoane despre mine',
	weight: -1,
	class: 'group6'
},
{
	prompt: 'De obicei sunt foarte motivat si energetic',
	weight: 1,
	class: 'group7'
},
{
	prompt: 'Este mai important sa fii adaptabil decat organizat',
	weight: 1,
	class: 'group8'
},
{
	prompt: 'Imi pasa mai mult sa nu supar alte persoane decat sa castig o dezbatere',
	weight: 1,
	class: 'group9'
},
{
	prompt: 'Deseori nu simt ca este nevoie sa-mi justific actiunile',
	weight: 1,
	class: 'group10'
},
{
	prompt: 'Consider ca este mai usor sa improvizezi un plan decat sa faci un plan bine organizat',
	weight: 1,
	class: 'group11'
},
{
	prompt: 'Daca nu ma descurc la ceva prefer sa cer ajutorul cuiva',
	weight: 1,
	class: 'group12'
},
{
	prompt: 'Imi petrec majoritatea timpului liber imprejurat de prieteni sau familie',
	weight: 1,
	class: 'group13'
},
{
	prompt: 'Ma consider o persoana optimista',
	weight: 1,
	class: 'group14'
},
{
	prompt: 'Lasati alte persoane sa va influenteze actiunile',
	weight: 1,
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
		document.getElementById('results').innerHTML = '<b>Esti introvertit</b><br><br>\
		Introvertii in general sunt dificil de inteles pentru cei care nu sunt introvertiti, pentru ca este foarte usor sa asumi ca este doar vorba despre timiditate, cand defapt introvertitii sunt doar niste persoane care considera ca este obositor sa fii inconjurat de oameni.\n\
<br><br>\
Se stie despre introvertiti ca prefera ca inainte sa spuna ce au de zis sa gandeasca profund, si ca prefera un grup mai restrans de prieteni. Ei nu prefera lucruri foarte noi sau surprinzatoare, si se bazeaza mai mult pe ce le este cunoscut. Dupa ce introvertitii vin dintr-un mediu obositor sau plin de oameni, ei isi "reincarca bateria" prin timp petrecut singuri, in liniste.\
		';
	} else if(total > 0) {
		document.getElementById('results').innerHTML = '<b>Esti extrovertit</b><br><br>\
		Fata de introvertiti, extrovertii "isi reincarca bateriile" socializand. Ei isi petrec timpul in jurul persoanelor apropiate, astfel odihnandu-va de la timpul petrecut singuri sau sub stres.\
<br><br>\
Cand extrovertitii socializeaza, ei prefera sa realizeze contact vizual cu persoanele cu care vorbesc, sunt deschisi si de obicei ei incep conversatiile.';
	} else {
		document.getElementById('results').innerHTML = '<b>Esti ambivertit</b><br><br>\
		Din moment ce introvertitii si extrovertitii se afla la extreme, restul dintre persoanele din aceasta categorie se afla in aceasta categorie. Multi dintre ei tind spre a fi introvertiti sau extrovertiti, dar unii reusesc sa puna in balans aceasta situatie.\
<br><br>\
Ambivertii arata tendinte si de introvertire si de extrovertire. Asta inseamna ca in general ambivertii nu au in general o preferinta intre a sta singuri sau cu prietenii lor, "incarcandu-si bateria" si prin socializare si prin izolare, dar echilibrat'
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
