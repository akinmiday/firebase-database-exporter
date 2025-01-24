# Firestore Collection Data Exporter

A React + TypeScript + Vite application that allows users to export data from a Firestore collection to an Excel file. The app provides a user-friendly interface to input the collection name and file name, checks if the collection exists, and exports the data in `.xlsx` format.

---

## Features

- **Firestore Integration**: Connect to your Firestore database and export data from any collection.
- **Excel Export**: Export Firestore data to an Excel file with a custom file name.
- **User-Friendly UI**: Simple and intuitive interface with input validation and success/error messages.
- **Loading States**: Visual feedback during data fetching and export processes.
- **Responsive Design**: Works seamlessly on different screen sizes.

---

## Requirements

To run this project, you need the following:

- **Node.js** (v16 or higher)
- **npm** or **yarn** (package manager)
- **Firebase Project**: A Firebase project with Firestore enabled.
- **Firebase Configuration**: Your Firebase project credentials (API key, auth domain, etc.).

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/akinmiday/firestore-data-exporter.git
cd firestore-data-exporter
```

### 2. Install Dependencies

Install the required dependencies using npm or yarn:

```bash
npm install
```

or

```bash
yarn install
```

### 3. Set Up Firebase

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new Firebase project (if you don’t have one).
3. Register a web app in your Firebase project and copy the Firebase configuration.
4. Create a `.env` file in the root of your project and add your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Replace the placeholders with your actual Firebase credentials.

### 4. Run the Application

Start the development server:

```bash
npm run dev
```

or

```bash
yarn dev
```

The app will be available at `http://localhost:5173`.

---

## Usage

1. **Enter Collection Name**:

   - Input the name of the Firestore collection you want to export.

2. **Check Collection**:

   - Click the "Check Collection" button to verify if the collection exists.

3. **Enter File Name**:

   - If the collection exists, input the desired file name for the Excel file.

4. **Export Data**:

   - Click the "Export Data to Excel" button to download the data as an Excel file.

5. **Success Message**:
   - After a successful export, a message will appear confirming the export (e.g., `"users_data.xlsx" exported successfully!`).

---

## Important Notes

Collection Must Exist: The Firestore collection you want to export must exist in your Firestore database. If the collection does not exist, the app will display an error message, and the export will not proceed.

Firestore Rules: Ensure your Firestore security rules allow read access to the collection you want to export. Otherwise, the app won't be able to fetch the data.

---

## Project Structure

```
firestore-data-exporter/
├── src/
│   ├── components/
│   │   └── ExportDataButton.tsx
│   ├── config/
│   │   └── firebaseConfig.ts
│   ├── App.tsx
│   └── main.tsx
├── public/
├── .env.sample
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

```text
MIT License

Copyright (c) 2023 akinmiday

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeatureName`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeatureName`).
5. Open a pull request.

---

## Acknowledgments

- [Vite](https://vitejs.dev/) for the fast development setup.
- [React](https://reactjs.org/) for the UI library.
- [Firebase](https://firebase.google.com/) for the backend database.
- [React Icons](https://react-icons.github.io/react-icons/) for the icons.
- [SheetJS](https://sheetjs.com/) for Excel file generation.

---

## Support

If you encounter any issues or have questions, feel free to open an issue on the [GitHub repository](https://github.com/akinmiday/firestore-data-exporter/issues).

---

Enjoy exporting your Firestore data with ease! 🚀

---
