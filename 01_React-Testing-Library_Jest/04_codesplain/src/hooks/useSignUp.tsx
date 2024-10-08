import useSWRMutation from "swr/mutation";
import axios from "axios";

async function signUp(_: any, { arg }: ObjectI) {
  try {
    const { data } = await axios.post("/api/auth/signup", arg);

    return data;
  } catch (err: any) {
    if (err.response) {
      throw err.response.data;
    } else {
      throw err;
    }
  }
}

function useSignUp() {
  const { trigger, data, error, isMutating } = useSWRMutation("/api/user", signUp);

  return {
    isSignedIn: data,
    error,
    signUp: trigger,
    isLoading: isMutating,
  };
}

export default useSignUp;
