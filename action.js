import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// !!! BU YERGA O'ZINGIZNING FIREBASE KODLARINGIZNI QO'YING !!!
const firebaseConfig = {
    apiKey: "AIzaSy...", // Firebase-dan olasiz
    authDomain: "loyihangiz.firebaseapp.com",
    databaseURL: "https://loyihangiz-default-rtdb.firebaseio.com", 
    projectId: "loyihangiz",
    storageBucket: "loyihangiz.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const chatRef = ref(db, "messages");

// Xabar yuborish
window.sendMessage = () => {
    const msgInput = document.getElementById('msgInput');
    const text = msgInput.value.trim();

    if (text !== "") {
        push(chatRef, {
            sender: "Eri", // Bu yerga kimligini yozing
            text: text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        })
        .then(() => {
            console.log("Xabar ketdi!");
            msgInput.value = "";
        })
        .catch((error) => {
            console.error("Xato:", error);
        });
    }
};

// Xabarlarni qabul qilish
onChildAdded(chatRef, (snapshot) => {
    const msg = snapshot.val();
    const chatBox = document.getElementById('chatBox');

    const msgHTML = `
        <div style="margin: 10px; padding: 10px; background: #e1ffc7; border-radius: 10px; width: fit-content; align-self: ${msg.sender === 'Eri' ? 'flex-end' : 'flex-start'}">
            <b>${msg.sender}:</b> ${msg.text} <br>
            <small style="font-size: 10px; color: gray;">${msg.time}</small>
        </div>`;

    chatBox.innerHTML += msgHTML;
    chatBox.scrollTop = chatBox.scrollHeight;
});