// Import the functions you need from the SDKs you need

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js'
import {
  getAuth,
  signInWithEmailAndPassword
} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js'
import {
  getFirestore,
  addDoc,
  collection,
  query,
  onSnapshot,
  where
} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB72E8OuZZpzBt8GTQHDzfrFY56HVNslVs',
  authDomain: 'cris-app-5a21f.firebaseapp.com',
  projectId: 'cris-app-5a21f',
  storageBucket: 'cris-app-5a21f.appspot.com',
  messagingSenderId: '29953400526',
  appId: '1:29953400526:web:d16c29f2e0b24c21087a9f'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
export const db = getFirestore(app)

const email = document.getElementById('email')
const password = document.getElementById('password')
const buttonLoga = document.getElementById('buttonLoga')

const loginArea = document.querySelector('.login')
const calendarArea = document.querySelector('.calendarWrap')

buttonLoga.addEventListener('click', () => {
  console.log(email.value)
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(userCredential => {
      console.log(userCredential.user)
      if (true) {
        loginArea.style.display = 'none'
        calendarArea.style.display = 'block'
      }
    })
    .catch(err => console.log(err))
})

export function saveEvent(data) {
  const docRef = addDoc(collection(db, 'events'), data)
    .then(res => { })
    .catch(err => console.log(err))
}


export function getEvents() {
  const q = query(collection(db, 'events'))
 
  onSnapshot(q, result => {
    result.docs.forEach(element => {
      console.log(element.data())
     
   
      // cal.addEvent({
      //   title: element.data().title,
      //   start: element.data().start,
      //   end: Date(element.data().end),
      //   allDay: element.data().allDay
      // })
    })
  })
}
getEvents()

