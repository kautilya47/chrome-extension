importScripts("pdf.js"); // include pdf.js in extension root
pdfjsLib.GlobalWorkerOptions.workerSrc = chrome.runtime.getURL("pdf.worker.js");
pdfjsLib.GlobalWorkerOptions.disableWorker = true;

chrome.runtime.onInstalled.addListener(() => {
  console.log("DocuCheck extension has been installed");
});

chrome.runtime.onStartup.addListener(() => {
  console.log("DocuCheck running ....");
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "processPDFInBackground") {
    processPDFInBackground(request.pdfUrl, request.keyword)
      .then((result) => sendResponse(result))
      .catch((error) => {
        console.error("Background: Error processing PDF:", error);
        sendResponse({ found: false, error: error.message });
      });

    return true; // Keep message channel open for async response
  }
});

async function processPDFInBackground(pdfUrl, keyword) {
  try {
    console.log("Background: Processing PDF from URL:", pdfUrl);

    const loadingTask = pdfjsLib.getDocument({
      url: pdfUrl,
      withCredentials: true, // ✅ include Amazon auth cookies
    });
    const pdf = await loadingTask.promise;

    let fullText = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const text = content.items.map((it) => it.str).join(" ");
      fullText += " " + text;
    }

    const found = fullText.toLowerCase().includes(keyword.toLowerCase());
    return { found, keyword, textSample: fullText.substring(0, 200) };
  } catch (error) {
    console.error("Background: Error processing PDF:", error);
    return { found: false, error: error.message };
  }
}

// Simple PDF text extraction without PDF.js
async function extractTextFromPDF(arrayBuffer) {
  try {
    // Convert ArrayBuffer to string and look for text patterns
    const uint8Array = new Uint8Array(arrayBuffer);
    let text = "";

    // Simple text extraction - look for readable text in PDF
    for (let i = 0; i < uint8Array.length - 1; i++) {
      const char = uint8Array[i];
      // Only include printable ASCII characters
      if (char >= 32 && char <= 126) {
        text += String.fromCharCode(char);
      } else if (char === 10 || char === 13) {
        text += " "; // Replace line breaks with spaces
      }
    }

    // Clean up the text - remove PDF-specific artifacts
    text = text
      .replace(/[^\w\s\-\.]/g, " ") // Keep only word chars, spaces, hyphens, dots
      .replace(/\s+/g, " ") // Normalize whitespace
      .trim();

    return text;
  } catch (error) {
    console.error("Error extracting text from PDF:", error);
    return "";
  }
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === "complete" &&
    tab.url.includes("na.crs.hs3c.a2z.com")
  ) {
    console.log("Medaan page detected");
  }
});
