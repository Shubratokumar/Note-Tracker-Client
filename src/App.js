import "./App.css";
import Header from "./components/header/Header";
import InputForm from "./components/inputForm/InputForm";
import NoteCard from "./components/noteCard/NoteCard";
import { useEffect, useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const [isReload, setIsReload] = useState(false);

  useEffect(() => {
    fetch("https://gentle-badlands-20791.herokuapp.com/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, [isReload]);
  /*
1. here there will be a function named handleSearch
to handle search by query, and it will be passed as props to header

  */
  const handleSearch = (event) => {
    event.preventDefault();
    const queryText = event.target.searchText.value;
    if (queryText) {
      fetch(
        `https://gentle-badlands-20791.herokuapp.com/notes?userName=${queryText}`
      )
        .then((res) => res.json())
        .then((data) => setNotes(data));
    }
  };

  /*2. here there will be a function named handleDelete
to delete a note, and it will be passed as props to NoteCard that will be triggered using delete button.
 */
  const handleDelete = (id) => {
    const proceed = window.confirm("Are you sure to delete this note?");
    if (proceed) {
      const url = `https://gentle-badlands-20791.herokuapp.com/note/${id}`;
      // console.log(url)
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setIsReload(!isReload);
        });
    }
  };

  /*
3. there will be a function named handleUpdate
    to update data, and it will be passed as props to NoteCard and 
   later it will be passed to Update modal using props.
 */
 /*  const handleUpdate = (id) => {
    const userName = event.target.userName.value;
    const textData = event.target.textData.value;
    const url = `https://gentle-badlands-20791.herokuapp.com/note/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsReload(!isReload);
      });
  }; */

  /*
4.  there will be a function named handlePost
to post data to backend, and it will be passed as props to InputFrom.
 */

  const handlePost = (event) => {
    event.preventDefault();
    const userName = event.target.userName.value;
    const textData = event.target.textData.value;
    fetch(`https://gentle-badlands-20791.herokuapp.com/note`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, textData }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsReload(!isReload);
      });
  };

  return (
    <div className="App">
      <Header handleSearch={handleSearch} />
      <InputForm handlePost={handlePost} />
      <div className="row row-cols-1 row-cols-md-3 g-4 m-2">
        {notes.map((note) => (
          <NoteCard 
          handleDelete={handleDelete} 
          isReload={isReload}
          setIsReload={setIsReload}
          note={note}
           />
        ))}
      </div>
    </div>
  );
}

export default App;
