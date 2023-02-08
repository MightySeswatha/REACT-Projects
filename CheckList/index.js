class Menu extends React.Component {
	constructor() {
		super();
	}

	render() {

		return <>
			<div>
				<textarea onInput={this.props.Text.bind(null, this.props.index)}></textarea>
				<button onClick={this.props.Add.bind(null, this.props.index)}>Add</button>
				<button onClick={this.props.Remove.bind(null, this.props.index)}>Remove</button>
			</div>
		</>
	}
}

class App extends React.Component {
	constructor() {
		super();

		this.state = {
			text: ''
		};
	}

	Add(index, e) {
		if (this.state.text == '') { } else {
			//Создаем дивы для текстареа и чекбоксов
			var div = document.createElement("div");
			//
			var textarea = document.createElement("textarea");
			textarea.classList.add("new");
			textarea.value = this.state.text;

			textarea.onclick = () => {
				textarea.classList.add("current");
				var elem = document.getElementsByClassName("new");
				let j = [...elem].indexOf(textarea);

				for (let i = 0; i < elem.length; i++) {
					if (j != i) { elem[i].classList.remove("current"); }
				}
			}

			//
			var check = document.createElement("input");
			check.type = "checkbox";
			check.onclick = () => this.Check(check);
			//
			div.appendChild(textarea);
			div.appendChild(check);
			e.target.parentElement.parentElement.appendChild(div);
			//
			this.setState({ text: '' });
			e.target.parentElement.children[0].value = '';
		}
	}

	Remove(index, e) {
		if (document.getElementsByClassName("current").length == 0) { } else {

			document.getElementsByClassName("current")[0].parentElement.remove();
		}
	}


	Text(index, e) {
		if (e.target.value.length != 0) {
			this.setState({ text: e.target.value });
			console.log(e.target.value);
		}
	}

	Check(e) {
		var p = document.createElement("p");
		p.style.textDecoration = "line-through";
		p.innerHTML = e.parentElement.children[0].value;
		e.parentElement.children[0].replaceWith(p);
		e.remove();
	}

	render() {

		/*
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
*/
		return <>
			<Menu
				Add={this.Add.bind(this)}
				Remove={this.Remove.bind(this)}
				Text={this.Text.bind(this)}
			/>
		</>;

	}
}

const block = ReactDOM.createRoot(
	document.getElementById('block')
);


block.render(<App />);
