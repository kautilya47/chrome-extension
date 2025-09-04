// Enhanced Content Script with Checkbox + Dynamic Field Table Search + PART_NUMBER + Doc Type UI + CPC Pattern + ASIN Matching
console.log(
  "DocuCheck: Loading enhanced extension with checkbox field table search and CPC pattern support..."
);

const config = {
  // DYNAMIC XPATH PATTERNS - Multiple patterns for different div container structures
  mediaHistoryTabXPathPatterns: [
    "/html/body/div[1]/div/div[2]/div/div/main/div/div/div/div[2]/div/div[2]/div/div/div/div/div/div/div[1]/div/ul/li[2]/div/button",
    "/html/body/div[2]/div/div[2]/div/div/main/div/div/div/div[2]/div/div[2]/div/div/div/div/div/div/div[1]/div/ul/li[2]/div/button",
    "/html/body/div[3]/div/div[2]/div/div/main/div/div/div/div[2]/div/div[2]/div/div/div/div/div/div/div[1]/div/ul/li[2]/div/button",
    "/html/body/div[4]/div/div[2]/div/div/main/div/div/main/div/div/div/div[2]/div/div[2]/div/div/div/div/div/div/div[1]/div/ul/li[2]/div/button",
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

  // ASIN XPath patterns for different div containers
  asinXPathPatterns: [
    "/html/body/div[1]/div/div[2]/div/div/main/div/div/div/div[1]/div/div/div/h3/span/span[2]/span/button/span[2]",
    "/html/body/div[2]/div/div[2]/div/div/main/div/div/div/div[1]/div/div/div/h3/span/span[2]/span/button/span[2]",
    "/html/body/div[3]/div/div[2]/div/div/main/div/div/div/div[1]/div/div/div/h3/span/span[2]/span/button/span[2]",
    "/html/body/div[4]/div/div[2]/div/div/main/div/div/div/div[1]/div/div/div/h3/span/span[2]/span/button/span[2]",
  ],

  // Document and image patterns - ADDED "cpc" to document patterns
  documentPatterns: ["GCC", "testReport", "testReports", "cpc"],
  imagePatterns: ["productImages"],

  // Timing configuration
  tabClickDelay: 450,
  tabLoadWaitDelay: 1800,
  operationDelay: 600,
  validationDelay: 500,
  domSettleDelay: 400,
  retryDelay: 600,
  maxRetries: 3,

  // Wait time for dynamic table to appear after checkbox click
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

// ADDED: Function to get ASIN using XPath patterns
function getASIN() {
  for (const xpathPattern of config.asinXPathPatterns) {
    try {
      const element = document.evaluate(
        xpathPattern,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;

      if (element) {
        const asinValue = element.textContent.trim().replace("ASIN: ", "");
        console.log(`DocuCheck: Found ASIN: ${asinValue}`);
        return asinValue;
      }
    } catch (error) {
      console.log(
        `DocuCheck: ASIN XPath pattern failed: ${xpathPattern}`,
        error
      );
    }
  }
  console.log("DocuCheck: No ASIN found");
  return null;
}

// Helper function for getValueByLabel function
function clean(str) {
  if (typeof str !== "string") return "";
  return str.replace(/\s+/g, " ").trim();
}

// Helper function to normalize strings for comparison
function normalizeForComparison(str) {
  if (!str) return "";
  return str.toString().trim().toLowerCase().replace(/\s+/g, " ");
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

// Enhanced Dynamic Field Table Scanner - Now includes PART_NUMBER and comparison logic with CPC support
// Enhanced Dynamic Field Table Scanner - Now supports multiple MODEL_NUMBER attributes and ASIN inclusion matching
// Enhanced Dynamic Field Table Scanner - Now supports multiple MODEL_NUMBER attributes and ASIN inclusion matching
class DynamicFieldTableScanner {
  constructor() {
    this.fieldData = new Map();
    // Added PART_NUMBER to the target attributes
    this.targetAttributes = [
      "DOC_TYPE",
      "MODEL_NUMBER",
      "PART_NUMBER",
      "ASIN_MODEL_NUMBER", // Keep this as fallback for MODEL_NUMBER
      "TR_NUMBER", // Adding TR_NUMBER as well
      "PRODUCT_IDENTIFIER", // searching for product identifier in CPC
    ];
  }

  async scanDynamicFieldTable(
    searchModelNumber = null,
    searchPartNumber = null,
    searchMatchingPartNumber = null,
    searchASIN = null,
    maxWaitTime = config.dynamicTableWaitTime
  ) {
    console.log("DocuCheck: Scanning for attribute table...");
    this.fieldData.clear();

    const startTime = Date.now();
    let tableFound = false;
    let attemptCount = 0;

    while (Date.now() - startTime < maxWaitTime && !tableFound) {
      attemptCount++;
      tableFound = this.scanForAttributeTable();

      if (!tableFound && this.fieldData.size === 0) {
        await this.sleep(200);
      } else {
        tableFound = true;
      }
    }

    if (tableFound || this.fieldData.size > 0) {
      console.log(
        `DocuCheck: Found ${this.fieldData.size} attributes in table`
      );

      const extractedAttributes = this.extractTargetAttributes();
      const matchResult = this.compareAttributes(
        searchModelNumber,
        searchPartNumber,
        searchMatchingPartNumber,
        searchASIN,
        extractedAttributes
      );

      return {
        found: matchResult.hasMatch,
        matches: matchResult.matches,
        fieldData: this.fieldData,
        extractedAttributes: extractedAttributes,
        comparisonResult: matchResult,
      };
    } else {
      console.log("DocuCheck: No attribute table found");
      return {
        found: false,
        matches: [],
        fieldData: this.fieldData,
        extractedAttributes: {},
        comparisonResult: { hasMatch: false, matches: [], details: [] },
      };
    }
  }

  // ENHANCED: Updated compareAttributes method to handle multiple MODEL_NUMBER attributes and ASIN inclusion matching
  compareAttributes(
    searchModelNumber,
    searchPartNumber,
    searchMatchingPartNumber,
    searchASIN,
    extractedAttributes
  ) {
    const matches = [];
    const details = [];
    let hasMatch = false;

    console.log("\n🔍 COMPARING ATTRIBUTES:");
    console.log(`Search Model Number: "${searchModelNumber}"`);
    console.log(`Search Part Number: "${searchPartNumber}"`);
    console.log(`Search Matching Part Number: "${searchMatchingPartNumber}"`);
    console.log(`Search ASIN: "${searchASIN}"`);

    // Determine if this is a CPC document
    const docType = extractedAttributes.DOC_TYPE?.value;
    const isCPCDocument =
      docType && normalizeForComparison(docType).includes("cpc");

    console.log(`Document Type: "${docType}"`);
    console.log(`Is CPC Document: ${isCPCDocument}`);

    // NEW: Get all MODEL_NUMBER attributes (including multiple ones)
    const allModelNumbers = this.getAllModelNumbers();
    console.log(`Found ${allModelNumbers.length} MODEL_NUMBER attributes:`, allModelNumbers);

    // Compare Model Number with ALL MODEL_NUMBER attributes found
    if (searchModelNumber && allModelNumbers.length > 0) {
      const normalizedSearchModel = normalizeForComparison(searchModelNumber);
      let modelMatchFound = false;

      for (let i = 0; i < allModelNumbers.length; i++) {
        const modelData = allModelNumbers[i];
        const extractedModelNumber = modelData.value;
        
        if (extractedModelNumber) {
          // Check if the extracted model number contains comma-separated ASINs
          let modelMatch = false;
          let matchType = "exact";
          let matchedValue = extractedModelNumber;

          if (extractedModelNumber.includes(',')) {
            // Handle comma-separated values - check if search term is included
            const modelValues = extractedModelNumber
              .split(',')
              .map(val => normalizeForComparison(val.trim()))
              .filter(val => val.length > 0);
            
            modelMatch = modelValues.includes(normalizedSearchModel);
            matchType = "inclusion";
            console.log(`Model Number ${i + 1} (comma-separated): "${extractedModelNumber}"`);
            console.log(`Parsed values: [${modelValues.join(', ')}]`);
          } else {
            // Regular exact match
            const normalizedExtractedModel = normalizeForComparison(extractedModelNumber);
            modelMatch = normalizedSearchModel === normalizedExtractedModel;
            console.log(`Model Number ${i + 1}: "${extractedModelNumber}"`);
          }

          console.log(`Model Number ${i + 1} Match: ${modelMatch ? "✅ YES" : "❌ NO"} (${matchType})`);

          details.push({
            type: `MODEL_NUMBER_${i + 1}`,
            searchValue: searchModelNumber,
            extractedValue: extractedModelNumber,
            match: modelMatch,
            matchType: matchType,
            confidence: modelData.confidence || "N/A",
            attributeName: modelData.attribute
          });

          if (modelMatch) {
            matches.push({
              fieldName: `MODEL_NUMBER_${i + 1}`,
              fieldValue: extractedModelNumber,
              confidence: modelData.confidence || "N/A",
              matchType: matchType,
              matchedKeyword: searchModelNumber,
              attributeName: modelData.attribute
            });
            modelMatchFound = true;
            hasMatch = true;
          }
        }
      }

      if (!modelMatchFound) {
        console.log("No MODEL_NUMBER matches found across all attributes");
      }
    } else if (searchModelNumber && allModelNumbers.length === 0) {
      console.log("Search Model Number provided but no MODEL_NUMBER attributes found");
      details.push({
        type: "MODEL_NUMBER",
        searchValue: searchModelNumber,
        extractedValue: null,
        match: false,
        confidence: "N/A",
      });
    }

    // Compare Part Number with ALL MODEL_NUMBER attributes
    if (searchPartNumber && allModelNumbers.length > 0) {
      const normalizedSearchPart = normalizeForComparison(searchPartNumber);
      let partMatchFound = false;

      for (let i = 0; i < allModelNumbers.length; i++) {
        const modelData = allModelNumbers[i];
        const extractedModelNumber = modelData.value;
        
        if (extractedModelNumber) {
          // Check if the extracted model number contains comma-separated values
          let partMatch = false;
          let matchType = "exact";

          if (extractedModelNumber.includes(',')) {
            // Handle comma-separated values - check if search term is included
            const modelValues = extractedModelNumber
              .split(',')
              .map(val => normalizeForComparison(val.trim()))
              .filter(val => val.length > 0);
            
            partMatch = modelValues.includes(normalizedSearchPart);
            matchType = "inclusion";
            console.log(`Part Number vs Model Number ${i + 1} (comma-separated): "${extractedModelNumber}"`);
          } else {
            // Regular exact match
            const normalizedExtractedModel = normalizeForComparison(extractedModelNumber);
            partMatch = normalizedSearchPart === normalizedExtractedModel;
            console.log(`Part Number vs Model Number ${i + 1}: "${extractedModelNumber}"`);
          }

          console.log(`Part Number vs Model Number ${i + 1} Match: ${partMatch ? "✅ YES" : "❌ NO"} (${matchType})`);

          details.push({
            type: `PART_NUMBER_vs_MODEL_${i + 1}`,
            searchValue: searchPartNumber,
            extractedValue: extractedModelNumber,
            match: partMatch,
            matchType: matchType,
            confidence: modelData.confidence || "N/A",
            attributeName: modelData.attribute
          });

          if (partMatch) {
            matches.push({
              fieldName: `PART_NUMBER_vs_MODEL_${i + 1}`,
              fieldValue: extractedModelNumber,
              confidence: modelData.confidence || "N/A",
              matchType: matchType,
              matchedKeyword: searchPartNumber,
              attributeName: modelData.attribute
            });
            partMatchFound = true;
            hasMatch = true;
          }
        }
      }

      if (!partMatchFound) {
        console.log("No Part Number matches found across all MODEL_NUMBER attributes");
      }
    }

    // Compare Matching Part Number with ALL MODEL_NUMBER attributes
    if (searchMatchingPartNumber && allModelNumbers.length > 0) {
      const normalizedSearchMatchingPart = normalizeForComparison(searchMatchingPartNumber);
      let matchingPartMatchFound = false;

      for (let i = 0; i < allModelNumbers.length; i++) {
        const modelData = allModelNumbers[i];
        const extractedModelNumber = modelData.value;
        
        if (extractedModelNumber) {
          // Check if the extracted model number contains comma-separated values
          let matchingPartMatch = false;
          let matchType = "exact";

          if (extractedModelNumber.includes(',')) {
            // Handle comma-separated values - check if search term is included
            const modelValues = extractedModelNumber
              .split(',')
              .map(val => normalizeForComparison(val.trim()))
              .filter(val => val.length > 0);
            
            matchingPartMatch = modelValues.includes(normalizedSearchMatchingPart);
            matchType = "inclusion";
            console.log(`Matching Part Number vs Model Number ${i + 1} (comma-separated): "${extractedModelNumber}"`);
          } else {
            // Regular exact match
            const normalizedExtractedModel = normalizeForComparison(extractedModelNumber);
            matchingPartMatch = normalizedSearchMatchingPart === normalizedExtractedModel;
            console.log(`Matching Part Number vs Model Number ${i + 1}: "${extractedModelNumber}"`);
          }

          console.log(`Matching Part Number vs Model Number ${i + 1} Match: ${matchingPartMatch ? "✅ YES" : "❌ NO"} (${matchType})`);

          details.push({
            type: `MATCHING_PART_vs_MODEL_${i + 1}`,
            searchValue: searchMatchingPartNumber,
            extractedValue: extractedModelNumber,
            match: matchingPartMatch,
            matchType: matchType,
            confidence: modelData.confidence || "N/A",
            attributeName: modelData.attribute
          });

          if (matchingPartMatch) {
            matches.push({
              fieldName: `MATCHING_PART_vs_MODEL_${i + 1}`,
              fieldValue: extractedModelNumber,
              confidence: modelData.confidence || "N/A",
              matchType: matchType,
              matchedKeyword: searchMatchingPartNumber,
              attributeName: modelData.attribute
            });
            matchingPartMatchFound = true;
            hasMatch = true;
          }
        }
      }

      if (!matchingPartMatchFound) {
        console.log("No Matching Part Number matches found across all MODEL_NUMBER attributes");
      }
    }

    // ENHANCED: Compare ASIN with ALL MODEL_NUMBER attributes (check if ASIN is included in comma-separated values)
    if (searchASIN && allModelNumbers.length > 0) {
      const normalizedSearchASIN = normalizeForComparison(searchASIN);
      let asinMatchFound = false;

      for (let i = 0; i < allModelNumbers.length; i++) {
        const modelData = allModelNumbers[i];
        const extractedModelNumber = modelData.value;
        
        if (extractedModelNumber) {
          // Check if the extracted model number contains comma-separated ASINs
          let asinMatch = false;
          let matchType = "exact";

          if (extractedModelNumber.includes(',')) {
            // Handle comma-separated values - check if ASIN is included
            const modelValues = extractedModelNumber
              .split(',')
              .map(val => normalizeForComparison(val.trim()))
              .filter(val => val.length > 0);
            
            asinMatch = modelValues.includes(normalizedSearchASIN);
            matchType = "inclusion";
            console.log(`ASIN vs Model Number ${i + 1} (comma-separated): "${extractedModelNumber}"`);
            console.log(`Parsed values: [${modelValues.join(', ')}]`);
          } else {
            // Regular exact match
            const normalizedExtractedModel = normalizeForComparison(extractedModelNumber);
            asinMatch = normalizedSearchASIN === normalizedExtractedModel;
            console.log(`ASIN vs Model Number ${i + 1}: "${extractedModelNumber}"`);
          }

          console.log(`ASIN vs Model Number ${i + 1} Match: ${asinMatch ? "✅ YES" : "❌ NO"} (${matchType})`);

          details.push({
            type: `ASIN_vs_MODEL_${i + 1}`,
            searchValue: searchASIN,
            extractedValue: extractedModelNumber,
            match: asinMatch,
            matchType: matchType,
            confidence: modelData.confidence || "N/A",
            attributeName: modelData.attribute
          });

          if (asinMatch) {
            matches.push({
              fieldName: `ASIN_vs_MODEL_${i + 1}`,
              fieldValue: extractedModelNumber,
              confidence: modelData.confidence || "N/A",
              matchType: matchType,
              matchedKeyword: searchASIN,
              attributeName: modelData.attribute
            });
            asinMatchFound = true;
            hasMatch = true;
          }
        }
      }

      if (!asinMatchFound) {
        console.log("No ASIN matches found across all MODEL_NUMBER attributes");
      }
    }

    // Compare Part Number with actual PART_NUMBER attribute (original logic)
    if (searchPartNumber) {
      const normalizedSearchPart = normalizeForComparison(searchPartNumber);
      const extractedPartNumber = extractedAttributes.PART_NUMBER?.value;

      if (extractedPartNumber) {
        const normalizedExtractedPart = normalizeForComparison(extractedPartNumber);
        const partMatch = normalizedSearchPart === normalizedExtractedPart;

        console.log(`Extracted Part Number: "${extractedPartNumber}"`);
        console.log(`Part Number Match: ${partMatch ? "✅ YES" : "❌ NO"}`);

        details.push({
          type: "PART_NUMBER",
          searchValue: searchPartNumber,
          extractedValue: extractedPartNumber,
          match: partMatch,
          confidence: extractedAttributes.PART_NUMBER?.confidence || "N/A",
        });

        if (partMatch) {
          matches.push({
            fieldName: "PART_NUMBER",
            fieldValue: extractedPartNumber,
            confidence: extractedAttributes.PART_NUMBER?.confidence || "N/A",
            matchType: "exact",
            matchedKeyword: searchPartNumber,
          });
          hasMatch = true;
        }
      } else {
        console.log("Extracted Part Number: Not found");
        details.push({
          type: "PART_NUMBER",
          searchValue: searchPartNumber,
          extractedValue: null,
          match: false,
          confidence: "N/A",
        });
      }
    }

    // Compare Matching Part Number with actual PART_NUMBER attribute (original logic)
    if (searchMatchingPartNumber) {
      const normalizedSearchMatchingPart = normalizeForComparison(searchMatchingPartNumber);
      const extractedPartNumber = extractedAttributes.PART_NUMBER?.value;

      if (extractedPartNumber) {
        const normalizedExtractedPart = normalizeForComparison(extractedPartNumber);
        const matchingPartMatch = normalizedSearchMatchingPart === normalizedExtractedPart;

        console.log(`Extracted Part Number (vs Matching): "${extractedPartNumber}"`);
        console.log(`Matching Part Number Match: ${matchingPartMatch ? "✅ YES" : "❌ NO"}`);

        details.push({
          type: "MATCHING_PART_NUMBER",
          searchValue: searchMatchingPartNumber,
          extractedValue: extractedPartNumber,
          match: matchingPartMatch,
          confidence: extractedAttributes.PART_NUMBER?.confidence || "N/A",
        });

        if (matchingPartMatch) {
          matches.push({
            fieldName: "MATCHING_PART_NUMBER",
            fieldValue: extractedPartNumber,
            confidence: extractedAttributes.PART_NUMBER?.confidence || "N/A",
            matchType: "exact",
            matchedKeyword: searchMatchingPartNumber,
          });
          hasMatch = true;
        }
      } else {
        console.log("Extracted Part Number (for Matching Part Number): Not found");
        details.push({
          type: "MATCHING_PART_NUMBER",
          searchValue: searchMatchingPartNumber,
          extractedValue: null,
          match: false,
          confidence: "N/A",
        });
      }
    }

    // ENHANCED: Compare ALL search parameters with PRODUCT_IDENTIFIER (only for CPC documents)
if (isCPCDocument) {
  const extractedProductIdentifier = extractedAttributes.PRODUCT_IDENTIFIER?.value;
  
  if (extractedProductIdentifier) {
    // Split by multiple delimiters (comma, period, space, underscore) and normalize each one
    const productIdentifiers = extractedProductIdentifier
      .split(/[,.\s_]+/)
      .map(id => normalizeForComparison(id.trim()))
      .filter(id => id.length > 0);

    console.log(`Extracted Product Identifier: "${extractedProductIdentifier}"`);
    console.log(`Product Identifiers (parsed): [${productIdentifiers.join(', ')}]`);
    console.log(`Total parsed identifiers: ${productIdentifiers.length}`);

    // Compare Model Number with PRODUCT_IDENTIFIER
    if (searchModelNumber) {
      const normalizedSearchModel = normalizeForComparison(searchModelNumber);
      const modelMatch = productIdentifiers.includes(normalizedSearchModel);

      console.log(`Model Number vs Product Identifier Match: ${modelMatch ? "✅ YES" : "❌ NO"}`);
      if (modelMatch) {
        console.log(`  → Found "${searchModelNumber}" in PRODUCT_IDENTIFIER`);
      }

      details.push({
        type: "MODEL_vs_PRODUCT_IDENTIFIER",
        searchValue: searchModelNumber,
        extractedValue: extractedProductIdentifier,
        match: modelMatch,
        matchType: "inclusion",
        confidence: extractedAttributes.PRODUCT_IDENTIFIER?.confidence || "N/A",
      });

      if (modelMatch) {
        matches.push({
          fieldName: "MODEL_vs_PRODUCT_IDENTIFIER",
          fieldValue: extractedProductIdentifier,
          confidence: extractedAttributes.PRODUCT_IDENTIFIER?.confidence || "N/A",
          matchType: "inclusion",
          matchedKeyword: searchModelNumber,
        });
        hasMatch = true;
      }
    }

    // Compare Part Number with PRODUCT_IDENTIFIER
    if (searchPartNumber) {
      const normalizedSearchPart = normalizeForComparison(searchPartNumber);
      const partMatch = productIdentifiers.includes(normalizedSearchPart);

      console.log(`Part Number vs Product Identifier Match: ${partMatch ? "✅ YES" : "❌ NO"}`);
      if (partMatch) {
        console.log(`  → Found "${searchPartNumber}" in PRODUCT_IDENTIFIER`);
      }

      details.push({
        type: "PART_vs_PRODUCT_IDENTIFIER",
        searchValue: searchPartNumber,
        extractedValue: extractedProductIdentifier,
        match: partMatch,
        matchType: "inclusion",
        confidence: extractedAttributes.PRODUCT_IDENTIFIER?.confidence || "N/A",
      });

      if (partMatch) {
        matches.push({
          fieldName: "PART_vs_PRODUCT_IDENTIFIER",
          fieldValue: extractedProductIdentifier,
          confidence: extractedAttributes.PRODUCT_IDENTIFIER?.confidence || "N/A",
          matchType: "inclusion",
          matchedKeyword: searchPartNumber,
        });
        hasMatch = true;
      }
    }

    // Compare Matching Part Number with PRODUCT_IDENTIFIER
    if (searchMatchingPartNumber) {
      const normalizedSearchMatchingPart = normalizeForComparison(searchMatchingPartNumber);
      const matchingPartMatch = productIdentifiers.includes(normalizedSearchMatchingPart);

      console.log(`Matching Part Number vs Product Identifier Match: ${matchingPartMatch ? "✅ YES" : "❌ NO"}`);
      if (matchingPartMatch) {
        console.log(`  → Found "${searchMatchingPartNumber}" in PRODUCT_IDENTIFIER`);
      }

      details.push({
        type: "MATCHING_PART_vs_PRODUCT_IDENTIFIER",
        searchValue: searchMatchingPartNumber,
        extractedValue: extractedProductIdentifier,
        match: matchingPartMatch,
        matchType: "inclusion",
        confidence: extractedAttributes.PRODUCT_IDENTIFIER?.confidence || "N/A",
      });

      if (matchingPartMatch) {
        matches.push({
          fieldName: "MATCHING_PART_vs_PRODUCT_IDENTIFIER",
          fieldValue: extractedProductIdentifier,
          confidence: extractedAttributes.PRODUCT_IDENTIFIER?.confidence || "N/A",
          matchType: "inclusion",
          matchedKeyword: searchMatchingPartNumber,
        });
        hasMatch = true;
      }
    }

    // Compare ASIN with PRODUCT_IDENTIFIER
    if (searchASIN) {
      const normalizedSearchASIN = normalizeForComparison(searchASIN);
      const asinMatch = productIdentifiers.includes(normalizedSearchASIN);

      console.log(`ASIN vs Product Identifier Match: ${asinMatch ? "✅ YES" : "❌ NO"}`);
      if (asinMatch) {
        console.log(`  → Found "${searchASIN}" in PRODUCT_IDENTIFIER`);
      }

      details.push({
        type: "ASIN_vs_PRODUCT_IDENTIFIER",
        searchValue: searchASIN,
        extractedValue: extractedProductIdentifier,
        match: asinMatch,
        matchType: "inclusion",
        confidence: extractedAttributes.PRODUCT_IDENTIFIER?.confidence || "N/A",
      });

      if (asinMatch) {
        matches.push({
          fieldName: "ASIN_vs_PRODUCT_IDENTIFIER",
          fieldValue: extractedProductIdentifier,
          confidence: extractedAttributes.PRODUCT_IDENTIFIER?.confidence || "N/A",
          matchType: "inclusion",
          matchedKeyword: searchASIN,
        });
        hasMatch = true;
      }
    }
  } else {
    console.log("Extracted Product Identifier: Not found");
    
    // Add details for each search parameter that was provided
    if (searchModelNumber) {
      details.push({
        type: "MODEL_vs_PRODUCT_IDENTIFIER",
        searchValue: searchModelNumber,
        extractedValue: null,
        match: false,
        confidence: "N/A",
      });
    }
    
    if (searchPartNumber) {
      details.push({
        type: "PART_vs_PRODUCT_IDENTIFIER",
        searchValue: searchPartNumber,
        extractedValue: null,
        match: false,
        confidence: "N/A",
      });
    }
    
    if (searchMatchingPartNumber) {
      details.push({
        type: "MATCHING_PART_vs_PRODUCT_IDENTIFIER",
        searchValue: searchMatchingPartNumber,
        extractedValue: null,
        match: false,
        confidence: "N/A",
      });
    }
    
    if (searchASIN) {
      details.push({
        type: "ASIN_vs_PRODUCT_IDENTIFIER",
        searchValue: searchASIN,
        extractedValue: null,
        match: false,
        confidence: "N/A",
      });
    }
  }
} else {
  // Not a CPC document - log what comparisons were skipped
  const skippedComparisons = [];
  if (searchModelNumber) skippedComparisons.push("Model Number");
  if (searchPartNumber) skippedComparisons.push("Part Number");
  if (searchMatchingPartNumber) skippedComparisons.push("Matching Part Number");
  if (searchASIN) skippedComparisons.push("ASIN");
  
  if (skippedComparisons.length > 0) {
    console.log(`Product Identifier comparison skipped for [${skippedComparisons.join(', ')}] - not a CPC document`);
  }
}

    console.log(`\n🎯 OVERALL MATCH RESULT: ${hasMatch ? "✅ MATCH FOUND" : "❌ NO MATCH"}`);

    return {
      hasMatch,
      matches,
      details,
    };
  }

  // NEW: Method to get all MODEL_NUMBER attributes from the field data
  getAllModelNumbers() {
    const modelNumbers = [];
    
    for (const [fieldName, fieldData] of this.fieldData) {
      const lowerFieldName = fieldName.toLowerCase();
      
      // Check if this field is a MODEL_NUMBER variant
      if (lowerFieldName.includes('model_number') || 
          lowerFieldName.includes('asin_model_number') ||
          lowerFieldName === 'model number' ||
          lowerFieldName === 'asin model number') {
        
        modelNumbers.push({
          attribute: fieldData.attribute,
          value: fieldData.value,
          confidence: fieldData.confidence,
          originalFieldName: fieldName
        });
      }
    }
    
    return modelNumbers;
  }

  scanForAttributeTable() {
    try {
      let foundAny = false;
      const tables = document.querySelectorAll("table");

      for (let tableIndex = 0; tableIndex < tables.length; tableIndex++) {
        const table = tables[tableIndex];
        const headerRow = table.querySelector("tr");

        if (headerRow) {
          const headers = Array.from(headerRow.querySelectorAll("th, td")).map(
            (cell) => cell.textContent.trim()
          );

          // Check if this matches our expected structure
          if (
            (headers.length >= 4 &&
              headers.includes("Attribute") &&
              headers.includes("Answer")) ||
            (headers.includes("Question") && headers.includes("Confidence"))
          ) {
            const rows = table.querySelectorAll("tbody tr");

            rows.forEach((row, rowIndex) => {
              const cells = row.querySelectorAll("td");

              if (cells.length >= 3) {
                const cell1 = cells[1] ? cells[1].textContent.trim() : "";
                const cell2 = cells[2] ? cells[2].textContent.trim() : "";
                const cell3 = cells[3] ? cells[3].textContent.trim() : "";

                if (cell1 && cell1 !== "Question" && cell1 !== "") {
                  const attribute = cell1;
                  const answer = cell2;
                  const confidence = cell3;

                  // ENHANCED: Store with unique keys to handle multiple MODEL_NUMBER attributes
                  let key = attribute;
                  let counter = 1;
                  
                  // If this attribute already exists, create a unique key
                  while (this.fieldData.has(key)) {
                    counter++;
                    key = `${attribute}_${counter}`;
                  }

                  this.fieldData.set(key, {
                    value: answer,
                    confidence: confidence,
                    attribute: attribute,
                    originalAttribute: attribute,
                    uniqueKey: key
                  });

                  foundAny = true;
                }
              }
            });
          }
        }
      }

      return foundAny;
    } catch (error) {
      console.log("DocuCheck: Error scanning attribute table:", error);
      return false;
    }
  }

  extractTargetAttributes() {
    const extracted = {};

    for (const targetAttr of this.targetAttributes) {
      // First try exact match
      if (this.fieldData.has(targetAttr)) {
        const fieldData = this.fieldData.get(targetAttr);
        extracted[targetAttr] = {
          attribute: fieldData.attribute,
          value: fieldData.value,
          confidence: fieldData.confidence,
          matchedField: targetAttr,
        };
      } else {
        // Try partial match
        const lowerTarget = targetAttr.toLowerCase();

        for (const [fieldName, fieldData] of this.fieldData) {
          const lowerFieldName = fieldData.attribute.toLowerCase();

          if (
            lowerFieldName.includes(lowerTarget) ||
            lowerTarget.includes(lowerFieldName)
          ) {
            // If we haven't found this target attribute yet, use this match
            if (!extracted[targetAttr]) {
              extracted[targetAttr] = {
                attribute: fieldData.attribute,
                value: fieldData.value,
                confidence: fieldData.confidence,
                matchedField: fieldName,
              };
            }
          }
        }
      }
    }

    return extracted;
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Document Type UI Manager - Creates UI elements for each document type
class DocumentTypeUIManager {
  constructor() {
    this.documentTypes = new Map();
    this.uiContainer = null;
  }

  createDocumentTypeUI() {
    // Remove existing UI if present
    const existingUI = document.getElementById("flash-doctype-container");
    if (existingUI) existingUI.remove();

    // Create container for document type cards
    this.uiContainer = document.createElement("div");
    this.uiContainer.id = "flash-doctype-container";
    this.uiContainer.innerHTML = `
      <div class="flash-doctype-header">
        <h3>Document Analysis Results</h3>
        <button class="flash-clear-btn" id="flash-clear-results">Clear</button>
      </div>
      <div class="flash-doctype-grid" id="flash-doctype-grid">
        <!-- Document type cards will be added here dynamically -->
      </div>
    `;

    // Add styles for document type UI
    const style = document.createElement("style");
    style.textContent = `
      #flash-doctype-container {
        position: fixed !important;
        top: 20px !important;
        right: 20px !important;
        z-index: 100001 !important;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        max-width: 400px !important;
        max-height: 80vh !important;
        overflow-y: auto !important;
        background: rgba(255, 255, 255, 0.95) !important;
        border-radius: 12px !important;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15) !important;
        backdrop-filter: blur(10px) !important;
        border: 1px solid rgba(255, 255, 255, 0.2) !important;
      }

      .flash-doctype-header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
        color: white !important;
        padding: 16px !important;
        border-radius: 12px 12px 0 0 !important;
        display: flex !important;
        justify-content: space-between !important;
        align-items: center !important;
      }

      .flash-doctype-header h3 {
        margin: 0 !important;
        font-size: 16px !important;
        font-weight: 600 !important;
      }

      .flash-clear-btn {
        background: rgba(255, 255, 255, 0.2) !important;
        color: white !important;
        border: 1px solid rgba(255, 255, 255, 0.3) !important;
        border-radius: 6px !important;
        padding: 6px 12px !important;
        font-size: 12px !important;
        cursor: pointer !important;
        transition: all 0.2s ease !important;
      }

      .flash-clear-btn:hover {
        background: rgba(255, 255, 255, 0.3) !important;
      }

      .flash-doctype-grid {
        padding: 16px !important;
        display: flex !important;
        flex-direction: column !important;
        gap: 12px !important;
      }

      .flash-doctype-card {
        background: white !important;
        border: 2px solid #e5e7eb !important;
        border-radius: 8px !important;
        padding: 12px !important;
        transition: all 0.3s ease !important;
      }

      .flash-doctype-card.match {
        border-color: #10b981 !important;
        background: linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%) !important;
      }

      .flash-doctype-card.no-match {
        border-color: #ef4444 !important;
        background: linear-gradient(135deg, #fef2f2 0%, #fefefe 100%) !important;
      }

      .flash-doctype-title {
        font-weight: 600 !important;
        font-size: 14px !important;
        color: #374151 !important;
        margin-bottom: 8px !important;
        display: flex !important;
        justify-content: space-between !important;
        align-items: center !important;
      }

      .flash-status-badge {
        padding: 4px 8px !important;
        border-radius: 4px !important;
        font-size: 11px !important;
        font-weight: 500 !important;
        text-transform: uppercase !important;
      }

      .flash-status-badge.match {
        background: #10b981 !important;
        color: white !important;
      }

      .flash-status-badge.no-match {
        background: #ef4444 !important;
        color: white !important;
      }

      .flash-doctype-details {
        font-size: 12px !important;
        color: #6b7280 !important;
        line-height: 1.4 !important;
      }

      .flash-detail-row {
        display: flex !important;
        justify-content: space-between !important;
        margin-bottom: 4px !important;
      }

      .flash-detail-label {
        font-weight: 500 !important;
      }

      .flash-detail-value {
        color: #374151 !important;
        max-width: 200px !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        white-space: nowrap !important;
      }
    `;

    document.head.appendChild(style);
    document.body.appendChild(this.uiContainer);

    // Add clear button event listener
    const clearBtn = document.getElementById("flash-clear-results");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        this.clearResults();
      });
    }

    return this.uiContainer;
  }

  addDocumentTypeCard(docType, trNumber, status, additionalInfo = {}) {
    if (!this.uiContainer) {
      this.createDocumentTypeUI();
    }

    const grid = document.getElementById("flash-doctype-grid");
    if (!grid) return;

    // Generate unique ID for this card
    const cardId = `doctype-${docType}-${Date.now()}`;

    const card = document.createElement("div");
    card.className = `flash-doctype-card ${
      status === "MATCH" ? "match" : "no-match"
    }`;
    card.id = cardId;

    card.innerHTML = `
      <div class="flash-doctype-title">
        <span>${docType || "Unknown Document"}</span>
        <span class="flash-status-badge ${
          status === "MATCH" ? "match" : "no-match"
        }">${status}</span>
      </div>
      <div class="flash-doctype-details">
        <div class="flash-detail-row">
          <span class="flash-detail-label">TR Number:</span>
          <span class="flash-detail-value">${trNumber || "N/A"}</span>
        </div>
        ${
          additionalInfo.modelNumber
            ? `
        <div class="flash-detail-row">
          <span class="flash-detail-label">Model:</span>
          <span class="flash-detail-value">${additionalInfo.modelNumber}</span>
        </div>
        `
            : ""
        }
        ${
          additionalInfo.partNumber
            ? `
        <div class="flash-detail-row">
          <span class="flash-detail-label">Part number:</span>
          <span class="flash-detail-value">${additionalInfo.partNumber}</span>
        </div>
        `
            : ""
        }
        ${
          additionalInfo.matchingPartNumber
            ? `
        <div class="flash-detail-row">
          <span class="flash-detail-label">Matching Part:</span>
          <span class="flash-detail-value">${additionalInfo.matchingPartNumber}</span>
        </div>
        `
            : ""
        }
        ${
          additionalInfo.asin
            ? `
        <div class="flash-detail-row">
          <span class="flash-detail-label">ASIN:</span>
          <span class="flash-detail-value">${additionalInfo.asin}</span>
        </div>
        `
            : ""
        }
      </div>
    `;

    grid.appendChild(card);

    // Store document type info
    this.documentTypes.set(cardId, {
      docType,
      trNumber,
      status,
      additionalInfo,
    });

    return cardId;
  }

  clearResults() {
    const grid = document.getElementById("flash-doctype-grid");
    if (grid) {
      grid.innerHTML = "";
    }
    this.documentTypes.clear();
  }

  removeDocumentTypeUI() {
    if (this.uiContainer) {
      this.uiContainer.remove();
      this.uiContainer = null;
    }
    this.documentTypes.clear();
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

// Enhanced Document Processor class - now uses exact comparison logic with CPC support
class DocumentProcessor {
  constructor(catalog, ui, docTypeUIManager) {
    this.catalog = catalog;
    this.ui = ui;
    this.docTypeUIManager = docTypeUIManager;
    this.isProcessing = false;
    this.currentQueue = [];
    this.currentIndex = 0;
    this.processedCount = 0;
    this.foundCount = 0;
    this.searchModelNumber = null;
    this.searchPartNumber = null;
    this.searchMatchingPartNumber = null; // ADDED
    this.searchASIN = null; // ADDED
  }

  async startProcessing(
    filterType = null,
    searchModelNumber = null,
    searchPartNumber = null,
    searchMatchingPartNumber = null, // ADDED
    searchASIN = null // ADDED
  ) {
    if (this.isProcessing) {
      console.log("DocuCheck: Processing already in progress");
      return;
    }

    console.log("DocuCheck: Starting processing session");
    console.log(`Search Model Number: "${searchModelNumber}"`);
    console.log(`Search Part Number: "${searchPartNumber}"`);
    console.log(`Search Matching Part Number: "${searchMatchingPartNumber}"`); // ADDED
    console.log(`Search ASIN: "${searchASIN}"`); // ADDED

    this.catalog.resetCurrentSession();

    this.isProcessing = true;
    this.processedCount = 0;
    this.foundCount = 0;
    this.currentIndex = 0;
    this.searchModelNumber = searchModelNumber;
    this.searchPartNumber = searchPartNumber;
    this.searchMatchingPartNumber = searchMatchingPartNumber; // ADDED
    this.searchASIN = searchASIN; // ADDED

    this.ui.documentsButton.classList.add("processing");
    this.ui.documentsButton.textContent = "Processing...";

    // Clear previous results
    this.docTypeUIManager.clearResults();

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

        // Create UI card for this document
        this.createDocumentCard(document, result);

        if (result.found) {
          this.foundCount++;
          console.log(
            `DocuCheck: ✅ Match found in document ${this.currentIndex + 1}: ${
              document.artifactName
            }`
          );
        } else {
          console.log(
            `DocuCheck: ❌ No match in document ${this.currentIndex + 1}: ${
              document.artifactName
            }`
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
      `DocuCheck: Processing complete. Processed ${this.processedCount}/${this.currentQueue.length} documents, found matches in ${this.foundCount} documents`
    );
    this.resetUI();
  }

  createDocumentCard(document, result) {
    const extracted = result.extractedAttributes || {};

    // Get DOC_TYPE
    const docType = extracted.DOC_TYPE?.value || "Unknown Document";

    // Get TR_NUMBER
    const trNumber = extracted.TR_NUMBER?.value || "N/A";

    // Determine status based on actual comparison result
    const status = result.found ? "MATCH" : "NO MATCH";

    // Prepare additional info
    const additionalInfo = {
      artifactName: document.artifactName,
      confidence: extracted.DOC_TYPE?.confidence || "N/A",
    };

    // Add extracted model number if available
    const extractedModelNumber =
      extracted.ASIN_MODEL_NUMBER?.value || extracted.MODEL_NUMBER?.value;
    if (extractedModelNumber) {
      additionalInfo.modelNumber = extractedModelNumber;
    }

    // Add extracted part number if available
    if (extracted.PART_NUMBER?.value) {
      additionalInfo.partNumber = extracted.PART_NUMBER.value;
    }

    // ADDED: Add matching part number if used in search
    if (this.searchMatchingPartNumber) {
      additionalInfo.matchingPartNumber = this.searchMatchingPartNumber;
    }

    // ADDED: Add ASIN if used in search
    if (this.searchASIN) {
      additionalInfo.asin = this.searchASIN;
    }

    // Add match details if available
    if (result.comparisonResult && result.comparisonResult.details) {
      const matchedItems = result.comparisonResult.details
        .filter((detail) => detail.match)
        .map((detail) => detail.type)
        .join(", ");

      if (matchedItems) {
        additionalInfo.matchDetails = `Matched: ${matchedItems}`;
      } else {
        additionalInfo.matchDetails = "No exact matches found";
      }
    }

    // Create the UI card
    this.docTypeUIManager.addDocumentTypeCard(
      docType,
      trNumber,
      status,
      additionalInfo
    );
  }

  async processDocument(document) {
    try {
      document.checkbox.scrollIntoView({ behavior: "smooth", block: "center" });
      await this.sleep(config.domSettleDelay);

      const rowElement = document.checkbox.closest("tr");
      if (rowElement) {
        rowElement.classList.add("flash-highlight");
      }

      console.log(
        `DocuCheck: Processing row ${document.rowIndex} - ${document.artifactName}`
      );

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

      if (this.ui?.resultMessage) {
        this.ui.resultMessage.textContent = `🔍 Comparing attributes...`;
      }

      // ENHANCED: Search the dynamic field table with comparison logic including new parameters
      const searchResult =
        await this.catalog.dynamicFieldScanner.scanDynamicFieldTable(
          this.searchModelNumber,
          this.searchPartNumber,
          this.searchMatchingPartNumber, // ADDED
          this.searchASIN // ADDED
        );

      if (rowElement) {
        setTimeout(() => {
          rowElement.classList.remove("flash-highlight");
        }, 300);
      }

      // Update UI based on comparison results
      if (searchResult.found) {
        const matchedFields = searchResult.matches
          .map((m) => m.fieldName)
          .join(", ");
        const message = `✅ Match found: ${matchedFields}`;
        console.log(message);
        if (this.ui?.resultMessage) this.ui.resultMessage.textContent = message;
      } else {
        const message = `❌ No matching attributes found`;
        console.log(message);
        if (this.ui?.resultMessage) this.ui.resultMessage.textContent = message;
      }

      // Enhanced extraction logging
      const extracted = searchResult.extractedAttributes || {};
      console.log(`\n📋 EXTRACTED ATTRIBUTES for ${document.artifactName}:`);

      let foundAnyAttributes = false;

      // Check for DOC_TYPE
      if (extracted.DOC_TYPE?.value) {
        console.log(
          `DOC_TYPE: ${extracted.DOC_TYPE.value} (${
            extracted.DOC_TYPE.confidence || "N/A"
          })`
        );
        foundAnyAttributes = true;
      }

      // Check for TR_NUMBER
      if (extracted.TR_NUMBER?.value) {
        console.log(
          `TR_NUMBER: ${extracted.TR_NUMBER.value} (${
            extracted.TR_NUMBER.confidence || "N/A"
          })`
        );
        foundAnyAttributes = true;
      }

      // Check for MODEL_NUMBER (try ASIN_MODEL_NUMBER first, then MODEL_NUMBER)
      const modelNumber =
        extracted.ASIN_MODEL_NUMBER?.value || extracted.MODEL_NUMBER?.value;
      if (modelNumber) {
        console.log(
          `MODEL_NUMBER: ${modelNumber} (${
            extracted.ASIN_MODEL_NUMBER?.confidence ||
            extracted.MODEL_NUMBER?.confidence ||
            "N/A"
          })`
        );
        foundAnyAttributes = true;
      }

      // Check for PART_NUMBER
      if (extracted.PART_NUMBER?.value) {
        console.log(
          `PART_NUMBER: ${extracted.PART_NUMBER.value} (${
            extracted.PART_NUMBER.confidence || "N/A"
          })`
        );
        foundAnyAttributes = true;
      }

      // ADDED: Check for PRODUCT_IDENTIFIER
      if (extracted.PRODUCT_IDENTIFIER?.value) {
        console.log(
          `PRODUCT_IDENTIFIER: ${extracted.PRODUCT_IDENTIFIER.value} (${
            extracted.PRODUCT_IDENTIFIER.confidence || "N/A"
          })`
        );
        foundAnyAttributes = true;
      }

      if (!foundAnyAttributes) {
        console.log("No target attributes found in this document");
      }

      return {
        processed: true,
        found: searchResult.found,
        matches: searchResult.matches || [],
        extractedAttributes: extracted,
        comparisonResult: searchResult.comparisonResult || null,
      };
    } catch (err) {
      console.error(`DocuCheck: Error processing document:`, err);
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
    this.ui.documentsButton.textContent = "📄 Search Fields";

    // Show final summary
    if (this.processedCount > 0) {
      const finalMessage = `✅ Complete: ${this.foundCount}/${this.processedCount} documents had matching attributes`;
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
let docTypeUIManager = null;

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
    docTypeUIManager = new DocumentTypeUIManager();
    documentProcessor = new DocumentProcessor(
      documentCatalog,
      ui,
      docTypeUIManager
    );

    // Button click handler
    if (ui.documentsButton) {
      ui.documentsButton.addEventListener("click", async () => {
        // Step 1: Click the required tab
        clickItems("RequiredTab");

        // Step 2: Wait for tab content to load
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Step 3: Fetch the model number, part number, matching part number, and ASIN
        const modelNumber = getValueByLabel("Model Number");
        const partNumber = getValueByLabel("Part Number");
        const matchingPartNumber = getValueByLabel("Matching Part Number"); // ADDED
        const asin = getASIN(); // ADDED

        console.log("DocuCheck: Model Number:", modelNumber);
        console.log("DocuCheck: Part Number:", partNumber);
        console.log("DocuCheck: Matching Part Number:", matchingPartNumber); // ADDED
        console.log("DocuCheck: ASIN:", asin); // ADDED

        if (!modelNumber && !partNumber && !matchingPartNumber && !asin) {
          if (ui.resultMessage) {
            ui.resultMessage.textContent = "⚠️ No search parameters found";
          }
          return;
        }

        console.log(
          "DocuCheck: Will compare with extracted attributes including PRODUCT_IDENTIFIER for CPC documents"
        );

        // Step 4: Start document processing with exact comparison logic including new parameters
        if (!documentProcessor.isProcessing) {
          // Create the document type UI container
          docTypeUIManager.createDocumentTypeUI();

          // Start processing with all the extracted parameters
          documentProcessor.startProcessing(
            "documents",
            modelNumber,
            partNumber,
            matchingPartNumber, // ADDED
            asin // ADDED
          );
        }
      });
    }

    console.log(
      "DocuCheck: Enhanced extension initialized successfully with CPC pattern support, ASIN matching, and Matching Part Number"
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
