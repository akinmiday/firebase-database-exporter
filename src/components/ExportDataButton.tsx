import { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import * as XLSX from "xlsx";
import {
  FaFileExport,
  FaCheckCircle,
  FaSpinner,
  FaCheck,
} from "react-icons/fa";

// Define the type for styles
type Styles = {
  container: React.CSSProperties;
  title: React.CSSProperties;
  inputGroup: React.CSSProperties;
  label: React.CSSProperties;
  input: React.CSSProperties;
  button: React.CSSProperties;
  successMessage: React.CSSProperties;
};

const ExportDataButton = () => {
  const [loading, setLoading] = useState(false);
  const [collectionName, setCollectionName] = useState(""); // State for Firestore collection name
  const [fileName, setFileName] = useState(""); // State for Excel file name
  const [collectionExists, setCollectionExists] = useState(false); // State to track if collection exists
  const [exportSuccess, setExportSuccess] = useState(false); // State to track if export was successful
  const [successMessage, setSuccessMessage] = useState(""); // State to store the success message

  // Function to check if the collection exists
  const checkCollectionExists = async () => {
    if (!collectionName) {
      alert("Please enter a collection name.");
      return;
    }

    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, collectionName));
      if (snapshot.empty) {
        alert(`No data available in the "${collectionName}" collection.`);
        setCollectionExists(false);
      } else {
        setCollectionExists(true);
      }
    } catch (error) {
      console.error("Error checking collection:", error);
      alert("An error occurred while checking the collection.");
      setCollectionExists(false);
    } finally {
      setLoading(false);
    }
  };

  // Function to export data to Excel
  const exportDataToExcel = async () => {
    if (!fileName) {
      alert("Please enter a file name.");
      return;
    }

    setLoading(true);
    setExportSuccess(false); // Reset success state
    try {
      const snapshot = await getDocs(collection(db, collectionName));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id, // Include document ID (optional)
        ...doc.data(), // Spread document data
      }));

      if (data.length === 0) {
        alert(`No data available in the "${collectionName}" collection.`);
        return;
      }

      // Convert JSON data to a worksheet
      const worksheet = XLSX.utils.json_to_sheet(data);

      // Create a workbook and append the worksheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

      // Trigger file download
      XLSX.writeFile(workbook, `${fileName}.xlsx`);

      // Set success message and state
      setSuccessMessage(`"${fileName}.xlsx" exported successfully!`);
      setExportSuccess(true);

      // Clear inputs and reset after 3 seconds
      setTimeout(() => {
        setCollectionName("");
        setFileName("");
        setCollectionExists(false);
        setExportSuccess(false);
        setSuccessMessage("");
      }, 8000); // Reset after 3 seconds
    } catch (error) {
      console.error("Error exporting data:", error);
      alert("An error occurred while exporting data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Export Data to Excel</h1>
      <div style={styles.inputGroup}>
        <label htmlFor="collectionName" style={styles.label}>
          Firestore Collection Name:
        </label>
        <input
          id="collectionName"
          type="text"
          placeholder="Enter collection name"
          value={collectionName}
          onChange={(e) => setCollectionName(e.target.value)}
          style={styles.input}
          disabled={loading || collectionExists} // Disable input after collection is confirmed
        />
        {!collectionExists && (
          <button
            onClick={checkCollectionExists}
            disabled={loading || !collectionName}
            style={{
              ...styles.button,
              backgroundColor: "#007bff",
              opacity: loading || !collectionName ? 0.7 : 1,
            }}
          >
            {loading ? (
              <FaSpinner className="spin" />
            ) : (
              <>
                <FaCheckCircle style={{ marginRight: "8px" }} />
                Check Collection
              </>
            )}
          </button>
        )}
      </div>

      {collectionExists && (
        <div style={styles.inputGroup}>
          <label htmlFor="fileName" style={styles.label}>
            Excel File Name:
          </label>
          <input
            id="fileName"
            type="text"
            placeholder="Enter file name"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            style={styles.input}
          />
          <button
            onClick={exportDataToExcel}
            disabled={loading || !fileName}
            style={{
              ...styles.button,
              backgroundColor: "#28a745",
              opacity: loading || !fileName ? 0.7 : 1,
            }}
          >
            {loading ? (
              <FaSpinner className="spin" />
            ) : (
              <>
                <FaFileExport style={{ marginRight: "8px" }} />
                Export Data to Excel
              </>
            )}
          </button>
          {exportSuccess && (
            <div style={styles.successMessage}>
              <FaCheck style={{ marginRight: "8px", color: "#28a745" }} />
              {successMessage}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Define styles with explicit typing
const styles: Styles = {
  container: {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    textAlign: "center" as const, // Explicitly type as 'TextAlign'
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#333",
  },
  inputGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "bold",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
    marginBottom: "10px",
  },
  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "5px",
    border: "none",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  successMessage: {
    marginTop: "10px",
    color: "#28a745",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
  },
};

// CSS for spinner animation
const spinStyles = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .spin {
    animation: spin 1s linear infinite;
  }
`;

// Inject spin styles into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = spinStyles;
document.head.appendChild(styleSheet);

export default ExportDataButton;
