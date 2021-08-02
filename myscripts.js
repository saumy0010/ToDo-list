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


// adding enter key functionality to submit the task.

const form = document.getElementById('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    firebase.database().ref('Tasks').push({
        task: form['task'].value
    });
});



// Inserting the new task in the list.
function insertData(id, task) {
    const parent = document.getElementById('data');
    const li_element = document.createElement("li");
    const input_element = document.createElement("input");
    input_element.type = 'radio';
    input_element.id = id;
    li_element.id = id;

    input_element.addEventListener('click', (event) => {
        deleteData(event.target.id);
        var val = document.getElementById(`${event.target.id}`);
        parent.removeChild(val);
    });

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


// Delete a task by id
function deleteData(dataKey) {

    firebase.database().ref('Tasks/' + dataKey).remove();
}


//Google authentication
firebase.auth().onAuthStateChanged(firbaseUser => {
    if (firbaseUser) {
        console.log(firbaseUser);
    } else {
        console.log('Not logged in');
    }
})

var provider = new firebase.auth.GoogleAuthProvider();

firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
    }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });