import { useState } from "react";
import useWorkoutsContext from "../hooks/useWorkoutsContext";
const WorkoutForm = () => {
  const [workoutData, setWorkoutData] = useState({
    title: "",
    reps: "",
    load: "",
  });
  const [error, setError] = useState(null);

  const { dispatch } = useWorkoutsContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      <h3>Add a new workout</h3>
      <label htmlFor="title">Exercise Title</label>
      <input
        type="text"
        name="title"
        id="title"
        className={error && error.emptyFields.includes("title") ? "error" : ""}
        onChange={(e) =>
          setWorkoutData((x) => {
            return { ...workoutData, title: e.target.value };
          })
        }
        value={workoutData.title}
      />
      <label htmlFor="load">Load (kg)</label>
      <input
        type="number"
        name="load"
        id="load"
        className={error && error.emptyFields.includes("load") ? "error" : ""}
        onChange={(e) =>
          setWorkoutData((x) => {
            return { ...workoutData, load: e.target.value };
          })
        }
        value={workoutData.load}
      />
      <label htmlFor="reps">Reps</label>
      <input
        type="number"
        name="reps"
        id="reps"
        className={error && error.emptyFields.includes("reps") ? "error" : ""}
        onChange={(e) =>
          setWorkoutData((x) => {
            return { ...workoutData, reps: e.target.value };
          })
        }
        value={workoutData.reps}
      />
      <button type="submit">Add Workout</button>
      {error && <h4 className="error">{error.errorMessage}</h4>}
    </form>
  );
};

export default WorkoutForm;
