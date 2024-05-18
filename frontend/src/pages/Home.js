import { useEffect, useState } from "react";
import useWorkoutsContext from "../hooks/useWorkoutsContext";

//Components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

function Home() {
  const { workouts, dispatch } = useWorkoutsContext();
  const [editing, setEditing] = useState({
    _id: "",
    title: "",
    load: "",
    reps: "",
  });

  const updateEditingState = (workout) => {
    setEditing(workout);
  };

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };
    fetchWorkouts();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => {
            return (
              <WorkoutDetails
                key={workout._id}
                workout={workout}
                updateEditingState={updateEditingState}
                editingState={editing}
              />
            );
          })}
      </div>
      <WorkoutForm
        editingState={editing}
        updateEditingState={updateEditingState}
      />
    </div>
  );
}

export default Home;
