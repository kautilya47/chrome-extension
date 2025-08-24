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

// Simplified Dynamic Field Table Scanner - Only extracts DOC_TYPE and MODEL_NUMBER
class DynamicFieldTableScanner {
  constructor() {
    this.fieldData = new Map();
    // Only the two attributes you want
    this.targetAttributes = [
      'DOC_TYPE',
      'MODEL_NUMBER',
      'ASIN_MODEL_NUMBER' // Keep this as fallback for MODEL_NUMBER
    ];
  }

  async scanDynamicFieldTable(keyword, maxWaitTime = config.dynamicTableWaitTime) {
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
      console.log(`DocuCheck: Found ${this.fieldData.size} attributes in table`);
      
      const matches = this.findMatchingFields(keyword);
      const extractedAttributes = this.extractTargetAttributes();
      
      return {
        found: matches.length > 0,
        matches: matches,
        fieldData: this.fieldData,
        extractedAttributes: extractedAttributes
      };
    } else {
      console.log("DocuCheck: No attribute table found");
      return {
        found: false,
        matches: [],
        fieldData: this.fieldData,
        extractedAttributes: {}
      };
    }
  }

  scanForAttributeTable() {
    try {
      let foundAny = false;
      const tables = document.querySelectorAll('table');
      
      for (let tableIndex = 0; tableIndex < tables.length; tableIndex++) {
        const table = tables[tableIndex];
        const headerRow = table.querySelector('tr');
        
        if (headerRow) {
          const headers = Array.from(headerRow.querySelectorAll('th, td')).map(cell => cell.textContent.trim());
          
          // Check if this matches our expected structure
          if (headers.length >= 4 && 
              (headers.includes('Attribute') && headers.includes('Answer')) ||
              (headers.includes('Question') && headers.includes('Confidence'))) {
            
            const rows = table.querySelectorAll('tbody tr');
            
            rows.forEach((row, rowIndex) => {
              const cells = row.querySelectorAll('td');
              
              if (cells.length >= 3) {
                const cell1 = cells[1] ? cells[1].textContent.trim() : '';
                const cell2 = cells[2] ? cells[2].textContent.trim() : '';
                const cell3 = cells[3] ? cells[3].textContent.trim() : '';
                
                if (cell1 && cell1 !== 'Question' && cell1 !== '') {
                  const attribute = cell1;
                  const answer = cell2;
                  const confidence = cell3;
                  
                  this.fieldData.set(attribute, {
                    value: answer,
                    confidence: confidence,
                    attribute: attribute
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
          matchedField: targetAttr
        };
      } else {
        // Try partial match
        const lowerTarget = targetAttr.toLowerCase();
        
        for (const [fieldName, fieldData] of this.fieldData) {
          const lowerFieldName = fieldName.toLowerCase();
          
          if (lowerFieldName.includes(lowerTarget) || lowerTarget.includes(lowerFieldName)) {
            extracted[targetAttr] = {
              attribute: fieldData.attribute,
              value: fieldData.value,
              confidence: fieldData.confidence,
              matchedField: fieldName
            };
            break;
          }
        }
      }
    }
    
    return extracted;
  }

  findMatchingFields(keyword) {
    const matches = [];
    if (!keyword) return matches;
    
    const keywordLower = keyword.toLowerCase();

    for (const [fieldName, fieldData] of this.fieldData) {
      if (fieldData.value.toLowerCase().includes(keywordLower)) {
        matches.push({
          fieldName: fieldData.attribute,
          fieldValue: fieldData.value,
          confidence: fieldData.confidence,
          matchType: 'value'
        });
      }
      if (fieldName.toLowerCase().includes(keywordLower)) {
        matches.push({
          fieldName: fieldData.attribute,
          fieldValue: fieldData.value,
          confidence: fieldData.confidence,
          matchType: 'name'
        });
      }
    }

    return matches;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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

      console.log(`DocuCheck: Processing row ${document.rowIndex} - ${document.artifactName}`);
      
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
        this.ui.resultMessage.textContent = `🔍 Extracting attributes...`;
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
        const message = `✅ Found "${this.modelNumber}" in document`;
        console.log(message);
        if (this.ui?.resultMessage) this.ui.resultMessage.textContent = message;
      } else {
        const message = `❌ "${this.modelNumber}" not found`;
        console.log(message);
        if (this.ui?.resultMessage) this.ui.resultMessage.textContent = message;
      }

      // Simplified extraction logging - only show DOC_TYPE and MODEL_NUMBER
      const extracted = searchResult.extractedAttributes || {};
      console.log(`\n📋 EXTRACTED ATTRIBUTES for ${document.artifactName}:`);
      
      let foundAnyAttributes = false;
      
      // Check for MODEL_NUMBER (try ASIN_MODEL_NUMBER first, then MODEL_NUMBER)
      const modelNumber = extracted.ASIN_MODEL_NUMBER?.value || extracted.MODEL_NUMBER?.value;
      if (modelNumber) {
        console.log(`MODEL_NUMBER: ${modelNumber} (${extracted.ASIN_MODEL_NUMBER?.confidence || extracted.MODEL_NUMBER?.confidence || 'N/A'})`);
        foundAnyAttributes = true;
      }
      
      // Check for DOC_TYPE
      if (extracted.DOC_TYPE?.value) {
        console.log(`DOC_TYPE: ${extracted.DOC_TYPE.value} (${extracted.DOC_TYPE.confidence || 'N/A'})`);
        foundAnyAttributes = true;
      }
      
      if (!foundAnyAttributes) {
        console.log("No DOC_TYPE or MODEL_NUMBER found in this document");
      }

      return { 
        processed: true, 
        found: searchResult.found, 
        matches: searchResult.matches || [],
        extractedAttributes: extracted
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