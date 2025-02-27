// Import Firebase modules directly from the CDN
import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";

import { getFirestore, collection, addDoc, serverTimestamp, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

// Firebase configuration (get these from Firebase Console)
const firebaseConfig = {
    apiKey: "AIzaSyBDdlxEi_sbc2NrjSXt9cP2cDVzJBL_WDY",
    authDomain: "theprojectsofc.firebaseapp.com",
    databaseURL: "https://theprojectsofc-default-rtdb.firebaseio.com/",
    projectId: "theprojectsofc",
    storageBucket: "theprojectsofc.appspot.com",
    messagingSenderId: "825970426844",
    appId: "1:825970426844:web:35135b5f4071dd5069c519",
    measurementId: "G-E8XJ0KEQNH"
};


// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

// Function to send a message
export function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const nameInput = document.getElementById('name-input');
    const messageText = messageInput.value;
    const nameText = nameInput.value;
    if (messageText.trim() !== '' || nameText.trim() !== '' ) {
        // Add message to Firestore
        addDoc(collection(db, 'messages'), {
            name : nameText || "anonymous" , 
            text: messageText,
            timestamp: serverTimestamp()
        })
        .then(() => {
            messageInput.value = ''; // Clear input after sending
        });
    }
}

// Function to fetch messages in real-time
export function loadMessages() {
    const messagesRef = collection(db, 'messages');
    const q = query(messagesRef, orderBy('timestamp'));
    
    onSnapshot(q, snapshot => {
        const messagesContainer = document.getElementById('messages');
        messagesContainer.innerHTML = ''; // Clear current messages

        snapshot.forEach(doc => {
            const message = doc.data();
            const messageElement = document.createElement('div');
            messageElement.innerHTML = ` 
            <section> 
            <h4 class="username">${message.name}</h4>:
            <h4 class="messageContant">${message.text} </h4>
            </section>
       
            <span class="time"> ${parseAndFormatTimestamp(`${message.timestamp}`)} </span>
            `;
            messagesContainer.appendChild(messageElement);
        });
    });
}

// Attach event listener to the send button
const sendButton = document.getElementById('send-button');
sendButton.addEventListener('click', sendMessage);

// Call loadMessages on page load
loadMessages();


function parseAndFormatTimestamp(timestampString) {
    // Extract seconds and nanoseconds using regex
    const regex = /seconds=(\d+),\s+nanoseconds=(\d+)/;
    const matches = timestampString.match(regex);

    if (!matches || matches.length < 3) {
        throw new Error("Invalid timestamp format");
    }

    const seconds = parseInt(matches[1], 10);
    const nanoseconds = parseInt(matches[2], 10);

    // Convert to milliseconds
    const milliseconds = seconds * 1000 + Math.floor(nanoseconds / 1000000);

    // Create a Date object
    const date = new Date(milliseconds);

    // Format the date to a readable string
    const formattedDate = date.toLocaleString(); // Customize this as needed

    return formattedDate;
}