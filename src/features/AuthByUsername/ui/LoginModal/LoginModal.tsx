import { Modal } from "@/shared/ui/Modal";
import { Suspense, memo } from "react";
import { Loading } from "@/shared/ui/Loading";
import { LoginFormAsync } from "../LoginForm/LoginForm.async";

interface IProps {
  show: boolean;
  close: () => void;
}

function LoginModal(props: IProps) {
  const { close, show } = props;

  return (
    <Modal show={show} close={close} lazy>
      <Suspense
        fallback={
          <div
            style={{
              height: 150,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Loading size={25} />
          </div>
        }
      >
        <LoginFormAsync close={close} />
      </Suspense>
    </Modal>
  );
}

export default memo(LoginModal);
