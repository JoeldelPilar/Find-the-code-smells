import { Student } from "../models/Student";
import { Temp } from "../models/Temp";
import { ProductProps } from "../models/ProductProps";

/*
  1. Se om du kan hitta två stycken code smells i följande funktion och rätta till dem.
  Funktionen tar emot en lista med längshoppslängder och syftet med funktionen är att summera
  dessa hopplängder.
  */

function getLength(jumpings: number[]): number {
  // let totalNumber = 0;

  // totalNumber = jumpings.reduce(
  //   (jumpDistanceSoFar, currentJump) => jumpDistanceSoFar + currentJump
  // );

  // return totalNumber;

  return jumpings.reduce((jumpDistanceSoFar, currentJump) => { return jumpDistanceSoFar + currentJump});
}

/*
  2. I detta exempel har vi fokuserat på if-statements. Se om du kan göra exemplet bättre!
  */

// class Student {
//   constructor(
//     public name: string,
//     public handedInOnTime: boolean,
//     public passed: boolean
//   ) {}
// }

function getStudentStatus(student: Student): string {
  // student.passed = student.name == "Sebastian" ? (student.handedInOnTime ? true : false) : false; 
  if(student.name === 'Sebastian') {
    if(student.handedInOnTime) {
      student.passed = true;
      return 'VG';
    } else {
      student.passed = false;
      return 'IG';
    }  
  } else {
    student.passed = false;
    return 'IG';
  }
}

/*
  3. Variabelnamn är viktiga. Kika igenom följande kod och gör om och rätt.
  Det finns flera code smells att identifiera här. Vissa är lurigare än andra.
  */
const AMOUNT_OF_DAYS_ONE_WEEK = 7;
const MILLISECONDS_ONE_WEEK = 604800000;
const CAPITOL_OF_SWEDEN = 'Stockholm'


function averageWeeklyTemperature(tempratures: Temp[]) {
  let sumOfTemps = 0;
 
  for (let i = 0; i < tempratures.length; i++) {
    if (tempratures[i].cityName === CAPITOL_OF_SWEDEN) {
      if (tempratures[i].dateWhenMessured.getTime() > Date.now() - MILLISECONDS_ONE_WEEK) {
        sumOfTemps += tempratures[i].temprature;
      }
    }
  }

  let avarageTemp = sumOfTemps / AMOUNT_OF_DAYS_ONE_WEEK;

  return avarageTemp;
  
}
averageWeeklyTemperature([{cityName: "Stockholm", dateWhenMessured: new Date, temprature: 5},{cityName: "Stockholm", dateWhenMessured: new Date, temprature: 5},{cityName: "Stockholm", dateWhenMessured: new Date, temprature: 5}]);
/*
  4. Följande funktion kommer att presentera ett objekt i dom:en. 
  Se om du kan göra det bättre. Inte bara presentationen räknas, även strukturer.
  */

function showProduct(productProps: ProductProps 
  // name: string,
  // price: number,
  // amount: number,
  // description: string,
  // image: string,
  // parent: HTMLElement
) {
  let container = document.createElement("div");
  let title = document.createElement("h4");
  let pricing = document.createElement("strong");
  let imageTag = document.createElement("img");

  title.innerHTML = productProps.name;
  pricing.innerHTML = productProps.price.toString();
  imageTag.src = productProps.image;

  container.appendChild(title);
  container.appendChild(imageTag);
  container.appendChild(pricing);
  productProps.parent.appendChild(container);
}

/*
  5. Följande funktion kommer presentera studenter. Men det finns ett antal saker som 
  går att göra betydligt bättre. Gör om så många som du kan hitta!
  */
function presentStudents(students: Student[]) {
  for (const student of students) {
    if (student.handedInOnTime) {
      let container = document.createElement("div");
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = true;

      container.appendChild(checkbox);
      let listOfStudents = document.querySelector("ul#passedstudents");
      listOfStudents?.appendChild(container);
    } else {
      let container = document.createElement("div");
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = false;

      container.appendChild(checkbox);
      let listOfStudents = document.querySelector("ul#failedstudents");
      listOfStudents?.appendChild(container);
    }
  }
}

/*
  6. Skriv en funktion som skall slå ihop följande texter på ett bra sätt:
  Lorem, ipsum, dolor, sit, amet
  Exemplet under löser problemet, men inte speciellt bra. Hur kan man göra istället?
  */
function concatenateStrings() {
  let result = "";
  result += "Lorem";
  result += "ipsum";
  result += "dolor";
  result += "sit";
  result += "amet";

  return result;
}

/* 
7. Denna funktion skall kontrollera att en användare är över 20 år och göra någonting.
    Det finns dock problem med denna typ av funktion. Vad händer när kraven ändras och
    fler och fler parametrar behöver läggas till? T.ex. avatar eller adress. Hitta en bättre
    lösning som är hållbar och skalar bättre. 
*/
function createUser(
  name: string,
  birthday: Date,
  email: string,
  password: string
) {
  // Validation

  let ageDiff = Date.now() - birthday.getTime();
  let ageDate = new Date(ageDiff);
  let userAge = Math.abs(ageDate.getUTCFullYear() - 1970);

  console.log(userAge);

  if (!(userAge < 20)) {
    // Logik för att skapa en användare
  } else {
    return "Du är under 20 år";
  }
}
