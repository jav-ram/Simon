import React from 'react';

import Simon from '../Simon';

class SimonApp extends React.Component{   

    constructor (props) {
        super(props);
        this.state = {
            isPlaying: false,
            isOn: -1,
            colors: ['green', 'red', 'yellow', 'blue'],
            sequence: [],
            userSequence: [],
            turn: false,
            current: 0,
            isShowing: false,
            showing: 0,
            interval: ()=>{},
        }
    }

    _onTouch = (data) => {
        const {userSequence, sequence, isPlaying, isOn, turn, current} = this.state;
        if (!isPlaying) {
            //esta jugando
            this.setState( {
                isPlaying: true,
                turn: false,
            } );
            return;
        }
        if (turn && userSequence.length < sequence.length) {
            const newSequence = userSequence;
            newSequence.push(data);
            console.log("new: " + newSequence);
            console.log("state: " + sequence);
            if (newSequence[newSequence.length-1] != sequence[current]) {
                alert("Perdio");
                this.setState({
                    isPlaying: false,
                    turn: false,
                    current: 0,
                    sequence: [],
                    userSequence: [],
                    isOn:''
                });
                return;
            } else {
                console.log("Bien");
            }
            this.setState({
                userSequence: newSequence,
                isOn: data,
                current: current+1,
            });
            if (userSequence.length === sequence.length) {
                this.setState({
                    turn: false,
                    userSequence: [],
                    current: 0,
                })
                setTimeout(()=> this.setState({isOn: ''}),500);
            }
            
        }
    }

    //delay
    delay = (ms) => new Promise(
        (resolve, reject) => setTimeout(resolve, ms,)
    );

    _generate = () => {
        const {sequence, isPlaying, colors} = this.state;
        const i = this._random(0, colors.length);
        const newSequence = sequence;
        newSequence.push(colors[i]);
        this.setState({
            sequence: newSequence,
            isShowing: true,
            showing: 0,
        })
        console.log("secuencia " + this.state.sequence);
    }

    _random = (min, max) => {
        return Math.floor(Math.random()*(max)+min);
    }

    _show = () => {
        const {isShowing, showing, sequence, interval} = this.state;
        if (isShowing && showing < sequence.length) {
            setTimeout(()=> this.setState({isOn: ''}),500)
            const i = showing + 1;
            this.setState({
                isOn: sequence[showing],
                showing: i,
            });
        } else {
            this.setState({
                isOn: '',
                isShowing: false,
                turn: true,
            });
            clearInterval(interval);
        }
    }

    render (){

        const {isPlaying, turn, isShowing} = this.state;
        if (!turn && isPlaying && !isShowing) {
            this._generate();
            //mostrar
            const interval = setInterval(this._show, 1000);
            this.setState({
                interval: interval,
            }) 
        }
        
        //this.setState({sequence: this._generate()})
        return <Simon selected={this._onTouch} isOn={this.state.isOn}/>
    }

    componentDidUpdate() {
        
    }
}

export default SimonApp;