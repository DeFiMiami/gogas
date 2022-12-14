import { atom } from 'recoil';

const userAddressAtom = atom({
  key: "userAddress",
  default: localStorage.getItem('userAddress'),
})

const accessTokenAtom = atom({
  key: "accessToken",
  default: localStorage.getItem('accessToken'),
})

const userBalanceAtom = atom({
    key: "userBalance",
    default: null
})

const userDepositsAtom = atom({
    key: "userDeposits",
    default: []
})

const userOperationsAtom = atom({
    key: "userOperations",
    default: []
})

export {
    userAddressAtom,
    accessTokenAtom,
    userBalanceAtom,
    userDepositsAtom,
    userOperationsAtom
};