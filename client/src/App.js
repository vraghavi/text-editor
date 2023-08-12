import React, { useEffect, useRef, useState } from "react";
// import useWebSocket from "react-use";
import 'quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'
import {useDispatch, useSelector} from 'react-redux';
import {contentUpdated} from './contentSlice';
import useWebSocket, { ReadyState } from 'react-use-websocket';

const WS_URL = "ws://localhost:8000";

function App() {

  // const ws = useRef(null);

  // const { sendMessage, lastMessage, readyState } = useWebSocket(WS_URL);
  const [connection, setConnection] = useState(new WebSocket(WS_URL));

  connection.onopen = () =>{
    console.log("ws opened");
  }
  connection.onmessage = (event) => {
    setContents(event.data);
  }

  const [contents, setContents] = useState('');
  
  var modules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { align: [] }
      ],
      [{ "color": ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] }],
    ]
  };

  var formats = [
    "header", "height", "bold", "italic",
    "underline", "strike", "blockquote",
    "list", "color", "bullet", "indent",
    "link", "image", "align", "size",
  ];

  const handleProcedureContentChange = (content) => {
    setContents(content);
    connection.send(contents);
  };


  return (
    <div >
      <h1 style={{ textAlign: "center" }}>Text Editor</h1>
      <div style={{ display: "grid", justifyContent: "center"}}>
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          placeholder="write your content ...."
          onChange={handleProcedureContentChange}
          style={{ height: "220px" }}
        >
        </ReactQuill>
      </div>
    </div>
  );

}

export default App;