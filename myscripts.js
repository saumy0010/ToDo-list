// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDtqVhKd0o8l-D9hcvsdc04G9v-T6CJMz0",
    authDomain: "test-2-d4aa4.firebaseapp.com",
    databaseURL: "https://test-2-d4aa4-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "test-2-d4aa4",
    storageBucket: "test-2-d4aa4.appspot.com",
    messagingSenderId: "771225527920",
    appId: "1:771225527920:web:9566e325fa33cde7ccf6b5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function writeData() {
    firebase.database().ref('Tasks').push({
        task: document.getElementById('task').value
    });

}

// Inserting the new task in the list.
function insertData(id, task) {
    const parent = document.getElementById('data');
    const li_element = document.createElement("li");
    const input_element = document.createElement("input");
    input_element.type = 'radio';
    input_element.id = id;
    input_element.onclick = console.log(this.id);

    li_element.innerHTML = task['task'];
    li_element.appendChild(input_element);
    parent.appendChild(li_element);



}

// listener to recieve data from firebase RTDB
firebase.database().ref('Tasks').on('child_added', function(snapshot) {
    let key = snapshot.key
    let data = snapshot.val();
    insertData(key, data);
});

// adding enter key functionality to submit the task.

let input = document.getElementById('task');
input.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
        document.getElementById('addTask').click();
        input.value = '';
    }
});

function deleteData(dataKey) {

    console.log(dataKey);

}