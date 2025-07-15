import {
  VStack,
  ButtonGroup,
  Field,
  Button,
  Input,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../../constants/api";
import { authFormSchema } from "@realtime-chatapp/common";
import { UserContext } from "../../../contexts/UserContext";
import { ROUTE_NAMES } from "../../../constants/routes";

export const Login = () => {
  const { setUser } = useContext(UserContext);

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: authFormSchema,
    onSubmit: (values, actions) => {
      const vals = { ...values };
      actions.resetForm();
      fetch(`${API_BASE_URL}/auth/login`, {
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
          if (data.status) return setError(data.status);
          setUser({ ...data });
          navigate(ROUTE_NAMES.HOME);
        })
        .catch((err) => setError(err));
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
      <Heading>Log In</Heading>
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
          Log In
        </Button>
        <Link to="/register">
          <Button>Create Account</Button>
        </Link>
      </ButtonGroup>
    </VStack>
  );
};
