import { DownloadDoneOutlined } from '@ricons/material';
import { Icon } from '@ricons/utils';
import { Stack } from '@yogurt-ui/react';

export default function App() {
  return (
    <Stack direction="column">
      <Stack>
        <div>Hello</div>
        <div>World</div>
      </Stack>
      <Stack align="center">
        <Icon size={24}>
          <DownloadDoneOutlined />
        </Icon>
        <div>Yogurt</div>
      </Stack>
    </Stack>
  );
}
