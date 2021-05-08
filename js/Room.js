class Room{

    constructor(openWalls, height, width, offset, position, visited, exit){
        this.position = position;
        this.height = height;
        this.width = width;
        this.offset = offset;

        this.x = innerWidth/2 - this.width/2 + (position[1] * this.width) + (position[1] * this.offset);
        this.y = innerHeight/2 - this.height/2 + (position[0] * this.height) + (position[0] * this.offset);

        this.visited = visited;

        this.exit = exit;
        this.openWalls = openWalls;

        this.canvas = document.querySelector("canvas");
        this.ctx = this.canvas.getContext('2d');
    }

    show(){
        var roomX = this.x + this.width/2;
        var roomY = this.y + this.height/2;
        
        if(this.exit){
            this.ctx.strokeStyle = 'red';
        }else{
            this.ctx.strokeStyle = 'rgb(58, 150, 35)';
        }
        
        this.ctx.lineWidth = 150;
        this.ctx.strokeRect(this.x, this.y, this.height, this.width);

        if(this.openWalls.includes('up')){
            this.drawDoor('up', roomX, roomY);
        }
        
        if(this.openWalls.includes('down')){
            this.drawDoor('down', roomX, roomY);
        }

        if(this.openWalls.includes('left')){
            this.drawDoor('left', roomX, roomY);
        }

        if(this.openWalls.includes('right')){
            this.drawDoor('right', roomX, roomY);
        }

    }

    drawDoor(direction, roomX, roomY){
        var width = this.width/2.3;
        var height = this.height/2.3;
        var x = roomX - width/2;
        var y =  roomY - height/2;
    
        switch(direction){
            case 'left':
                x -= this.width/2;
                break;
    
            case 'right':
                x += this.width/2;
                break;
    
            case 'down':
                y += this.height/2;
                break;
    
            case 'up':
                y -= this.height/2;
                break;
    
            default:
                console.log('default');
        }
        this.ctx.fillStyle= 'rgb(2, 41, 2)';
        this.ctx.fillRect(x, y, width, height);
    };

    addToX(x){
        this.x += x;
    }

    addToY(y){
        this.y += y;
    }

    get posX(){
        return this.x;
    }

    get posY(){
        return this.y;
    }

    get pos(){
        return {
            x: this.position[1],
            y: this.position[0]
        }
    }

    get doors(){
        return this.openWalls;
    }

    get getVisited(){
        return this.visited;
    }

    setVisited(visited){
        this.visited = visited;
    }

    addDoor(door){
        this.openWalls.push(door);
    }

    setExit(){
        this.exit = true;
    }

    get getExit(){
        return this.exit;
    }

}