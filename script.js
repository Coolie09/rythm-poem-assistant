const title = document.getElementsByClassName("title-container")[0];
const display = document.getElementsByClassName("res-container")[0];
const inp = document.getElementsByClassName("writing-space")[0];
let set = 0;

setInterval(()=>{
    let max = randNumb(3,5)
    if(set<max){
        let typing = document.createElement("h1");
        typing.innerText=".";
        typing.className="anim-typing-elem";
        title.append(typing);
        set++;
    }
    else{
        let elems = document.getElementsByClassName("anim-typing-elem");
        for(let i=0;i<set;i++){
            elems[0].remove();
        }
        set=0;
    }

},1000)

function randNumb(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function getRhymes(word){
    let api = `https://api.datamuse.com/words?rel_rhy=${word}`;
    let result = await fetch(api).then(data => data.json())
    if(result!==undefined&&result.length>0){
        display.classList.remove("hidden");
        for(let i=0;i<10;i++){
            let newRhyme = document.createElement("button");
            newRhyme.innerText = result[i].word;
            newRhyme.value = result[i].word
            newRhyme.className = "rhyme-res-btn";
            display.append(newRhyme);
        }
        let btns = document.getElementsByClassName("rhyme-res-btn");
        for(let i=0;i<btns.length;i++){
            btns[i].addEventListener("click",()=>{
                inp.value+=btns[i].getAttribute("value")+" ";
                inp.focus();
            })
        }
    }
}

let latest = "";
inp.addEventListener("keyup",(evt)=>{
    if(inp.value.trim().length>0){
        if(evt.keyCode==32||evt.keyCode==13){
            let words = cleanArr(inp.value.split(/\s+/));
            let last = words[words.length-1].replace(/[.,\/#!$?%\^&\*;:{}=\-_`~()]/g,"");
            console.log(last)
            if(latest!==last){
                clean();
                getRhymes(last)
                latest = last;
            }
        }
    }
    else{
        clean(true);
    }
})

function cleanArr(arr){
    let temp = [];
    for(let i=0;i<arr.length;i++){
        if(arr[i].trim().length>0){
            temp.push(arr[i]);
        }
    }
    return temp;
}

function clean(hide){
    let elems = display.children;
    for(let i=elems.length;i>0;i--){
        elems[0].remove();
    }
    if(hide){
        display.classList.add("hidden")
    }
}
