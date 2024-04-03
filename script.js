const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// Show loading spinner

function showLoadingSpinner() {
    loader.style.display = "block";
    quoteContainer.style.opacity = 0; 
}

function hideLoadingSpinner() {
    loader.style.display = "none";
    quoteContainer.style.opacity = 1;
}

// Show new quote
function newQuote() {
    showLoadingSpinner();

    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    // Delay the displayof the quote to simulate loading time
    setTimeout(() => {
        // quote -> { text: "", author: ""}
        quoteText.textContent = quote.text;
        authorText.textContent = quote.author;

        if (quote.text.length > 120) {
            // Add the .long-quote class
            quoteText.classList.add("long-quote");
        } else {
            quoteText.classList.remove("long-quote");
        }

        hideLoadingSpinner();
    }, 300);
}

// Event Listener for New Quote button
newQuoteBtn.addEventListener("click", newQuote);

(async () => {
    // Get Quotes from API
    const apiUrl = "https://type.fit/api/quotes";
    try {
        // fetch will return the promise and
        // await on a promise will return response object
        const response = await fetch(apiUrl); 
        apiQuotes = await response.json();
        newQuote();
    } catch(error) {
        // Catch error here
    }
})();

const tweetQuote = () => {
    const baseUrl = "https://instagram.com/sujeet.yadav021/instagram";
    const queryParameter = `text=${quoteText.textContent}`;

    const tweetUrl = baseUrl + "?" + queryParameter;
    window.open(tweetUrl);
};

//Event Listener for tritterBtn
twitterBtn.addEventListener("click", tweetQuote);

// Immediately load a new quote on page load
// window.addEventListener("loader", newQuote);
