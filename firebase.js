const firebaseConfig = {
    apiKey: "AIzaSyAGqhdKhwDQSlVqYDgoh2L0VIHsCvjDNAo",
    authDomain: "test-7896d.firebaseapp.com",
    projectId: "test-7896d",
    storageBucket: "test-7896d.appspot.com",
    messagingSenderId: "304627341575",
    appId: "1:304627341575:web:c25c2d1b1285088ec04da2",
    measurementId: "G-5C48C3CZTQ"
  };

  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  const db = firebase.firestore();