import { useEffect, useState } from "react";
import { getAssignments } from "../api/assignmentApi";
import AssignmentCard from "../components/AssignmentCard";
import { useNavigate } from "react-router-dom";

export default function StudentAssignments() {
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAssignments(1, 1).then(res => setAssignments(res.data));
  }, []);

  return (
    <>
      <h2>Assignments</h2>
      {assignments.map(a => (
        <AssignmentCard
          key={a.id}
          assignment={a}
          onSubmit={(id) => navigate(`/submit/${id}`)}
        />
      ))}
    </>
  );
}
