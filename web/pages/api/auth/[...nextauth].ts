import axios from "axios";
import NextAuth from "next-auth/next";
// lib
import { getAuthOptions, TAuthConfig } from "@plane/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ? process.env.NEXT_PUBLIC_API_BASE_URL : "";

const authHandler = async (req: any, res: any) => {
  const configs: TAuthConfig = await axios.get(API_BASE_URL + "/api/auth-configs/").then((res) => res.data);
  const authOptions = await getAuthOptions(configs, API_BASE_URL);
  return NextAuth(req, res, authOptions as any);
};

export default authHandler;
