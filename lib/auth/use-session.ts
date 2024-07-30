import { getServerSession, Session } from "next-auth";
import { authOptions } from "./auth";

export const useSession = async (): Promise<Session | null> => {
  const session = (await getServerSession(authOptions)) as Session;
  if (!session) return null;
  return session;
};
