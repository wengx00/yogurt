import { AutoAwesomeOutlined } from '@ricons/material';
import { Icon } from '@ricons/utils';
import { Button, Stack } from '@yogurt-ui/react';

export default function App() {
  return (
    <Stack direction="column" space={10}>
      <Stack>
        <Button>Default</Button>
        <Button theme="primary">Primary</Button>
        <Button theme="success">Success</Button>
        <Button theme="warning">Warning</Button>
        <Button theme="error">Error</Button>
      </Stack>
      <Stack>
        <Button theme="primary">Outlined</Button>
        <Button theme="primary" variant="text">
          Text
        </Button>
        <Button variant="contained">Contained</Button>
      </Stack>
      <Stack>
        <Button variant="contained">Default & Contained</Button>
        <Button theme="primary" variant="contained">
          Primary & Contained
        </Button>
        <Button theme="success" variant="contained">
          Success & Contained
        </Button>
        <Button theme="warning" variant="contained">
          Warning & Contained
        </Button>
        <Button theme="error" variant="contained">
          Error & Contained
        </Button>
      </Stack>
      <Stack>
        <Button theme="primary" shape="rectangle">
          Rectangle
        </Button>
        <Button theme="warning" shape="round">
          Round
        </Button>
        <Button
          theme="success"
          shape="circle"
          prefixSlot={
            <Icon>
              <AutoAwesomeOutlined />
            </Icon>
          }
        />
      </Stack>
      <Stack>
        <Button theme="primary" size="small">
          Small
        </Button>
        <Button theme="warning">Medium</Button>
        <Button theme="error" size="large">
          Large
        </Button>
      </Stack>
    </Stack>
  );
}
