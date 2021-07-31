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

var map1 = new Map();

getData();


function writeData() {
    firebase.database().ref('Tasks').push({
        task: document.getElementById('task').value
    });

}

// refreshing the table value with null
var task = '';
$("#data").html(task);

function renderlist() {

    var task = '';
    $("#data").html(task);

    for (const item of map1.keys()) {
        console.log(item);
        task += `
        <li>${item['task']}</li>
        `;
    }
    $("#data").html(task);
}

function getData() {

    firebase.database().ref('Tasks').on('value', function(snapshot) {

        map1.clear();
        console.log("after clear", map1);

        snapshot.forEach(function(childSnapshot) {
            var data = childSnapshot.val();
            var key = childSnapshot.key;

            map1.set(data, key);

        });
        renderlist()
    });
}