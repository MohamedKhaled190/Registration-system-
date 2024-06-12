// variables of sign Up page
let FirstName =document.getElementById('FnameSign')
let LastName =document.getElementById('LnameSign')
let SignInEmail =document.getElementById('EmailSign')
let SignInPass =document.getElementById('PassSign')
let signbtn = document.getElementById('signbtn')
let AlertSignFound = document.getElementById('AlertSignFound')
let AlertSignCorrect = document.getElementById('AlertSignCorrect')
// variables of log in page
let loginEmail =document.getElementById('loginEmail')
let loginpass =document.getElementById('loginpass')
let loginbtn = document.getElementById('loginbtn')
let alertlogin = document.getElementById('alertlogin')
let AcountsList = [];
let validate = 0;
// variables of home page
let index = 0;
let Hcontnet = document.getElementById('Hcontnet')
let addInput = document.getElementById('addInput')
let dateInput = document.getElementById('dateInput')
let addButton = document.getElementById('addButton')
let TaskContent = document.getElementById('TaskContent')

if(JSON.parse(localStorage.getItem('AcountContent')) != null){
    AcountsList = JSON.parse(localStorage.getItem('AcountContent'))
}
//  sign up page 
function CreatAccount(){
    var Account = {
        name: `${FirstName.value} ${LastName.value}`,
        email: SignInEmail.value,
        password:SignInPass.value,
        ToDoList : []
    }
    AcountsList.push(Account);
    localStorage.setItem('AcountContent', JSON.stringify(AcountsList))
}

function chickfound(){
  
 if(validate){
    AlertSignCorrect.classList.add('d-none')
    if(AcountsList.length == 0){
        CreatAccount()
        window.location.href = 'login.html'
    }else{
        let CheckExcist = AcountsList.filter(account =>  account.email == SignInEmail.value)
        if(CheckExcist.length == 0  ){
            CreatAccount()
            window.location.href = 'login.html'
        }else{
            AlertSignFound.classList.remove('d-none')
        }
    }
 }else{
    AlertSignCorrect.classList.remove('d-none')
 }

}
// log in page
function enterhome(){

        if(AcountsList.length == 0){
            window.location.href = 'index.html'
        }else{
            let CheckCorrect = AcountsList.filter(names => {
            return names.email == loginEmail.value && names.password == loginpass.value 
            } )
            if(CheckCorrect.length > 0){
                localStorage.setItem('Account', JSON.stringify(CheckCorrect))
                window.location.href = 'https://mohamedkhaled190.github.io/Registration-system-/home.html'
            }else{
                alertlogin.classList.add('d-block')
            }
        }
} 

// validation 
function validationInputs(ele){
    let regex ={
        EmailSign:  /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    }
    if(regex[ele.id].test(ele.value)){
        ele.classList.add('is-valid')
        ele.classList.remove('is-invalid')
        validate = true
  
    } else{
        ele.classList.add('is-invalid')
        ele.classList.remove('is-valid')
        validate = false
    }
}


if(window.location.href =='https://mohamedkhaled190.github.io/Registration-system-/home.html'){
    function UserName(){
        let AccountName = JSON.parse(localStorage.getItem('Account'))
        Hcontnet.innerHTML = `Hello ${AccountName[0].name} Make your To Do List`
}UserName()


// to do list part
if(localStorage.getItem('Account') != null){
let Accountrr = JSON.parse(localStorage.getItem('Account'))
for (let i = 0; i < AcountsList.length; i++) {
    if(AcountsList[i].email == Accountrr[0].email){
      displayToDoList(AcountsList[i].ToDoList)
  }
 }
}
addButton.addEventListener('click',addTask)
function addTask(){
let AccountContent = JSON.parse(localStorage.getItem('Account'))
let AccountTask  = {
    TaskTiTle : addInput.value,
    Date : dateInput.value
}
for (let i = 0; i < AcountsList.length; i++) {
  if(AcountsList[i].email == AccountContent[0].email){
    AcountsList[i].ToDoList.push(AccountTask)
    localStorage.setItem('AcountContent', JSON.stringify(AcountsList))
    displayToDoList(AcountsList[i].ToDoList)
}
}
}
function displayToDoList(arr){
let cartona = ''
for (let i = 0; i < arr.length; i++) {
    cartona+= ` <div class="col-lg-12">
    <div class="form-check d-flex align-items-center px-3">
      <input class="form-check-input mx-0" type="checkbox"  id="${i}">
      <label class="form-check-label h3 m-3 p-0" for="${i}">${arr[i].TaskTiTle}</label>
      <div class="icon ms-auto d-flex align-items-center gap-2" >
        <i class="fa-solid fa-trash-can text-danger" onClick="deleteTask(${i})"></i>
        <div class="bg-white border border-warning rounded p-2">
          <i class="fa-solid fa-hourglass-half text-warning"></i>
          <span>
          ${arr[i].Date}
          </span>
        </div>
      </div>
    </div>
  </div>`
}
TaskContent.innerHTML = cartona
}

function deleteTask(id){
let Accountrr = JSON.parse(localStorage.getItem('Account'))
for (let i = 0; i < AcountsList.length; i++) {
    if(AcountsList[i].email == Accountrr[0].email){
        AcountsList[i].ToDoList.splice(id,1)
        localStorage.setItem('AcountContent', JSON.stringify(AcountsList))
      displayToDoList(AcountsList[i].ToDoList)
  }
 }
}
}


































