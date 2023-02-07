class Quest extends React.Component {
	constructor() {
		super();
	}

	render() {

		return <>
			<p>{this.props.name}</p>
			<input onBlur={this.props.Change1.bind(null, this.props.index)} />
		</>
	}
}

class App extends React.Component {
	constructor() {
		super();

		this.state = {
			questions: [
				{ name: 'Какой город столица Беларуси?', answer: 'Минск' },
				{ name: 'Самая высокая гора в мире?', answer: 'Эверест' },
				{ name: 'Самое глубокое место в мире?', answer: 'Марианская впадина' },
			]
		};
	}

	Change1(index, e) {

		if (e.target.value == this.state.questions[index].answer) {
			e.target.classList.remove("uncorrect");
			e.target.classList.add("correct");
		}
		else {
			e.target.classList.add("uncorrect");
			e.target.classList.remove("correct");
		}

	}

	Check(e) {
		var inp = document.getElementsByTagName("input");
		let j = 0;
		for (let i = 0; i < inp.length; i++) {
			if (inp[i].classList.contains("correct")) {
				var p = document.createElement("p");
				p.innerHTML = "Ваш ответ: " + inp[i].value + ", правильно"; j++;
				p.style.color = "green";
			}
			else if (inp[i].classList.contains("uncorrect") || inp[i].value.length == 0) {
				var p = document.createElement("p");
				p.innerHTML = "Ваш ответ: " + inp[i].value + ", не правильно, правильный ответ: " + this.state.questions[j].answer; j++;
				p.style.color = "red";
			}
			inp[i].replaceWith(p);
			i--;
		}

	}

	render() {

		const list = this.state.questions.map((item, index) => {

			return (

				<Quest
					key={index}
					index={index}
					name={item.name}
					answer={item.answer}
					Change1={this.Change1.bind(this)}
				/>
			)
		});

		return <>
			{list}
			<button onClick={this.Check.bind(this)}>Проверить</button>
		</>;
	}
}

const block = ReactDOM.createRoot(
	document.getElementById('block')
);


block.render(<App />);
