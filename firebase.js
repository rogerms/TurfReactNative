import * as firebase from 'firebase';
// Initialize Firebase
class Firebase {
    static initialize() {
        const firebaseConfig = {
            apiKey: "AIzaSyB3w5UGpeYEzgvCCRw7neYb7P831C_1QDI",
            authDomain: "turf-sports.firebaseapp.com",
            databaseURL: "https://turf-sports.firebaseio.com",
            projectId: "turf-sports",
            storageBucket: "turf-sports.appspot.com",
            messagingSenderId: "610689124815"
        };

        firebase.initializeApp(firebaseConfig);
    }
}

module.exports = Firebase;