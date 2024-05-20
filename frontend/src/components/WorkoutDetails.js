import useWorkoutsContext from "../hooks/useWorkoutsContext";
import { format } from "date-fns";

const WorkoutDetails = ({ workout, editingState, updateEditingState }) => {
  const { dispatch } = useWorkoutsContext();
  const isDisabled = Boolean(
    editingState && editingState._id !== "" && editingState._id !== workout._id
  );

  const handleDelete = async () => {
    if (!isDisabled) {
      const response = await fetch("/api/workouts/" + workout._id, {
        method: "DELETE",
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "DELETE_WORKOUT", payload: json });
      }
      updateEditingState(null);
    }
  };
  const handleEdit = () => !isDisabled && updateEditingState(workout);
  const handleCancel = () =>
    updateEditingState({
      _id: "",
      title: "",
      load: "",
      reps: "",
    });
  return (
    <div className={"workout-details " + (isDisabled ? "shaded" : "")}>
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>{format(new Date(workout.createdAt), "d-MMM-yyyy")}</p>

      <span onClick={handleDelete} className="material-symbols-outlined delete">
        Delete
      </span>
      {editingState && editingState._id === workout._id ? (
        <span
          onClick={handleCancel}
          className="material-symbols-outlined close"
        >
          Close
        </span>
      ) : (
        <span onClick={handleEdit} className="material-symbols-outlined edit">
          Edit
        </span>
      )}
    </div>
  );
};

export default WorkoutDetails;
