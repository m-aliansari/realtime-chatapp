import { Field as FormikField, Form, Formik } from "formik";
import { messageFormSchema, SOCKET_EVENTS } from "@realtime-chatapp/common";
import { Button, Field, HStack, Input, useTabsContext } from "@chakra-ui/react";
import { socket } from "../../utils/socket.js";
import { MessagesContext } from "../../contexts/Messages/MessagesContext.js";
import { useContext, useRef, useState } from "react";

export const ChatBox = ({ setNewMessage }) => {
  const { value: user_id } = useTabsContext();
  const { setMessages } = useContext(MessagesContext);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);

  const handleTyping = () => {
    if (!isTyping) {
      setIsTyping(true);
      socket.emit(SOCKET_EVENTS.TYPING, { to: user_id });
    }

    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      socket.emit(SOCKET_EVENTS.STOP_TYPING, { to: user_id });
    }, 2000);
  };
  return (
    <Formik
      initialValues={{ message: "" }}
      validationSchema={messageFormSchema}
      onSubmit={(values, actions) => {
        const message = {
          to: user_id,
          from: null,
          content: values.message,
          messageId: "temp",
        };
        socket.emit(
          SOCKET_EVENTS.DIRECT_MESSAGE,
          message,
          ({ done, messageId }) => {
            setNewMessage(null);
            if (done)
              setMessages((prevMsgs) => [
                { ...message, messageId },
                ...prevMsgs,
              ]);
          }
        );
        setNewMessage({ ...message });

        setIsTyping(false);
        socket.emit(SOCKET_EVENTS.STOP_TYPING, { to: user_id });

        actions.resetForm();
      }}
      validateOnBlur={false}
    >
      {() => (
        <HStack
          as={Form}
          w="100%"
          justify="start"
          align="start"
          pb="1.4rem"
          px="1.4rem"
        >
          <FormikField name="message">
            {({ field, meta }) => (
              <Field.Root invalid={meta.touched && meta.error}>
                <Input
                  {...field}
                  placeholder="Type message here..."
                  size="lg"
                  autoComplete="off"
                  onChange={(e) => {
                    field.onChange(e);
                    handleTyping();
                  }}
                />
                <Field.ErrorText>{meta.error}</Field.ErrorText>
              </Field.Root>
            )}
          </FormikField>
          <Button type="submit" size="lg" colorPalette="teal">
            Send
          </Button>
        </HStack>
      )}
    </Formik>
  );
};
