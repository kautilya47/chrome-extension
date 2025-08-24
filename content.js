// Enhanced Content Script with Checkbox + Dynamic Field Table Search
console.log(
  "DocuCheck: Loading enhanced extension with checkbox field table search..."
);

const config = {
  // DYNAMIC XPATH PATTERNS - Multiple patterns for different div container structures
  mediaHistoryTabXPathPatterns: [
    "/html/body/div[1]/div/div[2]/div/div/main/div/div/div/div[2]/div/div[2]/div/div/div/div/div/div/div[1]/div/ul/li[2]/div/button",
    "/html/body/div[2]/div/div[2]/div/div/main/div/div/div/div[2]/div/div[2]/div/div/div/div/div/div/div[1]/div/ul/li[2]/div/button",
    "/html/body/div[3]/div/div[2]/div/div/main/div/div/div/div[2]/div/div[2]/div/div/div/div/div/div/div[1]/div/ul/li[2]/div/button",
    "/html/body/div[4]/div/div[2]/div/div/main/div/div/div/div[2]/div/div[2]/div/div/div/div/div/div/div[1]/div/ul/li[2]/div/button",
  ],

  checkboxXPathPatterns: [
    "/html/body/div[1]/div/div[2]/div/div/main/div/div/div/div[2]/div/div[2]/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[1]/div/div/div[2]/div/div[1]/table/tbody/tr[$ROW]/td[1]/div/label/span/span/span[1]/input",
    "/html/body/div[2]/div/div[2]/div/div/main/div/div/div/div[2]/div/div[2]/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[1]/div/div/div[2]/div/div[1]/table/tbody/tr[$ROW]/td[1]/div/label/span/span/span[1]/input",
    "/html/body/div[3]/div/div[2]/div/div/main/div/div/div/div[2]/div/div[2]/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[1]/div/div/div[2]/div/div[1]/table/tbody/tr[$ROW]/td[1]/div/label/span/span/span[1]/input",
    "/html/body/div[4]/div/div[2]/div/div/main/div/div/div/div[2]/div/div[2]/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[1]/div/div/div[2]/div/div[1]/table/tbody/tr[$ROW]/td[1]/div/label/span/span/span[1]/input",
  ],

  dateCellXPathPatterns: [
    "/html/body/div[1]/div/div[2]/div/div/main/div/div/div/div[2]/div/div[2]/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[1]/div/div/div[2]/div/div[1]/table/tbody/tr[$ROW]/td[5]/div",
    "/html/body/div[2]/div/div[2]/div/div/main/div/div/div/div[2]/div/div[2]/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[1]/div/div/div[2]/div/div[1]/table/tbody/tr[$ROW]/td[5]/div",
    "/html/body/div[3]/div/div[2]/div/div/main/div/div/div/div[2]/div/div[2]/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[1]/div/div/div[2]/div/div[1]/table/tbody/tr[$ROW]/td[5]/div",
    "/html/body/div[4]/div/div[2]/div/div/main/div/div/div/div[2]/div/div[2]/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[1]/div/div/div[2]/div/div[1]/table/tbody/tr[$ROW]/td[5]/div",
  ],

  cellXPathBasesPatterns: [
    // Pattern 1 (div[1])
    [
      "/html/body/div[1]/div/div[2]/div/div/main/div/div/div/div[2]/div/div[2]/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[1]/div/div/div[2]/div/div[1]/table/tbody/tr[$ROW]/td[1]/div/label",
      "/html/body/div[1]/div/div[2]/div/div/main/div/div/div/div[2]/div/div[2]/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[1]/div/div/div[2]/div/div[1]/table/tbody/tr[$ROW]/td[2]/div",
      "/html/body/div[1]/div/div[2]/div/div/main/div/div/div/div[2]/div/div[2]/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[1]/div/div/div[2]/div/div[1]/table/tbody/tr[$ROW]/td[3]/div",
      "/html/body/div[1]/div/div[2]/div/div/main/div/div/div/div[2]/div/div[2]/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[1]/div/div/div[2]/div/div[1]/table/tbody/tr[$ROW]/td[4]/div",
      "/html/body/div[1]/div/div[2]/div/div/main/div/div/div/div[2]/div/div[2]/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[1]/div/div/div[2]/div/div[1]/table/tbody/tr[$ROW]/td[5]/div",
    ],
    // Pattern 2 (div[2])
    [
      "/html/body/div[2]/div/div[2]/div/div/main/div/div/div/div[2]/div/div[2]/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[1]/div/div/div[2]/div/div[1]/table/tbody/tr[$ROW]/td[1]/div/label",
      "/html/body/div[2]/div/div[2]/div/div/main/div/div/div/div[2]/div/div[2]/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[1]/div/div/div[2]/div/div[1]/table/tbody/tr[$ROW]/td[2]/div",
      "/html/body/div[2]/div/div[2]/div/div/main/div/div/div/div[2]/div/div[2]/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[1]/div/div/div[2]/div/div[1]/table/tbody/tr[$ROW]/td[3]/div",
      "/html/body/div[2]/div/div[2]/div/div/main/div/div/div/div[2]/div/div[2]/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[1]/div/div/div[2]/div/div[1]/table/tbody/tr[$ROW]/td[4]/div",
      "/html/body/div[2]/div/div[2]/div/div/main/div/div/div/div[2]/div/div[2]/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[1]/div/div/div[2]/div/div[1]/table/tbody/tr[$ROW]/td[5]/div",
    ],
    // Pattern 3 (div[3])
    [
      "/html/body/div[3]/div/div[2]/div/div/main/div/div/div/div[2]/div/div[2]/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[1]/div/div/div[2]/div/div[1]/table/tbody/tr[$ROW]/td[1]/div/label",
      "/html/body/div[3]/div/div[2]/div/div/main/div/div/div/div[2]/div/div[2]/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[1]/div/div/div[2]/div/div[1]/table/tbody/tr[$ROW]/td[2]/div",
      "/html/body/div[3]/div/div[2]/div/div/main/div/div/div/div[2]/div/div[2]/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[1]/div/div/div[2]/div/div[1]/table/tbody/tr[$ROW]/td[3]/div",
      "/html/body/div[3]/div/div[2]/div/div/main/div/div/div/div[2]/div/div[2]/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[1]/div/div/div[2]/div/div[1]/table/tbody/tr[$ROW]/td[4]/div",
      "/html/body/div[3]/div/div[2]/div/div/main/div/div/div/div[2]/div/div[2]/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[1]/div/div/div[2]/div/div[1]/table/tbody/tr[$ROW]/td[5]/div",
    ],
    // Pattern 4 (div[4])
    [
      "/html/body/div[4]/div/div[2]/div/div/main/div/div/div/div[2]/div/div[2]/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[1]/div/div/div[2]/div/div[1]/table/tbody/tr[$ROW]/td[1]/div/label",
      "/html/body/div[4]/div/div[2]/div/div/main/div/div/div/div[2]/div/div[2]/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[1]/div/div/div[2]/div/div[1]/table/tbody/tr[$ROW]/td[2]/div",
      "/html/body/div[4]/div/div[2]/div/div/main/div/div/div/div[2]/div/div[2]/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[1]/div/div/div[2]/div/div[1]/table/tbody/tr[$ROW]/td[3]/div",
      "/html/body/div[4]/div/div[2]/div/div/main/div/div/div/div[2]/div/div[2]/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[1]/div/div/div[2]/div/div[1]/table/tbody/tr[$ROW]/td[4]/div",
      "/html/body/div[4]/div/div[2]/div/div/main/div/div/div/div[2]/div/div[2]/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[1]/div/div/div[2]/div/div[1]/table/tbody/tr[$ROW]/td[5]/div",
    ],
  ],

  // NEW: Dynamic field table patterns that appear AFTER checkbox is clicked
  // UPDATE THESE with the XPaths to the table that appears after checkbox selection
  dynamicFieldTableXPathPatterns: [
    // These patterns should point to the table that appears after clicking checkbox
    // Example patterns - you'll need to replace these with actual XPaths
    "/html/body/div[1]/div/div[2]/div/div/main/div/div/div/div[2]/div/div[2]/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[2]/div/div/div[2]/div/div/div/div/div/div/div[2]/div/div[1]/table/tbody/tr[$ROW]/td[2]/div/span/span/div",
    "/html/body/div[1]/div/div[2]/div/div/main/div/div/div/div[2]/div/div[2]/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[2]/div/div/div[2]/div/div/div/div/div/div/div[2]/div/div[1]/table/tbody/tr[$ROW]/td[3]/div/span/span/div",
  ],

  // Generic selectors for finding the dynamic table
  dynamicTableSelectors: [
    "table tbody tr",
    ".table tbody tr",
    "[role='table'] [role='row']",
    "div[class*='table'] div[class*='row']",
    "table tr",
    ".field-table tr",
    ".details-table tr",
  ],

  // Document and image patterns
  documentPatterns: ["GCC", "testReport", "testReports"],
  imagePatterns: ["productImages"],

  // Timing configuration
  tabClickDelay: 450,
  tabLoadWaitDelay: 1800,
  operationDelay: 600,
  validationDelay: 500,
  domSettleDelay: 400,
  retryDelay: 600,
  maxRetries: 3,

  // NEW: Wait time for dynamic table to appear after checkbox click
  dynamicTableWaitTime: 2000,

  localStorageKey: "flashOpenedDocuments",
};

