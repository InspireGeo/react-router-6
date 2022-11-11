import React from "react";

type Props = {
  roleRequired: "mrmap" | "USER";
  message?: string;
  children?: React.ReactNode;
};

const useRole = () => {
  let user: any;

  const _user = localStorage.getItem("user-info");
 
  if (_user) {
    user = JSON.parse(_user);
  }
  if (user) {
    return "mrmap";
  } else {
    return "USER";
  }
};

const WithPermission = (props: Props) => {
  const { roleRequired, message, children } = props;
  const role = useRole();
  return (
    <>{roleRequired === role ? children : <h3>{message ? message : ""}</h3>}</>
  );
};

export default WithPermission;
