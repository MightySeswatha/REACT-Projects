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
				{ name: 'Какой город столица Беларуси?', answer: 'Минск', correct: false, you: '' },
				{ name: 'Самая высокая гора в мире?', answer: 'Эверест', correct: false, you: '' },
				{ name: 'Самое глубокое место в мире?', answer: 'Марианская впадина', correct: false, you: '' },
			],
			current: 0
		};
	}

	Change1(index, e) {

		if (e.target.value == this.state.questions[this.state.current].answer) {
			this.state.questions[this.state.current].correct = true;
			this.state.questions[this.state.current].you = e.target.value;
		}
		else {
			this.state.questions[this.state.current].correct = false;
			this.state.questions[this.state.current].you = e.target.value;
		}

	}

	Check(e) {
		var res = document.getElementsByTagName("div")[2];
		var inp = [];
		for (let i = 0; i < res.children.length; i++) {
			if (res.children[i].tagName == "INPUT") { inp.push(res.children[i]); }
		}

		for (let i2 = 0; i2 < inp.length; i2++) {
			if (this.state.questions[i2].correct == true) {
				var p = document.createElement("p");
				p.innerHTML = "Ваш ответ: " + this.state.questions[i2].you + ", правильно";
				p.style.color = "green";
			}
			else {
				var p = document.createElement("p");
				p.innerHTML = "Ваш ответ: " + this.state.questions[i2].you + ", не правильно, правильный ответ: " + this.state.questions[i2].answer;
				p.style.color = "red";
			}
			inp[i2].replaceWith(p);
		}

		document.getElementsByTagName("div")[2].classList.remove("off");
		document.getElementsByTagName("div")[1].classList.add("off");
	}


	Prev(e) {
		document.getElementsByTagName("input")[0].value = '';
		if (this.state.current != 0) {
			this.setState({ current: this.state.current - 1 })
			document.getElementsByTagName("button")[2].classList.add("off");
		}
	}

	Next(e) {
		document.getElementsByTagName("input")[0].value = '';
		if (this.state.current < this.state.questions.length - 1) {
			this.setState({ current: this.state.current + 1 })
			if (this.state.current == this.state.questions.length - 2) {
				document.getElementsByTagName("button")[2].classList.remove("off");
			}

		}
	}

	render() {

		const list = [this.state.questions[this.state.current]].map((item, index) => {

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

		const res = this.state.questions.map((item, index) => {
			return (
				<Quest
					key={index}
					index={index}
					name={item.name}
					answer={item.answer}
					Change1={this.Change1.bind(this)}
				/>

			)
		})

		return <>
			<div>
				{list}
				<button onClick={this.Prev.bind(this)}>←</button>
				<button onClick={this.Next.bind(this)}>→</button>
				<button onClick={this.Check.bind(this)} className={"off"}>Проверить</button>
			</div>
			<div className={"off"}>{res}</div>
		</>;

	}
}

const block = ReactDOM.createRoot(
	document.getElementById('block')
);


block.render(<App />);
