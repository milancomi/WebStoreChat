import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';

import Games from './Games';
import GamesRow from './GameRow';

 class Example extends React.Component {
  


    render(){
        const Fragment = React.Fragment;
        const rowSize = 4;

        let gamesInfo = {};
        let gamesData = this.props.gamesList.map((game)=>{
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

    let{listGames} = context;



    const html = ReactDOMServer.renderToString(
    <Main gamesList={listGames}/>
);

dispatchEvent(html);