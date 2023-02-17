import { Student } from "../models/Student";
import { Temp } from "../models/Temp";
import { ProductProps } from "../models/ProductProps";
import { User } from "../models/CreateUser"

/*
  1. Se om du kan hitta två stycken code smells i följande funktion och rätta till dem.
  Funktionen tar emot en lista med längshoppslängder och syftet med funktionen är att summera
  dessa hopplängder.
  */

function getLength(jumpings: number[]): number {

  return jumpings.reduce((jumpDistanceSoFar, currentJump) => { return jumpDistanceSoFar + currentJump});
}

/*
  2. I detta exempel har vi fokuserat på if-statements. Se om du kan göra exemplet bättre!
  */

function getStudentStatus(student: Student): string {

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

/*
  4. Följande funktion kommer att presentera ett objekt i dom:en. 
  Se om du kan göra det bättre. Inte bara presentationen räknas, även strukturer.
  */

function showProduct(product: ProductProps ) {
  
  let container = document.createElement("div");
  let title = document.createElement("h3");
  let pricing = document.createElement("span");
  let imageTag = document.createElement("img");

  title.innerHTML = product.name;
  pricing.innerHTML = product.price.toString();
  imageTag.src = product.image;

  container.appendChild(title);
  container.appendChild(imageTag);
  container.appendChild(pricing);
  product.parent.appendChild(container);
}

/*
  5. Följande funktion kommer presentera studenter. Men det finns ett antal saker som 
  går att göra betydligt bättre. Gör om så många som du kan hitta!
  */
function presentStudents(students: Student[]) {
  for (const student of students) {
      let container = document.createElement("li");
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      let listOfStudents;
      container.appendChild(checkbox);

    if (student.handedInOnTime) {
      checkbox.checked = true;
      listOfStudents = document.querySelector("ul#passedstudents");
    } else {
      checkbox.checked = false;
      listOfStudents = document.querySelector("ul#failedstudents");
    }
    listOfStudents?.appendChild(container);
  }
}

/*
  6. Skriv en funktion som skall slå ihop följande texter på ett bra sätt:
  Lorem, ipsum, dolor, sit, amet
  Exemplet under löser problemet, men inte speciellt bra. Hur kan man göra istället?
  */

const words: string[] = ["Lorem", "ipsum", "dolor", "sit", "amet"]

function concatenateStrings(words: string[]): string {
  return words.join(" ");
}

/* 
7. Denna funktion skall kontrollera att en användare är över 20 år och göra någonting.
    Det finns dock problem med denna typ av funktion. Vad händer när kraven ändras och
    fler och fler parametrar behöver läggas till? T.ex. avatar eller adress. Hitta en bättre
    lösning som är hållbar och skalar bättre. 
*/
function createUser(userProps: User) {
  // Validation

  let ageDiff = Date.now() - userProps.birthday.getTime();
  let ageDate = new Date(ageDiff);
  let userAge = Math.abs(ageDate.getUTCFullYear() - 1970);

  console.log(userAge);

  if (!(userAge < 20)) {
    // Logik för att skapa en användare
  } else {
    return "Du är under 20 år";
  }
}
