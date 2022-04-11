fetch("./courseData.json")
  .then((response) => {
    return response.json();
  })
  .then((datas) => {
    console.log(datas);
    create(datas);
    btn(datas);
    Filter(datas);
  })
  .catch((err) => {
    console.log("Inside Catch");
    console.log(err.message);
  });

function create(datas) {
  const mainDiv = document.querySelector(".mainDiv");

  while(mainDiv.firstChild){
    mainDiv.firstChild.remove();
  }

  for (const data of datas) {
    const outerDiv = document.createElement("div");
    const firstDiv = document.createElement("div");
    const secondDiv = document.createElement("div");
    const lastDiv = document.createElement("div");
    const enrollBtn = document.createElement("button");
    const viewBtn = document.createElement("button");
    const img = document.createElement("img");
    const h5 = document.createElement("h5");
    const p = document.createElement("p");

    outerDiv.setAttribute("class", "col");
    firstDiv.setAttribute("class", "card h-100");
    secondDiv.setAttribute("class", "card-body");
    lastDiv.setAttribute("class", "btn-div");

    //  div for buttons
    enrollBtn.setAttribute("class", "btn-enroll");
    viewBtn.setAttribute("class", "btn-view");
    enrollBtn.innerText = "Enroll";
    viewBtn.innerText = "View";
    lastDiv.append(enrollBtn);
    lastDiv.append(viewBtn);

    //-------------//

    //Div for card body //
    h5.setAttribute("class", "card-title");
    p.setAttribute("class", "card-text");
    h5.innerText = `${data.trainingName}`;
    p.innerText = `${data.trainingDescription}`;
    secondDiv.append(h5);
    secondDiv.append(p);
    secondDiv.append(lastDiv);

    //------------------//

    //image include

    //div for car h-100//
    img.setAttribute("src", `${data.trainingImage}`);
    img.setAttribute("class", "card-img-top");
    img.setAttribute("alt", "Cannt find photo");
    firstDiv.append(img);
    firstDiv.append(secondDiv);
    //--------------//

    outerDiv.append(firstDiv);
    mainDiv.append(outerDiv);
  }
}

async function btn(datas) {
  let arr = [];
  const m = document.querySelector(".mainDiv");
  // console.log(datas);

  m.addEventListener("click", (e) => {
    const a = e.target.parentElement.parentElement.children[0].innerText; //Gives the title of job
    const c = e.target.parentElement.parentElement.parentElement.parentElement; //gives the whole card
    console.log(c);
    if (e.target.innerText === "View") {
      for (const data of datas) {
        if (data.trainingName === a) {
          const b = data.sessionDetails;

          for (const arr of b) {
            console.log("-------------------");
            console.log("Session name :", arr.sessionName);
            console.log("Session date :", arr.sessionDate);
            console.log("Session id :", arr.sessionId);
            console.log("Session time :", arr.sessionTime);

            const Odiv = document.createElement("div");
            const id = document.createElement("p");
            const name = document.createElement("p");
            const date = document.createElement("p");
            const time = document.createElement("p");

            //Giving classes to  them//

            id.setAttribute("class", "session-id");
            name.setAttribute("class", "session-name");
            date.setAttribute("class", "session-date");
            time.setAttribute("class", "session-time");

            //-------------//

            //Adding text to them//

            id.innerText = arr.sessionId;
            name.innerText = arr.sessionName;
            date.innerText = arr.sessionDate;
            time.innerText = arr.sessionTime;

            //--------------//

            //Adding all of them  to the outer Div //

            Odiv.append(id);
            Odiv.append(name);
            Odiv.append(date);
            Odiv.append(time);
            c.append(Odiv);

            //-----------//
          }
        }
      }
    }
    if (e.target.innerText === "Enroll") {
      const spanThank = document.createElement("span");
      spanThank.setAttribute("class", "spn-enroll");
      spanThank.innerText = "Thanks for enrolling";
      console.log(spanThank.innerText);
      c.append(spanThank);
    }
  });
}

function Filter(datas){
  const trainingCategory = document.getElementById("Trainings");
  trainingCategory.addEventListener('change',(e)=>{
    const value=e.target.value;
    
    const arr = datas.find((data)=>data.trainingName===value);

    if(!arr){
      console.log("No data found")
    }
    else{
      const arr1 = [];
      arr1.push(arr);
      create(arr1);
    }
    
  
  })

}




