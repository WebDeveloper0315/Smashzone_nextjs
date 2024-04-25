import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Container,
  Grid,
} from "@mantine/core";
import Link from "next/link";
export default function SignIn() {
  const [type, toggle] = useToggle(["login", "register"]);
  const form = useForm ({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });
  return (
    <div >
      <Container size="lg">
        <Grid pt={30} pb={40}>
          <Grid.Col span={{ base: 12, xs: 3 }}></Grid.Col>
          <Grid.Col pt={40} span={{ base: 12, xs: 6 }}>
            <Paper mt={30} radius="md" p="xl" withBorder style={{backgroundColor:'#d3cbcb26'}}>
              <Text size="lg" fw={500}>
                Welcome to Sport, {type} with
              </Text>

              <Divider
                label="Or continue with email"
                labelPosition="center"
                my="lg"
              />

              <form onSubmit={form.onSubmit(() => {})}>
                <Stack>
                {/* register Form field */}
                {type === "register" && (
                    <TextInput
                      label="* Your email address: (This will be your login username)"
                      placeholder="Email"
                      type="email"
                      radius="md"
                    />
                  )}
                  {type === "register" && (
                    <TextInput
                      label=" First Name"
                      placeholder="Your first name"
                      value={form.values.name}
                      onChange={(event) =>
                        form.setFieldValue("name", event.currentTarget.value)
                      }
                      radius="md"
                    />
                  )}
                  {type === "register" && (
                    <TextInput
                      label="Last Name"
                      placeholder="Your last name"
                      value={form.values.name}
                      onChange={(event) =>
                        form.setFieldValue("name", event.currentTarget.value)
                      }
                      radius="md"
                    />
                  )}
                  {type === "register" && (
                    <TextInput
                      label="Mobile"
                      placeholder="Your Mobile Number"
                      type="text"
                      radius="md"
                    />
                  )}
                   {type === "register" && (
                    <TextInput
                      label="Postcode"
                      placeholder="Postcode"
                      type="text"
                      radius="md"
                    />
                  )}
                   {type === "register" && (
                     <PasswordInput
                     required
                     label="Your Password"
                     placeholder="Your password"
                     value={form.values.password}
                     onChange={(event) =>
                       form.setFieldValue(
                         "password",
                         event.currentTarget.value
                       )
                     }
                     error={
                       form.errors.password &&
                       "Password should include at least 6 characters"
                     }
                     radius="md"
                   />
                  )}
                   {type === "register" && (
                     <PasswordInput
                     required
                     label=" Confirm Password"
                     placeholder="Confirm password"
                     value={form.values.password}
                     onChange={(event) =>
                       form.setFieldValue(
                         "password",
                         event.currentTarget.value
                       )
                     }
                     error={
                       form.errors.password &&
                       "Password should include at least 6 characters"
                     }
                     radius="md"
                   />
                  )}
                  {type === "register" && (
                    <Checkbox
                      label="I accept terms and conditions"
                      checked={form.values.terms}
                      onChange={(event) =>
                        form.setFieldValue("terms", event.currentTarget.checked)
                      }
                    />
                  )}
                  

                {/* login Form field */}

                  {type === "login" && (
                    <TextInput
                      required
                      label="Email"
                      placeholder="hello@mantine.dev"
                      value={form.values.email}
                      onChange={(event) =>
                        form.setFieldValue("email", event.currentTarget.value)
                      }
                      error={form.errors.email && "Invalid email"}
                      radius="md"
                    />
                  )}

                  {type === "login" && (
                    <PasswordInput
                      required
                      label="Password"
                      placeholder="Your password"
                      value={form.values.password}
                      onChange={(event) =>
                        form.setFieldValue(
                          "password",
                          event.currentTarget.value
                        )
                      }
                      error={
                        form.errors.password &&
                        "Password should include at least 6 characters"
                      }
                      radius="md"
                    />
                  )}
                
                </Stack>
              
                <Group justify="space-between" mt="xl">
                
                  <Anchor
                    component="button"
                    type="button"
                    c="dimmed"
                    onClick={() => toggle()}
                    size="xs"
                  >
                    {type === "register"
                      ? "Already have an account? Login"
                      : "Don't have an account? Register"}
                  </Anchor>
                  {type === "login" && (
                    <Link href="/authentication/passwordchange" style={{color:"GrayText", fontSize:'12px'}}>Change Password</Link>
                  )}
                  <Button type="submit" radius="xl" color="green">
                    {upperFirst(type)}
                  </Button>
                </Group>
              </form>
            </Paper>
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 3 }}></Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}
