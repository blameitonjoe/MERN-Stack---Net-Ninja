import { createContext, useReducer } from "react";

export const WorkoutContext = createContext();

export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        totalWorkouts: action.payload.total,
        page: action.payload.page,
        totalPages: action.payload.totalPages,
        workouts: action.payload.workouts,
        limit: action.payload.limit,
      };
    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload, ...state.workouts],
      };
    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter((workout) => {
          return workout._id !== action.payload._id;
        }),
      };
    case "UPDATE_WORKOUT":
      return {
        workouts: [
          action.payload,
          ...state.workouts.filter((workout) => {
            return workout._id !== action.payload._id;
          }),
        ],
      };
    default:
      return state;
  }
};

export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, { workouts: null });
  return (
    <WorkoutContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
};