// Helper function to extract yyyy-mm-dd from various date formats
function extractDateOnly(dateString) {
  try {
    if (!dateString || dateString.trim() === "" || dateString === "N/A") {
      return "";
    }

    const trimmed = dateString.trim();

    if (trimmed.includes("T")) {
      return trimmed.split("T")[0];
    }

    if (trimmed.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return trimmed;
    }

    const date = new Date(trimmed);
    if (!isNaN(date.getTime())) {
      return date.toISOString().split("T")[0];
    }

    return trimmed;
  } catch (error) {
    console.log(
      `DocuCheck: Error extracting date from "${dateString}":`,
      error
    );
    return dateString || "";
  }
}

// Click items function
function clickItems(buttonName) {
  try {
    const buttons = document.querySelectorAll("button");
    for (const btn of buttons) {
      if (btn.innerText.trim() === buttonName) {
        console.log(`Found ${buttonName} tab`);
        btn.click();
        break;
      }
    }
  } catch (e) {
    console.warn("Could not click tab", e);
  }
}

// Fetch item by label function
function getValueByLabel(labelText) {
  const divs = Array.from(document.querySelectorAll("div"));

  for (let i = 0; i < divs.length - 1; i++) {
    const currentText = divs[i].innerText.trim().toLowerCase();
    if (currentText === labelText.toLowerCase()) {
      const nextDiv = divs[i + 1];
      return clean(nextDiv ? nextDiv.innerText.trim() : null);
    }
  }
  return null;
}

