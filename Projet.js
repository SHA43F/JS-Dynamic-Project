let nameVal = document.getElementById("NameId");
let descVal = document.getElementById("DescriptionId");
let catVal = document.getElementById("CategoryId");
let submit = document.getElementById("FormId");

window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/2b203e1569814d54907d2acdf1f3e148/Data")
    .then((response) =>{
        for(var i=0; i<response.data.length; i++)
        {
            displayData(response.data[i])
        }
    }).catch((error) => console.log(error))
})

submit.addEventListener("submit", UploadData);
function UploadData(e){
    e.preventDefault();
    obj = {name: nameVal.value, description: descVal.value, category: catVal.value}
    axios.post("https://crudcrud.com/api/2b203e1569814d54907d2acdf1f3e148/Data",obj)
    .then((response) =>{
        displayData(response.data)
        nameVal.value = ""
        descVal.value = ""
        catVal.value = "Fuel"
    })
    .catch((error) => console.log(error))
}

function displayData(object){
    let listAll = document.getElementById('ListsId')
    let items = `<li id='${object._id}List'>${object.name} - ${object.description} - ${object.category}
                <button onClick=deleteVal('${object._id}')>Delete</button>  
                <button onClick=editVal('${object._id}')>Edit</button></li>`
    listAll.innerHTML += items
}

function deleteVal(object){
    axios.delete(`https://crudcrud.com/api/2b203e1569814d54907d2acdf1f3e148/Data/${object}`)
    .then(() => removeData(object))
    .catch((error) => console.log(error))
}

function editVal(object){
    axios.get(`https://crudcrud.com/api/2b203e1569814d54907d2acdf1f3e148/Data/${object}`)
    .then((response) => {
        nameVal.value = response.data.name
        descVal.value = response.data.description
        catVal.value = response.data.category
        removeData(object)
        axios.delete(`https://crudcrud.com/api/2b203e1569814d54907d2acdf1f3e148/Data/${response.data._id}`)
    }).catch((error) => console.log(error))
}

function removeData(object){
    const parentNode = document.getElementById('ListsId')
    const removeNode = document.getElementById(`${object}List`)
    if(removeNode){
        parentNode.removeChild(removeNode)
    }
}
