import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Group,
  Anchor,
  Center,
  Box,
  rem,
  Container,
  Grid,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import classes from "./passwordchange.module.css";
export default function PasswordChange() {
  return (
    <div style={{backgroundColor:'#e6e0e078', height:'100vh'}}>
      <Container size="lg">
        <Grid pt={50}>
          <Grid.Col span={{ base: 12, xs: 3 }}></Grid.Col>
          <Grid.Col pt={40} span={{ base: 12, xs: 6 }}>
            <Title className={classes.title} ta="center">
              Forgot your password?
            </Title>
            <Text c="dimmed" fz="sm" ta="center">
              Enter your email to get a reset link
            </Text>

            <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
              <TextInput
                label="Your email"
                placeholder="me@mantine.dev"
                required
              />
              <Group
                justify="space-between"
                mt="lg"
                className={classes.controls}
              >
                <Anchor href="/authentication/signin" c="dimmed" size="sm" className={classes.control}>
                  <Center inline>
                    <IconArrowLeft
                      style={{ width: rem(12), height: rem(12) }}
                      stroke={1.5}
                    />
                    <Box ml={5}>Back to the login </Box>
                  </Center>
                </Anchor>
                <Button className={classes.control}>Reset password</Button>
              </Group>
            </Paper>
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 3 }}></Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}
