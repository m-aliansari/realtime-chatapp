import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  useDialogContext,
} from "@chakra-ui/react";
import { TextField } from "../../common/TextField";
import { Form, Formik } from "formik";
import { friendFormSchema } from "@realtime-chatapp/common";

export const AddFriendModal = () => {
  const dialog = useDialogContext();
  const handleSubmit = (values, actions) => {
    actions.resetForm();
    dialog.setOpen(false);
  };
  return (
    <Portal>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Add a friend!</Dialog.Title>
          </Dialog.Header>
          <Formik
            initialValues={{ username: "" }}
            onSubmit={handleSubmit}
            validationSchema={friendFormSchema}
          >
            <Form>
              <Dialog.Body>
                <TextField
                  label="Friend's username"
                  placeholder="Enter Friend's username"
                  autoComplete="off"
                  name="username"
                />
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </Dialog.ActionTrigger>
                <Button type="submit">Submit</Button>
              </Dialog.Footer>
            </Form>
          </Formik>
          <Dialog.CloseTrigger asChild>
            <CloseButton size="sm" />
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  );
};
