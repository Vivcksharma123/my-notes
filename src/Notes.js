import React, { useState, useEffect } from 'react';

function Notes({ onLogout }) {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tag: 'General'
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/notes');
      if (response.ok) {
        const data = await response.json();
        setNotes(data);
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
      setNotes([]);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingId ? `http://localhost:3000/api/notes/${editingId}` : 'http://localhost:3000/api/notes';
      const method = editingId ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setFormData({ title: '', description: '', tag: 'General' });
        setEditingId(null);
        fetchNotes();
        alert(editingId ? 'Note updated successfully!' : 'Note added successfully!');
      } else {
        const errorData = await response.json();
        alert('Error: ' + (errorData.error || 'Server error'));
      }
    } catch (error) {
      alert('Backend server not running. Please start the server.');
    }
  };

  const handleEdit = (note) => {
    setFormData({ title: note.title, description: note.description, tag: note.tag });
    setEditingId(note._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        const response = await fetch(`http://localhost:3000/api/notes/${id}`, { method: 'DELETE' });
        if (response.ok) {
          fetchNotes();
          alert('Note deleted successfully!');
        } else {
          alert('Error deleting note');
        }
      } catch (error) {
        alert('Backend server not running. Please start the server.');
      }
    }
  };

  const handleCancel = () => {
    setFormData({ title: '', description: '', tag: 'General' });
    setEditingId(null);
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '30px'
    },
    title: {
      color: 'white',
      fontSize: '32px',
      fontWeight: '600',
      margin: 0
    },
    logoutBtn: {
      padding: '10px 20px',
      backgroundColor: 'rgba(255,255,255,0.2)',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer'
    },
    formCard: {
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
      marginBottom: '30px'
    },
    inputGroup: {
      marginBottom: '20px'
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      border: '2px solid #e1e5e9',
      borderRadius: '8px',
      fontSize: '16px',
      outline: 'none',
      boxSizing: 'border-box'
    },
    textarea: {
      width: '100%',
      padding: '12px 16px',
      border: '2px solid #e1e5e9',
      borderRadius: '8px',
      fontSize: '16px',
      outline: 'none',
      boxSizing: 'border-box',
      minHeight: '100px',
      resize: 'vertical'
    },
    button: {
      padding: '12px 24px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer'
    },
    notesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
      gap: '20px'
    },
    noteCard: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
    },
    noteTitle: {
      fontSize: '18px',
      fontWeight: '600',
      marginBottom: '10px',
      color: '#333'
    },
    noteDescription: {
      color: '#666',
      marginBottom: '10px',
      lineHeight: '1.5'
    },
    noteTag: {
      display: 'inline-block',
      padding: '4px 12px',
      backgroundColor: '#667eea',
      color: 'white',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '500'
    },
    noteActions: {
      marginTop: '15px',
      display: 'flex',
      gap: '10px'
    },
    actionBtn: {
      padding: '6px 12px',
      border: 'none',
      borderRadius: '4px',
      fontSize: '12px',
      cursor: 'pointer',
      fontWeight: '500'
    },
    editBtn: {
      backgroundColor: '#28a745',
      color: 'white'
    },
    deleteBtn: {
      backgroundColor: '#dc3545',
      color: 'white'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>My Notes</h1>
        <div>
          <button 
            onClick={async () => {
              try {
                const response = await fetch('http://localhost:3000/api/notes', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ title: 'Test', description: 'Test desc', tag: 'Test' })
                });
                if (response.ok) {
                  alert('Test note created!');
                  fetchNotes();
                } else {
                  alert('Test failed');
                }
              } catch (e) {
                alert('Connection error: ' + e.message);
              }
            }}
            style={{...styles.logoutBtn, marginRight: '10px'}}
          >
            Test API
          </button>
          <button style={styles.logoutBtn} onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>

      <div style={styles.formCard}>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="Note title"
            />
          </div>
          
          <div style={styles.inputGroup}>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              style={styles.textarea}
              placeholder="Write your note here..."
            />
          </div>
          
          <div style={styles.inputGroup}>
            <input
              type="text"
              name="tag"
              value={formData.tag}
              onChange={handleChange}
              style={styles.input}
              placeholder="Tag (optional)"
            />
          </div>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" style={styles.button}>
              {editingId ? 'Update Note' : 'Add Note'}
            </button>
            {editingId && (
              <button type="button" onClick={handleCancel} style={{...styles.button, background: '#6c757d'}}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div style={styles.notesGrid}>
        {notes.map((note) => (
          <div key={note._id} style={styles.noteCard}>
            <div style={styles.noteTitle}>{note.title}</div>
            <div style={styles.noteDescription}>{note.description}</div>
            <span style={styles.noteTag}>{note.tag}</span>
            <div style={styles.noteActions}>
              <button 
                onClick={() => handleEdit(note)}
                style={{...styles.actionBtn, ...styles.editBtn}}
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(note._id)}
                style={{...styles.actionBtn, ...styles.deleteBtn}}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notes;