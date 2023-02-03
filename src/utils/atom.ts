import { atom } from "recoil";

export const authState = atom({
  key: "authState",
  default: false,
});

export const walletState = atom({
  key: "walletState",
  default: "",
});
