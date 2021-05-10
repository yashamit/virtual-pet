var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feedButton
var lastFed

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feedButton=createButton("Feed Food")
  feedButton.position(700,95)
  feedButton.mousePressed(feedDog);
}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
     database.ref("FeedTime").on("value",function(data){
      lastFed = data.val()
     })

  //write code to display text lastFed time here
  fill("white")
  textSize(10)
  if(lastFed>=12){
    text("LAST FEED : " + lastFed%12 + "PM",350,30)
  }else if(lastFed===0){
    text("LAST FEED : 12AM",350,30)

  }else{
    text("LAST FEED : " + lastFed + "AM",350,30)
  }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}



function feedDog(){



  //write code here to update food stock and last fed time
  foodStock-=1
var foodVal=foodObj.getFoodStock()

if(foodObj.getFoodStock<=0){
  foodObj.updateFoodStock(foodVal*0)   
  dog.addImage(sadDog)     
}else{
  foodObj.updateFoodStock(foodVal-1)
  dog.addImage(happyDog);
}
database.ref("/").update({
Food:foodObj.getFoodStock(),
FeedTime:hour()
})




}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
