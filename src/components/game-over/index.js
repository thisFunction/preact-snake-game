import { h } from 'preact';
import style from './styles.css'

function GameOver(props) {
    return <div class={style.Container}>
        <button class={style.Button} onClick={props.restartGame}>Restart</button>
    </div>
}

export default GameOver;