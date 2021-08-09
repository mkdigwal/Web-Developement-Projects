 var playing = false;
 var score;
 var timeleft;
 var action;
 var RytAns;
 var RytInc;
 var WrgInc;
    document.getElementById("OperateGame").onclick=function()
    {
        if(playing == true)
           {
            location.reload();
           }else
           {   
             playing = true;
             score = 0;
             RytInc = 0;
             WrgInc = 0;
             document.getElementById("scorevalue").innerHTML = score;
             document.getElementById("OperateGame").innerHTML = "<b> Reset Quiz </b>";
             document.getElementById("Help").innerHTML = "Choose The Correct Answer";
             hide("GameOver");
             show("YourTime");
             timeleft = 60;
             document.getElementById("ReduceTime").innerHTML=timeleft;
             StartCountdown();
             GenerateQA();
           }
}

for(i=1; i<5; i++)
{
   document.getElementById("box"+i).onclick = function()
   {
    if(playing==true)
    { 
        if(this.innerHTML == RytAns){  
            score++;
            RytInc++;
            StartCountdownAdd();
            document.getElementById("scorevalue").innerHTML= score;
            hide("wrong");
            show("correct");
            setTimeout(function(){hide("correct");}, 1000);
            GenerateQA();
        }else{
            // score--;  // If we want to decrement score for every worng answer and not the time then uncommnt these three lines and comment out the StartCountdownSub() function.
            // WrgInc++;
            // document.getElementById("scorevalue").innerHTML= score;
            StartCountdownSub();
            hide("correct");
            show("wrong");
            GenerateQA();
            setTimeout(function(){hide("wrong");},1000);
           
        }
    }   
       
       
   }
}

// to increment time for every correct ans
function StartCountdownAdd()
{
    action = setInterval(function()
    {
        timeleft += 11;
        document.getElementById("ReduceTime").innerHTML=timeleft;
        StopCountdown();
    },500);
}

// end 

// to decrement time for every wrong ans
function StartCountdownSub()
{
    action = setInterval(function()
    {
        if(timeleft >5)
        {
            timeleft -= 5;
            document.getElementById("ReduceTime").innerHTML=timeleft;
            StopCountdown();
        }
        else
        {
            timeleft = 1;
            StopCountdown();
        }
    },100);
}

// end 

// Start CountDown and continuously decrement time by 1 sec.
function StartCountdown()
{
    action = setInterval(function()
    {
        timeleft -= 1;
        document.getElementById("ReduceTime").innerHTML=timeleft;
        if(timeleft==0){
          StopCountdown();
            hide("YourTime");
            show("GameOver");
           document.getElementById("GameOver").innerHTML = "<p>game over...!</p><p>your score is " + score + ".</p>";
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("OperateGame").innerHTML ="<b> Start Quiz </b>";
            
        
        }
    },1000);
}

// end

function StopCountdown(){
    clearInterval(action);
}


function hide(Id)
{
    document.getElementById(Id).style.display = "none";
}

function show(Id)
{
    document.getElementById(Id).style.display = "block";
}

function GenerateQA()
{   var Op = ['X','+','-','÷'];
    var x = 1 + Math.round(9*Math.random());
    var y = 1 + Math.round(9*Math.random());
                var ChooseOp = Math.round(Math.random()*Op.length);
                    if(ChooseOp == 0){
                       Op= Op[0];
                       RytAns = x*y;
                }else if(ChooseOp == 1){
                       Op = Op[1];
                       RytAns = x+y;
                }else if(ChooseOp == 2){
                       Op = Op[2];
                       RytAns = x-y;
                }else { 
                       Op = Op[3];
                       RytAns = (x/y).toFixed(2);
                    }

    console.log(ChooseOp);
    var RytPos = 1 + Math.round(3*Math.random());
            document.getElementById("quest").innerHTML = x +  Op + y;
            document.getElementById("box"+RytPos).innerHTML = RytAns;
    
       var answers=[RytAns];
        for(i=1 ; i<5 ; i++)
            { if(i != RytPos)
                { 
                 do{ var WrongAns; 
                        if(ChooseOp ==0){
                                WrongAns = (1 + Math.round(9*Math.random()))*(1 + Math.round(9*Math.random()));
                               }else if(ChooseOp == 1){
                                WrongAns = (1 + Math.round(9*Math.random()))+(1 + Math.round(9*Math.random()));
                               }else if(ChooseOp == 2){
                                WrongAns = (1 + Math.round(9*Math.random()))-(1 + Math.round(9*Math.random()));
                               }else{
                                WrongAns = ((1 + Math.round(9*Math.random()))/(1 + Math.round(9*Math.random()))).toFixed(2);
                               }

            }while(answers.indexOf(WrongAns)>-1)
                  document.getElementById("box"+i).innerHTML = WrongAns;
             answers.push(WrongAns);
        }
    }
}