
var trex ,trex_running;
var chao 
var chaocl
var chauva
var creid,creidImage
var cactu,cactuImage1,cactuImage2,cactuImage3,cactuImage4,cactuImage5,cactuImage6
var newImage
var pontos = 0
var play=1
var end=0
var gameState = play
var cloudsGroup
var obstacleGroup
var reniciar,reniciarImage
var gameover,gameoverImage
var trexdie,trex_die
var morreusound,pularsound,marcarpraque
function preload(){
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png",)
  chaocl=loadImage("ground2.png")
  creidImage=loadImage("cloud.png")
  cactuImage1=loadImage("obstacle1.png")
  cactuImage2=loadImage("obstacle2.png")
  cactuImage3=loadImage("obstacle3.png")
  cactuImage4=loadImage("obstacle4.png")
  cactuImage5=loadImage("obstacle5.png")
  cactuImage6=loadImage("obstacle6.png")
  gameoverImage=loadImage("gameOver.png")
  reniciarImage=loadImage("restart.png")
  trex_die=loadAnimation("trex_collided.png") 
  morreusound=loadSound("die.mp3")
  pularsound=loadSound("jump.mp3")
  marcarpraque=loadSound("checkpoint.mp3")
}

function setup(){
  createCanvas(windowWidth,windowHeight)
  var rand = Math.round(random(1,100));
  console.log(rand);
  //crie um sprite de trex
 trex=createSprite(150,height-500,20,50)
 chao=createSprite(300,150,600,30)
 chauva=createSprite(100,160,200,5)
 chauva.visible=false
trex.addAnimation("running",trex_running)
trex.addAnimation("die",trex_die)
trex.scale=0.3
trex.debug=true
trex.setCollider("rectangle",0,0,50,60)
chao.addImage(chaocl)
chao.velocityX=-7
cloudsGroup=new Group()
obstacleGroup=new Group()
gameOver=createSprite(600,70)
gameOver.addImage(gameoverImage)
gameOver.scale=0.5
restart=createSprite(600,100)
restart.addImage(reniciarImage)
restart.scale=0.5
}

function criarnuvem(){
  if(frameCount % 60==0){
cloud=createSprite(600,100,20,20)
cloud.velocityX=-3
cloud.addImage(creidImage)
cloud.scale=0.7
cloud.y=Math.round(random(20,120))
trex.depth=cloud.depth +1
cloud.lifetime=220

cloudsGroup.add(cloud)

}


}

function criarcacto(){
if(frameCount % 100==0){
  obstacle = createSprite(width,140,20,50)
  obstacle.velocityX=-5
  var rand=Math.round(random(1,6))
  switch(rand){
    case 1:obstacle.addImage(cactuImage1)
    break
    case 2:obstacle.addImage(cactuImage2)
    break
    case 3:obstacle.addImage(cactuImage3)
    break
    case 4:obstacle.addImage(cactuImage4)
    break
    case 5:obstacle.addImage(cactuImage5)
    break
    case 6:obstacle.addImage(cactuImage6)
    break
 
 
 
  }
obstacle.scale=0.5
obstacle.lifetime=250

obstacleGroup.add(obstacle)


}


}





























function draw(){
  background("white")
 if(gameState==play){
 if(pontos % 100 == 0 && pontos>0){
  marcarpraque.play()
 }

  chao.velocityX=-7

  if(frameCount %3 == 0){
    pontos = pontos + 1
  }
  
   if((keyDown("space")|| touches.length>0) && trex.y > 130 ){
    trex.velocityY=-14
    touches=[]
    pularsound.play()
  
  }
  trex.velocityY=trex.velocityY+1
  
  criarnuvem()
  criarcacto()

  if(obstacleGroup.isTouching(trex)){
    gameState=end
    morreusound.play()
  }
restart.visible=false
gameOver.visible=false






  }
 else if(gameState==end){
  chao.velocityX=0
  trex.velocityY=0
  trex.changeAnimation("die",trex_die)
obstacleGroup.setVelocityXEach(0)
cloudsGroup.setVelocityXEach(0)
restart.visible=true
gameOver.visible=true
obstacleGroup.setLifetimeEach(-1)
cloudsGroup.setLifetimeEach(-1)
if(mousePressedOver(restart)){
  reset()
}

}
 
 
 
  fill("black")
textSize(18)
 text("Pontos: " + pontos, 1000,50)
 
  console.log(trex.y)
  
 
  trex.collide(chauva)


  console.log(chao.x)

  if(chao.x<0){
    chao.x=chao.width/2
  }

console.log(frameCount)

drawSprites()
}
function reset(){
gameState=play
obstacleGroup.destroyEach()
cloudsGroup.destroyEach()
trex.changeAnimation("running",trex_running)
pontos=0
}