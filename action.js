import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// 1. FIREBASE-DAN OLGAN CONFIG-NI SHU YERGA QO'YING
const firebaseConfig = {
    apiKey: "SIZNING_API_KEY",
    authDomain: "SIZNING_LOYIHA.firebaseapp.com",
    databaseURL: "https://SIZNING_LOYIHA.firebaseio.com", // BU TO'G'RI BO'LISHI SHART
    projectId: "SIZNING_LOYIHA_ID",
    storageBucket: "SIZNING_LOYIHA.appspot.com",
    messagingSenderId: "ID",
    appId: "APP_ID"
};

// 2. Firebase-ni ishga tushirish
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const chatRef = ref(db, "messages");

// 3. Xabar yuborish funksiyasi
window.sendMessage = () => {
    const msgInput = document.getElementById('msgInput');
    const text = msgInput.value.trim();

    if (text !== "") {
        push(chatRef, {
            sender: "Xotini", // Eri saytida buni "Eri" deb yozasiz
            text: text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        msgInput.value = ""; // Inputni tozalash
    }
};

// 4. Xabarlarni qabul qilish va ekranga chiqarish
onChildAdded(chatRef, (snapshot) => {
    const msg = snapshot.val();
    const chatBox = document.getElementById('chatBox');

    const msgHTML = `
        <div style="margin: 10px; padding: 10px; background: #e1ffc7; border-radius: 10px; width: fit-content;">
            <b>${msg.sender}:</b> ${msg.text} <br>
            <small style="font-size: 10px; color: gray;">${msg.time}</small>
        </div>`;

    chatBox.innerHTML += msgHTML;
    chatBox.scrollTop = chatBox.scrollHeight; // Avtomatik pastga tushish
});