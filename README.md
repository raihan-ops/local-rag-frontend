# Local RAG Frontend

A React-based frontend application for a local Retrieval Augmented Generation (RAG) system that allows users to upload documents, inject text, and have AI-powered conversations based on the uploaded content.

## 🚀 Features

- **Document Upload**: Upload files to be indexed and processed by the RAG system
- **Text Injection**: Directly paste and inject large text content for processing
- **AI Chat Interface**: Interactive chat with AI that can answer questions based on uploaded documents
- **Document Retrieval**: View relevant document snippets that were used to generate responses
- **Conversation Management**: Reset conversations and start fresh
- **Configurable Retrieval**: Adjust the number of top-K documents to retrieve for each query

## 🛠 Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Fetch API for backend communication

## 📋 Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- A compatible RAG backend server running on `http://localhost:5000`

## 🔧 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd local-rag-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in terminal)

## 🎯 Usage

### Document Management
1. **Upload Files**: Use the file uploader in the sidebar to upload documents that will be indexed
2. **Inject Text**: Paste large text content directly using the text injection area
3. **Reset**: Clear the conversation history and start fresh

### Chat Interface
1. **Ask Questions**: Type questions in the chat input field
2. **Configure Retrieval**: Adjust the top-K value to control how many relevant document chunks are retrieved
3. **View Sources**: See the retrieved document snippets that influenced the AI's response

### Interface Layout
- **Left Sidebar**: Document management tools (upload, text injection, reset)
- **Main Area**: Chat conversation history
- **Bottom Panel**: Message input with top-K configuration

## 🔌 API Integration

The frontend communicates with a backend server expected to run on `http://localhost:5000` with the following endpoints:

- `POST /api/upload` - Upload files for indexing
- `POST /api/upload/inject` - Inject text content
- `POST /api/chat` - Send chat messages and receive AI responses
- `POST /api/chat/reset` - Reset conversation history

## 📁 Project Structure

```
src/
├── components/
│   ├── ChatWindow.tsx      # Main chat interface
│   ├── FileUploader.tsx    # File upload component
│   ├── MessageBubble.tsx   # Individual message display
│   └── TextInjector.tsx    # Text injection component
├── services/
│   └── api.ts             # API service functions
├── App.tsx                # Main application component
└── main.tsx              # Application entry point
```

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🎨 Styling

The application uses Tailwind CSS for styling with a clean, modern interface featuring:
- Responsive design
- Gray/blue color scheme
- Clean typography
- Intuitive layout with sidebar and main content area

## 🔧 Configuration

### Backend URL
To change the backend server URL, modify the `BASE` constant in `src/services/api.ts`:

```typescript
const BASE = 'http://your-backend-url:port/api';
```

### Default Settings
- Default top-K value: 3 (configurable via UI)
- File upload via multipart form data
- JSON communication for text and chat

## 🔍 How RAG Works

This frontend is part of a Retrieval Augmented Generation system:

1. **Document Indexing**: Upload documents that get processed and indexed by the backend
2. **Query Processing**: When you ask a question, the system searches for relevant document chunks
3. **Context Augmentation**: Retrieved chunks provide context to the AI model
4. **Response Generation**: The AI generates responses based on both your question and the retrieved context
5. **Source Attribution**: See which document snippets influenced the response

## 🚨 Troubleshooting

### Common Issues

1. **Backend Connection**: Ensure the RAG backend server is running on `http://localhost:5000`
2. **File Upload Fails**: Check file format compatibility with your backend
3. **No Responses**: Verify documents are properly uploaded and indexed
4. **CORS Issues**: Ensure backend allows requests from the frontend origin

### Development Tips

- Use browser developer tools to monitor network requests
- Check console for any JavaScript errors
- Verify backend API responses match expected format

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is private and not licensed for public use.
