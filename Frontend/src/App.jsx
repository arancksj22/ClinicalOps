import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:8080/patient';

function Spinner() {
  return (
    <div className="spinner-container">
      <div className="spinner" />
    </div>
  );
}

function Alert({ message, type = 'error', onClose }) {
  return (
    <div className={`alert alert-${type}`}>{message}{onClose && <button className="alert-close" onClick={onClose}>&times;</button>}</div>
  );
}

const initialForm = {
  patientId: '',
  patientFirstName: '',
  patientLastName: '',
  patientAge: '',
  patientAdmissionDate: '',
  patientReleaseDate: '',
};

function PatientForm({ onSubmit, loading, initial = initialForm, submitLabel }) {
  const [form, setForm] = useState(initial);
  useEffect(() => { setForm(initial); }, [initial]);
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
  };
  return (
    <form className="patient-form" onSubmit={handleSubmit} autoComplete="off">
      <div className="form-row">
        <div className="form-group">
          <label>ID</label>
          <input name="patientId" type="number" value={form.patientId} onChange={handleChange} required disabled={!!initial.patientId} />
        </div>
        <div className="form-group">
          <label>First Name</label>
          <input name="patientFirstName" value={form.patientFirstName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input name="patientLastName" value={form.patientLastName} onChange={handleChange} required />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Age</label>
          <input name="patientAge" type="number" value={form.patientAge} onChange={handleChange} required min="0" />
        </div>
        <div className="form-group">
          <label>Admission Date</label>
          <input name="patientAdmissionDate" type="date" value={form.patientAdmissionDate} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Release Date</label>
          <input name="patientReleaseDate" type="date" value={form.patientReleaseDate} onChange={handleChange} />
        </div>
      </div>
      <button className="btn primary" type="submit" disabled={loading}>{loading ? 'Saving...' : submitLabel}</button>
    </form>
  );
}

function PatientTable({ patients, onEdit, onDelete, deletingId }) {
  const columns = [
    { key: 'patientId', label: 'ID' },
    { key: 'patientFirstName', label: 'First Name' },
    { key: 'patientLastName', label: 'Last Name' },
    { key: 'patientAge', label: 'Age' },
    { key: 'patientAdmissionDate', label: 'Admission Date' },
    { key: 'patientReleaseDate', label: 'Release Date' },
  ];
  if (!patients.length) return <div className="empty">No patients found.</div>;
  return (
    <div className="table-container">
      <table className="patient-table">
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key}>{col.label}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p.patientId}>
              {columns.map(col => (
                <td key={col.key}>{p[col.key] ?? ''}</td>
              ))}
              <td className="actions-cell">
                <button className="btn edit" onClick={() => onEdit(p)}>Edit</button>
                <button className="btn danger" onClick={() => onDelete(p.patientId)} disabled={deletingId === p.patientId}>
                  {deletingId === p.patientId ? 'Deleting...' : 'Delete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function App() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [editPatient, setEditPatient] = useState(null);

  const fetchPatients = () => {
    setLoading(true);
    axios.get(API_URL)
      .then(res => setPatients(res.data))
      .catch(() => setError('Unable to connect to backend.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchPatients(); }, []);

  const handleCreate = (form) => {
    setFormLoading(true);
    setError(null); setSuccess(null);
    const payload = { ...form, patientId: Number(form.patientId), patientAge: Number(form.patientAge) };
    axios.post(API_URL, payload)
      .then(() => { setSuccess('Patient created.'); fetchPatients(); })
      .catch(() => setError('Failed to create patient.'))
      .finally(() => setFormLoading(false));
  };

  const handleEdit = (form) => {
    setFormLoading(true);
    setError(null); setSuccess(null);
    const payload = { ...form, patientId: Number(form.patientId), patientAge: Number(form.patientAge) };
    axios.put(API_URL, payload)
      .then(() => { setSuccess('Patient updated.'); fetchPatients(); setEditPatient(null); })
      .catch(() => setError('Failed to update patient.'))
      .finally(() => setFormLoading(false));
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this patient?')) return;
    setDeletingId(id);
    setError(null); setSuccess(null);
    axios.delete(`${API_URL}/${id}`)
      .then(() => { setSuccess('Patient deleted.'); fetchPatients(); })
      .catch(() => setError('Failed to delete patient.'))
      .finally(() => setDeletingId(null));
  };

  return (
    <div className="centered-bg">
      <div className="content-card">
        <h1 className="main-heading">Patient Directory</h1>
        <p className="subtitle">ClinicalOps &mdash; Patient Records</p>
        {error && <Alert message={error} onClose={() => setError(null)} />}
        {success && <Alert message={success} type="success" onClose={() => setSuccess(null)} />}
        <div className="form-section">
          <h2 className="form-title">{editPatient ? 'Edit Patient' : 'Add Patient'}</h2>
          <PatientForm
            onSubmit={editPatient ? handleEdit : handleCreate}
            loading={formLoading}
            initial={editPatient || initialForm}
            submitLabel={editPatient ? 'Update' : 'Create'}
          />
          {editPatient && <button className="btn" onClick={() => setEditPatient(null)} style={{marginTop:8}}>Cancel Edit</button>}
        </div>
        {loading ? <Spinner /> : (
          <PatientTable
            patients={patients}
            onEdit={p => setEditPatient(p)}
            onDelete={handleDelete}
            deletingId={deletingId}
          />
        )}
      </div>
    </div>
  );
}

export default App;
