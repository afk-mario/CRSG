(function() {
	'use strict';
	function Play() {}
	Play.prototype = {
		create: function() {
			game.stage.backgroundColor = '#333333';
			this.score = 0;

			/* Audio */
			this.fx = game.add.audio('sfx');
			this.soundtrack = game.add.audio('soundtrack');
			//this.soundtrack.play('',0,1,true);

			// Show FPS
			this.game.time.advancedTiming = true;

			/* Bit Map Data */

			/* Grid */

			/* Groups */
			this.grid = new Grid(10, 10, gameWidth, gameHeight, 50, true, true);
			var matrix = this.genMatrix();
			
			this.grid.addLayer(matrix, 'walls', 'tiles',[null,'TileWall','TileEnemy','TileExit','TilePowerUp','TilePlayer'], 256, 256, 1,2,3,4,5);

			/* Sprites */
			/*this.player = game.add.sprite(game.world.centerX, game.world.centerY, 'tiles');
			this.player.frameName = 'TilePlayer';
			var convertion = this.grid.cellWidth/256;
			
			this.player.scale.set(convertion);*/

			/* Text */
			this.fpsText = this.game.add.text(game.world.width - 50, 10, '0',{
				font: "20px Source Code Pro",
				fill: "#f0f0f0",
				align: "center"
			});

			this.levelText = this.game.add.text(50, 10, 'Level: ' + level,{
				font: "20px Source Code Pro",
				fill: "#f0f0f0",
				align: "center"
			});

			this.fpsText.anchor.set(1.0,0);

			/* Timer */

			/* Particles */

			/* Keyboard */
			this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
			this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
			this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
			this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
			this.escKey = game.input.keyboard.addKey(Phaser.Keyboard.ESC);

			this.upKey.onDown.add(function () { this.grid.move(this.player,'up'); },this);
			this.downKey.onDown.add(function () { this.grid.move(this.player,'down'); },this);
			this.leftKey.onDown.add(function () { this.grid.move(this.player,'left'); },this);
			this.rightKey.onDown.add(function () { this.grid.move(this.player,'right'); },this);
			this.escKey.onDown.add(function () { this.quitGame('mainmenu'); }, this);
		},

		update: function() {
			if (this.game.time.fps !== 0) {
				this.fpsText.setText(this.game.time.fps + ' FPS');
			}
		},

		quitGame: function (state) {
			level++;
			this.grid = {};
			this.fx.play('',0,1,false);
			localStorage.setItem('lastScore', this.score);
			game.time.events.remove(this.timer);
			game.state.start(state);
		}
	};

	Play.prototype.die = function() {
		this.score--;
	};

	Play.prototype.genMatrix = function() {
		var enemies = [2];
		var elements = [3,4];
		var matrix = [];
		var indexes = []; 

		for (var i = level - 1; i > 0; i--) {
			enemies.push(2);
		}

		for (var i = 100; i >= 0; i--) {
			matrix.push(0);
		}

		for (var i = 6-1; i >= 0; i--) {
			matrix[i+22] = 1;
			matrix[i+72] = 1;
			matrix[22 + i*10] = 1;
			matrix[27 + i*10] = 1;

			indexes.push(i + 22);
			indexes.push(i + 72);
			indexes.push(22 + i*10);
			indexes.push(27 + i*10);
		}

		for (var i = enemies.length - 1; i >= 0; i--) {
			elements.push(enemies.pop());
		}

		Phaser.Utils.shuffle(elements);
		Phaser.Utils.shuffle(indexes);
		
		for (var i = elements.length - 1; i >= 0; i--) {
			matrix[indexes[i]] = elements[i];
		}
		//matrix[0] = 5;
		matrix[55] = 5;

		return matrix;
	};

	PlayS = Play;
}());