import { useEffect, useState } from "react";
import useWorkoutsContext from "../hooks/useWorkoutsContext";

//Components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import Pagination from "../components/Pagination";

function Home() {
  const { workouts, totalWorkouts, page, totalPages, dispatch, limit } =
    useWorkoutsContext();

  const [editing, setEditing] = useState({
    _id: "",
    title: "",
    load: "",
    reps: "",
  });

  const [currPage, setCurrPage] = useState(1);

  const changePage = (num) => {
    setCurrPage(num);
  };

  const updateEditingState = (workout) => {
    setEditing(workout);
  };

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(
        "/api/workouts?" +
          new URLSearchParams({
            page: currPage,
          })
      );
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };
    fetchWorkouts();
  }, [dispatch, currPage]);

  return (
    <div className="home">
      <main>
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
      </main>
      {Boolean(page) && (
        <Pagination
          indexing={{ totalWorkouts, page, totalPages, limit }}
          changePage={changePage}
        />
      )}
    </div>
  );
}

export default Home;
