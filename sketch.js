var backgroundImg;
var Hero, Hero1Img, Hero2Img;
var HeroLife = 10;

var Ogre, OgreImg;
var OgreCount = 0;
var SwordSlash;
var Swordslashsprite;

var OgreGroup;
var SlashGroup;
var DeadOgre = 0;

var castleClosedImg;
var castleOpenedImg;
var castle;

var dragon;
var dragonImgLeft;
var dragonImgRight;

var wallLeft;
var wallRight;

var GameState = 0;

var DragonLife = 5;
var FireballImgLeft;
var FireballImgRight;
var fireballGroup;

var direction;

var PrincessImg;
var Princess;





function preload()
{
  backgroundImg = loadImage("./Images/Forest Scary png.png ");
  Hero1Img = loadImage("./Images/Hero-1.png");
  Hero2Img = loadImage("./Images/Hero Without Bg.png");
  OgreImg = loadImage("./Images/Ogre wo bg.png");
  SwordSlash = loadImage("./Images/Sword Slash.png");
  castleClosedImg = loadImage("./Images/Castle Gates wo background.png");
  castleOpenedImg = loadImage("./Images/Castle Gates Open WO Background.png");
  dragonImgLeft = loadImage("./Images/Dragon wo bg Left.png");
  dragonImgRight = loadImage("./Images/Dragon wo bg Right.png");
  FireballImgLeft = loadImage("./Images/Fireball wo BG - Left.png");
  FireballImgRight = loadImage("./Images/Fireball wo BG Right.png");
  PrincessImg = loadImage("./Images/Princess wo bg.png");
  
}




function setup() {
  createCanvas(windowWidth,windowHeight);

  Hero = createSprite(displayWidth -1200, displayHeight-300, 50,50);
  Hero.addImage(Hero2Img);
  Hero.scale = 0.75
  Hero.setCollider("rectangle",0,100,50,50);
  //Hero.debug = true;


  OgreGroup = new Group();
  SlashGroup = new Group();
  fireballGroup = new Group();

  castle = createSprite(displayWidth-250, displayHeight-330);
  castle.addImage("Closed", castleClosedImg);
  castle.visible = false;
  castle.addImage("Open", castleOpenedImg);
  castle.scale = 0.8

  dragon = createSprite(displayWidth-270, displayHeight-680);
  dragon.addImage("Left", dragonImgLeft);
  dragon.addImage("Right", dragonImgRight);
  dragon.scale = 0.6;
  dragon.visible = false;
  

  wallLeft = createSprite(0, displayHeight/2, 10,1000);
  wallLeft.visible = false;
  wallRight = createSprite(displayWidth -20, displayHeight/2, 10,1000);
  wallRight.visible = false;

  Princess = createSprite(castle.x, castle.y - 100);
  Princess.addImage(PrincessImg);
  Princess.visible = false;
  Princess.scale = 2.5;

  
}

