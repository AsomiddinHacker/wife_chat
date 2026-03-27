import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, onChildAdded, update } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// FIREBASE-DAN OLGAN CONFIG-NI SHU YERGA QO'YING
const firebaseConfig = {
    apiKey: "SIZNING_API_KEY",
    authDomain: "SIZNING_LOYIHA.firebaseapp.com",
    databaseURL: "https://SIZNING_LOYIHA.firebaseio.com",
    projectId: "SIZNING_LOYIHA_ID",
    storageBucket: "SIZNING_LOYIHA.appspot.com",
    messagingSenderId: "ID",
    appId: "APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const chatRef = ref(db, "messages");
const msgSound = new Audio('https://www.soundjay.com/buttons/sounds/button-16.mp3');

const chatBox = document.getElementById('chatBox');
const msgInput = document.getElementById('msgInput');

// Xabar yuborish funksiyasi
window.sendMessage = () => {
    const text = msgInput.value.trim();
    if (text) {
        push(chatRef, {
            sender: "Eri",
            text: text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            seen: false
        });
        msgInput.value = "";
    }
};

// Xabarlarni qabul qilish
onChildAdded(chatRef, (snapshot) => {
    const msg = snapshot.val();
    const isMine = msg.sender === "Eri";
    
    const msgHTML = `
        <div class="msg ${isMine ? 'outgoing' : 'incoming'}">
            ${msg.text}
            <div class="meta">${msg.time} <span class="check">${msg.seen ? '✓✓' : '✓'}</span></div>
        </div>`;
    chatBox.innerHTML += msgHTML;
    chatBox.scrollTop = chatBox.scrollHeight;

    if (!isMine) {
        msgSound.play();
        if(!msg.seen) update(ref(db, `messages/${snapshot.key}`), { seen: true });
    }
});