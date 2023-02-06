import React from 'react'
import { Key } from './Key.js';
import { KEY_TO_NOTE, NOTES,VALID_KEYS } from '../global/constants.js';
import _ from 'lodash';
import './Piano.css';


class Piano extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
            pressedKeys: [],
        }
    }

    playNote = (note) => {
        if (!_.isEmpty(note)){
            const noteAudio = new Audio(document.getElementById(note).src);
            noteAudio.play();
        }
    }

    componentDidMount = () => {
        window.addEventListener('keydown',this.handleKeyDown);
        window.addEventListener('keyup', this.handleKeyUP);
    }

    handleKeyDown = (event) => {
        if (event.repeat) {
            return;
        }
        const key = event.key;
        const updatePressedkeys = [...this.state.pressedKeys];
        if (!updatePressedkeys.includes(key)  && VALID_KEYS.includes(key) ) {
            updatePressedkeys.push(key);
        }
        this.setState({
            pressedKeys: updatePressedkeys,
        });
        this.playNote(KEY_TO_NOTE[key]);
    }
    handleKeyUP = (event) => {
        const index = this.state.pressedKeys.indexOf(event.key);
        if (index > -1) {
            this.setState(state => ({
                pressedKeys: state.pressedKeys.splice(index, 1)
            }));
        }
    }

    render(){
        const keys = _.map(NOTES, (note, index) => {
            return (
                <Key 
                    key={index}
                    note={note}
                    pressedKeys={this.state.pressedKeys}
                />
            );
        });

        const audioFiles = _.map(NOTES,(note,index) => {
            return (
                <audio
                    id={note}
                    key={index}
                    type="audio.mp3"
                    src={`../../notes/${note}.mp3`}
                />
            );
        });

        return(
        <div>
            <div className='piano'>
                {keys}
            </div>
            <div>
                {audioFiles}
            </div>
        </div>
        )
    }
}

export { Piano };