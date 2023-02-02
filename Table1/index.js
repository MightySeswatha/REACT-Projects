class User extends React.Component {
	constructor() {
		super();
	}

	render() {
		return <tr>
			<td>название: {this.props.name}</td>
			<td>цена: {this.props.cost}</td>
			<td>количество: {this.props.count}</td>
			<td>полная стоимость: {this.props.count * this.props.cost}</td>
			<td><button onClick={this.props.deleteUser.bind(null, this.props.index)}>
				удалить
			</button></td>
			<td><input type="checkbox" defaultChecked={this.props.check} onClick={this.props.Cfunc.bind(null, this.props.index)} /></td>
		</tr>
	}
}

class Add extends React.Component {

	constructor() {
		super();
	}

	render() {
		return <>
			<div>
				<input placeholder="name" />
				<input placeholder="cost" />
				<input placeholder="count" />
				<button onClick={this.props.addUser.bind(null, this.props.index)} >Add</button>
			</div>
		</>
	}

}

class Sum extends React.Component {

	constructor() {
		super();
	}

	render() {
		return <>
			<p>{this.props.sum}</p>
		</>
	}

}

class App extends React.Component {
	constructor() {
		super();

		this.state = {
			users: [
				{ name: 'Коля', cost: 500, count: 25, check: true },
				{ name: 'Вася', cost: 700, count: 15, check: true },
				{ name: 'Петя', cost: 300, count: 30, check: true },
			],
			sum: 0
		};
	}

	//Удаляем заданный элемент:
	deleteUser(index) {
		this.state.users.splice(index, 1);
		this.setState({ users: this.state.users });
		this.state.sum = 0;
	}

	addUser(index, e) {
		var inp1 = e.target.parentElement.children[0];
		var inp2 = e.target.parentElement.children[1];
		var inp3 = e.target.parentElement.children[2];

		if (inp1.value.length != 0 && inp2.value.length != 0 && inp3.value.length != 0 && inp2.value == Number(inp2.value) && inp3.value == Number(inp3.value)) {
			var obj = { name: inp1.value, cost: inp2.value, count: inp3.value };
			this.state.users.push(obj);
			this.setState({ users: this.state.users });
			this.state.sum = 0;
		}

	}

	Cfunc(index, e) {

		this.state.users[index].check = e.target.checked;
		this.setState({ users: this.state.users });

	}

	render() {
		this.state.sum = 0;
		const users = this.state.users.map((item, index) => {
			if (item.check == true) {
				this.state.sum = this.state.sum + item.count * item.cost;
			}
			else { }
			return (

				<User
					key={index}
					index={index}
					name={item.name}
					cost={item.cost}
					count={item.count}
					deleteUser={this.deleteUser.bind(this)}
					check={item.check}
					Cfunc={this.Cfunc.bind(this)}
				/>
			)
		});

		return <div>
			<table border="1px solid black">
				<tbody>
					{users}
				</tbody>
			</table>
			<Add addUser={this.addUser.bind(this)} />
			<Sum sum={this.state.sum} />
		</div>;
	}
}

const block = ReactDOM.createRoot(
	document.getElementById('block')
);


block.render(<App />);
