
class App extends React.Component {


/*Before onChange selectors*/
  Fday(){
  let arr = [];
  for(let i = 1; i <= 31; i++){
  arr.push(i);
  }  
  return arr;
  }

  Fmonth(){
  let arr = [];
  for(let i = 1; i <= 12; i++){
    arr.push(i);
    }  
    return arr;
  }

  Fyear(){
    let arr = [];
    for(let i = 0; i <= 2023; i++){
      arr.push(i);
      }  
      return arr;
    }

/**/

  constructor(){  
    super()
    this.state = {
      day: this.Fday(),
      month: this.Fmonth(),
      year: this.Fyear(),
      Cday: new Date().getDate(),
      Cmonth: new Date().getMonth()+1,
      Cyear: new Date().getFullYear()
  }
}

/*Change Functions*/
Dchange(e){
this.setState({Cday: e.target.value});
}

Mchange(e){
this.setState({Cmonth: e.target.value});
}

Ychange(e){
this.setState({Cyear: e.target.value});
}

Res(y,m,d){
var temp = new Date(y,m,d);

if (temp.getFullYear() == y && temp.getMonth() == m && temp.getDate() == d) {
} else {
  console.log("Некорректная дата");
}

return temp.getDay();
}
/**/ 

	render() {

    const arr = ["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"]

    const Dlist = this.state.day.map(function(item,index){
    if(item == new Date().getDate()){return <option key={index} selected>{item}</option>}
    return <option key={index}>{item}</option>
    })
        const Mlist = this.state.month.map(function(item,index){
          if(item == new Date().getMonth()+1){return <option key={index} selected>{item}</option>}
          return <option key={index}>{item}</option>
    })
          const Ylist = this.state.year.map(function(item,index){
            if(item == new Date().getFullYear()){return <option key={index} selected>{item}</option>}
            return <option key={index}>{item}</option>
    })

		return (
    <>
    <select onChange={this.Dchange.bind(this)}>{Dlist}</select>
    <select onChange={this.Mchange.bind(this)}>{Mlist}</select>
    <select onChange={this.Ychange.bind(this)}>{Ylist}</select>
    <p>{this.state.Cday}:{this.state.Cmonth}:{this.state.Cyear}</p>
    <p>{arr[this.Res(this.state.Cyear,this.state.Cmonth-1,this.state.Cday)]}</p>
    </>
		)
	}

}

const block = ReactDOM.createRoot(
    document.getElementById('block')
  );


block.render(<App/>);
