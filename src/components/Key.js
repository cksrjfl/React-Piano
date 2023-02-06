import React from "react";
import './Key.css';
import { NOTE_TO_KEY } from '../global/constants.js';
import _ from 'lodash';


class Key extends React.Component {
    
    noteIsFlat = (note) => {
        return note.length > 1;
    }
    KeyIsPressed = (note, pressedKeys) => {
        return _.includes(pressedKeys, NOTE_TO_KEY[note]);
    }

    render() {
        let keyClassName = "key";

        const noteIsFlat = this.noteIsFlat(this.props.note);
        const KeyIsPressed = this.KeyIsPressed(this.props.note, this.props.pressedKeys);

        if(noteIsFlat)  {
            keyClassName += " flat";
        }
        if(KeyIsPressed){
            keyClassName += " pressed"
        }

        let key;
        if (noteIsFlat)
        {
            key = (
                <div className={keyClassName}></div>
            )
        }
        else {
            key = (
            <div className={keyClassName}>
                <div className="key-text">
                    { this.props.note.toUpperCase() }
                </div>
            </div>
            );
        }
        return key;
    }
}

export { Key };