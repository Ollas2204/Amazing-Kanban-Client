import { initializeApp } from 'firebase'

var app = initializeApp({
      apiKey: "AIzaSyBnnThwIEudVaP8Wp-Nt59rJmfXKaa_bsc",
      authDomain: "kanban-67e77.firebaseapp.com",
      databaseURL: "https://kanban-67e77.firebaseio.com",
      projectId: "kanban-67e77",
      storageBucket: "kanban-67e77.appspot.com",
      messagingSenderId: "466736662773"
})

export const db = app.database()
export const kanban = db.ref('kanban')
