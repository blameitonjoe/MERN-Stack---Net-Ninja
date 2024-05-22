import { useState, useEffect } from "react";
import useWorkoutsContext from "../hooks/useWorkoutsContext";
const WorkoutForm = ({ editingState, updateEditingState }) => {
  const [workoutData, setWorkoutData] = useState({
    title: "",
    reps: "",
    load: "",
  });
  const [error, setError] = useState(null);

  const { dispatch } = useWorkoutsContext();

  const isEditing = Boolean(editingState && editingState._id);

  useEffect(() => {
    if (isEditing) {
      setWorkoutData({ ...editingState });
    } else {
      setWorkoutData({
        title: "",
        reps: "",
        load: "",
      });
    }
  }, [editingState, isEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Make PATCH request
    if (isEditing) {
      const response = await fetch("/api/workouts/" + workoutData._id, {
        method: "PATCH",
        body: JSON.stringify(workoutData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();
      if (!response.ok) {
        setError(json);
      }
      if (response.ok) {
        setError(null);
        console.log(`Workout "${workoutData.title}" updated!`, json);
        dispatch({ type: "UPDATE_WORKOUT", payload: workoutData });
        setWorkoutData({ title: "", reps: "", load: "" });
        updateEditingState({
          _id: "",
          title: "",
          load: "",
          reps: "",
        });
      }
      return;
    }
    //Make POST request
    const response = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workoutData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json);
    }
    if (response.ok) {
      setError(null);
      console.log("New workout added!", json);
      setWorkoutData({ title: "", reps: "", load: "" });
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create">
      <h3>
        {editingState && editingState._id
          ? `Edit ${editingState.title}`
          : "Add a new workout"}
      </h3>
      <label htmlFor="title">Exercise Title</label>
      <input
        type="text"
        name="title"
        id="title"
        className={error && error.emptyFields.includes("title") ? "error" : ""}
        onChange={(e) =>
          setWorkoutData((currWorkoutData) => {
            return { ...currWorkoutData, title: e.target.value };
          })
        }
        value={workoutData.title}
      />
      <div className="workout-numbers">
        <fieldset>
          <label htmlFor="load">Load (kg)</label>
          <input
            type="number"
            name="load"
            id="load"
            className={
              error && error.emptyFields.includes("load") ? "error" : ""
            }
            onChange={(e) =>
              setWorkoutData((x) => {
                return { ...workoutData, load: e.target.value };
              })
            }
            value={workoutData.load}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="reps">Reps</label>
          <input
            type="number"
            name="reps"
            id="reps"
            className={
              error && error.emptyFields.includes("reps") ? "error" : ""
            }
            onChange={(e) =>
              setWorkoutData((x) => {
                return { ...workoutData, reps: e.target.value };
              })
            }
            value={workoutData.reps}
          />
        </fieldset>
      </div>
      <button type="submit">{isEditing ? "Update" : "Add"} Workout</button>
      {error && <p className="error">{error.errorMessage}</p>}
    </form>
  );
};

export default WorkoutForm;
