import { Component } from 'preact';
import SnakeGame from './snake-game';

class App extends Component {
	state = {
		gameOver: false
	};

	restartGame = () => this.setState({ gameOver: false });
	finishGame = () => this.setState({ gameOver: true });

	render() {
		return (
			<div id="app" style="display:flex; justify-content: center;">
				{ console.log(this.state.gameOver) }
				{ this.state.gameOver 
					? <div><p>you dead</p> <button onClick={this.restartGame}>Restart</button></div>
					: <SnakeGame finishGame={this.finishGame} />
				}
			</div>
		);
	}
}

export default App;