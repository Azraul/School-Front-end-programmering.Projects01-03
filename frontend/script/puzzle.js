
//Världens magi! Eller bara en grid igentligen och en massa variabler vi böhver senare
//Samt positionen för vårt puzzle, om du vill kan jag ju fixa 1000 bitar enkelt här i :D
(function(window, document, undefined){
	var 	image = new Image(),
			div = document.getElementById("puzzle"),
			container = document.getElementById("container"),
			statusP,
			scale = 100,
			border = 80,
			trayDepth = 100,
			invScale = 1.0 / scale,
			ROWS = 5,
			COLS = 8,
			tiles = [],
			slots = [],
			SPRITE_SHEET = "url('../media/puzzle.png')",
			mouseX,
			mouseY,
			offsetX,
			offsetY,
			carriedTile,
			maskRect;
	
	/* Sprite
	 *
	 * En css Sprite:
	 * Vi gör en sprit, som unity! :D
	 * Sen fixar vi css till den!
	 * Hade en underbar guide på det här!
	 * 
	 */
	function Sprite(x, y, sheet, sheetX, sheetY, width, height, dx, dy, maskRect){
		this.x = x;
		this.y = y;
		this.sheetX = sheetX;
		this.sheetY = sheetY;
		this.width = width;
		this.height = height;
		this.dx = dx || 0;
		this.dy = dy || 0;
		this.div = document.createElement("div");
		this.div.style.backgroundImage = sheet;
		this.div.style.backgroundPosition = (-sheetX) + "px " + (-sheetY) + "px";
		this.div.style.position = "absolute";
		this.div.style.width = width;
		this.div.style.height = height;
		this.maskRect = maskRect;
	}
	Sprite.prototype = {
		// Updatera vår spirits position
		update: function(x, y){
			x = x ? parseInt(x) : this.x;
			y = y ? parseInt(y) : this.y;
			var posX = this.dx + x;
			var posY = this.dy + y;
			if(maskRect){
				
				// Om vi är inne i vår Sprite så börjar vi dela upp den
				if(posX >= maskRect.x && posY >= maskRect.y && posX + this.width < maskRect.x + maskRect.width && posY + this.height < maskRect.x + maskRect.height){
					this.div.style.backgroundPosition = (-this.sheetX) + "px " + (-this.sheetY) + "px";
					this.div.style.width = this.width;
					this.div.style.height = this.height;
				
				//Om vi inte är inne i vår Sprite area
				//så flyttar vi parametern till spritens area
				} else {
					this.div.style.width = Math.abs(Math.max(maskRect.x, posX) - Math.min(maskRect.x + maskRect.width, posX + this.width));
					this.div.style.height = Math.abs(Math.max(maskRect.y, posY) - Math.min(maskRect.y + maskRect.height, posY + this.height));
					var sheetPosX = -this.sheetX + (posX < maskRect.x ? posX - maskRect.x : 0);
					var sheetPosY = -this.sheetY + (posY < maskRect.y ? posY - maskRect.y: 0);
					this.div.style.backgroundPosition = sheetPosX + "px " + sheetPosY + "px";
					if(posX < maskRect.x) posX = maskRect.x;
					if(posY < maskRect.y) posY = maskRect.y;
				}
			}
			this.div.style.left = offsetX + posX;
			this.div.style.top = offsetY + posY;
		}
	}
	// räkna ut offseten
	function getOffset(element){
		offsetX = offsetY = 0;
		if(element.offsetParent){
			do{
				offsetX += element.offsetLeft;
				offsetY += element.offsetTop;
			} while ((element = element.offsetParent));
		}
	}
	/* Gör massa små sprites som är
	* våra pussel bitar
	 */
	Tile.prototype = new Sprite();
	Tile.prototype.constructor = Tile;
	Tile.prototype.parent = Sprite.prototype;
	function Tile(r, c, sheet, maskRect){
		Sprite.call(this, c * scale, r * scale, sheet, c * scale, r * scale, scale, scale, 0, 0, maskRect);
		this.pX = this.x;
		this.pY = this.y;
		this.r = r;
		this.c = c;
	}
	Tile.prototype.copy = function(){
		var tile = new Tile(this.r, this.c, this.div.style.backgroundImage, this.maskRect);
		tile.x = this.x;
		tile.y = this.y;
		tile.slideX = this.slideX;
		tile.slideY = this.slideY;
		return tile;
	}
	
	//Dags för själva drag and drog funktionen
	//guiden talar för sig själv
	function mouseDown(e){
		var mx = mouseX - offsetX;
		var my = mouseY - offsetY;
		if(!carriedTile){
			var i, tile;
			for(i = tiles.length - 1; i > -1; i--){
				tile = tiles[i];
				if(mx >= tile.x && my >= tile.y && mx < tile.x + tile.width && my < tile.y + tile.height){
					// get the carriedTile to the top of the stack
					carriedTile = tile;
					tile.pX = tile.x;
					tile.pY = tile.y;
					tiles.splice(i, 1);
					tiles.push(tile);
					container.appendChild(tile.div);
					// check if we are lifting a tile out of a slot
					if(mx >= 0 && my >= 0 && mx < COLS * scale && my < ROWS * scale){
						var slotX = (mx * invScale) >> 0;
						var slotY = (my * invScale) >> 0;
						if(slots[slotY][slotX] == tile){
							slots[slotY][slotX] = undefined;
						}
					}
					tile.x = -scale * 0.5 + mx;
					tile.y = -scale * 0.5 + my;
					tile.update();
					break;
				}
			}
		} else {
			if(mx >= 0 && my >= 0 && mx < COLS * scale && my < ROWS * scale){
				// Kollar om vi kan släppa biten här annars kastas den tillbaka
				var slotX = (mx * invScale) >> 0;
				var slotY = (my * invScale) >> 0;
				if(!slots[slotY][slotX]){
					slots[slotY][slotX] = carriedTile;
					carriedTile.x = slotX * scale;
					carriedTile.y = slotY * scale;
				} else {
					carriedTile.x = carriedTile.pX;
					carriedTile.y = carriedTile.pY;
					// Kollar om biten varit där förut
					// Kan kolla detta med att se om den varit fast ovanför
					//högen med bitar som den börja i
					if(carriedTile.y < ROWS * scale){
						slotX = (carriedTile.x * invScale) >> 0;
						slotY = (carriedTile.y * invScale) >> 0;
						slots[slotY][slotX] = carriedTile;
					}
				}
			} else {
				carriedTile.y = Math.max(carriedTile.y, ROWS * scale);
			}
			carriedTile.update();
			carriedTile = undefined;
		}
		var c = complete();
		if(c == ROWS * COLS){
			statusP.innerHTML = "Super bra, vi är stolta över dig!"+"<p>"+ "Friendship is Magic <3" +"</p>";
		} else {
			var p = c >> 0;
			statusP.innerHTML = p++ + " bitar rätt";
		}
	}
	function mouseMove(e){
		mouseX = 0;
		mouseY = 0;
		e = e || window.event;
		if(e.pageX || e.pageY){
			mouseX = e.pageX;
			mouseY = e.pageY;
		} else if (e.clientX || e.clientY){
			mouseX = e.clientX + document.body.scrollLeft
				+ document.documentElement.scrollLeft;
			mouseY = e.clientY + document.body.scrollTop
				+ document.documentElement.scrollTop;
		}
		// Updatera fältet
		if(carriedTile){
			carriedTile.x = -scale * 0.5 + mouseX - offsetX;
			carriedTile.y = -scale * 0.5 + mouseY - offsetY;
			carriedTile.update();
		}
	}
	
	// Called to prep the tiles
	function initTiles(){
		getOffset(div);
		var r, c, tile;
		maskRect = {x:-border, y:-border, width:border * 2 + COLS * scale, height:trayDepth + border * 2 + ROWS * scale}
		for(r = 0; r < ROWS; r++){
			slots[r] = [];
			for(c = 0; c < COLS; c++){
				slots[r][c] = undefined;
				tile = new Tile(r, c, SPRITE_SHEET, maskRect);
				tile.update();
				div.appendChild(tile.div);
				tiles.push(tile);
			}
		}
		randomiseTiles();
	}
	
	//Snygg sak som också va med i guiden som säger hur långt man kommit
	function complete(){
		var r, c;
		var total = 0;
		for(r = 0; r < ROWS; r++){
			for(c = 0; c < COLS; c++){
				if(slots[r][c] && slots[r][c].r == r && slots[r][c].c == c) total++;
			}
		}
		return total
	}
	
	//Vad vore nu ett spel utan random?
	//Så man kan spamma refresh
	function randomiseTiles(){
		randomiseArray(tiles);
		var i;
		for(i = 0; i < tiles.length; i++){
			tiles[i].x = -border + Math.random() * (maskRect.width - scale);
			tiles[i].y = ROWS * scale + Math.random() * (trayDepth - scale);
			div.appendChild(tiles[i].div);
			tiles[i].update();
		}
	}
	
	//Gav exemple på kanske den svåraste randomisern jag sett så ville prova den såklart
	function randomiseArray(a){
		for(var x, j, i = a.length; i; j = parseInt(Math.random() * i), x = a[--i], a[i] = a[j], a[j] = x);
	}
	
	//Dags att sätt allt på plats
	function init(){
		div.innerHTML = "";
		div.style.width = COLS * scale;
		div.style.height = ROWS * scale;
		container.style.paddingLeft = border;
		container.style.paddingTop = border;
		container.style.width = border + COLS * scale;
		container.style.height = trayDepth + border + ROWS * scale;
		initTiles();
		container.addEventListener("mousedown", mouseDown, false);
		container.addEventListener("mousemove", mouseMove, false);
		statusP = document.createElement("p");
		container.parentNode.appendChild(statusP);
		var p = ((ROWS * COLS) * complete()) >> 0;
		statusP.innerHTML = p + " bitar rätt";
	}
	image.onload = init;
	image.src = "../media/puzzle.png";
	
}(this, this.document))

/*Otrolig guide, tog lite för många timmar att följa
*och kan inte säga att det är 100%, kanske 90?
*men det var för bra för att inte använda
*ett pussel där du enkelt kan byta bilden till en annan
*eller ändra storlek på pusslet, helt genialt!
*Creds till: ---- St33d på TIGForums ---
*/