function draw() {
  background(backgroundImg);  

  if(GameState === 0)
  {
    if(frameCount% 200 === 0)
    {
      if(OgreCount <1)
    {
      OgreCount++;
      Ogre = createSprite(displayWidth -50,random(300,500),50,50);
      Ogre.addImage(OgreImg);
      Ogre.velocityX = -5;
      Ogre.scale = 0.5
      //Ogre.debug= true;
  
  
     OgreGroup.add(Ogre);
    }
    
    

    if(SlashGroup.length !== 0 )
    {
      for(var i = 0; i< OgreGroup.length; i++)
      {
        if(OgreGroup[i].collide(SlashGroup))
        {
          OgreGroup[i].destroy();
          SlashGroup.destroyEach();
          DeadOgre = DeadOgre +1;
        }
        
      }
    }
    }

    if(OgreGroup.length != 0)
    {
      if(OgreGroup.isTouching(Hero))
      {
        HeroLife = HeroLife - 1;
        OgreGroup.destroyEach();
      }
    
    }
    console.log(HeroLife);
    heroControls();

    

    if(HeroLife<= 0)
    {
      Hero.destroy();
      OgreGroup.destroyEach();
      SlashGroup.destroyEach();
      fill("red");
      textSize(20);
      text("Game Over!", displayWidth/2, displayHeight/2);
    }

    if(DeadOgre === 1)
    {
      GameState === 1;
    }

  }

    else if(GameState === 1)
    {
      castle.visible = true;
      dragon.visible = true;
      //dragon.velocityX = -3;
      if(dragon.isTouching(wallLeft))
      {
        dragon.velocityX = 3;
        dragon.changeImage("Right");
        direction = 1;
      }
      
      if(dragon.isTouching(wallRight))
      {
        dragon.velocityX = -3;
        dragon.changeImage("Left");
        direction = 2;
      }
      if(frameCount % 100 === 0)
      {
        if(direction === 1)
        {
          var fireball = createSprite(dragon.x+200, dragon.y+100);
          fireball.addImage("Right", FireballImgRight);
          fireball.velocityX = 5;
          fireball.velocityY = 3; 
          fireball.scale = 0.5
          fireballGroup.add(fireball);
        }

        if(direction === 2)
        {
          var fireball = createSprite(dragon.x-200, dragon.y+100);
          fireball.addImage("Left", FireballImgLeft);
          fireball.velocityX = -5;
          fireball.velocityY = 3; 
          fireball.scale = 0.5
          fireballGroup.add(fireball);

        }
      }
    
      if(fireballGroup.length != 0)
      {
        if(fireballGroup.isTouching(Hero))
        {
          HeroLife = HeroLife - 3;
          fireballGroup.destroyEach();
        }
        
      }
      


      if(keyWentDown("SPACE"))
      {
        Swordslashsprite = createSprite(Hero.x, Hero.y);
        Swordslashsprite.addImage(SwordSlash);
        Swordslashsprite.velocityX = 5;
        Swordslashsprite.scale = 0.4;
        Swordslashsprite.velocityY = -5;
        //Swordslashsprite.debug = true;
        Swordslashsprite.setCollider("rectangle", 0,0,50,50);

        SlashGroup.add(Swordslashsprite);
      }
      heroControls2();

      if(SlashGroup.length != 0)
      {
        if(SlashGroup.isTouching(dragon))
      {
        DragonLife = DragonLife-1;
        SlashGroup.destroyEach();
      }

      }
      
      if(DragonLife === 0)
      {
        dragon.destroy();
        GameState === 2;

      }

      if(HeroLife<= 0)
      {
        Hero.destroy();
        dragon.destroy();
        SlashGroup.destroyEach();
        fill("red");
        textSize(20);
        text("Game Over!", displayWidth/2, displayHeight/2);
        
      }

      //console.log(DragonLife);
    }

   
   
     else if (GameState = 2)
     {
      castle.visible = true;
      castle.changeAnimation("Open", castleOpenedImg);
      Princess.visible = true;
      fill("red")
      textSize(20);
      text("You Saved the Princess! The Kingdom is Safe Because of You!!", displayWidth/2 -300, displayHeight/2 -100);

     }
 

  


  drawSprites();
  fill("red");
  textSize(20)
  text(OgreCount, 500,50);
  text("HERO LIFE:" + HeroLife, 40,50)

  
  }

function heroControls()
{
  if(keyDown(UP_ARROW))
  {
    Hero.y -= 3;
  }

  if(keyDown(DOWN_ARROW))
  {
    Hero.y += 3;
  }

  if(keyDown(RIGHT_ARROW))
  {
    Hero.x += 3;
  }

  if(keyDown(LEFT_ARROW))
  {
    Hero.x -=3;
  }

  if(keyWentDown("SPACE"))
  {
    Swordslashsprite = createSprite(Hero.x, Hero.y);
    Swordslashsprite.addImage(SwordSlash);
    Swordslashsprite.velocityX = 5;
    Swordslashsprite.scale = 0.4;

    //Swordslashsprite.debug = true;
    Swordslashsprite.setCollider("rectangle", 0,0,50,50);

    SlashGroup.add(Swordslashsprite);
  }

}

function heroControls2()
{
  if(keyDown(RIGHT_ARROW))
  {
    Hero.x += 3;
  }

  if(keyDown(LEFT_ARROW))
  {
    Hero.x -=3;
  }
}