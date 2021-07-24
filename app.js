const inputEl = document.querySelector("#input-el");
const saveBtn = document.querySelector("#save-btn");
const saveTabBtn = document.querySelector("#save-tab-btn");
const deleteBtn = document.querySelector("#delete-btn");
const ulEl = document.querySelector("#ul-el");

let myLeads = [];
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

function render(leads, boolean) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        listItems += `
        <li class="list-group-item">
        <a href="${leads[i]}" target="_blank" class="text-success">${leads[i]}</a>
        </li>`;
    }
    ulEl.innerHTML = listItems;

}

saveBtn.addEventListener("click", function () {
    if (inputEl.value) {
        myLeads.push(inputEl.value);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
        inputEl.value = ""
    } else {
        inputEl.focus()
    }
});

saveTabBtn.addEventListener("click", function () {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    });
});

deleteBtn.addEventListener("click", function () {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
});