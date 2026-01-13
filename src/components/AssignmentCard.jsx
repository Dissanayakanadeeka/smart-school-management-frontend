export default function AssignmentCard({ assignment, onSubmit }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
      <h4>{assignment.title}</h4>
      <p>{assignment.description}</p>
      <p>Due: {assignment.dueDate}</p>
      <button onClick={() => onSubmit(assignment.id)}>
        Submit Assignment
      </button>
    </div>
  );
}
