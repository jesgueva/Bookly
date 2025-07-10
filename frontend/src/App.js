import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [emailText, setEmailText] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [appointmentsError, setAppointmentsError] = useState(null);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:8000/appointments');
      setAppointments(response.data);
      setAppointmentsError(null);
    } catch (err) {
      setAppointmentsError(err.response?.data?.detail || err.message);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setError(null);

    try {
      const response = await axios.post('http://localhost:8000/process_email', {
        email_text: emailText,
        sender_email: senderEmail || undefined,
      });
      setStatus(JSON.stringify(response.data, null, 2));
      // Refresh appointments list after successfully processing email
      fetchAppointments();
    } catch (err) {
      setError(err.response?.data?.detail || err.message);
    }
  };

  return (
    <div className="App">
      <h1>Bookly Email Processor</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="sender">Your Email (optional): </label>
          <input
            id="sender"
            type="email"
            value={senderEmail}
            onChange={(e) => setSenderEmail(e.target.value)}
          />
        </div>
        <div>
          <textarea
            rows="10"
            cols="80"
            value={emailText}
            onChange={(e) => setEmailText(e.target.value)}
            placeholder="Paste email content here..."
            required
          />
        </div>
        <button type="submit">Process Email</button>
      </form>
      {status && (
        <pre className="status">
          <strong>Response:</strong>
          {status}
        </pre>
      )}
      {error && <p className="error">Error: {error}</p>}

      {/* Appointments Section */}
      {appointments.length > 0 && (
        <div className="appointments">
          <h2>Appointments</h2>
          <ul>
            {appointments.map((appt) => (
              <li key={appt.id} className="appointment-item">
                <p>
                  <strong>Date/Time:</strong> {appt.datetime || 'N/A'}
                </p>
                <p>
                  <strong>Participants:</strong> {appt.participants.join(', ')}
                </p>
                {appt.notes && (
                  <p>
                    <strong>Notes:</strong> {appt.notes}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      {appointmentsError && (
        <p className="error">Error fetching appointments: {appointmentsError}</p>
      )}
    </div>
  );
}

export default App; 