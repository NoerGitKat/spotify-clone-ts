import { useAuthStore } from "@/hooks";
import {
  useSessionContext,
  useSupabaseClient
} from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import Modal from "../Modal";

export interface IAuthModalProps {}

const AuthModal: FC<IAuthModalProps> = () => {
  const supabaseClient = useSupabaseClient();
  const { onClose, isOpen } = useAuthStore();
  const { refresh } = useRouter();
  const { session } = useSessionContext();

  useEffect(() => {
    if (session) {
      refresh();
      onClose();
    }
  }, [onClose, refresh, session]);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal
      title="Welcome back!"
      description="Login to your account"
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        theme="dark"
        supabaseClient={supabaseClient}
        magicLink
        providers={["github", "google", "facebook"]}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#404040",
                brandAccent: "#22c55e"
              }
            }
          }
        }}
      />
    </Modal>
  );
};

export default AuthModal;
