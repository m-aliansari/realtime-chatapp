import {
  VStack,
  ButtonGroup,
  Field,
  Button,
  Input,
  Heading,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { API_BASE_URL } from "../../../constants/api";
import { UserContext } from "../../../contexts/UserContext";
import { ROUTE_NAMES } from "../../../constants/routes";

export const Signup = () => {
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: object({
      username: string()
        .required("Username required")
        .min(6, "Username too short")
        .max(28, "Username too long"),
      password: string()
        .required("Password required")
        .min(6, "Password too short")
        .max(28, "Password too long"),
    }),
    onSubmit: (values, actions) => {
      const vals = { ...values };
      actions.resetForm();
      fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vals),
      })
        .catch((err) => setError(err))
        .then((res) => {
          if (!res || !res.ok || res.status >= 400) return;
          return res.json();
        })
        .then((data) => {
          if (!data) return;
          if (data.status) return setError(data.status)
          setUser({ ...data });
          navigate(ROUTE_NAMES.HOME);
        })
        .catch((err) => {
          return setError(err);
        });
    },
  });
  return (
    <VStack
      as="form"
      w={{ base: "90%", md: "500px" }}
      m="auto"
      justify={"center"}
      h="100vh"
      onSubmit={formik.handleSubmit}
    >
      <Heading>Sign Up</Heading>
      <Text as="p" color="red.500">
        {error}
      </Text>
      <Field.Root invalid={formik.errors.username && formik.touched.password}>
        <Field.Label size={"lg"}>Username</Field.Label>
        <Input
          name="username"
          placeholder="Enter username"
          autoComplete="off"
          size={"lg"}
          {...formik.getFieldProps("username")}
        />
        <Field.ErrorText>{formik.errors.username}</Field.ErrorText>
      </Field.Root>
      <Field.Root invalid={formik.errors.password && formik.touched.password}>
        <Field.Label size={"lg"}>Password</Field.Label>
        <Input
          name="password"
          type="password"
          placeholder="Enter password"
          autoComplete="off"
          size={"lg"}
          {...formik.getFieldProps("password")}
        />
        <Field.ErrorText>{formik.errors.password}</Field.ErrorText>
      </Field.Root>
      <ButtonGroup>
        <Button colorPalette={"teal"} type="submit">
          Create Account
        </Button>
        <Link to="/">
          <Button>Log In</Button>
        </Link>
      </ButtonGroup>
    </VStack>
  );
};
