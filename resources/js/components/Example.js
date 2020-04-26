import React from 'react';
import ReactDOM from 'react-dom';

 class Example extends React.Component {
     constructor(props){
         super(props);
         this.state={gamesList:[]};
     }


     componentDidMount(){


const reactThis = this;
         fetch('http://localhost/games')
         .then((response)=>{
             if(response.statu !==200){
                 console.log('some error ocurred', response.status);
                 return;
             }

             return response.json();
         })
         .then((result)=>{
            reactThis.setState({gamesList:result})
         })
        .catch((err)=>{
            console.log(err)

        });
        console.log(result);
 
    }
    render(){
        const Fragment = React.Fragment;
        const rowSize = 4;

        let gamesInfo = {};
        let gamesData = this.state.gamesList.map((game)=>{
            gamesInfo =  {
                thumnail: `images/${game.thumbnail}`,
                title: game.title,
                desc: game.desc
            };

            return <Games key={game.id} info={gamesInfo}/>
        })
        .reduce((r,element,index)=>{
                index % rowSize ===   0 && r.push([]);

                r[r.length -1].push(element);
                return r;

        },[])
        .map((result,index)=>{
            return <GamesRow key={index}>{result}</GamesRow>
        });
        return (
        <Fragment>
            {gamesData}
        
        </Fragment>

    );
}
    }
export default Example;

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
