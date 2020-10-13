import { Component } from 'preact';
import SnakeGame from './snake-game';
import GameOver from './game-over';
import style from '../style/index.css';

class App extends Component {
	state = {
		gameOver: false,
		score: 0,
	};

	restartGame = () => this.setState({ gameOver: false });

	finishGame = () => this.setState({ gameOver: true });

	addScore = () => this.setState({ score: this.state.score += 15 });

	render() {
		return (
			<div id="app" class={style.app}>
				<p>Score: {this.state.score}</p>
				{ this.state.gameOver 
					? <GameOver restartGame={this.restartGame} />
					: <SnakeGame 
						addScore={this.addScore} 
						finishGame={this.finishGame} 
					/>
				}
			</div>
		);
	}
}

export default App;