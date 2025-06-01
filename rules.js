document.addEventListener("DOMContentLoaded", () => {
  const aiInput = document.createElement("textarea");
  aiInput.id = "aiInput";
  aiInput.placeholder = "Type your cyber security question or issue here...";
  aiInput.className = "w-full px-4 py-2 border rounded-lg mb-4";
  aiInput.style.minHeight = "100px";

  const aiSuggestions = document.createElement("div");
  aiSuggestions.id = "aiSuggestions";
  aiSuggestions.className = "p-4 bg-white rounded-lg shadow-inner text-gray-700 mb-6";
  aiSuggestions.style.minHeight = "120px";

  const formContainer = document.getElementById("form").querySelector("div.max-w-3xl");
  formContainer.insertBefore(aiInput, formContainer.firstChild);
  formContainer.insertBefore(aiSuggestions, aiInput.nextSibling);

  // Example simple AI rules
  const rules = [
    { keywords: ["scam", "phishing", "email"], response: "Check suspicious emails carefully. Avoid clicking unknown links." },
    { keywords: ["malware", "virus", "infection"], response: "Run an antivirus scan immediately and disconnect from the internet if infected." },
    { keywords: ["data leak", "breach"], response: "Change your passwords and enable 2FA on all accounts." },
    { keywords: ["account hacked", "locked"], response: "Use account recovery options and contact support if necessary." },
  ];

  function getSuggestions(input) {
    input = input.toLowerCase();
    let matched = rules.filter(rule => rule.keywords.some(k => input.includes(k)));
    if (matched.length) {
      return matched.map(m => m.response).join("\n\n");
    }
    return "Please describe your issue in detail to get better help.";
  }

  function updateSuggestions() {
    const val = aiInput.value.trim();
    aiSuggestions.textContent = val ? getSuggestions(val) : "Start typing your issue for instant guidance...";
  }

  // Initialize suggestions
  aiInput.value = "";
  updateSuggestions();

  // Update suggestions on input
  aiInput.addEventListener("input", updateSuggestions);
});