// Helper function for getValueByLabel function
function clean(str) {
  if (typeof str !== "string") return "";
  return str.replace(/\s+/g, " ").trim();
}

// Dynamic element resolution functions
function getElementByXPathMultiPattern(xpathPatterns, rowIndex = null) {
  for (const pattern of xpathPatterns) {
    try {
      const xpath =
        rowIndex !== null ? pattern.replace("$ROW", rowIndex) : pattern;
      const element = document.evaluate(
        xpath,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;
      if (element) {
        return element;
      }
    } catch (error) {
      console.log(`DocuCheck: XPath pattern failed: ${pattern}`, error);
    }
  }
  return null;
}

// Enhanced element getters using dynamic patterns
function getCheckboxElement(rowIndex) {
  return getElementByXPathMultiPattern(config.checkboxXPathPatterns, rowIndex);
}

function getDateCellElement(rowIndex) {
  return getElementByXPathMultiPattern(config.dateCellXPathPatterns, rowIndex);
}

function getMediaHistoryTabElement() {
  return getElementByXPathMultiPattern(config.mediaHistoryTabXPathPatterns);
}

// NEW: Dynamic Field Table Scanner Class - scans table that appears after checkbox click
class DynamicFieldTableScanner {
  constructor() {
    this.fieldData = new Map();
    this.targetAttributes = ['MODEL_NUMBER', 'PART_NUMBER', 'DOC_TYPE', 'ASIN_MODEL_NUMBER', 'ASIN_PART_NUMBER'];
  }

  // Wait for and scan the field table that appears after checkbox click
  async scanDynamicFieldTable(
    keyword,
    maxWaitTime = config.dynamicTableWaitTime
  ) {
    console.log("DocuCheck: Waiting for dynamic field table to appear...");
    this.fieldData.clear();

    const startTime = Date.now();
    let tableFound = false;

    // Wait for table to appear with periodic checks
    while (Date.now() - startTime < maxWaitTime && !tableFound) {
      // Method 1: Try specific XPath patterns for the dynamic table
      tableFound = this.scanWithDynamicXPathPatterns();

      // Method 2: Try generic table selectors if XPath patterns don't work
      if (!tableFound) {
        tableFound = this.scanWithGenericSelectors();
      }

      // Method 3: Look for recently added DOM elements with field patterns
      if (!tableFound) {
        tableFound = this.scanForNewFieldValuePatterns();
      }

      if (!tableFound) {
        await this.sleep(200); // Wait 200ms before next check
      }
    }

    if (tableFound) {
      console.log(
        `DocuCheck: Found dynamic table with ${this.fieldData.size} field-value pairs`
      );
      this.logFoundFields();

      // Search for the keyword in the found fields
      const matches = this.findMatchingFields(keyword);
      return {
        found: matches.length > 0,
        matches: matches,
        fieldData: this.fieldData,
      };
    } else {
      console.log("DocuCheck: Dynamic field table not found within timeout");
      return {
        found: false,
        matches: [],
        fieldData: this.fieldData,
      };
    }
  }

  scanWithDynamicXPathPatterns() {
    try {
      let foundAny = false;

      for (let rowIndex = 1; rowIndex <= 50; rowIndex++) {
        let fieldName = null;
        let fieldValue = null;

        // Try to find field name and value using dynamic XPath patterns
        for (const pattern of config.dynamicFieldTableXPathPatterns) {
          const xpath = pattern.replace("$ROW", rowIndex);
          const element = document.evaluate(
            xpath,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
          ).singleNodeValue;

          if (element) {
            const text = element.textContent.trim();
            if (text) {
              if (pattern.includes("td[1]")) {
                fieldName = text;
              } else if (pattern.includes("td[2]")) {
                fieldValue = text;
              }
            }
          }
        }

        if (fieldName && fieldValue) {
          this.fieldData.set(fieldName.toLowerCase(), fieldValue);
          console.log(
            `DocuCheck: Found dynamic field: ${fieldName} = ${fieldValue}`
          );
          foundAny = true;
        }

        // Stop if we hit empty rows
        if (!fieldName && !fieldValue && rowIndex > 5) {
          break;
        }
      }

      return foundAny;
    } catch (error) {
      console.log(
        "DocuCheck: Error scanning with dynamic XPath patterns:",
        error
      );
      return false;
    }
  }

  scanWithGenericSelectors() {
    try {
      let foundAny = false;

      for (const selector of config.dynamicTableSelectors) {
        const rows = document.querySelectorAll(selector);

        // Only look at recently added elements (appeared in last few seconds)
        for (const row of rows) {
          const cells = row.querySelectorAll("td, th, div[class*='cell']");

          if (cells.length >= 2) {
            const fieldName = cells[0].textContent.trim();
            const fieldValue = cells[1].textContent.trim();

            if (fieldName && fieldValue && this.isLikelyFieldName(fieldName)) {
              this.fieldData.set(fieldName.toLowerCase(), fieldValue);
              console.log(
                `DocuCheck: Found dynamic field (generic): ${fieldName} = ${fieldValue}`
              );
              foundAny = true;
            }
          }
        }
      }

      return foundAny;
    } catch (error) {
      console.log("DocuCheck: Error scanning with generic selectors:", error);
      return false;
    }
  }

  scanForNewFieldValuePatterns() {
    try {
      let foundAny = false;

      // Look for common patterns like "Label: Value" in recently added DOM elements
      const allElements = document.querySelectorAll("div, span, p, td, th");

      for (const element of allElements) {
        const text = element.textContent.trim();

        // Pattern 1: "Field Name: Field Value"
        if (text.includes(":")) {
          const parts = text.split(":");
          if (parts.length === 2) {
            const fieldName = parts[0].trim();
            const fieldValue = parts[1].trim();

            if (this.isLikelyFieldName(fieldName) && fieldValue) {
              this.fieldData.set(fieldName.toLowerCase(), fieldValue);
              console.log(
                `DocuCheck: Found dynamic field (pattern): ${fieldName} = ${fieldValue}`
              );
              foundAny = true;
            }
          }
        }
      }

      return foundAny;
    } catch (error) {
      console.log("DocuCheck: Error scanning for field-value patterns:", error);
      return false;
    }
  }

  isLikelyFieldName(text) {
    // Check if text looks like a field name
    const fieldNamePatterns = [
      /ASIN_MODEL_NUMBER/i,
      /MODEL_NUMBER/i,
      /ASIN_PART_NUMBER/i,
      /type/i,
      /id/i,
      /code/i,
      /version/i,
      /part/i,
      /serial/i,
      /product/i,
      /item/i,
      /category/i,
      /brand/i,
      /manufacturer/i,
      /description/i,
      /specification/i,
    ];

    return (
      fieldNamePatterns.some((pattern) => pattern.test(text)) ||
      (text.length > 2 && text.length < 50 && /^[a-zA-Z\s\-_]+$/.test(text))
    );
  }

  // Check if a keyword matches any field value
  findMatchingFields(keyword) {
    const matches = [];
    if (!keyword) return matches;

    const keywordLower = keyword.toLowerCase();

    for (const [fieldName, fieldValue] of this.fieldData) {
      if (fieldValue.toLowerCase().includes(keywordLower)) {
        matches.push({
          fieldName: fieldName,
          fieldValue: fieldValue,
          matchType: "value",
        });
      }
      if (fieldName.includes(keywordLower)) {
        matches.push({
          fieldName: fieldName,
          fieldValue: fieldValue,
          matchType: "name",
        });
      }
    }

    return matches;
  }

  logFoundFields() {
    if (this.fieldData.size > 0) {
      console.log("DocuCheck: Dynamic field-value pairs found:");
      for (const [fieldName, fieldValue] of this.fieldData) {
        console.log(`  ${fieldName}: ${fieldValue}`);
      }
    }
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Enhanced Document Catalog with dynamic field table integration
class DocumentCatalog {
  constructor() {
    this.documents = new Map();
    this.currentSessionProcessed = new Set();
    this.detectedPattern = null;
    this.dynamicFieldScanner = new DynamicFieldTableScanner();
  }

  detectWorkingPattern() {
    if (this.detectedPattern !== null) return this.detectedPattern;

    console.log("DocuCheck: Detecting working XPath pattern...");

    for (
      let patternIndex = 0;
      patternIndex < config.cellXPathBasesPatterns.length;
      patternIndex++
    ) {
      const testElement = this.testPattern(patternIndex, 1);
      if (testElement) {
        this.detectedPattern = patternIndex;
        console.log(
          `DocuCheck: Detected working pattern index: ${patternIndex}`
        );
        return patternIndex;
      }
    }

    console.log("DocuCheck: No working pattern detected, using pattern 0");
    this.detectedPattern = 0;
    return 0;
  }

  testPattern(patternIndex, rowIndex) {
    try {
      const cellBases = config.cellXPathBasesPatterns[patternIndex];
      if (!cellBases || cellBases.length === 0) return null;

      const xpath = cellBases[0].replace("$ROW", rowIndex);
      return document.evaluate(
        xpath,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;
    } catch (error) {
      return null;
    }
  }

  createDocumentId(rowIndex, cellBases) {
    try {
      const parts = [];

      for (let i = 0; i < cellBases.length; i++) {
        const xpath = cellBases[i].replace("$ROW", rowIndex);
        const cell = document.evaluate(
          xpath,
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue;
        if (cell) {
          const text = cell.textContent.trim();
          if (text) parts.push(text);
        }
      }

      const combined = parts.join("|").replace(/\s+/g, " ").trim();
      const hash = this.simpleHash(combined);

      return `doc_${rowIndex}_${hash}`;
    } catch (error) {
      return `doc_${rowIndex}_${Date.now()}`;
    }
  }

  simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
  }

  scanAllDocuments() {
    console.log("DocuCheck: Starting document scan...");
    this.documents.clear();

    const workingPatternIndex = this.detectWorkingPattern();
    const cellBases = config.cellXPathBasesPatterns[workingPatternIndex];

    let rowIndex = 1;
    let foundCount = 0;
    let consecutiveEmptyRows = 0;
    const maxConsecutiveEmpty = 5;
    const maxRows = 1000;

    while (rowIndex <= maxRows && consecutiveEmptyRows < maxConsecutiveEmpty) {
      const checkbox = getCheckboxElement(rowIndex);

      if (!checkbox) {
        consecutiveEmptyRows++;
        if (rowIndex > 10 && consecutiveEmptyRows >= maxConsecutiveEmpty) {
          console.log(
            `DocuCheck: Stopping scan - found ${consecutiveEmptyRows} consecutive empty rows`
          );
          break;
        }
        rowIndex++;
        continue;
      }

      consecutiveEmptyRows = 0;

      try {
        const docId = this.createDocumentId(rowIndex, cellBases);
        const dateCell = getDateCellElement(rowIndex);
        const rawDate = dateCell ? dateCell.textContent.trim() : "";
        const cleanDate = extractDateOnly(rawDate);
        const artifactName = this.getArtifactName(rowIndex, cellBases);

        if (!artifactName && !cleanDate) {
          rowIndex++;
          continue;
        }

        if (artifactName) {
          console.log(
            `DocuCheck: Found artifact: "${artifactName}" - isDocument: ${this.isDocumentRow(
              artifactName
            )}, isImage: ${this.isImageRow(artifactName)}`
          );
        }

        const document = {
          id: docId,
          rowIndex: rowIndex,
          date: cleanDate,
          artifactName: artifactName,
          isDocument: this.isDocumentRow(artifactName),
          isImage: this.isImageRow(artifactName),
          checkbox: checkbox,
          dateCell: dateCell,
        };

        if (!this.documents.has(docId)) {
          this.documents.set(docId, document);
          foundCount++;
          console.log(
            `DocuCheck: Cataloged ${foundCount}: Row ${rowIndex} - ${artifactName} (${document.date})`
          );
        }
      } catch (error) {
        console.error(`DocuCheck: Error cataloging row ${rowIndex}:`, error);
      }

      rowIndex++;
    }

    console.log(
      `DocuCheck: Scan complete. Found ${foundCount} unique documents`
    );
    return foundCount;
  }

  getArtifactName(rowIndex, cellBases) {
    try {
      // First try the standard cell bases
      for (let cellIndex = 0; cellIndex < cellBases.length; cellIndex++) {
        const xpath = cellBases[cellIndex].replace("$ROW", rowIndex);
        const cell = document.evaluate(
          xpath,
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue;
        if (cell) {
          const cellText = cell.textContent.trim();
          if (cellText.startsWith("ps_") || cellText.includes("ps_")) {
            return cellText;
          }
        }
      }

      // Also try header cell patterns
      const headerCellXPathPatterns = [
        "/html/body/div[1]/div/div[2]/div/div/main/div/div/div/div[2]/div/div[2]/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[1]/div/div/div[2]/div/div[1]/table/tbody/tr[$ROW]/th/div",
        "/html/body/div[2]/div/div[2]/div/div/main/div/div/div/div[2]/div/div[2]/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[1]/div/div/div[2]/div/div[1]/table/tbody/tr[$ROW]/th/div",
        "/html/body/div[3]/div/div[2]/div/div/main/div/div/div/div[2]/div/div[2]/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[1]/div/div/div[2]/div/div[1]/table/tbody/tr[$ROW]/th/div",
        "/html/body/div[4]/div/div[2]/div/div/main/div/div/div/div[2]/div/div[2]/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div[1]/div/div/div/div/div/div[1]/div/div/div[2]/div/div[1]/table/tbody/tr[$ROW]/th/div",
      ];

      const headerCell = getElementByXPathMultiPattern(
        headerCellXPathPatterns,
        rowIndex
      );
      if (headerCell) {
        const headerText = headerCell.textContent.trim();
        if (headerText.startsWith("ps_") || headerText.includes("ps_")) {
          return headerText;
        }
      }

      return "";
    } catch (error) {
      return "";
    }
  }

  isDocumentRow(artifactName) {
    try {
      return (
        artifactName &&
        config.documentPatterns.some((pattern) =>
          artifactName.toLowerCase().includes(pattern.toLowerCase())
        )
      );
    } catch (error) {
      return false;
    }
  }

  isImageRow(artifactName) {
    try {
      return (
        artifactName &&
        config.imagePatterns.some((pattern) =>
          artifactName.toLowerCase().includes(pattern.toLowerCase())
        )
      );
    } catch (error) {
      return false;
    }
  }

  getDocumentsToProcess(filterType = null) {
    const toProcess = [];
    const processedDocuments = new Set();

    console.log(
      `DocuCheck: Filtering documents - Filter type: ${filterType || "All"}`
    );
    console.log(
      `DocuCheck: Total documents in catalog: ${this.documents.size}`
    );

    for (const [docId, doc] of this.documents) {
      console.log(
        `DocuCheck: Evaluating document: ${doc.artifactName}, isDocument: ${doc.isDocument}, filterType: ${filterType}`
      );

      if (this.currentSessionProcessed.has(docId)) {
        console.log(
          `DocuCheck: Skipping ${doc.artifactName} - already processed in current session`
        );
        continue;
      }

      if (processedDocuments.has(docId)) {
        console.log(
          `DocuCheck: Skipping ${doc.artifactName} - already in processing queue`
        );
        continue;
      }

      if (filterType === "documents" && !doc.isDocument) {
        console.log(
          `DocuCheck: Skipping ${
            doc.artifactName
          } - not a document type (artifact: "${
            doc.artifactName
          }", patterns: ${JSON.stringify(config.documentPatterns)})`
        );
        continue;
      }

      if (filterType === "images" && !doc.isImage) {
        console.log(
          `DocuCheck: Skipping ${doc.artifactName} - not an image type`
        );
        continue;
      }

      if (!doc.artifactName && !doc.date) {
        console.log(
          `DocuCheck: Skipping document with ID ${docId} - no valid content`
        );
        continue;
      }

      console.log(
        `DocuCheck: ✅ Queuing ${doc.artifactName || "Unknown"} for processing`
      );
      toProcess.push(doc);
      processedDocuments.add(docId);
    }

    toProcess.sort((a, b) => a.rowIndex - b.rowIndex);

    console.log(
      `DocuCheck: ${toProcess.length} unique documents queued for processing`
    );
    return toProcess;
  }

  markAsProcessedInSession(docId, rowIndex) {
    this.currentSessionProcessed.add(docId);
    console.log(`DocuCheck: Marked document as processed in session: ${docId}`);
  }

  resetCurrentSession() {
    console.log("DocuCheck: Resetting session");
    this.currentSessionProcessed.clear();
  }
}

// Enhanced Document Processor class - now searches dynamic field tables instead of PDFs
class DocumentProcessor {
  constructor(catalog, ui) {
    this.catalog = catalog;
    this.ui = ui;
    this.isProcessing = false;
    this.currentQueue = [];
    this.currentIndex = 0;
    this.processedCount = 0;
    this.foundCount = 0;
  }

  async startProcessing(filterType = null, modelNumber = null) {
    if (this.isProcessing) {
      console.log("DocuCheck: Processing already in progress");
      return;
    }

    console.log("DocuCheck: Starting processing session");

    this.catalog.resetCurrentSession();

    this.isProcessing = true;
    this.processedCount = 0;
    this.foundCount = 0;
    this.currentIndex = 0;
    this.modelNumber = modelNumber;

    this.ui.documentsButton.classList.add("processing");
    this.ui.documentsButton.textContent = "Processing...";

    try {
      if (!(await this.ensureMediaHistoryView())) {
        this.resetUI();
        return;
      }

      this.ui.documentsButton.textContent = "Scanning...";
      const documentCount = this.catalog.scanAllDocuments();

      if (documentCount === 0) {
        console.log("DocuCheck: No documents found");
        this.resetUI();
        return;
      }

      this.currentQueue = this.catalog.getDocumentsToProcess(filterType);

      if (this.currentQueue.length === 0) {
        console.log("DocuCheck: No documents to process after filtering");
        this.resetUI();
        return;
      }

      console.log(
        `DocuCheck: Processing queue has ${this.currentQueue.length} unique documents`
      );

      await this.processQueue();
    } catch (error) {
      console.error("DocuCheck: Error in processing:", error);
      this.resetUI();
    }
  }

  async ensureMediaHistoryView() {
    return new Promise((resolve) => {
      if (this.isInMediaHistoryView()) {
        resolve(true);
        return;
      }

      console.log("DocuCheck: Switching to Media History view");
      const mediaHistoryTab = getMediaHistoryTabElement();
      if (!mediaHistoryTab) {
        console.log("DocuCheck: Media History tab not found");
        resolve(false);
        return;
      }

      mediaHistoryTab.click();

      setTimeout(() => {
        if (this.isInMediaHistoryView()) {
          console.log("DocuCheck: Successfully switched to Media History view");
          resolve(true);
        } else {
          console.log("DocuCheck: Failed to switch to Media History view");
          resolve(false);
        }
      }, config.tabLoadWaitDelay);
    });
  }

  isInMediaHistoryView() {
    const checkbox = getCheckboxElement(1);
    return !!checkbox;
  }

  async processQueue() {
    console.log(
      `DocuCheck: Starting to process ${this.currentQueue.length} unique documents`
    );

    while (this.currentIndex < this.currentQueue.length && this.isProcessing) {
      const document = this.currentQueue[this.currentIndex];

      if (this.catalog.currentSessionProcessed.has(document.id)) {
        this.currentIndex++;
        continue;
      }

      console.log(
        `DocuCheck: Processing ${this.currentIndex + 1}/${
          this.currentQueue.length
        }: Row ${document.rowIndex} - ${document.artifactName} (${
          document.date
        })`
      );

      this.ui.documentsButton.textContent = `Processing ${
        this.processedCount + 1
      }/${this.currentQueue.length}`;

      const result = await this.processDocument(document);

      if (result.processed) {
        this.catalog.markAsProcessedInSession(document.id, document.rowIndex);
        this.processedCount++;

        if (result.found) {
          this.foundCount++;
          console.log(
            `DocuCheck: ✅ Found keyword in document ${
              this.currentIndex + 1
            }: ${document.artifactName}`
          );
        } else {
          console.log(
            `DocuCheck: ❌ Keyword not found in document ${
              this.currentIndex + 1
            }: ${document.artifactName}`
          );
        }
      } else {
        console.log(
          `DocuCheck: Failed to process document ${this.currentIndex + 1}: ${
            document.artifactName
          }`
        );
      }

      this.currentIndex++;

      if (this.currentIndex < this.currentQueue.length && this.isProcessing) {
        await this.sleep(config.operationDelay);
      }
    }

    console.log(
      `DocuCheck: Processing complete. Processed ${this.processedCount}/${this.currentQueue.length} documents, found keyword in ${this.foundCount} documents`
    );
    this.resetUI();
  }

async processDocument(document) {
    try {
      document.checkbox.scrollIntoView({ behavior: "smooth", block: "center" });
      await this.sleep(config.domSettleDelay);

      const rowElement = document.checkbox.closest("tr");
      if (rowElement) {
        rowElement.classList.add("flash-highlight");
      }

      console.log(`DocuCheck: Clicking checkbox/radio for row ${document.rowIndex}`);
      const checkboxSuccess = await this.clickCheckboxRobust(document.checkbox);
      if (!checkboxSuccess) {
        if (rowElement) rowElement.classList.remove("flash-highlight");
        return { processed: false, found: false };
      }

      const isSelected = await this.validateCheckboxSelected(document.checkbox);
      if (!isSelected) {
        if (rowElement) rowElement.classList.remove("flash-highlight");
        return { processed: false, found: false };
      }

      console.log(`DocuCheck: Searching for attributes and keyword "${this.modelNumber}" in dynamic field table for row ${document.rowIndex}`);
      
      if (this.ui?.resultMessage) {
        this.ui.resultMessage.textContent = `🔍 Searching attribute table...`;
      }

      // Search the dynamic field table
      const searchResult = await this.catalog.dynamicFieldScanner.scanDynamicFieldTable(this.modelNumber);

      if (rowElement) {
        setTimeout(() => {
          rowElement.classList.remove("flash-highlight");
        }, 300);
      }

      // Update UI based on search results
      if (searchResult.found) {
        const message = `✅ "${this.modelNumber}" found in attributes: ${searchResult.matches.map(m => m.fieldName).join(', ')}`;
        console.log(message);
        if (this.ui?.resultMessage) this.ui.resultMessage.textContent = message;
      } else {
        const message = `❌ "${this.modelNumber}" not found in attribute table`;
        console.log(message);
        if (this.ui?.resultMessage) this.ui.resultMessage.textContent = message;
      }

      // Safe extraction with null checks
      const extracted = searchResult.extractedAttributes || {};
      console.log("\n🎯 EXTRACTED TARGET ATTRIBUTES:");
      
      // Show the attributes that were actually found
      if (Object.keys(extracted).length > 0) {
        Object.keys(extracted).forEach(key => {
          const attr = extracted[key];
          if (attr && attr.value !== undefined) {
            console.log(`${key}: "${attr.value}" (confidence: ${attr.confidence || 'N/A'})`);
          }
        });
      } else {
        console.log("No target attributes found");
      }
      
      // Safe specific lookups with proper null checking
      console.log("\n🔍 SPECIFIC LOOKUPS:");
      console.log("ASIN_MODEL_NUMBER:", extracted.ASIN_MODEL_NUMBER?.value ?? "Not found");
      console.log("ASIN_PART_NUMBER:", extracted.ASIN_PART_NUMBER?.value ?? "Not found");
      console.log("CLIENT_SPECIFIED_AGE:", extracted.CLIENT_SPECIFIED_AGE?.value ?? "Not found");
      console.log("DOC_TYPE:", extracted.DOC_TYPE?.value ?? "Not found");
      console.log("MODEL_NUMBER:", extracted.MODEL_NUMBER?.value ?? "Not found");
      console.log("PART_NUMBER:", extracted.PART_NUMBER?.value ?? "Not found");

      return { 
        processed: true, 
        found: searchResult.found, 
        matches: searchResult.matches || [],
        extractedAttributes: extracted
      };

    } catch (err) {
      console.error(`Error in document processing:`, err);
      console.error(`Stack trace:`, err.stack);
      return { processed: false, found: false };
    }
  }

  async clickCheckboxRobust(checkbox) {
    for (let attempt = 0; attempt < config.maxRetries; attempt++) {
      try {
        checkbox.scrollIntoView({ behavior: "smooth", block: "center" });
        await this.sleep(200);

        checkbox.focus();
        checkbox.click();

        if (!checkbox.checked && !checkbox.getAttribute("aria-checked")) {
          const clickEvent = new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
            view: window,
          });
          checkbox.dispatchEvent(clickEvent);
        }

        if (!checkbox.checked && !checkbox.getAttribute("aria-checked")) {
          const label = checkbox.closest("label");
          if (label) label.click();
        }

        await this.sleep(config.validationDelay);
        return true;
      } catch (error) {
        console.log(
          `DocuCheck: Checkbox click attempt ${attempt + 1} failed:`,
          error
        );
        if (attempt < config.maxRetries - 1) {
          await this.sleep(config.retryDelay);
        }
      }
    }
    return false;
  }

  async validateCheckboxSelected(checkbox) {
    await this.sleep(config.validationDelay);

    try {
      const isSelected =
        checkbox.checked ||
        checkbox.getAttribute("aria-checked") === "true" ||
        checkbox.classList.contains("checked") ||
        checkbox.parentElement?.classList.contains("checked") ||
        checkbox.closest("label")?.classList.contains("checked");

      console.log(`DocuCheck: Checkbox validation result: ${isSelected}`);
      return isSelected;
    } catch (error) {
      console.log(`DocuCheck: Checkbox validation error:`, error);
      return false;
    }
  }

  resetUI() {
    this.isProcessing = false;
    this.ui.documentsButton.classList.remove("processing");
    this.ui.documentsButton.textContent = "📄 Documents";

    // Show final summary
    if (this.processedCount > 0) {
      const finalMessage = `✅ Complete: ${this.foundCount}/${this.processedCount} documents contained "${this.modelNumber}"`;
      if (this.ui?.resultMessage) {
        this.ui.resultMessage.textContent = finalMessage;
        setTimeout(() => {
          if (this.ui?.resultMessage) this.ui.resultMessage.textContent = "";
        }, 5000);
      }
    }

    document.querySelectorAll(".flash-highlight").forEach((el) => {
      el.classList.remove("flash-highlight");
    });
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Global instances
let documentCatalog = null;
let documentProcessor = null;

// Create fixed UI in top left
function createFixedUI() {
  try {
    const existingUI = document.getElementById("flash-extension-container");
    if (existingUI) existingUI.remove();

    const flashContainer = document.createElement("div");
    flashContainer.id = "flash-extension-container";
    flashContainer.innerHTML = `
      <div class="flash-fixed-toolbar">
        <button class="flash-button" id="flash-documents-btn">📄 Search Fields</button>
        <div class="flash-result" id="flash-result-message"></div>
      </div>
    `;

    // Add styles for fixed positioning
    const style = document.createElement("style");
    style.textContent = `
      #flash-extension-container {
        position: fixed !important;
        top: 20px !important;
        left: 20px !important;
        z-index: 100000 !important;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
      }

      .flash-fixed-toolbar {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
        border-radius: 8px !important;
        padding: 12px !important;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15) !important;
        display: flex !important;
        align-items: center !important;
        gap: 12px !important;
        min-width: 220px !important;
      }

      .flash-button {
        background: rgba(255, 255, 255, 0.9) !important;
        border: none !important;
        border-radius: 6px !important;
        padding: 8px 16px !important;
        font-size: 14px !important;
        font-weight: 500 !important;
        color: #333 !important;
        cursor: pointer !important;
        transition: all 0.2s ease !important;
        white-space: nowrap !important;
      }

      .flash-button:hover {
        background: rgba(255, 255, 255, 1) !important;
        transform: translateY(-1px) !important;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
      }

      .flash-button.processing {
        background: #fbbf24 !important;
        color: #92400e !important;
        animation: flash-pulse 2s infinite !important;
      }

      .flash-result {
        color: white !important;
        font-size: 13px !important;
        font-weight: 500 !important;
        max-width: 250px !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        white-space: nowrap !important;
      }

      .flash-highlight {
        background-color: rgba(255, 235, 59, 0.3) !important;
        border-left: 4px solid #ffc107 !important;
      }

      @keyframes flash-pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
      }
    `;

    document.head.appendChild(style);
    document.body.appendChild(flashContainer);

    console.log("DocuCheck: Fixed UI added to top left");

    return {
      container: flashContainer,
      toolbar: flashContainer.querySelector(".flash-fixed-toolbar"),
      documentsButton: document.getElementById("flash-documents-btn"),
      resultMessage: document.getElementById("flash-result-message"),
    };
  } catch (error) {
    console.error("DocuCheck: Error creating fixed UI:", error);
    return null;
  }
}

// Initialize extension
async function initialize() {
  try {
    // Only run on the specified domain
    if (!window.location.href.includes("https://na.crs.hs3c.a2z.com/")) {
      return;
    }

    await new Promise((resolve) => {
      if (document.readyState === "complete") {
        resolve();
      } else if (document.readyState === "interactive") {
        setTimeout(resolve, 500);
      } else {
        window.addEventListener("load", resolve);
      }
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const ui = createFixedUI();
    if (!ui) {
      console.log("DocuCheck: UI creation failed");
      return;
    }

    // Initialize global instances
    documentCatalog = new DocumentCatalog();
    documentProcessor = new DocumentProcessor(documentCatalog, ui);

    // Button click handler
    if (ui.documentsButton) {
      ui.documentsButton.addEventListener("click", async () => {
        // Step 1: Click the required tab
        clickItems("RequiredTab");

        // Step 2: Wait for tab content to load
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Step 3: Fetch the model number
        const modelNumber = getValueByLabel("Model Number");
        console.log("DocuCheck: Model Number:", modelNumber);

        if (!modelNumber) {
          if (ui.resultMessage) {
            ui.resultMessage.textContent = "⚠️ No model number found";
          }
          return;
        }

        // Step 4: Start document processing with field table searching
        if (!documentProcessor.isProcessing) {
          documentProcessor.startProcessing("documents", modelNumber);
        }
      });
    }

    console.log(
      "DocuCheck: Enhanced extension initialized successfully with checkbox + dynamic field table search"
    );
    return ui;
  } catch (error) {
    console.error("DocuCheck: Error during initialization:", error);
  }
}

// Start the extension
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(initialize, 800);
  });
} else {
  setTimeout(initialize, 800);
}

window.addEventListener("load", () => {
  setTimeout(() => {
    const flashUI = document.getElementById("flash-extension-container");
    if (!flashUI) {
      console.log("DocuCheck: UI not found after page load, initializing...");
      initialize();
    }
  }, 1500);
});
