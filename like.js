import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { getDatabase, ref, get, set, update, onValue } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";

// Firebase Configuration
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

// ✅ Prevent duplicate initialization
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const database = getDatabase(app);

const likeBtn = document.getElementById('likeBtn');
const likeCount = document.getElementById('likeCount');
const postId = "body"; // Unique post ID

// Authenticate user anonymously
signInAnonymously(auth).catch((error) => {
    console.error("Anonymous sign-in failed:", error);
});

// Listen for authentication state
onAuthStateChanged(auth, (user) => {
    if (user) {
        const userId = user.uid;
        handleLikeButton(userId);
    }
});

// Function to handle like button logic
function handleLikeButton(userId) {
    const postRef = ref(database, `likes/${postId}`);
    const userLikeRef = ref(database, `likes/${postId}/users/${userId}`);

    // Fetch initial like data
    onValue(postRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            likeCount.textContent = data.count || 0;
            if (data.users && data.users[userId]) {
                likeBtn.classList.add('liked');
                likeBtn.classList.remove('not-liked');
                likeBtn.textContent = `Thank you ❤️ (${data.count})`;
                likeBtn.disabled = true; // Disable button after liking
            } else {
                likeBtn.classList.add('not-liked');
                likeBtn.classList.remove('liked');
                likeBtn.textContent = `Like ❤️ (${data.count})`;
                likeBtn.disabled = false; // Enable button if not liked
            }
        }
    });

    // Handle like button click
    likeBtn.addEventListener('click', () => {
        get(userLikeRef).then((snapshot) => {
            if (!snapshot.exists()) {
                get(postRef).then((postSnapshot) => {
                    let postData = postSnapshot.val() || { count: 0, users: {} };
                    postData.count += 1;
                    postData.users[userId] = true;

                    // Update Firebase
                    set(postRef, postData);
                });
            }
        });
    });
}




export async function  saveData(userUid){
    if(userUid ==! "JyjPScuvPeT7Ro0xMSv3AjyVVjA3"){
       const now = new Date();
    const timeString = now.toLocaleTimeString(); 
    const dateString = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`;
    const  dataref = ref(database, `data/${dateString}/${timeString}`)

    set(dataref, {
       userUid

    }); 
    }
    

}