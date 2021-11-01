
//cria as variaveis
var t_rex,t_rexRunning,t_rexJumping,t_rexCollided,t_rexStop;
var canvas;
var ground,ground_img,ground_invis;
var cloud,cloud_img,cloud_group;
var obstacle,obstacle_img1,obstacle_img2,obstacle_img3,obstacle_img4,obstacle_img5,obstacle_img6,obstacle_group;
var pontos = 0;
var PLAY = 1;
var END = 0;



function preload(){
    t_rexRunning = loadAnimation("trex3.png","trex4.png");
    t_rexJumping = loadAnimation("trex1.png");
    t_rexCollided = loadAnimation("trex_collided.png");
    t_rexStop = loadImage("trex_collided.png");

    ground_img = loadImage("ground2.png");
    cloud_img = loadImage("cloud.png");
    obstacle_img1 = loadImage("obstacle1.png");
    obstacle_img2 = loadImage("obstacle2.png");
    obstacle_img3 = loadImage("obstacle3.png");
    obstacle_img4 = loadImage("obstacle4.png");
    obstacle_img5 = loadImage("obstacle5.png");
    obstacle_img6= loadImage("obstacle6.png");
}

function setup(){
    canvas = createCanvas(600,200);

    t_rex = createSprite(50,150,20,20);
    t_rex.addAnimation("running",t_rexRunning);
    t_rex.addAnimation("jumping",t_rexJumping);
    t_rex.addAnimation("collided",t_rexCollided);
    t_rex.scale = 0.5;

    ground = createSprite(300,170,600,20);
    ground_invis = createSprite(300,190,600,20);
    ground_invis.visible=false

    ground.addImage("movendo",ground_img);

    cloud_group = new Group();
    obstacle_group = new Group();


}


function draw(){
    background("#F0FFFF");

     
    if (t_rex.isTouching(obstacle_group)) {
        gameState = END;
    }
    

    if (gameState === PLAY) {

        if(keyDown("space") && t_rex.y > 140) {
            t_rex.velocityY = -10;
            //t_rex.changeAnimation("jumping",t_rexJumping);
        }
    
        gravidade();
    
        if(ground.x < 0){
           
            ground.x = ground.width/2;
      
          }
      
          ground.velocityX = -2;
    
          spawnClouds();
    
        spawnObstacles();
    
        
    } else if (gameState === END) {


        
        if (t_rex.isTouching(obstacle_group)){

        obstacle_group.velocityX = 0;

        t_rex.changeImage("STOP",t_rexStop);

        ground_invis.velocityX = 0;

            
        }

        if (t_rex.isTouching(cloud_group)) {
            
            cloud_group.velocityX = 0;

            t_rex.changeImage("STOP",t_rexStop);

            ground_invis.velocityX = 0;

        }


        
    }

   
    textSize(20);
    strokeWeight(10);
    text("Pontuação= "+pontos,440,20);

    
    

    t_rex.collide(ground_invis);

    

    //console.log(t_rex.y)

    

    drawSprites();
}

function gravidade () {
    t_rex.velocityY += 0.5;

}

function spawnClouds() {
    if(frameCount%120 === 0){
        cloud = createSprite(600,200,60,30);
        cloud.y = Math.round(random(20,100));
        cloud.addImage("cloud",cloud_img);
        cloud.velocityX = -2;
        cloud.scale = random(0.2,1);
        cloud.depth = t_rex.depth -1;
        cloud.lifetime = 310;
        cloud_group.add(cloud)
    }
    
} 

function spawnObstacles() {
    if (frameCount%170 === 0) {
        obstacle = createSprite(600,150,30,30)
        
        
        var sorteio = Math.round(random(1,6));

        switch (sorteio) {
            case 1: obstacle.addImage("obstacle",obstacle_img1);
                break;
            case 2: obstacle.addImage("obstacle",obstacle_img2);
                break;
                case 3: obstacle.addImage("obstacle",obstacle_img3);
                break;
            case 4: obstacle.addImage("obstacle",obstacle_img4);
                break;
                case 5: obstacle.addImage("obstacle",obstacle_img5);
                break;
            case 6: obstacle.addImage("obstacle",obstacle_img6);
                break;
        }
        obstacle.velocityX = -2;
        obstacle.depth = t_rex.depth -1;
        obstacle.lifetime = 310;
        obstacle.scale = 0.5;
        obstacle_group.add(obstacle);
    }
    
}