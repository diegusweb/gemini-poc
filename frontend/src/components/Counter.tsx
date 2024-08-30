import { Button } from "@mui/material";
import { useAppDispatch } from "../hooks/storeHooks";
import { increment, decrement } from "../slice/tasksSlice";


export default function Counter() {
  const dispatch = useAppDispatch();

  function incrementCounter() {
    dispatch(increment());
  }

  function decrementCounter() {
    dispatch(decrement());
  }

  return (
  
    <div className="App">
      <header className="App-header"> </header>

      <Button  onClick={incrementCounter}>
            Increment +
          </Button>
          <Button  onClick={decrementCounter}>
            Decrement -
          </Button>
      
    </div>

    
  );
}