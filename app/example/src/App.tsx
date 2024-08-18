import { AutoAwesomeOutlined, DeleteOutlined } from '@ricons/material';
import { Icon } from '@ricons/utils';
import { Button, Stack } from '@yogurt-ui/react';
import { useState } from 'react';
import style from './App.module.scss';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Stack
      className={style.root}
      direction="column"
      align="center"
      justify="center"
      space={10}
    >
      <Stack align="center">Current Count: {count}</Stack>
      <Stack align="center">
        <Button
          theme="primary"
          variant="contained"
          prefixSlot={
            <Icon>
              <AutoAwesomeOutlined />
            </Icon>
          }
          onClick={() => setCount((count) => count + 1)}
        >
          INCREASE
        </Button>
        <Button
          theme="error"
          variant="contained"
          prefixSlot={
            <Icon>
              <DeleteOutlined />
            </Icon>
          }
          onClick={() => setCount(0)}
        >
          重置
        </Button>
      </Stack>
    </Stack>
  );
}

export default App;
