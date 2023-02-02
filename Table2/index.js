class User extends React.Component {
	constructor() {
		super();
	}

	render() {

		return <tr>
			<td>имя: {this.props.name}</td>
			<td>фамилия: {this.props.surname}</td>
			<td>ставка: <input onBlur={this.props.Change1.bind(null, this.props.index)} defaultValue={this.props.cost}/> </td>
			<td>дни: <input onBlur={this.props.Change2.bind(null, this.props.index)} defaultValue={this.props.day}/> </td>
			<td>заработано: {this.props.day * this.props.cost}</td>
		</tr>
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
				{ name: 'Коля', surname: 'Николаев', cost: 500, day: 25},
				{ name: 'Вася', surname: 'Васильев',cost: 700, day: 15},
				{ name: 'Петя', surname: 'Петров', cost: 300, day: 30},
			],
			sum: 0
		};
	}

    Change1(index,e){
	this.state.users[index].cost = e.target.value;
	this.setState({users: this.state.users});
	}

	Change2(index,e){
		this.state.users[index].day = e.target.value;
		this.setState({users: this.state.users});
	}
	
	render() {
		this.state.sum = 0;
		const users = this.state.users.map((item, index) => {

				this.state.sum = this.state.sum + item.day * item.cost;

			return (

				<User
					key={index}
					index={index}
					name={item.name}
					surname={item.surname}
					Change1={this.Change1.bind(this)}
					cost={item.cost}
					Change2={this.Change2.bind(this)}
					day={item.day}
				/>
			)
		});

		return <div>
			<table border="1px solid black">
				<tbody>
					{users}
				</tbody>
			</table>
			<Sum sum={this.state.sum} />
		</div>;
	}
}

const block = ReactDOM.createRoot(
	document.getElementById('block')
);


block.render(<App />);
