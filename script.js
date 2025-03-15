// Firebase 初期化
  const firebaseConfig = {
    apiKey: "AIzaSyCIG-KrEj9vb5mPa1f7VXyHh0NGqDsiZCI",
    authDomain: "b23ch-d24be.firebaseapp.com",
    projectId: "b23ch-d24be",
    storageBucket: "b23ch-d24be.firebasestorage.app",
    messagingSenderId: "902657440000",
    appId: "1:902657440000:web:61cb6570b59d423ca01be5",
    measurementId: "G-FGE5FCRSZ0"
  };
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// スレッド一覧を表示
function loadThreads() {
    db.collection("threads").orderBy("createdAt", "desc").onSnapshot(snapshot => {
        let html = "";
        snapshot.forEach(doc => {
            html += `<li onclick="loadPosts('${doc.id}')">${doc.data().title}</li>`;
        });
        document.getElementById("threadList").innerHTML = html;
    });
}

// スレッド作成
function createThread() {
    let title = document.getElementById("newThreadTitle").value;
    if (title.trim() === "") return;
    db.collection("threads").add({
        title: title,
        createdAt: new Date().toISOString()
    });
}

// スレッドの投稿一覧を表示
function loadPosts(threadId) {
    db.collection("threads").doc(threadId).collection("posts").orderBy("createdAt").onSnapshot(snapshot => {
        let html = `<h3>投稿一覧</h3>`;
        snapshot.forEach(doc => {
            html += `<p>${doc.data().content}</p>`;
        });
        html += `<input type="text" id="newPostContent" placeholder="書き込む内容">
                 <button onclick="createPost('${threadId}')">書き込む</button>`;
        document.getElementById("postArea").innerHTML = html;
    });
}

// 投稿作成
function createPost(threadId) {
    let content = document.getElementById("newPostContent").value;
    if (content.trim() === "") return;
    db.collection("threads").doc(threadId).collection("posts").add({
        content: content,
        createdAt: new Date().toISOString()
    });
}

loadThreads();
