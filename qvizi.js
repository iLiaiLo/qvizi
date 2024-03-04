
let slideIndex = 1;
async function questionData(){
    try{
        let response=await fetch("qvizi.json");
        let data=await response.json();
        return data
    }
    catch(e){
        console.log(e)
    }
}
let getRes=document.getElementById("getRes");
getRes.style.display="none";

async function renderData(n) {
  let quizQuestions=await questionData();

  getRes.addEventListener("click",()=>{
    result.style.display="block";
    document.body.innerHTML=`<h1 style="color:aliceblue;">ტესტის შედეგია ${quizQuestions.length}-დან ${result.innerHTML}</h1>`;
  })

  let total=Array(quizQuestions.length).fill(0);

  for (let i = 0; i <quizQuestions.length; i++) {
    let elem = document.createElement("div");
    elem.className="content";

    let question=document.createElement("h1");
    question.className="question";
    question.textContent=quizQuestions[i].question;
    elem.appendChild(question);
    
    for(let j=0;j<quizQuestions[i].answers.length;j++){
    let parentOfInputLab=document.createElement("div");
    parentOfInputLab.className="parentOfInputLab"
    let input=document.createElement("input");
    input.type="radio";
    input.name=`name ${i}`;
    input.id=`name ${i} ${j}`;
    input.className="Input"
    input.addEventListener("change",(e)=>{
        if(e.target.value=="on" &&  quizQuestions[i].answers[j].iscorrect){
            total[i]=1
        }
        else{
           total[i]=0
        }
        document.getElementById("result").innerHTML=total.reduce((a,b)=>a+b,0)
    })

    
  

    let label=document.createElement("label");
    label.for=`name ${i} ${j}`
    label.className="Lab"
    label.textContent=quizQuestions[i].answers[j].answer;

    label.insertBefore(input,label.firstChild);
    //parentOfInputLab.appendChild(input);
    parentOfInputLab.appendChild(label);

    elem.appendChild(parentOfInputLab);
    //elem.appendChild(input)
    //elem.appendChild(label)
    let prewEl=document.getElementById("next");
    document.getElementById("container").insertBefore(elem,prewEl);

  }

}


  let el=document.getElementsByClassName("content");
  for(let i=0;i<el.length;i++){
    if(n>el.length){
        slideIndex=1
    }
    if(n<1){
        slideIndex=el.length
    }
    el[i].style.display="none";
  }
  el[slideIndex-1].style.display="block";

}
renderData(slideIndex)

let next = document.getElementById("next");
let prew = document.getElementById("prew");

let result=document.getElementById("result")
result.style.display="none";

prew.disabled=true;

function plusSlides(num) {
    renderData(slideIndex += num);
    if(slideIndex==10){
      getRes.style.display="block";
      next.disabled=true;
    }
    else{
      getRes.style.display="none";
      next.disabled=false;
    }

    if(slideIndex==1){
      prew.disabled=true;
    }
    else{
      prew.disabled=false;
    }

}

next.addEventListener("click",function(){plusSlides(1)})
prew.addEventListener("click",function(){plusSlides(-1)})
