/* eslint-disable react/prefer-stateless-function */
import { Component } from 'preact';

const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;

class SnakeGame extends Component {
	state = {
		snake: [
			{x: 200, y: 150},
			{x: 190, y: 150},
			{x: 180, y: 150},
			{x: 170, y: 150},
			{x: 160, y: 150}
		],
		fruitX: 0,
		fruitY: 0,
		score: 0,
		changingDirection: false,
		dx: 10,
		dy: 0,
		snakeSpeed: 100,
	}
	
	setChangingDirection = (changingDirection) => {
        this.setState({ changingDirection })
	}

	setYDirection = (amount) => {
        this.setState({ dy: amount })
	}
	
	setXDirection = (amount) => {
        this.setState({ dx: amount })
	}

	moveSnakeHead = (head) => {
		this.state.snake.unshift(head);
	}

	snakeRemoveHead = () => {
		this.state.snake.pop();
	}

	setFruitX = (value) => {
		this.setState({ fruitX: value });
	}

	setFruitY = (value) => this.setState({ fruitY: value });

	addScore = () => this.setState({ score: this.state.score + 10 });

	increaseSnakeSpeed = () => this.setState({ snakeSpeed: this.state.snakeSpeed / 1.05 });

	setGameOver = () => this.setState({ gameOver: true });

	componentDidMount = () => {
		const canvasColor = '#b4c100';
		const canvasOutlineColor = '#6d620f';
		const snakeColor = '#7d7b01';
		const snakeOutlineColor = '#6d620f';

		const canvas = document.getElementById("game-canvas");
		const context = canvas.getContext("2d");

		const changeDirection = (event) => {		
			if (this.state.changingDirection) { return; }

			this.setChangingDirection(true);

			const keyPressed = event.keyCode;
			const goingUp = this.state.dy === -10;
			const goingDown = this.state.dy === 10;
			const goingRight = this.state.dx === 10;
			const goingLeft = this.state.dx === -10;

			if (keyPressed === LEFT_KEY && !goingRight) {
				this.setXDirection(-10);
				this.setYDirection(0);
			}

			if (keyPressed === UP_KEY && !goingDown) {
				this.setXDirection(0);
				this.setYDirection(-10);
			}

			if (keyPressed === RIGHT_KEY && !goingLeft) {
				this.setXDirection(10);
				this.setYDirection(0);
			}
			if (keyPressed === DOWN_KEY && !goingUp) {
				this.setXDirection(0);
				this.setYDirection(10);
			}
		}

		const move = () => {
			const head = {
				x: this.state.snake[0].x + this.state.dx, 
				y: this.state.snake[0].y + this.state.dy
			};

			this.moveSnakeHead(head)
			
			const ateFood = this.state.snake[0].x === this.state.fruitX 
				&& this.state.snake[0].y === this.state.fruitY;
			
			if (ateFood) {
				this.addScore();

				const score = this.state.score;

				makeFruit(this.state.snake, this.setFruitX, this.setFruitY);

				if (score % 50 === 0) {
					this.increaseSnakeSpeed();
				}
			} else {
				this.snakeRemoveHead();
			}
		}

		document.addEventListener("keydown", changeDirection);
		
		const drawSnakePart = (snakePart) => {
			context.fillStyle = snakeColor;
			context.strokestyle = snakeOutlineColor;
			context.fillRect(snakePart.x, snakePart.y, 10, 10);
			context.strokeRect(snakePart.x, snakePart.y, 10, 10);
		}

		const drawSnake = () => this.state.snake.forEach(drawSnakePart);
		
		const clearBoard = () => {
			context.fillStyle = canvasColor;
			context.fillRect(0, 0, canvas.width, canvas.height);
			context.strokestyle = canvasOutlineColor;
			context.strokeRect(0, 0, canvas.width, canvas.height);
		}

		const drawFood = () => {
			context.fillStyle = '#f75d5d';
			context.strokestyle = 'indianred';
			context.fillRect(this.state.fruitX, this.state.fruitY, 10, 10);
			context.strokeRect(this.state.fruitX, this.state.fruitY, 10, 10);
		}

		const gameOver = (snake) => {
			for (let i = 4; i < snake.length; i++) {
				if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) { return true; }
			}

			const hitLeftWall = snake[0].x < 0;
			const hitRightWall = snake[0].x > canvas.width - 10;
			const hitTopWall = snake[0].y < 0;
			const hitBottomWall = snake[0].y > canvas.height - 10;

			return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall
		}

		const play = () => {
			if (gameOver(this.state.snake)) { return this.props.finishGame(); }

			this.setChangingDirection(false);

			setTimeout(() => {
				clearBoard();
				drawFood();
				move();
				drawSnake();
				play();
			}, this.state.snakeSpeed);
		}

		const randomValue = (min, max) => {
			return Math.round((Math.random() * (max-min) + min) / 10) * 10;
		}

		function makeFruit(snake, setFruitX, setFruitY) {
			const fruitNewXValue = randomValue(0, canvas.width - 10);
			const fruitNewYValue = randomValue(0, canvas.height - 10);
			
			setFruitX(fruitNewXValue);
			setFruitY(fruitNewYValue);
		
			const ateFruit = snake[0].x === fruitNewXValue && snake[0].y === fruitNewYValue;
			
			if (ateFruit) {
				makeFruit(snake, fruitNewXValue, fruitNewYValue, setFruitX, setFruitY);
			}
		}

		play();
		makeFruit(this.state.snake, this.setFruitX, this.setFruitY);
	}

    render() {
        return (
			<div>
				<p>Score: {this.state.score}</p>
				<canvas style="margin:auto;" width="300" height="300" id="game-canvas" />
			</div>
		);
    }
}

export default SnakeGame;