class App extends React.Component {

    constructor(){  
      super()
      this.state = {
      arr: []
      };
  }
   
    Change(e){
    var text = e.target.parentElement.children[0].value;
    var data = new Date();
    var data2 = "("+data.getHours()+":"+data.getMinutes()+":"+data.getSeconds()+") "+data.getDate()+":"+(data.getMonth()+1)+":"+data.getFullYear();
    if(text.length > 0){
    this.state.arr.push({value: text, d: data2 });
    this.setState({arr: this.state.arr})
    }
    }

    Change2(e){
      if(e.target.innerHTML == "delete"){
      e.target.parentElement.remove();
      }
      else if(e.target.innerHTML == "change"){
      //console.log(e.target.parentElement.children[0].innerHTML);
      e.target.parentElement.children[0].innerHTML = e.target.parentElement.parentElement.parentElement.children[0].value;
      }
    }

    render() {

      const list = this.state.arr.map(function(item,index){
      return <div>
        <h2>{item.value}</h2>
        <p>{item.d}</p>
        <button>delete</button>
        <button>change</button>
        </div>
      })

      return (
      <>
      <textarea></textarea>
      <br/>
      <button onClick={this.Change.bind(this)}>Add note</button>
      <div onClick={this.Change2.bind(this)}>
      {list}
      </div>
      </>
      )
    }
  
  }
  
  const block = ReactDOM.createRoot(
      document.getElementById('block')
    );
  
  
  block.render(<App/>);
  