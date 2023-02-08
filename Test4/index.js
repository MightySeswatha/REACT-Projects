class Quest extends React.Component {
	constructor() {
		super();
	}

	render() {

		return <>
			<p>{this.props.name}</p>
			<p><input type="radio" onClick={this.props.Change1.bind(null, this.props.index)} /><span>{this.props.list1}</span></p>
			<p><input type="radio" onClick={this.props.Change1.bind(null, this.props.index)} /><span>{this.props.list2}</span></p>
			<p><input type="radio" onClick={this.props.Change1.bind(null, this.props.index)} /><span>{this.props.list3}</span></p>
			<p><input type="radio" onClick={this.props.Change1.bind(null, this.props.index)} /><span>{this.props.list4}</span></p>
		</>
	}
}

class Res extends React.Component {
	constructor() {
		super();
	}

	render() {

		return <>
			<p>{this.props.name}</p>
			<p className="res">test</p>
		</>
	}
}

class App extends React.Component {
	constructor() {
		super();

		this.state = {
			questions: [
				{ quest: [['Города Беларуси?', ['Минск', 'Могилев'], ["Москва", "Солнце", "Минск", "Могилев"]]], correct: false, you: [] },
				{ quest: [['Что из этого гора?', ['Эверест'], ["Эверест", "Солнце", "Минск", "Могилев"]]], correct: false, you: [] },
				{ quest: [['Что из этого деревья?', ['Дуб', 'Береза', 'Осина'], ["Дуб", "Береза", "Осина", "Марианская впадина"]]], correct: false, you: [] }
			],
			current: 0
		};
	}

	Change1(index, e) {

		var i = [...document.getElementsByTagName("p")].indexOf(e.target.parentElement) - 1;
		var arr = this.state.questions[this.state.current].you;
		var value = e.target.parentElement.parentElement.children[i + 1].children[1].innerHTML;
		if (e.target.value == "on") {
			e.target.value = true;
			if (arr.indexOf(value) != -1) { }
			else {
				arr.push(value);
			}
		}
		else if (e.target.value == "true") {
			e.target.value = "on";
			e.target.checked = false;
			if (arr.indexOf(value) != -1) { arr.splice(arr.indexOf(value), 1) }
		}
		console.log(this.state.questions[this.state.current].quest[0][1]);
		console.log(arr);
		if (this.state.questions[this.state.current].quest[0][1].length == arr.length) {
			for (let i = 0; i < arr.length; i++) {
				if (this.state.questions[this.state.current].quest[0][1].indexOf(arr[i]) != -1) {
					this.state.questions[this.state.current].correct = true;
				}
				else { this.state.questions[this.state.current].correct = false; break; }
			}
		}
		else { this.state.questions[this.state.current].correct = false }
		this.state.questions[this.state.current].you = arr;
		this.setState({ questions: this.state.questions })

	}

	Check(e) {

		var res = document.getElementsByClassName("res");

		for (let i2 = 0; i2 < res.length; i2++) {
			if (this.state.questions[i2].correct == true) {
				res[i2].innerHTML = "Ваш ответ: " + this.state.questions[i2].you + ", правильно";
				res[i2].style.color = "green";
			}
			else {
				res[i2].innerHTML = "Ваш ответ: " + this.state.questions[i2].you + ", не правильно, правильный ответ: " + this.state.questions[i2].quest[0][1];
				res[i2].style.color = "red";
			}

		}

		document.getElementsByTagName("div")[2].classList.remove("off");
		document.getElementsByTagName("div")[1].classList.add("off");

	}


	Prev(e) {
		if (this.state.current != 0) {
			this.state.questions[this.state.current].you = [];
			this.setState({ current: this.state.current - 1 })
			document.getElementsByTagName("button")[2].classList.add("off");

			var inp = document.getElementsByTagName("input");
			for (let i = 0; i < document.getElementsByTagName("input").length; i++) {
				inp[i].value = "on";
				inp[i].checked = false;
			}
		}

	}

	Next(e) {
		if (this.state.current < this.state.questions.length - 1) {
			this.setState({ current: this.state.current + 1 })
			if (this.state.current == this.state.questions.length - 2) {
				document.getElementsByTagName("button")[2].classList.remove("off");
			}

			var inp = document.getElementsByTagName("input");
			for (let i = 0; i < document.getElementsByTagName("input").length; i++) {
				inp[i].value = "on";
				inp[i].checked = false;
			}

		}

	}

	render() {

		const list = this.state.questions[this.state.current].quest.map((item, index) => {

			return (

				<Quest
					key={index}
					index={index}
					name={item[0]}
					list1={item[2][0]}
					list2={item[2][1]}
					list3={item[2][2]}
					list4={item[2][3]}
					Change1={this.Change1.bind(this)}
				/>
			)
		});

		const res = this.state.questions.map((item, index) => {
			return (
				<Res
					key={index}
					name={item.quest[0][0]}
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
