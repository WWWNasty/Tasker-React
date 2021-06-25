import React from 'react';
import './App.css';
import Box from '@material-ui/core/Box';


function App() {
  const [tasks, setTasks] = React.useState<Tasks[]>([]);

  React.useEffect(() => {
    (async () => {

      const getSelectOptions = async () => {

        const response = await fetch("/Tasker", {
          method: "Get",
          headers: {"Accept": "application/json"}
        });

        if (response.ok) {
          return await response.json();
        }
      }

      const tasks: Tasks[] = await getSelectOptions();
      setTasks(tasks);
      if (!tasks) {
        //todo show a popup with error
        return;
      }

    })()
    }, []);

  return (
    <Box className="App">
      <ol>
      {tasks?.map((item) => <li key={item.id}>{item.created}: {item.task}</li>) ?? []}
      </ol>
    </Box>
  );
}

export default App;

interface Tasks {
  id: number;
  task: string;
  created: string;
  completed: boolean;
}
