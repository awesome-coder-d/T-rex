var trex, trex_running, trex_collided, cloudImage, jumpSound, deathSound, checkpointSound;
var ground, invisibleGround, groundImage, obs1, obs2, obs3, obs4, obs5, obs6, obstacle, cloudGroup, obstaclesGroup, clouds, gameState = "play", gameOver, restart, startScreen, screenStart, score = 0;
 var gameOverIcon;
    
    var restartIcon;
    
function preload() {
  // adding images/sounds
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  cloudImage = loadImage("cloud.png")
  obs1 = loadImage("obstacle1.png");
  obs2 = loadImage("obstacle2.png"); 
  obs3 = loadImage("obstacle3.png");
  obs4 = loadImage("obstacle4.png");
  obs5 = loadImage("obstacle5.png");
  obs6 = loadImage("obstacle6.png");
  groundImage = loadImage("ground2.png");
  gameOver = loadImage("gameOver.png");
  restart = loadImage("restart.png");
  jumpSound = loadSound("jump.mp3");
    deathSound = loadSound("die.mp3");
    checkpointSound = loadSound("checkPoint.mp3");

  
  startScreen = loadImage("startScreen.png");
}

function setup() {
  createCanvas(600, 200);
 gameOverIcon = createSprite(300, 100);
  gameOverIcon.addImage(gameOver);
        gameOverIcon.scale = 0.8;
  
  restartIcon = createSprite(300, 150);
  restartIcon.addImage(restart);
    restartIcon.scale = 0.7;
//create a trex sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  trex.frameDelay = 2;
  cloudGroup = new Group();
  obstaclesGroup = new Group();
  // create a ground sprite
 
  invisibleGround = createSprite(215, 190, 400, 10);
  invisibleGround.visible = false;
}

function draw() {
  background("white");
  text(score, 550, 50);
 if(score%1000 === 0 && score !== 0) {
   checkpointSound.play();
 }
   if(keyDown("space") && gameState === "startScreen") {
    gameState = "play";

   }
  if (gameState === "play") {
    score += Math.round(frameCount / 100);
gameOverIcon.visible = false;
   restartIcon.visible = false;
   if (keyDown("space") && trex.y >= 161.5) {
      trex.velocityY = -10;
      jumpSound.play();
  }
    trex.velocityY += 0.6;
      ground.velocityX = -15;
    spawnClouds();
    spawnObstacles();
  if (ground.x < 0) {
    ground.x = ground.width / 2;
    }

  }
  if (trex.isTouching(obstaclesGroup)) {
  gameState = "end";
  trex.changeAnimation("collided");
    deathSound.play();
  }
  else if (gameState === "end") {
    obstaclesGroup.destroyEach();
    trex.velocityY = 0;
  ground.velocityX = 0;
 gameOverIcon.visible = true;
   restartIcon.visible = true;
    obstaclesGroup.setVelocityXEach(0);
     if (mousePressedOver(restartIcon) && gameState === "end") {
   gameState = "play";
   
       trex.changeAnimation("running");
       score = 0;
 }
  }
  
 
  console.log(gameState);

    
  trex.collide(invisibleGround);
  drawSprites();

  }
function spawnClouds() {
  if (gameState === "end" ) {
  return;
  }
  if (frameCount%Math.round(random(40, 70)) === 0){
  clouds = createSprite(600, random(20, 70), 40, 10);
  clouds.addImage(cloudImage);
    clouds.scale = 0.1;
  clouds.velocityX = -10;
  clouds.lifetime = 200;
    cloudGroup.add(clouds);

  }
}

function spawnObstacles() {
if (gameState === "end" ) {
  return;
  }  
  if (frameCount%100 === 0){
     
  obstacle = createSprite(600, 160, 10, 40);
  obstacle.velocityX = -15;
   var rand = Math.round(random(1, 6));
    //making random obstacles
  switch(rand) {
      case 1: obstacle.addImage(obs1);
        break;
      
        case 2: obstacle.addImage(obs2);

        break;
        
        case 3: obstacle.addImage(obs3);


      break;
        
        case 4: obstacle.addImage(obs4);

        break;
        
        case 5: obstacle.addImage(obs5);

  
      break;
        
        case 6: obstacle.addImage(obs6);


        break;
        
        default: break;
    }
obstacle.lifetime = 200;
obstaclesGroup.add(obstacle);
    obstacle.scale = 0.65;
}
  }
  
  