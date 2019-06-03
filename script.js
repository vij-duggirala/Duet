let canvas = document.getElementById("game");
if(canvas.getContext)
	var ctx= canvas.getContext("2d");
var grad;
let blocks=[];
let namebuffer="";
let code;
let time, score, a, flag , speed , interval , blockInterval, right, left, pause, quit;
let scoreboard=document.getElementById("scoreboard");
function iniSettings(){
	 blocks=[];
	 quit=false;
	 right=false;
	pause=false;
	 left=false;
	 a=0;
	 flag=0;
	 speed =2;
	 score=0;
	 time=0;	
	 interval=2000;
	 blockInterval =setInterval( drawNewBlock , interval);
}

function createPlayer(nam, scor){
	return{
		name: nam, 
		score: scor,
		li: document.createElement("li"),
		add: function(){
		        	scoreboard.appendChild(this.li);
				this.li.setAttribute('class' , "list");
		},
		display: function(num){
			this.score = num;
			this.li.innerHTML = this.name+":     "+this.score;
		}
			 
	};
}



let players=[];
document.addEventListener('keydown' , function(e){

	if(e.key=="ArrowLeft"||e.key=="Left")
		 left=true; 
	if(e.key=="ArrowRight" || e.key =="Right" )
		 right=true; 
}, false);

document.addEventListener('keyup' , function(e){
	if(e.key=="ArrowLeft" || e.key=="Left")
		left=false;
	if(e.key=="ArrowRight" || e.key=="Right")
		right=false;
}, false);


canvas.setAttribute('width', '550px');
canvas.setAttribute('height' , '900px');


function drawCircle(){
	ctx.beginPath();
	ctx.strokeStyle='#FFFFFF';
	ctx.arc(canvas.width/2 , canvas.height - 150 , 100 , 0 , 2*Math.PI , true);
	ctx.stroke();
}

function createBlock(x, y, l,w) {
  return {
    x: x,
    y: y,
    l: l,
    w: w,
    draw: function() {
	grad = ctx.createLinearGradient(this.x, this.y , this.x+this.l , this.y+this.w);
	grad.addColorStop(0, '#FFFFFF');
	grad.addColorStop(1, '#A0A0A0')
	ctx.fillStyle=grad;
      ctx.fillRect(this.x, this.y, this.l, this.w);
    }
  };
}



function drawC(i,a){
	if(i)
		{
		a=Math.PI+a;
		ctx.fillStyle= 'rgb(0,0, 255)';
		}
	else
		ctx.fillStyle='rgb(255,0,0)';			
	ctx.beginPath();
	ctx.arc(canvas.width/2 + 100*Math.cos(a) , canvas.height - 150 + 100*Math.sin(a) , 10 , 0 , 2*Math.PI , true);
	ctx.fill();
}	  	





function drawNewBlock(){
	let x = Math.random()*400 ;
	blocks.push(createBlock(x , -5 , 150 , 50));
}
		
	
function touch(obj , a){
	var p,i ,q;
	for(i=1;i<=8;i++)
	{
		p=canvas.width/2 + 100*Math.cos(a)+10*Math.cos((Math.PI/8)*i);
		q=canvas.height - 150 + 100*Math.sin(a)+10*Math.sin((Math.PI/8)*i);	
		if (( p>=obj.x )&& (p<=(obj.x+obj.l)) && (q>=obj.y) && (q<=(obj.y+obj.w)))
			flag=-1;
	}
}
	

function displayScore(){
	score=parseInt(time/50);
	ctx.font="20px serif";
	ctx.fillStyle=' #ff8000';
	ctx.fillText("Score: "+score, 50 , 30);
	if(score%20 ==0)
		{ speed=speed+0.005;
		  interval=interval-50;
		}
}


	

function draw(){

	rbtn.style.visibility="visible";
	pbtn.style.visibility="visible";
		
	ctx.clearRect(0,0, canvas.width, canvas.height);
	ctx.fillStyle='#000000';
	ctx.fillRect(0,0,canvas.width, canvas.height);	
	drawCircle();
	blocks.forEach(function(obj){
		obj.y=obj.y + speed;
		obj.draw();
	});
	blocks.forEach(function(obj){
		touch(obj , a);
		touch( obj , Math.PI+a);
			
		
	});
	
	if(pause){
	alert("The game has been paused. Click to resume");
	pause=false; 
	}		
		
	
	reqObj.display(score);
	for(i=players.length-1; i>=0;i--)
	{
		if(players[i].score < score)
			scoreboard.insertBefore(reqObj.li , players[i].li);	
	}
	displayScore();
	drawC(0,a);
	drawC(1,a);
	

	if(right)
		a=a+0.05;
	if(left)
		a=a-0.05;	
	if(flag===-1)
		endgame();
	else if(quit){
		quit=false;
		Start();
		
	}
	else
	{ time++;
	requestAnimationFrame(draw);
	}

}

function endgame(){
	alert("game over");
	Intro();
	
}
let reqObj;
function Start(){
	document.removeEventListener('click' , Start);
	clearInterval(blockInterval);
	iniSettings();
	players.forEach(function(obj){
		if(obj.name === namebuffer)
			reqObj = obj;
	});
		
	draw();
	
}

function Info(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.fillStyle='#000000';
	ctx.fillRect(0,0,canvas.width, canvas.height);
	ctx.textAlign='center';
	ctx.font='40px serif';
	ctx.fillStyle='#FFFFFF';
	ctx.fillText("Enter player name: ", canvas.width/2, canvas.height/2-100);
	ctx.fillText(namebuffer, canvas.width/2, canvas.height/2+100);	
}
let obj;
document.addEventListener('keypress' , function(e){
	e.preventDefault();
	code=parseInt(e.which);
	if(code==13){
		obj=createPlayer(namebuffer, 0);		
		players.push(obj);
		obj.add();
		obj.display(2);
		Start();
	}
	else
	{ namebuffer=namebuffer+String.fromCharCode(code);
	 Info();
	 ctx.fillText("Press enter to continue", canvas.width/2, canvas.height-100);} 
	});
		
	


function Intro(){
	rbtn.style.visibility="hidden";
	pbtn.style.visibility="hidden";

	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.fillStyle='#000000';
	ctx.fillRect(0,0,canvas.width, canvas.height);
	ctx.textAlign='center';
	ctx.font='80px serif';
	grad=ctx.createLinearGradient(canvas.width/2 , canvas.height/2-80 , canvas.width/2 , canvas.height/2+80);
	grad.addColorStop(0, 'rgb(255, 0 , 0)');
	grad.addColorStop(1, 'rgb(0,0,255)');	
	ctx.fillStyle=grad;
	ctx.fillText("DUET" , canvas.width/2 , canvas.height/2);
	ctx.font='25px serif';
	ctx.fillText("Instructions: ", canvas.width/2 , canvas.height/2+120);
	ctx.fillText("Use right and left arrow keys"  , canvas.width/2 , canvas.height/2+170);
	ctx.fillText("to rotate your player"  , canvas.width/2 , canvas.height/2+220);
	ctx.fillStyle='#FF3333';
	ctx.fillText("Click to proceed"  , canvas.width/2 , canvas.height/2+380);
	namebuffer="";
	document.addEventListener('click' , Info);
}

let rbtn =document.getElementById("rbtn");
rbtn.addEventListener('click' , function(){
	quit=true;
});

let pbtn=document.getElementById("pbtn");
pbtn.addEventListener('click' , function(){
	pause=true;
});


Intro();
//Start();






