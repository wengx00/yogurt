import { AutoAwesomeOutlined, SendOutlined } from '@ricons/material';
import { Icon } from '@ricons/utils';
import { Button, Stack } from '@yogurt-ui/react';

export default function App() {
  return (
    <Stack>
      <Button
        prefixSlot={
          <Icon>
            <AutoAwesomeOutlined />
          </Icon>
        }
      >
        Bootstrap
      </Button>
      <Button
        theme="primary"
        variant="contained"
        prefixSlot={
          <Icon>
            <SendOutlined />
          </Icon>
        }
      >
        发送
      </Button>
    </Stack>
  );
}
