// const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
// const result = document.getElementById("result");
// const sound = document.getElementById("sound");
// const btn = document.getElementById("search-btn");

// btn.addEventListener("click", () => {
//     let inpWord = document.getElementById("inp-word"). 
//     value;
//     fetch(`${url}${inpWord}`)
//     .then((response) => response.json())
//     .then((data) => {
//         console.log(data);
//         result.innerHTML = `
//         <div class="word">
//         <h3>${inpWord}</h3>
//         <button onclick="playSound()">
//             <i class="fa-solid fa-volume-high"></i>
//         </button>
//     </div>
//     <div class="details">
//         <p>${data[0].meanings[0].partOfSpeech}</p>
//         <p>/${data[0].phonetic}/</p>
//     </div>
//     <p class="word-meaning">
//         ${data[0].meanings[0].definitions[0]. 
//         definition}
//     </p>
//     <p class="word-example">
//             ${data[0].meanings[0].definitions[0].
//             example || "" }
//     </p>`;
//     sound.setAttribute("src", `https:${data[0]. 
//     phonetics[0].audio}`);
    
//     });
//     .catch( () => {
//         result.innerHTML = `<h3 class=>Couldn't Find The Word</
//         h3>`
//     });
// });

// function playSound() {
//     sound.play();
// }




const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");
const form = document.querySelector("form")

form.addEventListener("submit", (e) => {
    e.preventDefault()
    let inpWord = document.getElementById("inp-word").value;
    fetch(`${url}${inpWord}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);

            if (data && data.length > 0) {
                result.innerHTML = `
                    <div class="word">
                        <h3>${inpWord}</h3>
                        <button onclick="playSound('${data[0].phonetics[0].audio}')">
                            <i class="fa-solid fa-volume-high"></i>
                        </button>
                    </div>
                    <div class="details">
                        <p>${data[0].meanings[0].partOfSpeech}</p>
                        <p>/${data[0].phonetic || ""}/</p>
                    </div>
                    <p class="word-meaning">
                        ${data[0].meanings[0].definitions[0].definition}
                    </p>
                    <p class="word-example">
                        ${data[0].meanings[0].definitions[0].example || ""}
                    </p>`;
            } else {
                result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
        });
});

function playSound(audioURL) {
    sound.src = `https:${audioURL}`;
    sound.play();
}
